from flask import Flask
from flask_restful import Resource, Api, request
import base64
from PIL import Image
from io import BytesIO

app = Flask(__name__)
api = Api(app)


class ImageQuery(Resource):
    model = new Model()
    
    def get(self):
        return 'hello world'
        # data = request.json
        # img_data = base64.b64decode(data['image'])
        # image = Image.open(BytesIO(img_data))
        # image.show()

        # return "hello word"
        # # buffered = BytesIO()
        # # output_image.save(buffered, format="PNG")
        # # output_image_data = base64.b64encode(buffered.getvalue())

        # # return {'image': output_image_data.decode('ascii')}, 201


api.add_resource(ImageQuery, '/')


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)