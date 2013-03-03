var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('progressbardb', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'progressbardb' database");
        db.collection('progressbars', {safe:true}, function(err, collection) {
            if (err) {
                console.log("The 'progressbars' collection doesn't exist. Creating it with sample data...");
                populateDB();
            }
        });
    }
});

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving progressbar: ' + id);
    db.collection('progressbars', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('progressbars', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addProgressbar = function(req, res) {
    var progressbar = req.body;
    console.log('Adding progressbar: ' + JSON.stringify(progressbar));
    db.collection('progressbars', function(err, collection) {
        collection.insert(progressbar, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateProgressbar = function(req, res) {
    var id = req.params.id;
    var progressbar = req.body;
    delete progressbar._id;
    console.log('Updating progressbar: ' + id);
    console.log(JSON.stringify(progressbar));
    db.collection('progressbars', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, progressbar, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating progressbar: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(progressbar);
            }
        });
    });
}

exports.deleteProgressbar = function(req, res) {
    var id = req.params.id;
    console.log('Deleting progressbar: ' + id);
    db.collection('progressbars', function(err, collection) {
        collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred - ' + err});
            } else {
                console.log('' + result + ' document(s) deleted');
                res.send(req.body);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/
// Populate database with sample data -- Only used once: the first time the application is started.
// You'd typically not find this code in a real-life app, since the database would already exist.
var populateDB = function() {

    var progressbars = [
    {
        name: "AwesomeMeter",
        minValue: 0,
        maxValue: 100,
        currentValue: 40,
        description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely progressbar, which makes an excellent complement to fish dishes.",
        picture: ""
    },
    {
        name: "CoolMeter",
        minValue: 10,
        maxValue: 200,
        currentValue: 40,
        description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely progressbar, which makes an excellent complement to fish dishes.",
        picture: ""
    },
    {
        name: "RobertMeter",
        minValue: 1,
        maxValue: 1000,
        currentValue: 245,
        description: "The aromas of fruit and spice give one a hint of the light drinkability of this lovely progressbar, which makes an excellent complement to fish dishes.",
        picture: ""
    }];

    db.collection('progressbars', function(err, collection) {
        collection.insert(progressbars, {safe:true}, function(err, result) {});
    });

};
