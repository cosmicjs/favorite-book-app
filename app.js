var methodOverride = require("method-override"),
    bodyParser  = require("body-parser"),
    express     = require("express"),
    app         = express(),
    Cosmic      = require("cosmicjs");

var api = Cosmic();
var bucket = api.bucket({
    slug: "favorite-book",
    read_key: "QxlWYVywWwJu94x9vVp3DJFt11OqLIUJRBBp0i4FyqbpvtOOhp"
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


app.get("/", function(req,res){
    res.redirect("/books");
});

// RESTful ROUTES

// INDEX ROUTE
app.get("/books", function(req,res){
    bucket.getObjects({
    }).then(books => {
        res.render("index", {books: books});
    });
});

// SHOW ROUTE
app.get("/books/:slug", function(req,res){
    bucket.getObject({
        slug: req.params.slug
    }).then(book => {
        res.render("show", {book: book});
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
