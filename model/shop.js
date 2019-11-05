const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/shop', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Connected Yehey")
});

var shoppingSchema = new Schema({

    item:{
        type: String,
        required: true,
        unique: true
    },
    
    quantity:{
        type: Date,
        required: true
    }
})

shoppingSchema.plugin(validator, { message: 'Item must be unique!' });

module.exports = mongoose.model('Schedule', shoppingSchema);