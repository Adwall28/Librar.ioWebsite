const { error } = require("console");
let http = require("http");
let fs = require('fs');
let port = 8080;
let url = "mongodb+srv://adamjohnwallace1:FanAppa123@library.4yodunz.mongodb.net/?retryWrites=true&w=majority";
const {MongoClient} = require('mongodb');
let mongoose = require("mongoose");

let express = require("express");
let app = express();
let path = require("path");
let $ = require('jquery');

mongoose.connect(url);

let bookSchema = new mongoose.Schema({
  author: String,
  country: String,
  language: String,
  link: String,
  pages: Number,
  title: String,
  year: Number,
});

let Books = mongoose.model('Book', bookSchema);



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

    const db = client.db("Library");
    const Book = db.collection("Books");
    const Users = db.collection("Users");
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
    allBooksRoute(response);
})

async function listAllBooks() {
    let books = await Books.find();
    return books;
    }
async function allBooksRoute(response) {
    let books = await listAllBooks();
    response.write(JSON.stringify(books));
    response.end()
    }


app.listen(port, function(){
    console.log("Listening on 8080");
});

app.get('/LoginForm', function(req, res, next){
    res.render('LoginForm', {
        title: 'Login',
        "LoginForm" : docs,
    });
});

app.post('/LoginForm', function(req, res, next){
    // req.body object has your form values
    console.log(req.body.UserName);
    console.log(req.body.Password);
});