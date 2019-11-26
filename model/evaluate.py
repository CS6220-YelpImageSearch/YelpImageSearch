import sys
import os
import h5py
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import tensorflow.keras.backend as K
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as kimage

import src as sc
import h5py
import os.path as osp


def load_sift():
    name_dataset = 'yelp'
    vocab_filename = '4000vocab.h5'

    if osp.exists(vocab_filename):
        with h5py.File(vocab_filename, 'r') as hf:
            vocab = hf[name_dataset][:]
    else:
        raise "vocab file does not exist"

    feats_filename = 'feats.h5'
    if osp.exists(feats_filename):
        with h5py.File(feats_filename, 'r') as hf:
            train_feats = hf[name_dataset][:]
    else:
        raise "feats file does not exist"
        
    paths_filename = 'paths.h5'
    if osp.exists(paths_filename):
        with h5py.File(paths_filename, 'r') as hf:
            paths = hf[name_dataset][:]
    else:
        raise "paths file does not exist"

    return (vocab, train_feats, paths)


def predict_sift(test_path, vocab, train_feats, paths, max_num=3):
    test_feats = sc.get_bags_of_sifts([test_path], vocab)
    (predicted_indexes, distances) = sc.nearest_neighbor_classify(train_feats, test_feats)
    
    return (paths[predicted_indexes[0, :max_num]], test_feats, distances)


def sift_query(img_path, display=False):
    vocab, train_feats, paths = load_sift()
    predicted_paths, test_feats, distances = predict_sift(img_path, vocab, train_feats, paths)
    if display:
        for i, img in enumerate(predicted_paths):
            img = img.decode("utf-8").split('/')[-1]
            image = mpimg.imread('./data/LV_photos' + '/' + img)
            plt.title('search output %d' %(i+1))
            plt.imshow(image)
            plt.show()

    return (test_feats, paths, distances)


def cnn_query(img_path, display=False):
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

    if display:
        for i, img in enumerate(img_list):
            image = mpimg.imread('./data/LV_photos' + '/' + str(img, 'utf-8'))
            plt.title('search output %d' %(i+1))
            plt.imshow(image)
            plt.show()

    return (scores, img_names)


def rank_rerank(img_path, k, display=False):
    distances_cnn, image_names_cnn = cnn_query(img_path)
    image_names_cnn = [str(i, 'utf-8') for i in image_names_cnn]
    image_names_cnn = image_names_cnn[:k]
    _, image_names_sift, distances_sift = sift_query(img_path)
    image_names_sift = [name.decode("utf-8").split('/')[-1] for name in image_names_sift]

    ret_names = []
    for i in image_names_sift:
        if i in image_names_cnn:
            ret_names.append(i)
    ret_name = ret_names[:3]

    if display:
        for i, img in enumerate(img_list):
            image = mpimg.imread('./data/LV_photos' + '/' + str(img, 'utf-8'))
            plt.title('search output %d' %(i+1))
            plt.imshow(image)
            plt.show()


    return 0


def average_score(img_path, w, display=False):
    _, image_names_sift, distances_sift = sift_query(img_path)
    image_names_sift = [name.decode("utf-8").split('/')[-1] for name in image_names_sift]
    distances_cnn, image_names_cnn = cnn_query(img_path)
    image_names_cnn = [str(i, 'utf-8') for i in image_names_cnn]
    distances_sift /= np.max(distances_sift)
    distances_cnn /= np.max(distances_cnn)

    dict_distance = dict(zip(image_names_sift, distances_sift[0]))
    for name, distance in zip(image_names_cnn, distances_cnn):
        dict_distance[name] *= (1 - w)
        dict_distance[name] += (distance * 0.8)

    dict_distance = [(key, value) for key, value in dict_distance.items()]
    dict_distance.sort(key = lambda x: x[1])
    if display:
        for name, _ in dict_distance[:3]:
            image = mpimg.imread('./data/LV_photos' + '/' + img)
            plt.title('search output %d' %(i+1))
            plt.imshow(image)
            plt.show()
    return 0


if __name__ == '__main__':
    method = sys.argv[1]
    img_path = sys.argv[2]
    if method == 'sift':
        sift_query(img_path)
    elif method == 'cnn':
        cnn_query(img_path)
    elif method == 'rerank':
        rank_rerank(img_path, 50)
    elif method == 'average':
        average_score(img_path, 0.8)
    else:
        print('We only provide 4 methods: sift, cnn, rerank and average!')
