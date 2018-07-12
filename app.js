var express = require("express"),
bodyParser  = require("body-parser"),
mongoose    = require("mongoose"),
app         = express();

mongoose.connect("mongodb://127.0.0.1:27017/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

//Mongoose and model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//   title: "Test Blog",
//   image: "/photo-1531388034983-1cdb80f37307.jpg",
//   body: "Hello world! This is a blog post"
// });

//RESTful routes

//INDEX route
app.get("/blogs", function(req, res) {
  res.render("index");
});

//Tell express to listen for requests
app.listen(3000, function(){
  console.log("Server started.");
});
