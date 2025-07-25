"use strict";
// ========================================
// 1. DATA TYPES, TYPE ANNOTATION, TYPE ASSERTION
// ========================================
console.log("=== SECTION 1: DATA TYPES ===\n");
// Bài 1: Fix lỗi type và giải thích
console.log("Bài 1: Fix lỗi type");
// LỖI: Gán string cho biến number
// let age: number = "25"; // ❌ Type 'string' is not assignable to type 'number'
// FIX:
let age = 25; // ✅ Correct: number literal
// HOẶC: let age: number = parseInt("25"); // ✅ Convert string to number
// LỖI: Gán string cho biến boolean  
// let isActive: boolean = "true"; // ❌ Type 'string' is not assignable to type 'boolean'
// FIX:
let isActive = true; // ✅ Correct: boolean literal
// HOẶC: let isActive: boolean = "true" === "true"; // ✅ Convert string to boolean
let data = { x: 10 };
data = "hello"; // ✅ OK với 'any' type, nhưng mất type safety
console.log("age:", age, typeof age);
console.log("isActive:", isActive, typeof isActive);
console.log("data:", data, typeof data);
// Bài 2: Định nghĩa biến 'user' với type annotation
console.log("\nBài 2: Type annotation cho user");
// Type annotation cho user object
let user = {
    name: "Nguyen Van A",
    age: 25,
    roles: ["admin", 1] // tuple with string and number
};
console.log("user:", user);
// Ví dụ khác với optional field
let user2 = {
    name: "Nguyen Van B",
    // age không cần thiết do optional
    roles: ["user", 2]
};
console.log("user2:", user2);
// Bài 3: Type assertion để fix lỗi
console.log("\nBài 3: Type assertion");
// Giả lập DOM element (trong thực tế sẽ lấy từ HTML)
const mockElement = {
    value: "123",
    type: "number"
};
// Type assertion để TypeScript biết đây là HTMLInputElement
const input = mockElement;
// Để value là number, cần convert
const value = parseInt(mockElement.value);
console.log("value:", value, typeof value);
// Ví dụ type assertion khác
const someValue = "hello world";
const strLength = someValue.length;
console.log("String length:", strLength);
// Bài 4: Khi nào dùng 'unknown' thay cho 'any'?
console.log("\nBài 4: Unknown vs Any");
console.log(`
UNKNOWN vs ANY:

1. 'any': Tắt hoàn toàn type checking - nguy hiểm
   - Có thể gọi bất kỳ property/method nào
   - Không có type safety
   
2. 'unknown': Type-safe alternative cho 'any'  
   - Phải kiểm tra type trước khi sử dụng
   - Buộc phải type guard hoặc type assertion

Dùng 'unknown' khi:
- Nhận data từ API không biết structure
- Parsing JSON
- Cần type safety nhưng không biết exact type
`);
// Ví dụ minh họa
function processData(data) {
    // Phải kiểm tra type trước khi sử dụng
    if (typeof data === "string") {
        return data.toUpperCase(); // ✅ Safe
    }
    if (typeof data === "number") {
        return data.toString(); // ✅ Safe
    }
    if (data && typeof data === "object" && "name" in data) {
        return data.name; // ✅ Safe với assertion
    }
    return "Unknown data type";
}
// Test unknown vs any
let unknownData = "hello";
let anyData = "hello";
// unknownData.toUpperCase(); // ❌ Error: Object is of type 'unknown'
anyData.toUpperCase(); // ✅ Works but unsafe
console.log("processData with string:", processData("hello"));
console.log("processData with number:", processData(42));
console.log("processData with object:", processData({ name: "John" }));
