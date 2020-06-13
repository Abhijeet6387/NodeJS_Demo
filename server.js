


//EXPRESS IS A FRAMEWORK BASED ON NODE TO SIMPLIFY IT'S MECHANISM just like stl in c++
const express = require("express"); //INITIALISE
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const db = "mongodb://localhost:27017/demo"
const feed_api=require("./routes/feed_api");
const path=require("path");

// steps for connecting to database
// app.use('/home',(req,res)=>{
//     res.send("hello from home");
// })
// app.set("view engine","pug");
// app.set("views", path.join(__dirname,"views"))
// app.use(express.static(path.join(__dirname,'views')))


//The body parser middleware is especially used to extract the body from the incoming requests. In short, it extracts the data out of the request headers like the form data, etc
app.use(bodyParser.urlencoded({
    extended:false              //true when we use form data
}))
app.use(bodyParser.json());     //to parse the  requested data in objects,raw etc.
app.use(express.static(__dirname + '/views'));

// app.set('views', __dirname + '/views');  


//A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. This approach makes it easier to design an HTML page.
// examples of template engines are Pug, Mustache, and EJS.



// app.engine('html', require('ejs').renderFile);  // setting html template engine ejs without this line we cannot render html using res.render we have to use res.sendFile
// app.set('view engine','pug'); // used to set template view engine
app.use('/',feed_api);
mongoose.Promise=global.Promise;

//Mongoose requires a connection to a MongoDB database. You can require() and connect to a locally hosted database with mongoose.connect(), as shown below.
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    if(err){
        console.log(err)
    }
    else
    console.log("connected to db")
})



app.listen(1234, () => {
  console.log("Server is listening on port: 1234");
});


