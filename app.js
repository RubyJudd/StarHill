const express = require("express");
const app = express();
const request = require("request");


app.set("view engine",  "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/img"));


app.get("/", function(req, res){	
		res.render("landing");
});

app.get("/about", function(req, res){	
		res.render("about");
});


app.get("/contact", function(req, res){	
		res.render("contact");
});

app.get("/storytelling", function(req, res){	
		res.render("storytelling");
});

app.get("/arttherapy", function(req, res){	
		res.render("arttherapy");
});

app.get("/adoptees", function(req, res){	
		res.render("adoptees");
});

app.get("/adoptiveparents", function(req, res){	
		res.render("adoptiveparents");
});

app.get("/birthparents", function(req, res){	
		res.render("birthparents");
});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started");
});


