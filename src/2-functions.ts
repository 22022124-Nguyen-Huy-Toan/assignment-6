// ========================================
// 2. FUNCTIONS
// ========================================

console.log("=== SECTION 2: FUNCTIONS ===\n");

// Bài 1: Hàm 'sum' với default parameter
console.log("Bài 1: Function với default parameter");

function sum(a: number, b: number = 10): number {
  return a + b;
}

// Test hàm sum
console.log("sum(5):", sum(5)); // 5 + 10 = 15
console.log("sum(5, 3):", sum(5, 3)); // 5 + 3 = 8

// Arrow function version
const sumArrow = (a: number, b: number = 10): number => a + b;
console.log("sumArrow(7):", sumArrow(7)); // 7 + 10 = 17

// Bài 2: Rest parameter để merge strings
console.log("\nBài 2: Rest parameter");

function mergeStrings(...strings: string[]): string {
  return strings.join(" ");
}

// Test mergeStrings
console.log("mergeStrings:", mergeStrings("Hello", "World", "from", "TypeScript"));
console.log("mergeStrings (2 params):", mergeStrings("Good", "Morning"));

// Advanced version với separator tùy chọn
function mergeStringsWithSeparator(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

console.log("With custom separator:", mergeStringsWithSeparator(" - ", "A", "B", "C"));

// Bài 3: Function overload
console.log("\nBài 3: Function overload");

// Overload signatures
function getValue(input: string): string;
function getValue(input: number): number;

// Implementation signature (phải handle tất cả cases)
function getValue(input: string | number): string | number {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input * 2;
  }
}

// Test overload
console.log("getValue('hello'):", getValue("hello")); // "HELLO"
console.log("getValue(5):", getValue(5)); // 10

// Ví dụ overload phức tạp hơn
function createArray(length: number): number[];
function createArray(item: string): string[];
function createArray(items: string[]): string[];

function createArray(input: number | string | string[]): number[] | string[] {
  if (typeof input === "number") {
    return new Array(input).fill(0).map((_, i) => i);
  } else if (typeof input === "string") {
    return [input];
  } else {
    return [...input];
  }
}

console.log("createArray(3):", createArray(3)); // [0, 1, 2]
console.log("createArray('test'):", createArray("test")); // ["test"]
console.log("createArray(['a', 'b']):", createArray(["a", "b"])); // ["a", "b"]

// Bài 4: Generic function
console.log("\nBài 4: Generic function");

console.log(`
GENERIC là gì?
- Cho phép viết code tái sử dụng với nhiều types khác nhau
- Type parameter <T> đại diện cho một type bất kỳ
- TypeScript sẽ infer (suy luận) type dựa trên usage
- Giúp maintain type safety mà không duplicate code

Ứng dụng:
- Collections (Array, Map, Set)
- Utility functions
- API responses
- Data transformation
`);

function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[] {
  const result: T[] = [];
  for (const item of arr) {
    if (condition(item)) {
      result.push(item);
    }
  }
  return result;
}

// Test với different types
const numbers = [1, 2, 3, 4, 5, 6];
const strings = ["apple", "banana", "cherry", "date"];
const users = [
  { name: "John", age: 25 },
  { name: "Jane", age: 30 },
  { name: "Bob", age: 20 }
];

// Filter numbers > 3
const filteredNumbers = filterArray(numbers, (n) => n > 3);
console.log("Numbers > 3:", filteredNumbers); // [4, 5, 6]

// Filter strings starting with 'a'
const filteredStrings = filterArray(strings, (s) => s.startsWith("a"));
console.log("Strings starting with 'a':", filteredStrings); // ["apple"]

// Filter users age >= 25
const filteredUsers = filterArray(users, (u) => u.age >= 25);
console.log("Users age >= 25:", filteredUsers); // John, Jane

// Generic function với multiple type parameters
function mapAndFilter<T, U>(
  arr: T[], 
  mapper: (item: T) => U, 
  filter: (item: U) => boolean
): U[] {
  return arr.map(mapper).filter(filter);
}

// Transform numbers to strings, then filter by length
const numberToStringFiltered = mapAndFilter(
  [1, 12, 123, 1234],
  (n) => n.toString(),
  (s) => s.length >= 2
);
console.log("Numbers to strings (length >= 2):", numberToStringFiltered); // ["12", "123", "1234"]

// Generic với constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30, city: "Hanoi" };
const personName = getProperty(person, "name"); // string
const personAge = getProperty(person, "age");   // number
// const invalid = getProperty(person, "invalid"); // ❌ Error

console.log("Person name:", personName);
console.log("Person age:", personAge);
