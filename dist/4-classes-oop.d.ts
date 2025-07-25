declare class Animal {
    private name;
    constructor(name: string);
    speak(): void;
    getName(): string;
    protected makeSound(sound: string): void;
}
declare const animal: Animal;
declare class Cat extends Animal {
    private breed;
    constructor(name: string, breed: string);
    speak(): void;
    purr(): void;
    getBreed(): string;
}
declare const cat: Cat;
declare abstract class Shape {
    protected name: string;
    constructor(name: string);
    abstract area(): number;
    displayInfo(): void;
}
declare class Rectangle extends Shape {
    private width;
    private height;
    constructor(width: number, height: number);
    area(): number;
    perimeter(): number;
}
declare class Circle extends Shape {
    private radius;
    constructor(radius: number);
    area(): number;
    circumference(): number;
}
declare const rectangle: Rectangle;
declare const circle: Circle;
declare class PersonWithValidation {
    private _name;
    private _age;
    constructor(name: string, age: number);
    get name(): string;
    get age(): number;
    set name(value: string);
    set age(value: number);
    introduce(): void;
}
declare class MathUtils {
    static readonly PI = 3.14159;
    static calculateCircleArea(radius: number): number;
    static add(a: number, b: number): number;
}
interface Flyable {
    fly(): void;
    altitude: number;
}
interface Swimmable {
    swim(): void;
    depth: number;
}
declare class Duck extends Animal implements Flyable, Swimmable {
    altitude: number;
    depth: number;
    constructor(name: string);
    fly(): void;
    swim(): void;
    speak(): void;
}
declare const duck: Duck;
