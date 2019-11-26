import sys
import os
import h5py
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import tensorflow.keras.backend as K
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as kimage


def sift_query(img_path):
    return 0


def cnn_query(img_path):
    h5f = h5py.File('./output/feature/LasVegasFoodFeatures', 'r')
    features = h5f['dataset_1'][:]
    img_names = h5f['dataset_2'][:]
    h5f.close()

    best_model = load_model('./output/model/best_model.hdf5', compile = False)
    feature_extractor = K.function([best_model.layers[0].input], [best_model.layers[-4].output])
    img = kimage.load_img(img_path, target_size=(299, 299))
    img = kimage.img_to_array(img)                    
    img = np.expand_dims(img, axis=0)         
    img /= 255. 
    query_feature = feature_extractor([img])[0][0]
    scores = np.dot(query_feature, features.T)
    rank_ID = np.argsort(scores)[::-1]
    rank_score = scores[rank_ID]

    max_res = 3
    img_list = [img_names[index] for i, index in enumerate(rank_ID[0:max_res])]

    for i, img in enumerate(img_list):
        image = mpimg.imread('./data/LV_photos' + '/' + str(img, 'utf-8'))
        plt.title('search output %d' %(i+1))
        plt.imshow(image)
        plt.show()


def rank_rerank(img_path, k):
    return 0


def average_score(img_path, w):
    return 0


if __name__ == '__main__':
    method = sys.argv[1]
    img_path = sys.argv[2]
    if method == 'sift':
        sift_query(img_path)
    elif method == 'cnn':
        cnn_query(img_path)
    elif method == 'rerank':
        rank_rerank(img_path)
    elif method == 'average':
        average_score(img_path)
    else:
        print('We only provide 4 methods: sift, cnn, rerank and average!')