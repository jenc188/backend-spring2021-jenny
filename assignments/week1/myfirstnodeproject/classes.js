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
        console.log("New Object");
        this.position = position;
        this.location = school;
        this.active = false;
        this.firstName = firstName;
        this.lastName = lastName;
        this.checkValues();
    }

    checkValues() {
        if (!(typeof this.active === "boolean")) {
            console.log("This object has an improper active value!");
        }
    }

    doStudy(hours) {
        console.log(`${this.firstName} studies for ${hours} hours.`);
        // console.log(this.firstName + " studies for " + hours + " hours.");
    }

    goToSleep(hours) {
        console.log(`${this.firstName} goes to sleep for ${hours} hours`);
         // console.log(this.firstName + " goes to sleep for " + hours + " hours.")
    }
}
let myFirstSchoolObject = new Student("Summer", "Time", "Undergraduated_Student", "CCSF");
let secondStudent = new Student("Cool", "Friend", "Research_Student", "UCSF");

myFirstSchoolObject.doStudy(25);
secondStudent.doStudy(5);

custommadeObject.doStudy();

let thirdStudent = new Student("June", "Summer", "Graduate_Student", "UC_Berkeley");

thirdStudent.doStudy(12);

secondStudent.goToSleep(7);

secondStudent.checkValues();

let myNumber = 99;

let myString = "9812huyrr"+ myNumber + "yfrddjm2";

// let myMultiLineString = "fdslkjflk\n
// klsjflksdjf
// lk;sdjfskdlf

// osdklfjs";
let myStringLiteral = `Hello my name is ${ thirdStudent.firstName }, how are you doing today?`;

console.log(myStringLiteral);

console.log(myFirstSchoolObject, secondStudent, thirdStudent);
