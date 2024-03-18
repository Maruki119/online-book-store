import React, {useEffect} from 'react';
import axios from 'axios';

const List = () => {  

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios("http://127.0.0.1:5000/users");
            console.log(result);
        } catch (err){
            console.log("Something Wrong");
        }
    }

    return (
        <div>
            <h1>THIS IS LIST PAGE!</h1>
        </div>
    );

};

export default List;