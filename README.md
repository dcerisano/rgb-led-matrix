# rgb-led-matrix

![alt_text](https://dcerisano.github.io/assets/img/rgb_led_matrix.png)  
  
* For RGB devices (matrix and strip) 
* Windows, Linux, or Mac

#### Currently supported
* [BlinkStick](https://www.blinkstick.com) RGB device (64 LEDS per channel)
#### Planned
* [FIRMATA](https://www.arduino.cc/en/Reference/Firmata) compatible devices (192 LEDs per channel)
* [IC2BACKPACK](https://github.com/ajfisher/node-pixel) compatible devices (500 LEDs per channel)
---
### Minimum Requirements
* Node v8.9.3

### Instructions
* `npm install rgb_led_matrix`  
* Run the [`server`](https://github.com/dcerisano/rgb-led-matrix/blob/master/webserver/server.js) as root/adminstrator: `node server.js`   
* Hit the REST API for the example shaders:  
[cpu-meter](http://localhost:8080/?shader=cpu_meter) 
[notifier](http://localhost:8080/?shader=notifier&filename=vrip.jpg) 
[fireplace](http://localhost:8080/?shader=fireplace) 
[unicorn](http://localhost:8080/?shader=unicorn) 
[timesquare](http://localhost:8080/?shader=timesquare) 
[aurora](http://localhost:8080/?shader=aurora)

### Notes and suggestions
* Configure any size of RGB strip as an Nx1 matrix
* Autostart the server and send it RGB notifications from anywhere (IoT, email, etc)

### TO DO
* More devices!
