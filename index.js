var bodyParser = require("body-parser");
var app = require('express')();
var http = require("http").Server(app)
var port = process.env.PORT || 5000;
const multer = require('multer');

const itemRoute = require('./routes/item.route')


var grocery = require("./model/shop.js");
var cors = require('cors');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ type: 'application/*+json' }));


app.get('/', function (req, res) {
    res.sendFile(__dirname + "/index.html")
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  });
   
var upload = multer({ storage: storage });

app.use('/item',itemRoute);

app.post('/create', upload.single('photo'), (req, res, next) => {
    console.log('hello')
    
  })


app.get('/item/retrieve/:id', function (req, res) {
    console.log("Here is the ID: " + req.params.id)
    grocery.findOne({ _id: req.params.id }, function (err, data) {
        if (err) return res.status(200).json(err);
        return res.status(200).json(data);
    })
})

app.put('/item/update/', function (req, res) {
    console.log(req.body)
    grocery.findOneAndUpdate({ _id: req.body.id }, { item: req.body.item, quantity: req.body.quantity, priority: req.body.priority }, {
        new: true,
        upsert: true
    }, function (err, data) {
        if(err) res.status(422).json(err)
        console.log(data)
        res.json(data)
    })
})

app.delete('/item/delete', function (req, res) {
    console.log(req.body);
    grocery.findOneAndDelete({ _id: req.body.id }, function (err, data) {
        if (err) return console.log(err);
        const response = {
            message: "Successfully deleted",
        };
        return res.status(200).send(response);
    })
})

http.listen(port, function () {
    console.log('listening on *:' + port);
});