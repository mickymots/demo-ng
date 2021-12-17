var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var http = require('http');

var url = 'https://iz7o3yh3p8.execute-api.ca-central-1.amazonaws.com/dev/';


app.get("/", function(req, res) {
    res.render("first_view");
})
app.get('/send_message', function(req, res){
   res.render('send_message');
});


app.get('/create_topic', function(req, res){
    res.render('create_topic');
 });


app.set('view engine', 'pug');
app.set('views', './views');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// app.post('/', function(req, res){
//    console.log(req.body);
//    res.send("recieved your request!");
// });


const axios = require('axios');

const send_message = (req) => {
    console.log(req);
    var message = {
        "message_text": req.message,
        "topic_arn": "arn:aws:sns:ca-central-1:854569252260:demo_topic"
    }
    var options = {
        baseURL: url,
        url: 'messages',
        method : 'PUT',
        headers: {  'Content-Type': 'application/json', 'authorizationToken':'YNQXmb4oYv9rSboLGFVmC5b9zszBfZtg5wcFVoD2' },
              
        data: message
      };

      
      return axios(options)
     
    
   

}

app.get('/failure', function(req, res){
   
    res.render('failure', {"message": "Error sending message"});
});


app.post('/send_message', function(req, res){
    console.log(req.body);
    send_message(req.body).then(function (response) {
        console.log(response);
        res.send("Message sent");
      })
      .catch(function (error) {
        console.log(error);
        res.redirect('/failure?message='+error.message);
        // res.status(500).send({"message": "Error sending message"});
      });
    
 });


app.listen(3000);