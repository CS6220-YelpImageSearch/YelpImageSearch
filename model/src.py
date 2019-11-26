import cv2
import numpy as np
import h5py
from utils import load_gif_gray
import cyvlfeat as vlfeat
import sklearn.metrics.pairwise as sklearn_pairwise
from sklearn.cluster import KMeans, MiniBatchKMeans
from sklearn.svm import LinearSVC
import os.path as osp
import time as t

debugging_flag=True

def build_vocabulary(image_paths, vocab_size, sampled_file='vocab.h5'):
    """
    This function will sample SIFT descriptors from the training images,
    cluster them with kmeans, and then return the cluster centers.
    """
    dim = 128      # length of the SIFT descriptors that you are going to compute.
    vocab = np.zeros((vocab_size,dim))
    
    N = len(image_paths)
    assert N > 0, 'there must be at least one image path!'

    if not osp.exists(sampled_file):   
        # smapled features
        before_clustered = 5000000
        sampled_features = np.empty((before_clustered, dim))
        count, visited = 0, 0
        while count < before_clustered and visited < N:
            index = np.random.randint(N)
            img = load_gif_gray(image_paths[index])

            frames, descriptors = vlfeat.sift.dsift(img, fast=debugging_flag, step=20)
            added_num = min(before_clustered-count, descriptors.shape[0])
            sampled_features[count:count+added_num, :] = descriptors[:added_num, :]

            count = count + added_num
            visited = visited + 1

        print('use {:d} images to extract the visual words'.format(visited))

#         with open(sampled_file, 'wb') as f:
#             pickle.dump(sampled_features, f)
    # else:
    #     print('use saved sampled descriptor file')
    #     with open(sampled_file, 'rb') as f:
    #         sampled_features = pickle.load(f)
    
    # clustering
    model = MiniBatchKMeans(n_clusters=vocab_size)
    model.fit(sampled_features, vocab_size)
    vocab = model.cluster_centers_
    return vocab

def get_bags_of_sifts(image_paths, vocab):
    # dummy features variable
    feats = []
    N = len(image_paths)
    vocab_size = vocab.shape[0]
    
    feats = np.empty((N, vocab_size))
    list_descriptors = []
    images_per_cluster = 1000 # calc the kmeans_quantize for multiple images once
    count = 0
    for i in range(N):
        start = t.time()
        img = load_gif_gray(image_paths[i])
        frames, descriptors = vlfeat.sift.dsift(img, fast=debugging_flag, step=20)
        descriptors = descriptors.astype(np.float64)
        
        list_descriptors.append(descriptors)
        
        if i % images_per_cluster == images_per_cluster-1 or i == N-1:
            # create the split indexs
            indexs = [descriptor.shape[0] for descriptor in list_descriptors]
            indexs = np.cumsum(indexs[:-1]) # make the size is equal
            
            # vstack the descriptors
            stacked_descriptors = np.vstack(list_descriptors)
            end = t.time()
            print("Time Taken: ", str(round((end - start)/60, 2)))
            print(str(i) + ',' + str(count))
            assignments = vlfeat.kmeans.kmeans_quantize(stacked_descriptors, vocab)
            start = end
            end = t.time()
            print("Time Taken: ", str(round((end - start)/60, 2)))
            print(str(i) + ',' + str(count))
            # split
            splited_assignments = np.split(assignments, indexs)
            
            # histogram
            for assign in splited_assignments:
                values, bins = np.histogram(assign, bins=np.arange(vocab_size+1))
                feats[count, :] = values
                count = count + 1
            
            # reset the list
            del list_descriptors
            list_descriptors = []

    return feats

def nearest_neighbor_classify(train_image_feats, test_image_feats):

    # compute the distances
    pair_distances = sklearn_pairwise.euclidean_distances(test_image_feats, train_image_feats)
        
    # find the nearest neighbour classifier
    indexs = np.argsort(pair_distances, axis=1)
    return (indexs, pair_distances)

def svm_classify(train_image_feats, train_labels, test_image_feats, SVM_lambda=400):
    """
    This function will train a linear SVM for every category (i.e. one vs all)
    and then use the learned linear classifiers to predict the category of
    every test image. Every test feature will be evaluated with all 15 SVMs
    and the most confident SVM will "win". Confidence, or distance from the
    margin, is W*X + B where '*' is the inner product or dot product and W and
    B are the learned hyperplane parameters.

    Useful functions:
    -   sklearn LinearSVC
        http://scikit-learn.org/stable/modules/generated/sklearn.svm.LinearSVC.html
    -   svm.fit(X, y)
    -   set(l)

    Args:
    -   train_image_feats:  N x d numpy array, where d is the dimensionality of
          the feature representation
    -   train_labels: N element list, where each entry is a string indicating the
          ground truth category for each training image
    -   test_image_feats: M x d numpy array, where d is the dimensionality of the
          feature representation. You can assume N = M, unless you have changed
          the starter code
    Returns:
    -   test_labels: M element list, where each entry is a string indicating the
          predicted category for each testing image
    """
    # categories
    categories = list(set(train_labels))

    # construct 1 vs all SVMs for each category
    svms = {cat: LinearSVC(random_state=0, tol=1e-3, loss='hinge', C=SVM_lambda) for cat in categories}

    test_labels = []

    # train
    train_labels = np.array(train_labels)
    X = train_image_feats
    for key, value in svms.items():
        y = (train_labels == key).astype(np.int32)
        value.fit(X, y)
    
    # predict
    M = test_image_feats.shape[0]
    scores = np.empty((M, len(categories)))
    for key, value in svms.items():
        scores_i = value.decision_function(test_image_feats)
        index = categories.index(key)
        scores[:, index] = scores_i
    
    # return
    label_indexs = np.argmax(scores, axis=1)
    test_labels = [categories[i] for i in label_indexs]

    return test_labels, svms

"""
term frequency-inverse document frequency
"""
def tf_idf(feats):
    N = feats.shape[0]
    word_frequency = feats/np.sum(feats, axis=1).reshape(-1, 1)
    inverse_document_frequency = np.log(N/np.sum((feats>0).astype(int), axis=0))
    
    return word_frequency * inverse_document_frequency

def rank(predict_indexs, y, Nrel):
    N = predict_indexs.shape[1]
    M = predict_indexs.shape[0]
    factor = Nrel*(Nrel+1)/2
    ranks = []
    for i in range(M):
        predict_index = predict_indexs[i, :]
        label = y[i]
        relevant = (y[predict_index] == label).astype(int)
        r_sum = np.sum(np.argsort(relevant)[-Nrel:])+Nrel
        ranks.append((r_sum-factor)/(N*Nrel))
    
    return np.array(ranks)
