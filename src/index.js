/**
 * @description requiring native Node modules
 */
const fs = require('fs'),
	rl = require("readline");

var	elements = process.argv; // processing command line inputs

/**
 * @description importing the parkingLot class
 */
var Parking = require('./modules/parkingLot.js'),
	parkingLot = new Parking();

// to avoid memory leaks errors, deafult max listeners = 10
require('events').EventEmitter.defaultMaxListeners = 0

// TODO: What if parking lot is not created
// TODO: Car with same numbers

if (elements[elements.length - 1] == 'true'){
    interact();
} 
else {
    fs.readFile(elements[2], 'utf-8', function (err, data) {
        var arr = data.split("\n");
           for (var i=0; i < arr.length; i++){
            commands(arr[i]);
           }
    });
}

/**
 * @description called when users want to interact via console
 */
function interact(){
    if(elements[elements.length - 1] == 'true'){
        var prompts = rl.createInterface({ input: process.stdin, output: process.stdout, terminal: false });
        
        prompts.question("Input: ", function (data) {
            commands(data);
        });
    }
}

/**
 * 
 * @param {String} input entered via console
 * @description driver function for different commands for entered by users
 * calls respective functions of ParkingLot class based on commands
 */
function commands(input){
	var n = input.split(" ")[0],
		slotNumber;
    switch (n) {
        case "create_parking_lot":
            totalParkings = parkingLot.createParkingLot(input);
            console.log("Created a parking lot with " + totalParkings  + " slots.");
            break;
        case "park":
            slotNumber = parkingLot.parkCar(input);
            if(slotNumber){
                console.log("Allocated slot number: " + slotNumber);
            }else{
                console.log("Sorry, parking lot is full");
            }
            break;
        case "leave":
            slotNumber = parkingLot.leaveCar(input);
            if(slotNumber){
                console.log("Slot number " + slotNumber + " is free.");
            }else{
                console.log("Sorry, parking lot is full");
            }
            break;
        case "status":
            var values = parkingLot.getParkingStatus();
            if(values.length > 1){
                console.log(values.join("\n"));
            }
            else{
                console.log("Sorry, parking lot is empty"); // what if it's empty
            }
            break;
        case "registration_numbers_for_cars_with_colour":
            var regNum = parkingLot.getCarsWithSameColor(input);
            if(regNum){
                console.log(regNum);
            }else{
                console.log("Sorry, Car with given color is not found");
            }
            break;
        case "slot_numbers_for_cars_with_colour":
            slotNumber = parkingLot.getSlotsWithSameColorCar(input);
            if(slotNumber){
                console.log(slotNumber);
            }
            else {
                console.log("Sorry, Car with given color is not found");
            }
            break;
        case "slot_number_for_registration_number":
            slotNumber = parkingLot.getSlotByCarNumber(input);
            if(slotNumber){
                console.log(slotNumber);
            } else {
                console.log("Sorry, Car with given registration number is not found");
            }
            break;
        case 'exit': 
			process.exit(0);
			break;
        default: 
            console.log(n, 'is not a recognized command');
            break;
    }
    interact();
}