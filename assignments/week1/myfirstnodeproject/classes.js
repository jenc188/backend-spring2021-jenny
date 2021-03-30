let firstName = "Kim";

let custommadeObject = {
    firstName: "Hawaii",
    lastName: "Fun",
    position: "Student",
    location: "San Francisco",
    active: true,
    doStudy: function () {
        console.log(this.firstName + "is now studying!");
    }
};

class Student {
    constructor(firstName, lastName, position, school) {
        this.position = position;
        this.location = school;
        this.active = false;
        this.firstName = firstName;
        this.lastName = lastName;
        this.energyHours = 16; // hours of energy
        this.checkValues();
        this.sayHello();
    }

    checkValues() {
        if (!(typeof this.active === "boolean")) {
            console.log("This object has an improper value for the active property!");
        }

        if (this.energyHours < 0){
            this.energyHours = 0;
        } else if (this.energyHours > 24){
            this.energyHours = 24;
        }

    }

    sayHello() {
        console.log(`Hello! My name is ${this.firstName}. I am ${this.position} at ${this.location}. How are you doing?`)
    }


    doStudy(hours) {
        if ( !( Number.isNaN( parseInt(hours) ) ) ) {
            hours = parseInt(hours);
        } else if (typeof hours != "number") {
            console.log("The value for hours is not valid! Can't assign study time.");
            return;
        }

        if (this.energyHours - hours < 0) {
            console.log(`${this.firstName} does not have that much energy! They will study for ${this.energyHours} hours instead.`);

            hours = this.energyHours;
            this.energyHours = 0;

        } else {
            // this.energyHours -= hours; same as the line below.
            this.energyHours = this.energyHours - hours;
        }

        console.log(`${this.firstName} study for ${hours} hours. They have ${this.energyHours} hours left of energy.`);
        // console.log(this.firstName + " studies for " + hours + " hours.");
    }

    goToSleep(hours) {

         if ( !( Number.isNaN( parseInt(hours) ) ) ) {
            hours = parseInt(hours);
        } else if (typeof hours != "number") {
            console.log("The value for hours is not valid! Can't assign sleep time.");
            return;
        }

        if (hours + this.energyHours > 24) {
            let maxSleepHours = 24 - this.energyHours;
            console.log(`${this.firstName} does not need to sleep for that long! They will sleep for instead ${maxSleepHours} hours`);

            hours = maxSleepHours;
        }

        this.energyHours = this.energyHours + hours;
        console.log(`${this.firstName} goes to sleep for ${hours} hours. They have ${this.energyHours} hours left of energy.`);
        // console.log(this.firstName + " goes to sleep for " + hours + " hours.")
    }
}

let myFirstSchoolObject = new Student("Summer", "Time", "Undergraduated_Student", "CCSF");
let secondStudent = new Student("Cool", "Friend", "Research_Student", "UCSF");

myFirstSchoolObject.doStudy(25);

secondStudent.doStudy("50");

//custommadeObject.doStudy();

let thirdStudent = new Student("June", "Summer", "Graduate_Student", "UC_Berkeley");

thirdStudent.doStudy(12);

secondStudent.goToSleep(7);

// secondStudent.checkValues();

// let myNumber = 99;

// let myString = "9812huyrr"+ myNumber + "yfrddjm2";

// let myMultiLineString = "fdslkjflk\n
// klsjflksdjf
// lk;sdjfskdlf

//  osdklfjs";
// let myStringLiteral = `Hello my name is ${ thirdStudent.firstName }, how are you doing today?`;

// console.log(myStringLiteral);

// console.log(myFirstSchoolObject, secondStudent, thirdStudent);
