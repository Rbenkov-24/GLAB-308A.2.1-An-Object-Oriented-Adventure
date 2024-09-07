//===================Part 1: Humble Beginnings=====================
// define the adventurer object
//this structure represents nested objects. each object have its own properties including other objects inside it 
const adventurer = { //first object representing Robin
    name: "Robin",
    health: 10,
    inventory: ["sword", "potion", "artifact"], //adventurer items 
    companion: { //second object representing Leo
        name: "Leo",
        type: "Cat",
        companion: { //third object representing Frank
            name: "Frank",
            type: "Flea",
            belongings: ["small hat", "sunglasses"]
        }
    },
    // Method to roll a dice
    roll(mod = 0) {
        const result = Math.floor(Math.random() * 20) + 1 + mod;//generate a random number between 1 and 20
        console.log(`${this.name} rolled a ${result}.`);
    }
};

// Log each item in Robin's inventory
//iterate over each item in the inventory array of the adventurer object and print each item to the console
//forEach loops through each element in the inventory array
//arrow function used as a callback for forEach
adventurer.inventory.forEach(item => { 
    console.log(item);
});

// test the roll method
//roll method is a function defined inside the adventurer object
//it generates random a random number and optionally adjusts it by a modifier before displating the result
adventurer.roll();
adventurer.roll(2); //2 is the modifier that it is added to the random number from the dice roll method



//===================Part 2: Base Character Class=====================
// define the base Character class
//'this.' refers to the current object instance of the character class
class Character { // defining a new class called Character (parent class)
    constructor(name) { //construcxtor is a method that is called when a new instance of the class is created
        this.name = name; //inherited by adventurer
        this.health = Character.MAX_HEALTH;   //inherited by cdventurer             
        this.inventory = [];
    }

    // method to roll a dice with an optional modifier
    //math.random generate random number between 0 and 19
    //math.floor rounds down the number to the nearest integer
    roll(mod = 0) { //inherited method from character
        const result = Math.floor(Math.random() * 20) + 1 + mod;
        console.log(`${this.name} rolled a ${result}.`);
        return result; // return the result of the roll
    }

    static MAX_HEALTH = 100; // static property belongs to the class
}

//===================Part 3: Adventurer Class=====================
// define the adventurer class that extends Character
// adventurer class inherits properties and methods from character class
class Adventurer extends Character { //child class of character
    constructor(name, role) {
        super(name); // call the parent class constructor
        this.role = role; // role of the adventurer (fighter, healer)
        this.inventory.push("bedroll", "50 gold coins"); // add starting items to inventory

        // check if the given role is valid
        if (!Adventurer.ROLES.includes(role)) {
            throw new Error(`${role} is not a valid role.`);
        }
    }

    // method for the adventurer to scout ahead
    //scout is a custom method created for the adventurer to print a message and generate a random number
    scout() {
        console.log(`${this.name} is scouting ahead...`);
        super.roll(); // call the roll method from Character
    }

    // method for dueling another adventurer
    //duel() is another custom method makes two adventurers fight by generating random numbers and determining the winner based on those numbers
    duel(opponent) {
        console.log(`${this.name} challenges ${opponent.name} to a duel!`);

        // continue duel until one adventurer's health drops to 50 or below
        while (this.health > 50 && opponent.health > 50) {
            const myRoll = this.roll(); 
            const opponentRoll = opponent.roll(); 

            // compare rolls and adjust health
            if (myRoll < opponentRoll) {
                this.health -= 1; 
            } else if (myRoll > opponentRoll) {
                opponent.health -= 1; 
            }

            
            console.log(`${this.name} rolled ${myRoll}, ${opponent.name} rolled ${opponentRoll}.`);
            console.log(`${this.name}'s health: ${this.health}, ${opponent.name}'s health: ${opponent.health}`);
        }

        //log the winner of the duel
        if (this.health > 50) {
            console.log(`${this.name} wins the duel!`);
        } else {
            console.log(`${opponent.name} wins the duel!`);
        }
    }

    static ROLES = ["Fighter", "Healer", "Wizard"]; 
}


//===================Part 4: Companion Class=====================
// define the companion class that extends Character
//child class of character. inherits properties and methods from character class
class Companion extends Character {
    constructor(name, type) {
        super(name); //calls the constructor of the parent class character
        this.type = type; 
    }
}


//===================Part 5: Gather your Party===========================
// define the adventurerFactory class
//'AdventurerFactory' manages and interact with adventurers members 
//the methods generate(), findByIndex(), and findByName() are not built-in JavaScript methods
class AdventurerFactory { 
    constructor(role) {
        this.role = role; 
        this.adventurers = []; 
    }

    generate(name) {
        const newAdventurer = new Adventurer(name, this.role); //to create and add new adventurers
        this.adventurers.push(newAdventurer); // add to list
        return newAdventurer; //return the created adventurer
    }

    findByIndex(index) { //to find an adventurer by its position in the list
        return this.adventurers[index]; //return the adventurer at the given index
    }

    findByName(name) { //to search for an adventurer by name in the list
        return this.adventurers.find(a => a.name === name); //find and return the adventurer with the given name
    }
}


const healers = new AdventurerFactory("Healer");//creates a factory for making healer adventurers


const robin = healers.generate("Robin");//creates a healer named robin using the factory


const leo = new Adventurer("Leo", "Healer");//creates another healer named leo
robin.duel(leo); //starts a duel btw robin and leo




//===================Part 6: Additional Methods or Enhancements=====================

// Define additional methods for the Character class or other functionalities
/**
 * 
 * inheritance: prototype allows objects to inherit properties and methods from other objects
 * shared Methods: Methods added to the prototype are available to all instances of the constructor
 * prototype vs extend(class inheritance):
Prototype

	•	Purpose: Adds methods and properties to all objects created by a constructor.
	•	Usage: Modify the prototype of a constructor to share functionality among instances.

Extend

	•	Purpose: Allows a class to inherit and build upon the properties and methods of another class.
	•	Usage: Use extends to create a subclass with inherited and additional features.
 */

Character.prototype.heal = function(amount) {
    this.health = Math.min(this.health + amount, Character.MAX_HEALTH);
    console.log(`${this.name} heals for ${amount}. Current health: ${this.health}.`);
};

//checks if the character is alive or not and returns true (boolean value) if character jealth is greater than 0 else false
Character.prototype.isAlive = function() {
    return this.health > 0;
};

Adventurer.prototype.enhancedDuel = function(opponent) {
    console.log(`${this.name} challenges ${opponent.name} to an enhanced duel!`);

  
    while (this.isAlive() && opponent.isAlive()) { //continue the fight as long as the adventurer and opponent live above 0
        const myRoll = this.roll(); 
        const opponentRoll = opponent.roll(); 

        
        if (myRoll < opponentRoll) {
            this.health -= 2; 
        } else if (myRoll > opponentRoll) {
            opponent.health -= 2; 
        }

   
        console.log(`${this.name} rolled ${myRoll}, ${opponent.name} rolled ${opponentRoll}.`);
        console.log(`${this.name}'s health: ${this.health}, ${opponent.name}'s health: ${opponent.health}`);
    }

   
    if (this.isAlive()) {
        console.log(`${this.name} wins the enhanced duel!`);
    } else {
        console.log(`${opponent.name} wins the enhanced duel!`);
    }
};

//creating two adventurers and assigning them a role
const adventurer1 = new Adventurer("Aragorn", "Fighter"); 

const adventurer2 = new Adventurer("Gandalf", "Wizard");

adventurer1.heal(10); 
adventurer2.enhancedDuel(adventurer1); 