// START MONGODB FIRST.

var express = require('express')
var app = express() ;
app.set('view engine', 'ejs') ;

const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017";

// Connect to the cluster.
const client = new MongoClient(uri, { 
	useNewUrlParser: true, 
	useUnifiedTopology: true 
});

client.connect(err => {
  console.log("Connected to db.....");
});

// change db and collection name according to yours.
const db = client.db("emp");
const collection = db.collection("empl") ;

// Menu
app.get('/', function (req, res) {
  res.render('menu.ejs');
})

// all records
app.get('/list', (req,res)=>{
  const allFields = collection.find().toArray()
	.then(results =>{
	    res.render('list.ejs', {result : results})
	})
	.catch(error => console.error(error))
})

// Record by id
app.get('/id', function (req, res) {
  // Access ejs value in node via req.query 
  // Then convert the fetched value to NUMBER .
   var fetched_id = Number(req.query['id']) ;  // Here 'id' is {name = id} of input tag(id.ejs).

  // (no) is the employee number column name in my collection. Change according to yours.
  const record_by_id = collection.find({no : fetched_id}).toArray()
	.then(results =>{
	    res.render('id.ejs', {resultbyid : results, id : fetched_id})
	})
	.catch(error => console.error(error))
})

// Insert
app.get('/insert', function (req, res) {
  // Access User inputted value from FORM. 
  var no = Number(req.query['no'])
  var name = req.query['name']
  var salary = Number(req.query['salary'])
  var role = req.query['role']
  // Dont change the above 4 declared variables.

  // (no) is the employee number column name in my collection. Change according to yours.
  var insertQuery = collection.insertOne({no : no, name : name, salary : salary, role : role});

  //Initially when firing above query it inserts null fields first, so remove it after insert operation. 
  collection.deleteMany({name : null}) ;
  
  // Show all records after insert operation at same url 
  const allFields = collection.find().toArray()
	.then(results =>{
	    res.render('insert.ejs', {result : results})
	})
	.catch(error => console.error(error))
})


// Update
app.get('/update', function (req, res) {
  // Access User inputted value from FORM. 
  var no = Number(req.query['no'])
  var name = req.query['name']
  var salary = Number(req.query['salary'])
  var role = req.query['role']
  // Dont change the above 4 declared variables.
  
  // (no) is the employee number column name in my collection. Change according to yours.
  var updateQuery = collection.updateOne({no : no} , {$set : {name : name, salary : salary, role : role}});

  //Show all records after update operation at same url 
  const allFields = collection.find().toArray()
	.then(results =>{
	    res.render('update.ejs', {result : results})
	})
	.catch(error => console.error(error))

})

// Delete
app.get('/delete', function (req, res) {
   // Access ejs value in node via req.query 
   // Then convert fetched value to NUMBER.
   var fetched_id = Number(req.query['id']) ;

   // (no) is the employee number column name in my collection.Change according to yours.
   const delete_by_id = collection.deleteOne({no : fetched_id}) ;

  //Show all records after delete operation at same url 
  const allFields = collection.find().toArray()
	.then(results =>{
	    res.render('delete.ejs', {result : results})
	})
	.catch(error => console.error(error))
})


app.listen(8080, "localhost", ()=>{
    console.log('The server is up and running on http://localhost:8080');
})
