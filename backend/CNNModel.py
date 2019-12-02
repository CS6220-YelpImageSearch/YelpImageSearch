# Loading the best saved model to make predictions
import tensorflow.keras.backend as K
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as kimage
import numpy as np
import h5py

class CNNModel:
    def __init__(self):
        h5f = h5py.File('./../output/LasVegasFoodFeatures','r')
        self.features = h5f['dataset_1'][:]
        self.img_names = h5f['dataset_2'][:]
        h5f.close()

        self.best_model = load_model('./../output/best_model.hdf5', compile = False)
        # construct the feature extractor based on our best model
        self.feature_extractor = K.function([self.best_model.layers[0].input], [self.best_model.layers[-4].output])

    def query_image(self, image):
        print('searching starts')

        # extract query image's feature, compute simlarity score and sort
        img = image.resize((299, 299))
        img = kimage.img_to_array(img)                    
        img = np.expand_dims(img, axis=0)         
        img /= 255. 
        query_feature = self.feature_extractor([img])[0][0]
        scores = np.dot(query_feature, self.features.T)
        rank_ID = np.argsort(scores)[::-1]
        rank_score = scores[rank_ID]

        # number of top retrieved images to show
        max_res = 3
        img_list = [self.img_names[index] for i, index in enumerate(rank_ID[0:max_res])]
        print('top %d images in order are: ' %max_res, img_list)
        return img_list
