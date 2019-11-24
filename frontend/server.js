var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function() {
    console.log('App running on port: ' + PORT);
});

// hard coded user input
photo_id_array = ["3C1pjroWIgXlrlWQtJneUw", "_t87-w-efuN0p5gQ8hJzgg", "FYY0zzJOz0rWxRAoLeZshg"];
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

// app.get('/upload', (req, res) => {
//   res.send("Hello Server!");
// });

let runPy = new Promise(function(success, nosuccess) {
    const { spawn } = require('child_process');
    const pyprog = spawn('python', ['pyTest.py', './public/input_image/input_file.png']);
    pyprog.stdout.on('data', function(data) {
        success(data);
    });
    pyprog.stderr.on('data', (data) => {
        nosuccess(data);
    });
});

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

app.post('/upload',function(req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    console.log(req.file);
    var label = req.body.label;
    var state = req.body.state;
    var city = req.body.city;

    console.log("=>> MY UPLOAD IMAGE DATA");
    console.log("label: " + label);
    console.log("state: " + state);
    console.log("city: " + city);

    // Run the script and get the output
    runPy.then(function(fromRunpy) {
        var modelArray = fromRunpy.toString();
        res.end(fromRunpy);
        console.log("=>>>> this is the output data: ");
        console.log("array: " + fromRunpy.toString());

        var filterByLabelAndLocation = (photo_id_array, inputCity, inputState) => {
          return new Promise((resolve, reject) => {
            Photo_Plus_Business.find({photo_id: photo_id_array}).exec()
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

        filterByLabelAndLocation(photo_id_array, cityInput, stateInput)
        .then((result) => { // businesses is an array of business object
          console.log("=====>Below are business information:")
          console.log(result)
          var businesses = result[0]
          /* Do all the rendering here */
            app.get('/search_business', (req, res) => {
              res.send({ result });
          });
        })

        return res.status(200).send(req.file);
      });
    });

    // var filterByLabelAndLocation = (photo_id_array, inputCity, inputState) => {
    // 	return new Promise((resolve, reject) => {
    // 		Photo_Plus_Business.find({photo_id: photo_id_array}).exec()
    // 		.then(function(photos) {
    // 			filtered_photo_business = []
    // 			filtered_business_id = []
    // 			for (i = 0; i < photos.length; i++) {
    // 				if (((photos[i].label == "food") || (photos[i].label == "inside")) && (photos[i].city == inputCity) && (photos[i].state == inputState)) {
    // 				  	this_business = photos[i].business_id
    // 				  	filtered_photo_business.push({"photo_name": photos[i].photo_id+".jpg", "business_id": this_business})
    // 				  	filtered_business_id.push(this_business)
    // 				}
    // 			}
    // 			return [filtered_photo_business, filtered_business_id]
    // 		})
    // 		.then(function(result) {
    // 			// resolve(result)
    // 			Business.find({business_id: result[1]})
    // 	  		.then(function(businesses) {
    // 	  			resolve([businesses, result[0]])
    // 	  		})
    // 		})
    // 		.catch((err)=>{
    // 		    reject(err);
    // 		});
    // 	})
    // }
    //
    // filterByLabelAndLocation(photo_id_array, cityInput, stateInput)
    // .then((result) => { // businesses is an array of business object
    // 	console.log("=====>Below are business information:")
    // 	console.log(result)
    // 	var businesses = result[0]
    // 	/* Do all the rendering here */
    // 	  app.get('/search_business', (req, res) => {
    // 	    res.send({ result });
    //   });
    // })
    //
    // return res.status(200).send(req.file);
    // })
});
