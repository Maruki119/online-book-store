from flask import Flask, jsonify, request
from pymongo.mongo_client import MongoClient
from flask_cors import CORS, cross_origin

#add mongodb to api
uri = "mongodb+srv://user:user@online-shopping.uyqkvxp.mongodb.net/?retryWrites=true&w=majority"

client = MongoClient(uri)
#add client online-shopping = db
db = client["online-shopping"]
#add all collection
users_collection = db["users"]
items_collection = db["items"]
cards_collection = db["cards"]
 
#main app
app = Flask(__name__)
 
#greeting api
@app.route('/')
def Greet():
    return "<p>Welcome to Online-Book-Shopping Management API</p>"

#users
@app.route('/users', methods = ["GET"])
def get_all_users():
    all_users = users_collection.find()
    return jsonify({"users":[i for i in all_users]})

@app.route("/users/<int:user_id>", methods = ["GET"])
def get_user(user_id):
    all_users = users_collection.find()
    user = next( (i for i in all_users if i["_id"] == user_id), None)
    if user:
        return jsonify(user)
    else:
        return jsonify({"error": "User not found"}), 404
     
@app.route("/users", methods = ["POST"])
def create_user():
    try:
        data = request.get_json()
        new_user = {
            "_id": users_collection.count_documents({}) + 1,
            "user": data["user"],
            "password": data["password"],
            "email": data["email"],
            "fullname": data["fullname"],
            "card_id": "",
            "balance": 0
        }
        all_users = list(users_collection.find())
        if(next((i for i in all_users if i["user"] == data["user"]), None)):
            return jsonify( {"error":"Cannot create new user"}), 500
        else:
            users_collection.insert_one(new_user)
            return jsonify(new_user),200
    except Exception as e:
        print(e)
     
@app.route("/users/<int:user_id>", methods = ["PUT"])
def update_user(user_id):
    all_users = users_collection.find()
    user = next( (i for i in all_users if i["_id"] == user_id), None)
    if user:
        data = request.get_json()
        users_collection.update_one({"_id": user_id}, {"$set": data})
        return jsonify(user), 200
    else:
        return jsonify({"error": "User not found"}), 404

#cards
@app.route("/cards", methods = ["GET"])
def get_all_cards():
    all_cards = cards_collection.find()
    return jsonify({"cards":[i for i in all_cards]})

@app.route("/cards/<int:card_id>", methods = ["GET"])
def get_card(card_id):
    all_cards = cards_collection.find()
    card = next( (i for i in all_cards if i["_id"] == card_id), None)
    if card:
        return jsonify(card)
    else:
        return jsonify({"error": "Card not found"}), 404

@app.route("/cards", methods = ["POST"])
def create_card():
    try:
        data = request.get_json()
        new_card = {
            "_id": cards_collection.count_documents({}) + 1,
            "number": data["number"],
            "holder": data["holder"],
            "balance": data["balance"]
        }
        all_cards = list(cards_collection.find())
        if(next((i for i in all_cards if i["number"] == data["number"]), None)):
            return jsonify( {"error":"Cannot create new card"}), 500
        else:
            cards_collection.insert_one(new_card)
            return jsonify(new_card),200
    except Exception as e:
        print(e)
     
@app.route("/cards/<int:card_id>", methods = ["PUT"])
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
def delete_card(card_id):
    all_cards = cards_collection.find()
    card = next( (i for i in all_cards if i["_id"] == card_id), None)
    if card:
        cards_collection.delete_one({"_id": card_id})
        return jsonify({"message": "Card deleted successfully"}), 200
    else:
        return jsonify({"error": "Card not found"}), 404
    
if __name__=="__main__":
    app.run(host = "0.0.0.0", port = 5000, debug = True)