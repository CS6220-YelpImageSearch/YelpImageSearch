for photo_id in $(cat LV_food_photo.json)
do
  photo_name="${photo_id}.jpg"
  cp ./../data/yelp_photos/photos/${photo_name} ./../data/LV_photos
done
