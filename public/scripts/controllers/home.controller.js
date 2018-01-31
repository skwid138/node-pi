/*jshint esversion: 6 */

/*
This controller is for the home view.
- displays 
*/
myApp.controller('HomeController', function (  ) {
    console.log('in HomeController');
    const vm = this;

        //load socket.io-client and connect to the host that serves the page
        vm.socket = io();


        vm.lightSwitch = () => {
            console.log('in lightSwitch');

            //send button status to server (as 1 or 0)
            vm.socket.emit("light", Number(vm.light));
        }; // end lightSwitch
            
    

        //get button status from client
        vm.socket.on('light', function (data) {
            console.log('in socket.on', data);

            // if socket is on, set switch to on, otherwise set to off
            (data == 1) ? vm.light = true : vm.light = false;

            //send push button status to back to server
            vm.socket.emit("light", data);
        }); // end socket.on


        /************* On Page Load ****************/

        vm.lightSwitch();


}); // end HomeController