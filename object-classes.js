/*
How to define a a class, constructor, properties, methods, getter, setter,
static methods and internal use mothods (convention)
*/ 

class Car {
    constructor(make, model) {
        this.make = make;
        this.model = model;
    }
    //Getter method
    get fullName() {
        return this._computeFullName();
    }
    
    //Setter method
    set fullName(value) {
        const nameParts =  value.split(Car._makeModelSeparator);
        this.make = nameParts[0];
        this.model = nameParts[1];
    }

    //Method used internally
    _computeFullName() {
        return this.make + Car._makeModelSeparator + this.model;        
    }

    //Static internal property
    static _makeModelSeparator = "-";

    //Static Property Getter
    static get MakeModelSeparator() {
        return Car._makeModelSeparator;
    }

    //Static Property Setter
    static set MakeModelSeparator(value) {
        //Best Practice: Always check user inputs for undefined first and then for null and others
        if (value != undefined && value != null && value.length == 1)
            Car._makeModelSeparator = value;
        else
            console.log("Separator must be a single character");
    }

}

//Test Code
var c = new Car("Maruti", "XL6");
console.log(c.fullName);
c.fullName = "Ford-Fiesta";
console.log(c.fullName);
console.log(c.make);
console.log(c.model);
console.log(Car.MakeModelSeparator);
Car.MakeModelSeparator = "|";
console.log(Car.MakeModelSeparator);
console.log (c.fullName);
Car.MakeModelSeparator = undefined;
console.log(Car.MakeModelSeparator);
console.log (c.fullName);

class FordMustang extends Car {
    constructor(MustangVariant) {
        super("Ford", "Mustang");
        //Add a new property sepecific to this class
        this.MustangVariant = MustangVariant;
    }

    //Override a derived method
    get fullName() {
        return super.fullName + FordMustang.MakeModelSeparator + this.MustangVariant
    }
}

var fordMustang =  new FordMustang("Shelby");
console.log(fordMustang.fullName);



//The code below re-writes the above functionality using Function Constructors
function Carf(make, model) {
    this.make = make;
    this.model = model;

    //Method used internally
    this._computeFullName = function() {
        return this.make + " " + this.model;        
    };

    //Add Property Getter / Setter inside constructor
    Object.defineProperties(this, {
        full: {
            //Getter Method
            get: function() {
                return this._computeFullName();
            },
            //Setter method
            set: function(value) {
                const nameParts =  value.split(" ");
                this.make = nameParts[0];
                this.model = nameParts[1];
            }
        }
    });
}
//Add Property Getter / Setter outside constructor
Object.defineProperty(Carf.prototype, "fullName", {
    //Getter method
    get: function() {
        return this._computeFullName();
    },
    //Setter method
    set: function(value) {
        const nameParts =  value.split(" ");
        this.make = nameParts[0];
        this.model = nameParts[1];
    }
});

var carf = new Carf("Maruti", "XL6");
console.log(carf.full);
console.log(carf.fullName);
carf.fullName = "Ford Fiesta";
console.log(carf.full);
console.log(carf.fullName);
carf.full = "Honda City";
console.log(carf.full);
console.log(carf.fullName);
