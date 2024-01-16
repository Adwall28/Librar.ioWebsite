const { error } = require("console");
let http = require("http");
let fs = require('fs');
let port = 8080;
let url = require("url");
const {MongoClient} = require('mongodb');
let express = require("express");
let app = express();
let path = require("path");


async function main() {
	let uri = "mongodb+srv://adamjohnwallace1:FanAppa123@library.4yodunz.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
    
        await listDatabases(client);
     
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 
app.set("view engine", "ejs");
app.use(express.static(__dirname));

app.get("/", function(request, response){
    response.render("pages/Login");
})

app.listen(port, function(){
    console.log("Listening on 8080");
});


