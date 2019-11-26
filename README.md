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
