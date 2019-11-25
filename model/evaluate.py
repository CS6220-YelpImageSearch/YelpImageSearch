import matplotlib.pyplot as plt
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

def predict_sift(test_path, vocab, train_feats, max_num=3):
    test_feats = sc.get_bags_of_sifts([test_path], vocab)
    predicted_indexes = sc.nearest_neighbor_classify(train_feats, test_feats)
    
    return paths[predicted_indexes[0, :max_num]]

def sift_query(img_path):



def cnn_query(img_path):
    


def rank_rerank(img_path, k):
    


def average_score(img_path, w):
    
