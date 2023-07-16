// 'mongodb+srv://LoganMealtype:i1h1Mf47af8iFvSx@cluster0.m8hbcve.mongodb.net/FlipKar5?retryWrites=true&w=majority 
let mongo = require("mongodb");                      // Import mongodb
let {MongoClient} = require("mongodb");              // Import MongoClient is default method name
let mongoUrl = "mongodb+srv://LoganMealtype:i1h1Mf47af8iFvSx@cluster0.m8hbcve.mongodb.net/FlipKar5?retryWrites=true&w=majority ";
let client = new MongoClient(mongoUrl);  

async function dbConnect(){       
    await client.connect().then(() => {                         // return the promise
        console.log('Database connected');                      // connect the Database
    })                         
}
let db = client.db("FlipKar5");                      // Indicate the Database name



async function getData(colname, query){                         // getData is the function
    let output = [];
    try{
        const cursor = db.collection(colname).find(query);  // Find the Database by using this (DataBase Call).
        for await(const data of cursor){
            output.push(data)
        }
        cursor.closed
    }
    catch(err){
        output.push({"Error" : "Error in getData"})
    }
    return output
}



async function postData(colname, data){                         // postData is the function
    let output;
    try{
        await db.collection(colname).insertOne(data);  // Find the Database by using this (DataBase Call).
        output = {"response":"Order placed"}
    }
    catch(err){
        output = {"response" : "Error in postData"}
    }
    return output
}



async function UpdateOrder(colName,condition,data){             // UpdateOrder is the function
    let outPut;
    try{
        outPut = await db.collection(colName).updateOne(condition,data)
    }catch(err){
        outPut = {  "response ": " Error in update  date"}
    }
    return outPut
}



async function DeleteOrder(colName,condition){                  // DeleteOrder is the function
    let outPut;
    try{
        outPut = await db.collection(colName).deleteOne(condition)
    }catch(err){
        outPut = {"response ": " Error in update  date"}
    }
    return outPut
}

module.exports = {
    dbConnect,
    getData,
    postData,
    UpdateOrder,
    DeleteOrder
}