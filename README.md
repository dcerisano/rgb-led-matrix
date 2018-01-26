# rgb-led-matrix

![alt_text](https://dcerisano.github.io/assets/img/rgb_led_matrix.png)  
  
* Universal cross-platform 60fps streaming for RGB devices (matrix and strip) 
* Graphics pipeline design allows user-defined shaders  
* [Ambilight](https://www.philips.co.uk/c-m-so/televisions/p/ambilight) display shader example included
* Windows, Linux, or Mac

#### Currently supported
* [BlinkStick](https://www.blinkstick.com) RGB device (64 LEDS per channel)
#### Planned
* [FIRMATA](https://www.arduino.cc/en/Reference/Firmata) compatible devices (192 LEDs per channel)
* [IC2BACKPACK](https://github.com/ajfisher/node-pixel) compatible devices (500 LEDs per channel)
* [STEELSERIES GAMESENSE™](http://developer.steelseries.com/gamesense) SDK
---
### Minimum Requirements
* Node v8.9.3

### Instructions
* `npm install rgb_led_matrix`  
* Run the [`server`](https://github.com/dcerisano/rgb-led-matrix/blob/master/webserver/server.js) as root/adminstrator: `node server.js`   
* Browse to the online [web studio](https://standard3d.com/rgb-led-matrix) (WIP)  
* Or hit the REST API for the example shaders:  
[amblight](http://localhost:8080/?shader=ambilight) 
[cpu-meter](http://localhost:8080/?shader=cpu_meter) 
[notifier](http://localhost:8080/?shader=notifier&filename=vrip.jpg) 
[fireplace](http://localhost:8080/?shader=fireplace) 
[unicorn](http://localhost:8080/?shader=unicorn) 
[timesquare](http://localhost:8080/?shader=timesquare) 
[aurora](http://localhost:8080/?shader=aurora)

### Notes and suggestions
* Configure any size of RGB strip as an Nx1 matrix
* Develop your own shaders
* Autostart the server and send it RGB notifications from anywhere (IoT, email, etc)
* Give any object (models, artwork, etc) new personality and purpose with real-time lighting
* Run the online RGB Emulator Matrix (REM) in fullscreen to develop shaders on the go

### TO DO
* Shader layers
* More devices!

### DONE
* Concurrent device support
* Web based RGB Emulator Matrix (REM) for testing