"use strict";
// ========================================
// 3. INTERFACE VÀ TYPE
// ========================================
console.log("=== SECTION 3: INTERFACE & TYPE ===\n");
// Bài 1: Interface 'Car'
console.log("Bài 1: Interface Car");
// Implement interface
class MyCar {
    constructor(brand, speed) {
        this.brand = brand;
        this.speed = speed;
    }
    start() {
        console.log(`${this.brand} is starting with speed ${this.speed} km/h`);
    }
}
const toyota = new MyCar("Toyota", 60);
toyota.start();
// toyota.brand = "Honda"; // ❌ Error: Cannot assign to 'brand' because it is a read-only property
console.log("Toyota brand:", toyota.brand);
console.log("Toyota speed:", toyota.speed);
// Bài 2: Type inheritance
console.log("\nBài 2: Type inheritance");
// Test
const employee = {
    name: "Nguyen Van A",
    employeeId: "EMP001"
};
const employeeInterface = {
    name: "Tran Thi B",
    employeeId: "EMP002"
};
console.log("Employee (type):", employee);
console.log("Employee (interface):", employeeInterface);
// Bài 3: Index signature
console.log("\nBài 3: Index signature");
// Usage examples
const config = {
    apiUrl: "https://api.example.com",
    version: "1.0.0",
    environment: "production"
};
const scores = {
    math: 95,
    english: 87,
    science: 92
};
console.log("Config:", config);
console.log("Scores:", scores);
const flexible = {
    name: "Test", // required
    count: 5, // required
    active: true, // additional property
    description: "Some description"
};
console.log("Flexible dictionary:", flexible);
// Bài 4: Utility type 'OptionalFields<T>'
console.log("\nBài 4: Utility type OptionalFields");
const partialUser = {
    name: "John", // chỉ cần một số fields
    email: "john@example.com"
    // id và isActive không bắt buộc
};
console.log("Partial user:", partialUser);
const builtInPartialUser = {
    id: 1,
    name: "Jane"
};
console.log("Built-in partial user:", builtInPartialUser);
// Advanced utility types
console.log("\nAdvanced utility types:");
// Examples
const nameEmail = {
    name: "Alice",
    email: "alice@example.com"
};
const userWithoutId = {
    name: "Bob",
    email: "bob@example.com",
    isActive: true
};
console.log("Name & Email only:", nameEmail);
console.log("User without ID:", userWithoutId);
const permissions = {
    admin: ["read", "write", "delete"],
    user: ["read", "write"],
    guest: ["read"]
};
console.log("Role permissions:", permissions);
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
