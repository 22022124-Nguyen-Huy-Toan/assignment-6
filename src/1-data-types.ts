console.log("=== SECTION 1: DATA TYPES ===\n");

// Bài 1: Fix lỗi type và giải thích
console.log("Bài 1: Fix lỗi type");

// LỖI: Gán string cho biến number
// let age: number = "25"; 

// FIX:
let age: number = 25; 
// HOẶC: let age: number = parseInt("25");

// LỖI: Gán string cho biến boolean  
// let isActive: boolean = "true"; 

// FIX:
let isActive: boolean = true;
// HOẶC: let isActive: boolean = "true" === "true"; 

let data: any = { x: 10 };
data = "hello"; 

console.log("age:", age, typeof age);
console.log("isActive:", isActive, typeof isActive);
console.log("data:", data, typeof data);

// Bài 2: Định nghĩa biến 'user' với type annotation
console.log("\nBài 2: Type annotation cho user");

let user: {
  name: string;       
  age?: number;        
  roles: [string, number]; 
} = {
  name: "Nguyen Van A",
  age: 25,
  roles: ["admin", 1] 
};

console.log("user:", user);

let user2: {
  name: string;
  age?: number;
  roles: [string, number];
} = {
  name: "Nguyen Van B",
  roles: ["user", 2]
};

console.log("user2:", user2);

// Bài 3: Type assertion để fix lỗi
console.log("\nBài 3: Type assertion");

const mockElement = {
  value: "123",
  type: "number"
};

const input = mockElement as any as HTMLInputElement;

const value: number = parseInt((mockElement as any).value);
console.log("value:", value, typeof value);

const someValue: unknown = "hello world";
const strLength: number = (someValue as string).length;
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

function processData(data: unknown): string {
  if (typeof data === "string") {
    return data.toUpperCase(); 
  }
  
  if (typeof data === "number") {
    return data.toString(); 
  }
  
  if (data && typeof data === "object" && "name" in data) {
    return (data as { name: string }).name; 
  }
  
  return "Unknown data type";
}

let unknownData: unknown = "hello";
let anyData: any = "hello";

anyData.toUpperCase(); 
console.log("processData with string:", processData("hello"));
console.log("processData with number:", processData(42));
console.log("processData with object:", processData({ name: "John" }));
