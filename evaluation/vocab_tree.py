import cv2, time as t, os, math, operator, re, sys
import numpy as np
from sklearn.cluster import KMeans, MiniBatchKMeans
import cyvlfeat as vlfeat
import pickle
from utils import *

#------------------------------------------------------------------------------------------------------------
nodes = {}# List of nodes (list of SIFT descriptors)
nodeIndex = 0# Index of the last node for which subtree was constructed
tree = {}# A dictionary in the format - node: [child1, child2, ..]
branches = 10# The branching factor in the vocabulary tree
leafClusterSize = 20# Minimum size of the leaf cluster
imagesInLeaves = {}# Dictionary in the format - leafID: [img1:freq, img2:freq, ..]
doc = {}# All image dictionary in the format - imag: {leafID: weight}
bestN = 4#
maxDepth = 5
avgDepth = 0

model =  MiniBatchKMeans(n_clusters=branches)	# The KMeans Clustering Model
sift = vlfeat.sift.dsift # SIFT Feature extractor model
leafClusterSize = 2*branches

# Function to construct the vocabulary tree
def constructTree(node, featuresIDs, depth, features):
	global nodeIndex, nodes, tree, imagesInLeaves, avgDepth
	tree[node] = []
	if len(featuresIDs) >= leafClusterSize and depth < maxDepth:
		# Here we will fetch the cluster from the indices and then use it to fit the kmeans
		# And then just after that we will delete the cluster
		# Using the array of indices instead of cluster themselves will reduce the memory usage by 128 times :)
		model.fit([features[i] for i in featuresIDs])
		childFeatureIDs = [[] for i in range(branches)]
		for i in range(len(featuresIDs)):
			childFeatureIDs[model.labels_[i]].append(featuresIDs[i])
		for i in range(branches):
			nodeIndex = nodeIndex + 1
			nodes[nodeIndex] = model.cluster_centers_[i]
			tree[node].append(nodeIndex)
			constructTree(nodeIndex, childFeatureIDs[i], depth + 1, features)
	else:
		imagesInLeaves[node] = {}
		avgDepth = avgDepth + depth

# Function to lookup a SIFT descriptor in the vocabulary tree, returns a leaf cluster
def lookup(descriptor, node):
	D = float("inf")
	goto = None
	for child in tree[node]:
		dist = np.linalg.norm([nodes[child] - descriptor])
		if D > dist:
			D = dist
			goto = child
	if tree[goto] == []:
		return goto
	return lookup(descriptor, goto)

# Constructs the inverted file frequency index
def tfidf(filename):
	global imagesInLeaves
	img = load_gif_gray(filename)
	frames, descriptors = sift(img, fast=True, step=5)
	for d in descriptors:
		leafID = lookup(d, 0)
		if filename in imagesInLeaves[leafID]:
			imagesInLeaves[leafID][filename] += 1
		else:
			imagesInLeaves[leafID][filename] = 1
	del frames, descriptors

# This function returns the weight of a leaf node
def weight(leafID, N, imagesInLeaves):
	return math.log1p(N/1.0*len(imagesInLeaves[leafID]))

# Returns the scores of the images in the dataset
def getScores(q, N, dataset_paths):
	scores = {}
	curr = [float("inf"),float("inf"),float("inf"),float("inf") ]
	currimg = ["","","",""]
	for img in dataset_paths:
		scores[img] = 0
		for leafID in imagesInLeaves:
			if leafID in doc[img] and leafID in q:
				scores[img] += math.fabs(q[leafID] - doc[img][leafID])
			elif leafID in q and leafID not in doc[img]:
				scores[img] += math.fabs(q[leafID])
			elif leafID not in q and leafID in doc[img]:
				scores[img] += math.fabs(doc[img][leafID])
			if scores[img] > curr[-1]:
				break
		if scores[img] <= curr[0]:
			currimg[3], curr[3] = currimg[2], curr[2]
			currimg[2], curr[2] = currimg[1], curr[1]
			currimg[1], curr[1] = currimg[0], curr[0]
			currimg[0], curr[0] = img, scores[img]
		elif scores[img] > curr[0] and scores[img] <= curr[1]:
			currimg[3], curr[3] = currimg[2], curr[2]
			currimg[2], curr[2] = currimg[1], curr[1]
			currimg[1], curr[1] = img, scores[img]
		elif scores[img] > curr[1] and scores[img] <= curr[2]:
			currimg[3], curr[3] = currimg[2], curr[2]
			currimg[2], curr[2] = img, scores[img]
		elif scores[img] > curr[2] and scores[img] <= curr[3]:
			currimg[3], curr[3] = img, scores[img]
	return currimg

# Return the bestN best matches
def findBest(scores, bestN):
	sorted_scores = sorted(scores.items(), key = operator.itemgetter(1))
	return sorted_scores[:bestN]

def accuracy(F, M1, M2, M3, M4):
	a = [0,0,0,0]
	group = int(F/4)
	if int(M1/4) == group:
		a[0] = 1
	if int(M2/4) == group:
		a[1] = 1
	if int(M3/4) == group:
		a[2] = 1
	if int(M4/4) == group:
		a[3] = 1
	return np.array(a)

# Finds 4 best matches for the query
def match(filename, N, dataset_paths):
	global imagesInLeaves
	# q is the frequency of this image appearing in each of the leaf nodes
	q = {}
	img = load_gif_gray(filename)
	kp, des = sift(img, fast=True, step=5)
	for d in des:
		leafID = lookup(d, 0)
		if leafID in q:
			q[leafID] += 1
		else:
			q[leafID] = 1
	s = 0.0
	for key in q:
		q[key] = q[key]*weight(key, N, imagesInLeaves)
		s += q[key]
	for key in q:
		q[key] = q[key]/s
	return getScores(q, N, dataset_paths)

def getImgID(s):
	return int((re.findall("\d+", s))[0])