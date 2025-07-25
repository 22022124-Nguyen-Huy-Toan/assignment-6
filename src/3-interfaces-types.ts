// ========================================
// 3. INTERFACE VÀ TYPE
// ========================================

console.log("=== SECTION 3: INTERFACE & TYPE ===\n");

// Bài 1: Interface 'Car'
console.log("Bài 1: Interface Car");

interface Car {
  readonly brand: string;  
  speed: number;
  start(): void;         
}

class MyCar implements Car {
  readonly brand: string;
  speed: number;

  constructor(brand: string, speed: number) {
    this.brand = brand;
    this.speed = speed;
  }

  start(): void {
    console.log(`${this.brand} is starting with speed ${this.speed} km/h`);
  }
}

const toyota = new MyCar("Toyota", 60);
toyota.start();

console.log("Toyota brand:", toyota.brand);
console.log("Toyota speed:", toyota.speed);

// Bài 2: Type inheritance
console.log("\nBài 2: Type inheritance");

type Person = { 
  name: string;
};

type Employee = Person & {
  employeeId: string;
};

interface PersonInterface {
  name: string;
}

interface EmployeeInterface extends PersonInterface {
  employeeId: string;
}

const employee: Employee = {
  name: "Nguyen Van A",
  employeeId: "EMP001"
};

const employeeInterface: EmployeeInterface = {
  name: "Tran Thi B", 
  employeeId: "EMP002"
};

console.log("Employee (type):", employee);
console.log("Employee (interface):", employeeInterface);

// Bài 3: Index signature
console.log("\nBài 3: Index signature");

type Dictionary<T = any> = {
  [key: string]: T;
};

type StringDictionary = Dictionary<string>;
type NumberDictionary = Dictionary<number>;

const config: StringDictionary = {
  apiUrl: "https://api.example.com",
  version: "1.0.0",
  environment: "production"
};

const scores: NumberDictionary = {
  math: 95,
  english: 87,
  science: 92
};

console.log("Config:", config);
console.log("Scores:", scores);

type FlexibleDictionary = {
  [key: string]: string | number | boolean;
  name: string;
  count: number;
};

const flexible: FlexibleDictionary = {
  name: "Test", 
  count: 5,     
  active: true, 
  description: "Some description"
};

console.log("Flexible dictionary:", flexible);

// Bài 4: Utility type 'OptionalFields<T>'
console.log("\nBài 4: Utility type OptionalFields");

type OptionalFields<T> = {
  [K in keyof T]?: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

type PartialUser = OptionalFields<User>;

const partialUser: PartialUser = {
  name: "John", 
  email: "john@example.com"
};

console.log("Partial user:", partialUser);

type BuiltInPartial = Partial<User>;

const builtInPartialUser: BuiltInPartial = {
  id: 1,
  name: "Jane"
};

console.log("Built-in partial user:", builtInPartialUser);

console.log("\nAdvanced utility types:");

type RequiredFields<T> = {
  [K in keyof T]-?: T[K]; 
};

type UserNameEmail = Pick<User, "name" | "email">;

type UserWithoutId = Omit<User, "id">;

const nameEmail: UserNameEmail = {
  name: "Alice",
  email: "alice@example.com"
};

const userWithoutId: UserWithoutId = {
  name: "Bob",
  email: "bob@example.com", 
  isActive: true
};

console.log("Name & Email only:", nameEmail);
console.log("User without ID:", userWithoutId);

type UserRole = "admin" | "user" | "guest";
type RolePermissions = Record<UserRole, string[]>;

const permissions: RolePermissions = {
  admin: ["read", "write", "delete"],
  user: ["read", "write"], 
  guest: ["read"]
};

console.log("Role permissions:", permissions);

type IsString<T> = T extends string ? true : false;

type Test1 = IsString<string>;  // true
type Test2 = IsString<number>;  // false

console.log(`
Interface vs Type:

INTERFACE:
- Có thể extend/implement
- Có thể merge declarations  
- Tốt cho object shapes
- Open for extension

TYPE:
- Có thể dùng union/intersection
- Có thể dùng conditional types
- Computed properties
- More flexible

Khi nào dùng gì:
- Interface: Khi define contract cho classes, extensible objects
- Type: Khi cần unions, computed types, utility types
`);
