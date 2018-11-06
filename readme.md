## Node Pi - Running Node.js on Raspberry Pi 3

This project will likely change many times, but for now the plan will be to use the pi to manipulate hardware components **OR** as a little node box to serve up something to a client (React).

### OS Setup
* [Download NOOBS](https://www.raspberrypi.org/downloads/)
* Format the SD card
	* Mac [SD Association's Formatting Tool](https://www.sdcard.org/downloads/formatter_4/)
		* Select the drive
		* Choose **Overwrite format**
	* Windows [SD Association's Formatting Tool](https://www.sdcard.org/downloads/formatter_4/)
	* Linux [Check Out These Instructions](http://qdosmsq.dunbar-it.co.uk/blog/2013/06/noobs-for-raspberry-pi/)
*  Copy NOOBS to the formated drive (if it unzips into a directory exclude that and onyl copy it's contents)
*  Put the SD card in the Pi and boot it up, choose Raspbian and let it install
*  Open terminal and run `sudo apt-get update`
*  Then run `sudo apt-get upgrade`

### Overclocking
[This is a very thorough guide](https://github.com/RetroPie/RetroPie-Setup/wiki/Overclocking)

Note: It is a good idea to make a backup copy of config.txt before making any changes.

* Open terminal and enter `sudo nano /boot/config.txt` (this opens the config file in the command line editor)
* find `arm_freq`, remove the # and update it from 800 to 1250 (or higher)
* move to the bottom of the file and add
> `total_mem=1024`
> `gpu_freq=500`
> `core_freq=500`
> `sdram_freq=500`
> `sdram_schmoo=0x02000020`
> `over_voltage=2`
> `sdram_over_voltage=2`

* Once you're finsihed `ctrl x` to close the editor
* Then press `y` to save your changes and `Enter` to close nano
* type `sudo reboot` to restart the Pi

Note: if it does not restart use the backup copy of config.txt and then try again with lower settings

### Node.js Setup
[Great Guide](http://weworkweplay.com/play/raspberry-pi-nodejs/)

* Open Terminal and run.`wget http://node-arm.herokuapp.com/node_latest_armhf.deb` to download Node.js
*  Then run `sudo dpkg -i node_latest_armhf.deb` to install node
*  Next `sudo apt-get install npm` to install NPM


## DHT11

Temperature and Humidity capturing device

### Perquisites

#### [bcm2835 C Library](http://www.airspayce.com/mikem/bcm2835/)

  - [Download the latest version](http://www.airspayce.com/mikem/bcm2835/bcm2835-1.57.tar.gz)
  - `cd ~/Downloads`
  - `tar zxvf bcm2835-1.xx.tar.gz`
  - `mv bcm2835-1.xx ~/Public`
  - `cd ~/Public/bcm2835-1.xx`
  - `./configure`
  - `make`
  - `sudo make check`
  - `sudo make install`
  - `npm install node-dht-sensor`

  ## Helpful Commands

  Update Package Lists - `sudo apt-get update`

  Upgrade Packages - `sudo apt-get upgrade`

  Clean up Packages - `sudo apt-get clean`

  Remove unused Packages - `sudo apt autoremove`

  Update OS - `sudo apt-get dist-upgrade`

  Raspberry Pi config - `sudo raspi-config`

  Shutdown  - `sudo halt`

  Reboot - `sudo reboot`