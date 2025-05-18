const {MongoClient} = require("mongodb")
const url = "mongodb+srv://asmaa1_2_8:test123@cluster0.vzke6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const client = new MongoClient(url);
const main = async  () => {
    // connect to db
    await client.connect();
    console.log('connect successfully to server');

    //choose db to interact with
    const db = client.db('codeZone');

    //choose collection to interact with
    const collection = db.collection('courses');

    // insert in db collection
    await collection.insertOne({ 
        title:"cpp",
        price:100
     });

    //get query
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
  
}
main();