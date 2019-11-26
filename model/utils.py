import numpy as np
import cv2
import os.path as osp
from glob import glob
import matplotlib.pyplot as plt
from PIL import Image
from sklearn.metrics import confusion_matrix
import random

"""
return all gif frames as a Python list
"""
def load_gif(path):
    im = Image.open(path)
    n_frames = im.n_frames
    count = 0
    
    ret = []
    while count < n_frames:
        im.seek(count)
        imframe = im.copy()
        if count == 0:
            palette = imframe.getpalette()
        elif count <= n_frames // 2:
            imframe.putpalette(palette)
            
        # add the interesting frames
        ret.append(imframe)
        
        count = count+1
    return ret

def load_gif_gray(path):
    im = Image.open(path)
    ret = np.array(im.convert('L'))
    return ret

def load_gif_color(path):
    im = Image.open(path)
    return im

def get_image_directories(data_path, categories):
    return [osp.join(data_path, category) for category in categories]

def load_images(limit, path):
    """
    try to load paths for each category as much as limit_each_category
    """
    image_paths = []
    image_ids = []
 
    files = glob(osp.join(path, '*.jpg'))
    random.shuffle(files)
    files = files[:limit]
    image_paths.extend(files)
    
    image_ids = [osp.split(image_path)[-1].split('.')[0] for image_path in image_paths]
    
    return image_paths, image_ids

def load_agument_image_paths(agument_path, image_paths, bases):
    agument_paths = []
    agument_labels = []
    agument_ids = []
    for image_path in image_paths:
        category = osp.split(osp.split(image_path)[-2])[-1]
        image_name = osp.split(image_path)[-1]
        for base in bases:
            target_path = osp.join(agument_path, category, str(base) + '_' + image_name)
            if osp.exists(target_path):
                agument_paths.append(target_path)
                agument_labels.append(category)
                agument_ids.append(image_name.split('.')[0])
    return agument_paths, agument_labels, agument_ids

def show_results(train_image_paths, test_image_paths, train_labels, test_labels,
    categories, abbr_categories, predicted_categories):
  """
  shows the results
  :param train_image_paths:
  :param test_image_paths:
  :param train_labels:
  :param test_labels:
  :param categories:
  :param abbr_categories:
  :param predicted_categories:
  :return:
  """
  cat2idx = {cat: idx for idx, cat in enumerate(categories)}

  # confusion matrix
  y_true = [cat2idx[cat] for cat in test_labels]
  y_pred = [cat2idx[cat] for cat in predicted_categories]
  cm = confusion_matrix(y_true, y_pred)
  cm = cm.astype(np.float) / cm.sum(axis=1)[:, np.newaxis]
  acc = np.mean(np.diag(cm))
  print(cm)
  plt.figure()
  plt.imshow(cm, interpolation='nearest', cmap=plt.cm.get_cmap('jet'))
  plt.title('Confusion matrix. Mean of diagonal = {:4.2f}%'.format(acc*100))
  tick_marks = np.arange(len(categories))
  plt.tight_layout()
  plt.xticks(tick_marks, abbr_categories, rotation=45)
  plt.yticks(tick_marks, categories)