const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // ES6 PROMISE
const bodyParser = require('body-parser');

app.use(bodyParser.json());


const Schema = mongoose.Schema;

const catSchema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male',
    },
    color: String,
    weight: Number,
});

const Cat = mongoose.model('Cat', catSchema);

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
    Cat.create(req.body).then( (cat) => {
        console.log(cat.id);
        console.log(cat.name);
    });
});

app.get('/cats', (req, res) => {
    Cat.find({}, (err, cats) => {
        if(err) throw err;

        res.send(cats);
    });
});

app.get('/getcats', bodyParser.urlencoded({extended: true}), (req, res) => {
    Cat
    .where('age').gt(req.query.age)
    .where('weight').gt(req.query.weight)
    .exec()
    .then( (cats) => {
        console.log(cats);
        res.send(cats);
    });
});

app.patch('/editcat', bodyParser.urlencoded({extended: true}), (req, res) => {
    Cat.findById(req.query._id, (err, cat) => {
        if (!cat) {
            console.log('Cat not found');
            res.sendStatus(501);
        }
        else {
            cat.name = req.query.name;
            cat.age = req.query.age;
            cat.gender = req.query.gender;
            cat.color = req.query.color;
            cat.weight = req.query.weight;

            cat.save(function(err) {
                if (err) {
                    console.log('Error: '+err)
                    res.sendStatus(501);
                }
                else {
                    res.sendStatus(200);
                
                }
            });
        }
    });
});

app.delete('/deletecat', bodyParser.urlencoded({extended: true}), (req, res) => {
    Cat.findById(req.query._id).remove().exec( (err, response) => {
        if(err){
            res.sendStatus(501);
        }
        else{
            res.sendStatus(200);
        }
    })
})

