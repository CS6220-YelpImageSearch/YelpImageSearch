# YelpImageSearch
This is the final project for the course CS6220 Big Data System and Analytics.

## Introduction
The image data comes from Yelp challenge

We developed a Yelp Restaurant Iamge Search application. Users can upload a food image and find the restaurants with the searched food in Yelp. 

The application is developed by React and Flask.

The image retrieval model is based on SIFT and CNN model. We tested on SIFT, CNN model and combination of SIFT and CNN model. 

## Installation

For the image retrieval model part, you can open the ipynb files ```model/sift_retrieval.ipynb``` for SIFT model and ```model/image_search_cnn.ipynb``` in Google Colab. 

For our application, to start the frontend, under the ```frontend/``` directory, run the command ```npm install``` to install the dependencies and run ```nodemon server``` and ```nodemon```. To start the backend, under the ```backend/``` directory, run the command ```pip install requirements.txt``` to install the dependencies and run ```python app.py``` to start the server.

## Data Preperation

### Remote Database

A remote MongoDB is hosted so that you don't need to do the data loading yourself. However, due to the storage limit of free cluster, only a small amount of photos are loaded to the remote database. This may result in the failure of loading some images on the result page.

To switch to use remote database, edit ```frontend/server.js``` line 21, change ```LOCAL_URL``` to ```ATLAS_URI``` to connect to the remote database.

### Local Database

1. Download dataset from https://www.yelp.com/dataset. Extract the downloaded files and put folders ```yelp_dataset``` and ```yelp_photos``` under the root folder.
2. Install [MongoDB](https://docs.mongodb.com/manual/installation/)
3. Create a database named ```yelp``` in MongoDB.
4. Use ```mongoimport``` command to import ```yelp_dataset/business.json``` as the ```business``` collection in ```yelp``` database.    
```mongoimport --db yelp --collection business --type JSON --file {path_to_business.json}```
5. Use ```mongoimport``` command to import ```yelp_dataset/photo.json``` as the ```photo``` collection in ```yelp``` database.   
```mongoimport --db yelp --collection photo --type JSON --file {path_to_photo.json}```
6. Under ```scripts/``` folder, run ```python3 createPhotoImageJson.py``` to create a json file named ```LVImageBase64.json``` under ```yelp_dataset/```. This file contains the photo_id of photos for businesses in Las Vegas and the corresponding photos in ```yelp_photos/``` encoded as base 64.
7. Use ```mongoimport``` command to import ```yelp_dataset/LVImageBase64.json``` as the ```image``` collection in ```yelp``` database.   
```mongoimport --db yelp --collection image --type JSON --jsonArray --file {path_to_LVImageBase64.json}```

To switch to use local database, edit ```frontend/server.js``` line 21, change ```ATLAS_URI``` to ```LOCAL_URL``` to connect to the local database.

