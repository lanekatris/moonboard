import board
import time
import neopixel
#
pixels = neopixel.NeoPixel(board.D18, 100, brightness=0.9)
pixels.fill((0, 0, 0))

# pixels[30] = (255, 0, 0)
#
# pixels[80] = (255, 0, 0)
#
# pixels[5] = (255, 0, 0)
#
# pixels[22] = (0, 255, 0)

pixels.fill((255,0,0))

# Make each LED light up in a row
# for i in range(0, 100):
# 	# print(i)
#
# 	pixels.fill((0, 0, 0))
# 	pixels[i] = (255,0,0)
# 	time.sleep(.05)
