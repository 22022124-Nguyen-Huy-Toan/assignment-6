console.log("=== SECTION 4: CLASSES & OOP ===\n");

// Bài 1: Class 'Animal' với private property
console.log("Bài 1: Class Animal với private property");

class Animal {
  private name: string; 

  constructor(name: string) {
    this.name = name;
  }

  speak(): void {
    console.log(`Animal ${this.name} makes a sound`);
  }

  getName(): string {
    return this.name;
  }

  protected makeSound(sound: string): void {
    console.log(`${this.name} says: ${sound}`);
  }
}

const animal = new Animal("Generic Animal");
animal.speak();
console.log("Animal name:", animal.getName());

// Bài 2: Class 'Cat' kế thừa 'Animal'
console.log("\nBài 2: Class Cat kế thừa Animal");

class Cat extends Animal {
  private breed: string;

  constructor(name: string, breed: string) {
    super(name); 
    this.breed = breed;
  }

  speak(): void {
    this.makeSound("Meow"); 
  }

  purr(): void {
    console.log(`${this.getName()} is purring...`);
  }

  getBreed(): string {
    return this.breed;
  }
}

const cat = new Cat("Whiskers", "Persian");
cat.speak(); 
cat.purr();
console.log("Cat breed:", cat.getBreed());

// Bài 3: Abstract class 'Shape'
console.log("\nBài 3: Abstract class Shape");

abstract class Shape {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract area(): number;

  displayInfo(): void {
    console.log(`Shape: ${this.name}, Area: ${this.area()}`);
  }
}

class Rectangle extends Shape {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    super("Rectangle");
    this.width = width;
    this.height = height;
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Circle extends Shape {
  private radius: number;

  constructor(radius: number) {
    super("Circle");
    this.radius = radius;
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }

  circumference(): number {
    return 2 * Math.PI * this.radius;
  }
}

const rectangle = new Rectangle(5, 10);
const circle = new Circle(3);

rectangle.displayInfo(); 
circle.displayInfo();    

console.log("Rectangle perimeter:", rectangle.perimeter());
console.log("Circle circumference:", circle.circumference());

// Bài 4: Getter/Setter với validation
console.log("\nBài 4: Getter/Setter với validation");

class PersonWithValidation {
  private _name: string;
  private _age!: number; 

  constructor(name: string, age: number) {
    this._name = name;
    this.age = age; 
  }

  get name(): string {
    return this._name;
  }

  get age(): number {
    return this._age;
  }

  set name(value: string) {
    if (value.length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }
    this._name = value;
  }

  set age(value: number) {
    if (value <= 0 || value >= 120) {
      throw new Error("Age must be between 0 and 120");
    }
    this._age = value;
  }

  introduce(): void {
    console.log(`Hi, I'm ${this.name} and I'm ${this.age} years old`);
  }
}

try {
  const person = new PersonWithValidation("John Doe", 25);
  person.introduce();

  console.log("Name:", person.name);
  console.log("Age:", person.age);

  person.name = "Jane Smith";
  person.age = 30;
  person.introduce();


} catch (error) {
  console.log("Validation error:", (error as Error).message);
}

console.log("\nAdvanced OOP concepts:");

class MathUtils {
  static readonly PI = 3.14159;
  
  static calculateCircleArea(radius: number): number {
    return this.PI * radius * radius;
  }
  
  static add(a: number, b: number): number {
    return a + b;
  }
}

console.log("Static PI:", MathUtils.PI);
console.log("Static circle area:", MathUtils.calculateCircleArea(5));
console.log("Static add:", MathUtils.add(10, 20));

interface Flyable {
  fly(): void;
  altitude: number;
}

interface Swimmable {
  swim(): void;
  depth: number;
}

class Duck extends Animal implements Flyable, Swimmable {
  altitude: number = 0;
  depth: number = 0;

  constructor(name: string) {
    super(name);
  }

  fly(): void {
    this.altitude = 100;
    console.log(`${this.getName()} is flying at ${this.altitude}m`);
  }

  swim(): void {
    this.depth = 2;
    console.log(`${this.getName()} is swimming at ${this.depth}m depth`);
  }

  speak(): void {
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
