import json
from flask import Flask, jsonify, request
from pymongo.mongo_client import MongoClient
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from datetime import datetime, timedelta, timezone

#add mongodb to api
uri = "mongodb+srv://user:user@online-shopping.uyqkvxp.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri)
#add client online-shopping = db
db = client["online-shopping"]
#add all collection
users_collection = db["users"]
books_collection = db["books"]
cards_collection = db["cards"]
 
#main app
app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['JWT_SECRET_KEY'] = 'Please-remember-to-change-me'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours = 1)

cors = CORS(app)
jwt = JWTManager(app)

@app.after_request
@cross_origin()
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if(target_timestamp > exp_timestamp):
            access_token = create_access_token(identity = get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response
 
@app.route('/token', methods = ["POST"])
@cross_origin()
def create_token():
    data = request.get_json()
    email = data.get("email", None)
    password = data.get("password", None)
    
    user = users_collection.find_one({"email": email, "password": password})
    if not user:
        return jsonify({"error": "Wrong email or password"}), 401
    
    access_token = create_access_token(identity = email)
    response = {"access_token": access_token}
    return jsonify(response)

@app.route('/logout', methods = ["POST"])
@cross_origin()
def logout():
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response
 
@app.route('/profile', methods = ["GET"])
@jwt_required()
@cross_origin()
def my_profile():
    current_user = get_jwt_identity()
    user = users_collection.find_one({"email": current_user})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    response_body = {
        "_id": user.get("_id", ""),
        "user": user.get("user", ""),
        "email": user.get("email", ""),
        "password": user.get("password", ""),
        "fullname": user.get("fullname", ""),
        "card_id": user.get("card_id", ""),
        "balance": user.get("balance", ""),
        "book_access": user.get("book_access", []),
        "cart": user.get("cart", []),
        "wishlist": user.get("wishlist", [])
    }
    
    return jsonify(response_body)

@app.route('/search', methods = ["GET"])
@cross_origin()
def search():
    title = request.args.get('title', '')
    if not title:
        return jsonify({"error": "Please provide a 'title' parameter in the query."}), 400

    search_result = list(books_collection.find({"title": {"$regex": title, "$options": "i"}}))
    if not search_result:
        return jsonify({"message": "No books found with the provided title query."}), 404
    
    response = {
        "message": "Books found with the provided title query.",
        "results": search_result
    }
    
    return jsonify(response), 200
    
#greeting api
@app.route('/')
def Greet():
    return "<p>Welcome to Online-Book-Shopping Management API</p>"

#users
@app.route('/users', methods = ["GET"])
@cross_origin()
def get_all_users():
    all_users = users_collection.find()
    return jsonify({"users":[i for i in all_users]})

@app.route("/users/<int:user_id>", methods = ["GET"])
@cross_origin()
def get_user(user_id):
    all_users = users_collection.find()
    user = next( (i for i in all_users if i["_id"] == user_id), None)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404
     
@app.route("/users", methods = ["POST"])
@cross_origin()
def create_user():
    try:
        data = request.get_json()
        new_user = {
            "_id": users_collection.count_documents({}) + 1,
            "user": data["user"],
            "password": data["password"],
            "email": data["email"],
            "fullname": "",
            "card_id": "",
            "balance": 0,
            "book_access": [],
            "cart": [],
            "wishlist": []
        }
        
        existing_user = users_collection.find_one({"user": data["user"]})
        if existing_user:
            return jsonify({"error": "Username already exists"}), 400
        
        existing_email = users_collection.find_one({"email": data["email"]})
        if existing_email:
            return jsonify({"error": "Email already exists"}), 400
            
        users_collection.insert_one(new_user)
        return jsonify(new_user), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
     
@app.route("/users/<int:user_id>", methods = ["PUT"])
@jwt_required()
@cross_origin()
def update_user(user_id):
    all_users = users_collection.find()
    user = next( (i for i in all_users if i["_id"] == user_id), None)
    if user:
        data = request.get_json()
        users_collection.update_one({"_id": user_id}, {"$set": data})
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 404
    
#get array    
@app.route("/users/<int:user_id>/book_access", methods=["GET"])
@jwt_required()
@cross_origin()
def get_user_book_access(user_id):
    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    book_access = user.get("book_access", [])
    books = list(books_collection.find({"_id": {"$in": book_access}}))
    
    return jsonify({"books": books}), 200

@app.route("/users/<int:user_id>/cart", methods=["GET"])
@jwt_required()
@cross_origin()
def get_user_cart(user_id):
    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    cart = user.get("cart", [])
    books = list(books_collection.find({"_id": {"$in": cart}}))
    
    return jsonify({"books": books}), 200

@app.route("/users/<int:user_id>/wishlist", methods=["GET"])
@jwt_required()
@cross_origin()
def get_user_wishlist(user_id):
    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    wishlist = user.get("wishlist", [])
    books= list(books_collection.find({"_id": {"$in": wishlist}}))
    
    return jsonify({"books": books}), 200

#put array
@app.route("/users/<int:user_id>/add_book", methods=["PUT"])
@jwt_required()
@cross_origin()
def add_book_to_bookAccess(user_id):
    try:
        data = request.get_json()
        book_id = data.get("book_id")
        if not book_id:
            return jsonify({"error": "Book ID is required"}), 400
        
        user = users_collection.find_one({"_id": user_id})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        if int(book_id) in user["book_access"]:
            return jsonify({"message": "Book already in user's book_access"}), 200
        
        users_collection.update_one(
            {"_id": user_id},
            {"$pull": {"cart": int(book_id)}}
        )
        
        users_collection.update_one(
            {"_id": user_id},
            {"$push": {"book_access": int(book_id)}}
        )

        return jsonify({"message": "Book added to user's book_access"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/users/<int:user_id>/add_to_cart", methods=["PUT"])
@jwt_required()
@cross_origin()
def add_book_to_cart(user_id):
    try:
        data = request.get_json()
        book_id = data.get("book_id")
        if not book_id:
            return jsonify({"error": "Book ID is required"}), 400
        
        user = users_collection.find_one({"_id": user_id})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        if int(book_id) in user["cart"]:
            return jsonify({"message": "Book already in user's cart"}), 200
        
        if int(book_id) in user["book_access"]:
            return jsonify({"message": "Book already in user's book_access"}), 200
        
        users_collection.update_one(
            {"_id": user_id},
            {"$push": {"cart": int(book_id)}}
        )

        return jsonify({"message": "Book added to user's cart"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/users/<int:user_id>/add_to_wishlist", methods=["PUT"])
@jwt_required()
@cross_origin()
def add_book_to_wishlist(user_id):
    try:
        data = request.get_json()
        book_id = data.get("book_id")
        if not book_id:
            return jsonify({"error": "Book ID is required"}), 400
        
        user = users_collection.find_one({"_id": user_id})
        if not user:
            return jsonify({"error": "User not found"}), 404
        
        if int(book_id) in user["wishlist"]:
            return jsonify({"message": "Book already in user's wishlist"}), 200
        
        users_collection.update_one(
            {"_id": user_id},
            {"$push": {"wishlist": int(book_id)}}
        )

        return jsonify({"message": "Book added to user's wishlist"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
   
#delete array 
@app.route("/users/<int:user_id>/remove_from_cart/<int:book_id>", methods=["DELETE"])
@jwt_required()
@cross_origin()
def remove_book_cart(user_id, book_id):
    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if book_id not in user["cart"]:
        return jsonify({"message": "Book not found in user's cart"}), 404
    
    users_collection.update_one(
        {"_id": user_id},
        {"$pull": {"cart": book_id}}
    )

    return jsonify({"message": "Book removed from user's cart."}), 200
    
@app.route("/users/<int:user_id>/remove_from_wishlist/<int:book_id>", methods=["DELETE"])
@jwt_required()
@cross_origin()
def remove_book_wishlist(user_id, book_id):
    user = users_collection.find_one({"_id": user_id})
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if book_id not in user["wishlist"]:
        return jsonify({"message": "Book not found in user's wishlist."}), 404
    
    users_collection.update_one(
        {"_id": user_id},
        {"$pull": {"wishlist": book_id}}
    )

    return jsonify({"message": "Book removed from user's wishlist"}), 200

#cards
@app.route("/cards", methods = ["GET"])
@jwt_required()
@cross_origin()
def get_all_cards():
    all_cards = cards_collection.find()
    return jsonify({"cards":[i for i in all_cards]})

@app.route("/cards/<int:card_id>", methods = ["GET"])
@jwt_required()
@cross_origin()
def get_card(card_id):
    all_cards = cards_collection.find()
    card = next( (i for i in all_cards if i["_id"] == card_id), None)
    if card:
        return jsonify(card)
    else:
        return jsonify({"error": "Card not found"}), 404

@app.route("/cards", methods = ["POST"])
@jwt_required()
@cross_origin()
def create_card():
    try:
        data = request.get_json()
        new_card = {
            "_id": cards_collection.count_documents({}) + 1,
            "Card_number": data["Card_number"],
            "holder": data["holder"],
            "exp" : data["exp"],
            "cvv" : data["cvv"],
            "balance": data["balance"]
        }
        all_cards = list(cards_collection.find())
        if(next((i for i in all_cards if i["Card_number"] == data["Card_number"]), None)):
            return jsonify( {"error":"Cannot create new card"}), 500
        else:
            cards_collection.insert_one(new_card)
            return jsonify(new_card),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/cards/number/<string:Card_number>", methods = ["GET"])
@jwt_required()
@cross_origin()
def get_card_number(Card_number):
    all_cards = cards_collection.find()
    card = next( (i for i in all_cards if i["Card_number"] == Card_number), None)
    if card:
        return jsonify(card)
    else:
        return jsonify({"error": "Card not found"}), 404
     
@app.route("/cards/<int:card_id>", methods = ["PUT"])
@jwt_required()
@cross_origin()
def update_card(card_id):
    all_cards = cards_collection.find()
    card = next( (i for i in all_cards if i["_id"] == card_id), None)
    if card:
        data = request.get_json()
        cards_collection.update_one({"_id": card_id}, {"$set": data})
        return jsonify(card), 200
    else:
        return jsonify({"error": "Card not found"}), 404
    
@app.route("/cards/<int:card_id>", methods = ["DELETE"])
@jwt_required()
@cross_origin()
def delete_card(card_id):
    all_cards = cards_collection.find()
    card = next( (i for i in all_cards if i["_id"] == card_id), None)
    if card:
        cards_collection.delete_one({"_id": card_id})
        return jsonify({"message": "Card deleted successfully"}), 200
    else:
        return jsonify({"error": "Card not found"}), 404
    
#books
@app.route('/books', methods = ["GET"])
@cross_origin()
def get_all_books():
    all_books = books_collection.find()
    return jsonify({"books":[i for i in all_books]})

@app.route("/books/<string:category>", methods = ["GET"])
@cross_origin()
def get_book_category(category):
    all_books = books_collection.find()
    return jsonify({"books": [i for i in all_books if i["category"] == category]})

@app.route("/books/<int:book_id>", methods = ["GET"])
@cross_origin()
def get_book(book_id):
    all_books = books_collection.find()
    book = next( (i for i in all_books if i["_id"] == book_id), None)
    if book:
        return jsonify(book)
    else:
        return jsonify({"error": "Book not found"}), 404
     
@app.route("/books", methods = ["POST"])
@jwt_required()
@cross_origin()
def create_book():
    try:
        data = request.get_json()
        new_book = {
            "_id": books_collection.count_documents({}) + 1,
            "title": data["title"],
            "author": data["author"],
            "synopsis": data["synopsis"],
            "category": data["category"],
            "price": data["price"],
            "image" : data["image"]
        }
        all_books = list(books_collection.find())
        if(next((i for i in all_books if i["title"] == data["title"]), None)):
            return jsonify( {"error":"Cannot create new book"}), 500
        else:
            books_collection.insert_one(new_book)
            return jsonify(new_book),200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
     
@app.route("/books/<int:book_id>", methods = ["PUT"])
@jwt_required()
@cross_origin()
def update_book(book_id):
    all_books = books_collection.find()
    book = next( (i for i in all_books if i["_id"] == book_id), None)
    if book:
        data = request.get_json()
        books_collection.update_one({"_id": book_id}, {"$set": data})
        return jsonify(book), 200
    else:
        return jsonify({"error": "book not found"}), 404

@app.route("/books/<int:book_id>",methods=["DELETE"])
@jwt_required()
@cross_origin()
def delete_book(book_id):
    all_books = books_collection.find()
    book = next((b for b in all_books if b["_id"] == book_id),None)
    if book:
        books_collection.delete_one({"_id": book_id})
        return jsonify({"message": "Book deleted successfully"}), 200
    else:
        return jsonify({"error":"Book not found"}), 404    

if __name__=="__main__":
    app.run(host = "0.0.0.0", port = 5000, debug = True)