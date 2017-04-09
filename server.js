const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // ES6 PROMISE
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const env = process.env;

app.use(bodyParser.urlencoded({extended: true}));
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
mongoose.connect(`mongodb://${env.DB_USER}:${env.DB_PASS}@${env.DB_HOST}:${env.DB_PORT}/${env.DB}`).then(() => {
    console.log('Connected successfully.');
    app.listen(env.APP_PORT);
    console.log('Server is listening port '+env.APP_PORT);
}, (err) => {
    console.log('Connection to db failed: '+err);
});
//  API FRONTEND
app.use(express.static(__dirname + '/public'));
// API DOCUMENTATION
app.use(express.static(__dirname + '/doc'));

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/public/index.html');
});

app.get('/documentation', (req, res) => {
    res.sendFile(__dirname+'/doc/index.html');
});

app.post('/addcat', (req, res) => {
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

app.get('/getcats', (req, res) => {
    Cat
    .where('age').gt(req.query.age)
    .where('weight').gt(req.query.weight)
    .exec()
    .then( (cats) => {
        console.log(cats);
        res.send(cats);
    }, (err) => {
        res.send({status: 404, error: 'Could not find matching Cats.'});
    });
});

app.patch('/editcat/:id', (req, res) => {
    const id = req.params.id;
    Cat.findByIdAndUpdate(id, {
        $set: req.query,
    }, {new: true}, (err, doc) => {
        if(err) {
            console.log(err);
            res.sendStatus(501);
        } else {
            res.sendStatus(200);
        }
    });
});

app.delete('/deletecat', (req, res) => {
    Cat.findById(req.query._id).remove().exec( (err, response) => {
        if(err) {
            res.sendStatus(501);
        } else {
            res.sendStatus(200);
        }
    });
});

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    (username, password, done) => {
        if (username !== 'atte' || password !== 'jee') {
            console.log('Incorrect credentials.');
            done(null, false, {message: 'Incorrect credentials.'});
            return;
        }
        return done(null, {});
    }
));
app.use(passport.initialize());

app.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    session: false})
);
app.get('/login', (req, res) => {
    res.sendFile(__dirname+'/public/login.html');
});
