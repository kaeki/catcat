const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // ES6 PROMISE
const bodyParser = require('body-parser');

app.use(bodyParser.json());


const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: String,
    dob: Date,
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
    color: String,
    weight: Number,
});

const Cat = mongoose.model('Cat', catSchema);

/* ADDING A NEW CAT
Cat.create({hidden: false}).then( (cat) => {
    console.log(cat.id);
});
*/

Cat.find().exec().then( (cats) => {
    console.log(`Found ${cats.length} cats.`);
    console.log(cats);
});
const env = process.env;
mongoose.connect(`mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB}`).then(() => {
    console.log('Connected successfully.');
    app.listen(env.APP_PORT);
    console.log('Server is listening port '+env.APP_PORT);
}, (err) => {
    console.log('Connection to db failed: '+err);
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.post('/addcat', bodyParser.urlencoded({extended: true}), (req, res) => {
    res.send('You sent the name "' + req.body.name + '".');
    req.body.dob = new Date(req.body.dob);
    Cat.create(req.body).then( (cat) => {
        console.log(cat.id);
        console.log(cat.name);
    });
});

app.get('/cats', (req, res) => {
    Cat
    .where('dob').gt(Date.now() - 315569259747)
    .where('weight').gt(10)
    .where('gender').equals('male')
    .exec()
    .then( (cats) => {
        console.log(cats);
        res.send(cats);
    });
});

