from flask import Flask, json, request
from flask_cors import CORS
import board
import time
import neopixel
import os

# A1 (First bundle) (Zero indexed) - 100 total - 0 to 99
#
pixels = neopixel.NeoPixel(board.D18, 200, brightness=0.9)
pixels.fill((0, 0, 0))

# Make each LED light up in a row
# for i in range(0, 100):
# 	pixels.fill((0, 0, 0))
# 	pixels[i] = (255,0,0)
# 	time.sleep(.05)

pixels.fill((0, 0, 0))

api = Flask(__name__)
CORS(api)

@api.route('/sync', methods=['POST'])
def sync():
	print(request.json['holds'])
	pixels.fill((0, 0, 0))
	for i in request.json['holds']:
		pixels[i] = (255, 0, 0)
	return json.dumps(True)

@api.route('/shutdown', methods=['POST'])
def shutdown():
	pixels.fill((0, 0, 0))
	os.system("shutdown now")

if __name__ == '__main__':
	api.run(host='0.0.0.0')
