import base64
import json

def encode_image(photo_id):
  img_path = "./../data/yelp_photos/photos/" + photo_id + ".jpg"
  with open(img_path, "rb") as image_file:
      encoded_string = base64.b64encode(image_file.read())
  return encoded_string

def create_photo_from_json(filename):
  data = []
  with open(filename, 'r') as f:
    for line in f:
      photo = json.loads(line)
      del photo['_id']
      photo["imageBase64"] = encode_image(photo["photo_id"]).decode('ascii')
      data.append(photo)
  return data

def create_photo_from_txt(filename):
  data = []
  with open(filename, 'r') as f:
    for line in f:
      photo_id = line.rstrip('\n').rstrip('\r')
      data.append({"photo_id": photo_id, "imageBase64": encode_image(photo_id).decode('ascii')})
  return data

if __name__ == "__main__":
  print("create Las Vegas food photo image json for loading to mongoDB")
  photos = create_photo_from_txt("LV_food_photo.json")
  with open('./../data/yelp_dataset/LVImageBase64.json', 'w') as fout:
    json.dump(photos, fout)

