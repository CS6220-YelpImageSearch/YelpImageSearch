from flask import Flask
from flask_restful import Resource, Api, request
import base64
from PIL import Image
from io import BytesIO
from CNNModel import CNNModel
import re

app = Flask(__name__)
api = Api(app)
model = None

class ImageQuery(Resource):
    
    def post(self):
        data = request.form
        data = re.sub('^data:image/.+;base64,', '', data['image'])
        img_data = base64.b64decode(data)
        image = Image.open(BytesIO(img_data))

        ret = model.query_image(image)
        # encode
        ret = [r.decode('UTF-8').split('.')[0] for r in ret]
        return ret, 200


api.add_resource(ImageQuery, '/')


if __name__ == '__main__':
    model = CNNModel()
    app.run(host="0.0.0.0", port=5000, debug=True)
