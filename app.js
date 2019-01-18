const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendfile(__dirname + "/signup.html");
});

app.get("/", function(req, res){
    res.sendfile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var option = { 
    url: "https://us19.api.mailchimp.com/3.0/lists/2144110040", 
    method: "POST", 
    headers: { Authorization: "Matt1 74732fe5ca90e0319b8cacad27f36857 - us19" 
  },
  body: jsonData
};


  request(option, function(error, response, body){
if (error) {
  res.sendFile(__dirname + "/failure.html");
} else {
  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html");
  } else {
    res.sendFile(__dirname + "/failure.html");
  }
}
  })
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000");
});

// api key
//74732fe5ca90e0319b8cacad27f36857 - us19

//list id
//2144110040