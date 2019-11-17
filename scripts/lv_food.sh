for photo_id in $(cat LV_food_photo.json)
do
  photo_name="${photo_id}.jpg"
  cp ./../yelp_photos/photos/${photo_name} ./../LV_photos
done
