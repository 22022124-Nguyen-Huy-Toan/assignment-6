"use strict";
// ========================================
// 4. CLASSES VÀ OOP
// ========================================
console.log("=== SECTION 4: CLASSES & OOP ===\n");
// Bài 1: Class 'Animal' với private property
console.log("Bài 1: Class Animal với private property");
class Animal {
    constructor(name) {
        this.name = name;
    }
    speak() {
        console.log(`Animal ${this.name} makes a sound`);
    }
    // Getter để access private property từ bên ngoài
    getName() {
        return this.name;
    }
    // Protected method - subclasses có thể access
    makeSound(sound) {
        console.log(`${this.name} says: ${sound}`);
    }
}
// Test Animal class
const animal = new Animal("Generic Animal");
animal.speak();
console.log("Animal name:", animal.getName());
// console.log(animal.name); // ❌ Error: Property 'name' is private
// Bài 2: Class 'Cat' kế thừa 'Animal'
console.log("\nBài 2: Class Cat kế thừa Animal");
class Cat extends Animal {
    constructor(name, breed) {
        super(name); // gọi constructor của parent class
        this.breed = breed;
    }
    // Override method từ parent class
    speak() {
        this.makeSound("Meow"); // có thể access protected method
    }
    // Method riêng của Cat
    purr() {
        console.log(`${this.getName()} is purring...`);
    }
    getBreed() {
        return this.breed;
    }
}
// Test Cat class
const cat = new Cat("Whiskers", "Persian");
cat.speak(); // "Whiskers says: Meow"
cat.purr();
console.log("Cat breed:", cat.getBreed());
// Bài 3: Abstract class 'Shape'
console.log("\nBài 3: Abstract class Shape");
class Shape {
    constructor(name) {
        this.name = name;
    }
    // Concrete method - có thể sử dụng trực tiếp
    displayInfo() {
        console.log(`Shape: ${this.name}, Area: ${this.area()}`);
    }
}
// Rectangle implements Shape
class Rectangle extends Shape {
    constructor(width, height) {
        super("Rectangle");
        this.width = width;
        this.height = height;
    }
    // Phải implement abstract method
    area() {
        return this.width * this.height;
    }
    // Method riêng
    perimeter() {
        return 2 * (this.width + this.height);
    }
}
// Circle implements Shape
class Circle extends Shape {
    constructor(radius) {
        super("Circle");
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
    circumference() {
        return 2 * Math.PI * this.radius;
    }
}
// Test abstract classes
const rectangle = new Rectangle(5, 10);
const circle = new Circle(3);
rectangle.displayInfo(); // Shape: Rectangle, Area: 50
circle.displayInfo(); // Shape: Circle, Area: ~28.27
console.log("Rectangle perimeter:", rectangle.perimeter());
console.log("Circle circumference:", circle.circumference());
// const shape = new Shape("test"); // ❌ Error: Cannot create instance of abstract class
// Bài 4: Getter/Setter với validation
console.log("\nBài 4: Getter/Setter với validation");
class PersonWithValidation {
    constructor(name, age) {
        this._name = name;
        this.age = age; // sử dụng setter để validate
    }
    // Getter
    get name() {
        return this._name;
    }
    get age() {
        return this._age;
    }
    // Setter với validation
    set name(value) {
        if (value.length < 2) {
            throw new Error("Name must be at least 2 characters long");
        }
        this._name = value;
    }
    set age(value) {
        if (value <= 0 || value >= 120) {
            throw new Error("Age must be between 0 and 120");
        }
        this._age = value;
    }
    // Method
    introduce() {
        console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old`);
    }
}
// Test PersonWithValidation với getter/setter
try {
    const person = new PersonWithValidation("John Doe", 25);
    person.introduce();
    // Test getter
    console.log("Name:", person.name);
    console.log("Age:", person.age);
    // Test setter
    person.name = "Jane Smith";
    person.age = 30;
    person.introduce();
    // Test validation
    // person.age = 150; // ❌ Throws Error: Age must be between 0 and 120
    // person.name = "A"; // ❌ Throws Error: Name must be at least 2 characters long
}
catch (error) {
    console.log("Validation error:", error.message);
}
// Advanced OOP concepts
console.log("\nAdvanced OOP concepts:");
// Static members
class MathUtils {
    static calculateCircleArea(radius) {
        return this.PI * radius * radius;
    }
    static add(a, b) {
        return a + b;
    }
}
MathUtils.PI = 3.14159;
console.log("Static PI:", MathUtils.PI);
console.log("Static circle area:", MathUtils.calculateCircleArea(5));
console.log("Static add:", MathUtils.add(10, 20));
// Multiple interface implementation
class Duck extends Animal {
    constructor(name) {
        super(name);
        this.altitude = 0;
        this.depth = 0;
    }
    fly() {
        this.altitude = 100;
        console.log(`${this.getName()} is flying at ${this.altitude}m`);
    }
    swim() {
        this.depth = 2;
        console.log(`${this.getName()} is swimming at ${this.depth}m depth`);
    }
    speak() {
        this.makeSound("Quack");
    }
}
const duck = new Duck("Donald");
duck.speak();
duck.fly();
duck.swim();
console.log(`
OOP Principles trong TypeScript:

1. ENCAPSULATION (Đóng gói):
   - private: chỉ trong class
   - protected: class và subclass
   - public: mọi nơi (default)
   - readonly: chỉ đọc

2. INHERITANCE (Kế thừa):
   - extends keyword
   - super() để gọi parent constructor
   - method overriding

3. ABSTRACTION (Trừu tượng):
   - abstract class/methods
   - interfaces
   - hide implementation details

4. POLYMORPHISM (Đa hình):
   - method overriding
   - interface implementation
   - same interface, different behavior
`);
