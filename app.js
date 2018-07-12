var express     = require("express"),
methodOverride  = require("method-override"),
bodyParser      = require("body-parser"),
mongoose        = require("mongoose"),
app             = express();

mongoose.connect("mongodb://127.0.0.1:27017/restful_blog_app", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

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
app.get("/", function(req, res) {
  res.redirect("/blogs");
});

app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if(err) {
      console.log(err);
    }
    else {
      res.render("index", {blogs: blogs});
    }
  });
});

//NEW route
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

//CREATE route
app.post("/blogs", function(req, res) {
  //create blog
  Blog.create(req.body.blog, function(err, newBlog) {
    if(err) {
      res.render("new");
    }
    else {
      res.redirect("/blogs");
    }
  });
});

//SHOW route
app.get("/blogs/:id", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if(err) {
      res.redirect("/blogs");
    }
    else {
      res.render("show", {blog: foundBlog});
    }
  });
});

//EDIT route
app.get("/blogs/:id/edit", function(req, res) {
  Blog.findById(req.params.id, function(err, foundBlog) {
    if(err) {
      res.redirect("/blogs");
    }
    else {
      res.render("edit", {blog: foundBlog});
    }
  });
});

//UPDATE route
app.put("/blogs/:id", function(req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
    if(err) {
      res.redirect("/blogs");
    }
    else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

//Tell express to listen for requests
app.listen(3000, function(){
  console.log("Server started.");
});
