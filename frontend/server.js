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

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    // var bitmap = fs.readFileSync(file, "base64");
    console.log(bitmap)
    return bitmap
}

// hard coded user input
// photo_id_array = ["3C1pjroWIgXlrlWQtJneUw", "_t87-w-efuN0p5gQ8hJzgg", "FYY0zzJOz0rWxRAoLeZshg"];
cityInput = "Las Vegas";
stateInput = "NV";

// connect to mongodb
mongoose.connect('mongodb://127.0.0.1:27017/yelp', { useNewUrlParser: true });

const connection = mongoose.connection;
connection.once('open', function() {
	console.log("MongoDB database connection established successfully");
});

// load mongodb collections schema
var Photo = require('./schema/photo.model');
var Business = require('./schema/business.model');
var Photo_Plus_Business = require('./schema/photo_plus_business.model');

var filterByLabelAndLocation = (photo_ids, inputCity, inputState) => {
  return new Promise((resolve, reject) => {
    Photo_Plus_Business.find({photo_id: photo_ids}).exec()
    .then(function(photos) {
      filtered_photo_business = []
      filtered_business_id = []
      for (i = 0; i < photos.length; i++) {
        if (((photos[i].label == "food") || (photos[i].label == "drink")) && (photos[i].city == inputCity) && (photos[i].state == inputState)) {
          this_business = photos[i].business_id
          filtered_photo_business.push({"photo_name": photos[i].photo_id+".jpg", "business_id": this_business})
          filtered_business_id.push(this_business)
        }
      }
      return [filtered_photo_business, filtered_business_id]
    })
    .then(function(result) {
      // resolve(result)
      Business.find({business_id: result[1]})
        .then(function(businesses) {
          resolve([businesses, result[0]])
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
    var base64image = new Buffer(fs.readFileSync(req.file.path)).toString("base64");
    
    var image = req.file;
    var label = req.body.label;
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

    var request = http.request(options, (response) => {
      var data = '';
      response.on('data', (chunk) => {
        data += chunk.toString(); // buffer to string
      });

      response.on('end', () => {
        data = JSON.parse(data);
        var new_photo_id_array = data;
        console.log('No more data in response.');

        filterByLabelAndLocation(new_photo_id_array, city, state)
        .then((result) => { // businesses is an array of business object
          console.log("=====>Below are business information:")
          console.log(result)
          /* Do all the rendering here */
          return res.status(200).send({"query_result": result});
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
