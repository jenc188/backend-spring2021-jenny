// A class is a "blueprint" for making objects
class Vehicle {
// The constructor method, is the function that runs whenever a new object is built.
    constructor(make, model, year, mileageMiles, topSpeedMPH){
        this.make = make;
        this.model = model;
        if (typeof year !="number"){
            console.log("The year value should be a number! Please check your value.")
        }
        this.year = year;
        this.mileageMiles = mileageMiles;
        this.topSpeedMPH = topSpeedMPH;
    }
// You can have your own custom methods in your classes. These will be given to ALL objects built by this class.
    service () {
        console.log("Fixing vehicle");
    }

}
// You can further "customize" a class by extending it. The class bicycled is based off of the vehicle class.
class Bicycle extends Vehicle {
    constructor(make, model, year, type, mileageMiles, serial, gears){
    // The super call is running the PARENT's constructor class and making object from the parent. MUST be first in your current constructor.
    super(make, model, year, mileageMiles, null);
    // Once the parent object is built, we add more stuff to it, to make it a "Bicycle" object.
    this.type = type;
    this.serial = serial;
    this.gears = gears;
    }
    // Overriding is where you replace the parent's method with the child's method. Only happens when both methods have the same name.
    service() {
        console.log("Fixing bicycle");
    }

}

class ElectricBicycle extends Bicycle {
    constructor(make, model, year, type, mileageMiles, serial, gears, kWh, topSpeedMPH) {
        super(make, model, year, type, mileageMiles, serial, gears);
        this.kWh = kWh;
        this.topSpeedMPH = topSpeedMPH;
    }
    service() {
        console.log("Fixing ebike");
    }
}

class ElectricCar extends Vehicle {
    constructor(make, model, year, type, empg, mileageMiles, kWh, topSpeedMPH, vin ) {
        super(make, model, year, mileageMiles, topSpeedMPH);
    // The electric car adds these properties, because only the electric car can have these.
        this.type = type;
        this.empg = empg;
        this.kWh = kWh;
        this.vin = vin;
        this.currentCharge;
    }
}

class Car extends Vehicle {
    constructor(make, model, year, type, mpg, mileageMiles, tankSizeGallons, topSpeedMPH, vin) {
        super(make, model, year, mileageMiles, topSpeedMPH);
        // The car class has these properties, because only the car can have these properties.
        this.type = type;
        this.mpg = mpg;
        this.vin = vin;
        this.tankSizeGallons = tankSizeGallons;
        this.currentFuel = tankSizeGallons;
    }

    travel(miles) {

        // figures out how much fuel we will use based on how far we want to go.
        let fuelUsage = miles / this.mpg;

        // tests if we try to go farther than what our current gas tank will allow us to go.
        if (miles > this.currentFuel * this.mpg) {
            console.log(`Cannot go that far! Traveled ${this.currentFuel * this.mpg} miles instead. Unfortunately the fuel tank is empty now`);

            // Because we can't go as far as requested, we will go as far as the tank allows us to go.
            fuelUsage = this.currentFuel;
            miles = this.currentFuel * this.mpg;
        }

        // modify the current fuel value and the total mileage of this vehicle.
        this.currentFuel = this.currentFuel - fuelUsage;
        this.mileageMiles = this.mileageMiles + miles;

        console.log(`${this.make} ${this.model} goes on a ${miles} mile trip!}`);
    }

    refuel(gallons){

        //Detect how much free space we have in the gas tank.
        let freeSpace = this.tankSizeGallons - this.currentFuel;

        // test if we are trying to fill more than the free space.
        if(gallons > freeSpace) {
            console.log(`Thats too much fuel! Topped out the car tank instead! ${this.make} ${this.model} was filled with ${freeSpace} gallons of gas.`);

            // replace the requested amount with the maximum amount we can add.
            gallons = freeSpace;
        }
        // Update the vehicle's current fuel.
        this.currentFuel = this.currentFuel + gallons;
        console.log(`${this.make} ${this.model} was refueled with ${gallons} gallons of gas.`);
    } 

// Getters and setters are methods that allows us to quickly modify properties without directly modifying. 
    getFuel() {
    console.log(`${this.make + " " + this.model} has ${this.currentFuel} gallons of gas.`); 
    }
}

let car1 = new Car("Honda", "Accord", 2010, "sedan", 35, 110000, 14, 120, "ugjhhkhhiugyft655v");

let car2 = new ElectricCar("Tesla", "S", "2021", "sedan", 112, 50, 80, 155, "dchchgg6t8iff4");

let bicycle1 = new Bicycle("Schwinn", "Stingray", 2003, "cruiser", 20000, "yftf56643308", 8);

let bicycle2 = new ElectricBicycle("Kona", "Unit", 2014, "mountain", 1000, "tyfdse437fddjknn", 11, 1.4, 55);

// console.log(car1, car2, bicycle1, bicycle2);

// bicycle1.service();
// bicycle2.service();
// car1.service();
// car2.service();

console.log(car1);

car1.travel(1000000);

console.log(car1);

car1.refuel(1000);

car1.travel(140);

console.log(car1);

car1.refuel(2);

console.log(car1);

let car3 = new Car("Kia", "Sorento", 2011, "SUV", 30, 135000, 18, 110, "ftcedrryfhgv53");

car3.travel(198);
car3.getFuel();
car3.travel(20);
car3.getFuel();
car3.refuel(5);
car3.getFuel();
car3.service();

// Bad idea to directly modify properties, use methods/getter/setters instead.
// car3.currentFuel = 1000;