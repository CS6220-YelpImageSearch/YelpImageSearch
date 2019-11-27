var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var http = require("http");
var fs = require('fs');
var PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log('App running on port: ' + PORT);
});

// connect to mongodb
const ATLAS_URI = "mongodb+srv://user:123@cluster0-gjnfz.mongodb.net/yelp?retryWrites=true&w=majority";
// const LOCAL_URL = "mongodb://127.0.0.1:27017/yelp"
mongoose.connect(ATLAS_URI, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', function() {
	console.log("MongoDB database connection established successfully");
  // list all collections
  // mongoose.connection.db.listCollections().toArray(function (err, names) {
  //   console.log(names); 
  // });
});

// load mongodb collections schema
var Photo = require('./schema/photo.model');
var Business = require('./schema/business.model');

// filter found photos using input label, city, and state
var filterByLabelAndLocation = (photo_ids, inputLabel, inputCity, inputState) => {
  return new Promise((resolve, reject) => {
    Photo.find({photo_id: photo_ids}).exec()
    .then(function(photos) {
      var filtered_photo_business = []
      var filtered_business_id = []
      for (i = 0; i < photos.length; i++) {
        if (photos[i].label == inputLabel) {
          var this_business = photos[i].business_id
          filtered_photo_business.push({"photo_name": photos[i].photo_id+".jpg", "business_id": this_business})
          filtered_business_id.push(this_business)
        }
      }
      return [filtered_photo_business, filtered_business_id]
    })
    .then(function(result) {
      Business.find({business_id: result[1]})
        .then(function(businesses) {
          var filtered_business = []
          for (i = 0; i < businesses.length; i++) {
            if ((businesses[i].city == inputCity) && (businesses[i].state == inputState)) {
              filtered_business.push(businesses[i])
            }
          } 
          resolve([filtered_business, result[0]])
        })
    })
    .catch((err)=>{
      reject(err);
    });
  })
}

// Save the upload picture to /public/input_image
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/input_image')
  },
  filename: function (req, file, cb) {
    cb(null, 'input_file.png')
  }
});

var upload = multer({ storage: storage }).single('file');

app.post('/upload', function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }

    // convert the image to base64 format
    var base64image = new Buffer(fs.readFileSync(req.file.path)).toString("base64");

    var image = req.file;
    var label = req.body.label.toLowerCase();
    var state = req.body.state;
    var city = req.body.city;

    // post image to the model to retrieve the photo_ids to show
    var postData = JSON.stringify({
      "image": base64image
    });

    var options = {
        hostname: 'localhost',
        port: 5000,
        path: '/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    // send request to the backend to get the query result from the model for the input image
    var request = http.request(options, (response) => {
      var data = '';
      response.on('data', (chunk) => {
        data += chunk.toString(); // buffer to string
      });

      response.on('end', () => {
        data = JSON.parse(data);
        var new_photo_id_array = data;

        filterByLabelAndLocation(new_photo_id_array, label, city, state)
        .then((result) => { // businesses is an array of business object
          console.log("=====>Below are business information:");
          console.log(result);
          return res.status(200).send({"query_result": result, "input_file": base64image});
        })
      });
    });

    request.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    request.write(postData);
    request.end();
  });
});
