# TypeScript Assignment 6 - Complete Guide

🚀 **Comprehensive TypeScript Learning Project**

This project covers all fundamental TypeScript concepts through practical examples and a complete user management system.

## 📚 Assignment Structure

### 1. Data Types & Type Annotation (`src/1-data-types.ts`)
- **Bài 1**: Fix type errors and explanations
- **Bài 2**: Type annotation for complex objects
- **Bài 3**: Type assertion for DOM elements
- **Bài 4**: `unknown` vs `any` comparison with examples

**Key Concepts:**
- Type annotation syntax
- Optional properties (`?`)
- Tuple types
- Type assertion (`as`)
- Type-safe alternatives

### 2. Functions (`src/2-functions.ts`)
- **Bài 1**: Functions with default parameters
- **Bài 2**: Rest parameters for variable arguments
- **Bài 3**: Function overloading for multiple signatures
- **Bài 4**: Generic functions for reusable code

**Key Concepts:**
- Default parameter values
- Rest parameters (`...args`)
- Function overload signatures
- Generic type parameters `<T>`
- Type constraints

### 3. Interfaces & Types (`src/3-interfaces-types.ts`)
- **Bài 1**: Interface definition with readonly properties
- **Bài 2**: Type inheritance with intersection (`&`)
- **Bài 3**: Index signatures for dynamic properties
- **Bài 4**: Custom utility types

**Key Concepts:**
- Interface vs Type differences
- `readonly` modifiers
- Intersection types (`&`)
- Index signatures `[key: string]: T`
- Built-in utility types (`Partial`, `Pick`, `Omit`)

### 4. Classes & OOP (`src/4-classes-oop.ts`)
- **Bài 1**: Classes with private properties
- **Bài 2**: Inheritance with method overriding
- **Bài 3**: Abstract classes and methods
- **Bài 4**: Getter/Setter with validation

**Key Concepts:**
- Access modifiers (`private`, `protected`, `public`)
- Class inheritance (`extends`)
- Abstract classes
- Method overriding
- Property validation

### 5. Complete User Management System (`src/5-user-management-system.ts`)

A comprehensive project combining all TypeScript concepts:

#### **System Requirements:**
- ✅ User creation with validation
- ✅ Role-based password requirements (8 chars for users, 12 for admins)
- ✅ Auto-generated IDs and default values
- ✅ Type-safe form handling
- ✅ Admin permission management

#### **Implementation Features:**
1. **Types & Interfaces:**
   ```typescript
   interface User {
     readonly id: number;
     username: string;
     email: string;
     isActive?: boolean;
     role: 'admin' | 'user' | 'guest';
   }
   
   type UserProfile = User & {
     birthDate: Date;
     address?: string;
   };
   ```

2. **Classes with Validation:**
   ```typescript
   class UserAccount implements User {
     private password: string;
     protected getMinPasswordLength(): number { return 8; }
   }
   
   class AdminUser extends UserAccount {
     protected getMinPasswordLength(): number { return 12; }
   }
   ```

3. **Type-Safe Functions:**
   ```typescript
   function createUser(userData: Partial<User>): User
   function formatUserInfo(user: User | UserProfile): string
   ```

## 🌐 Web Interface (`index.html` + `src/user-management-web.ts`)

Interactive web application demonstrating TypeScript in the browser:

### Features:
- 📝 **Real-time Form Validation**: Password length based on role
- 🎯 **Type-Safe DOM Manipulation**: Proper type assertions
- 📊 **Live Console Output**: See TypeScript execution in real-time
- 🔄 **Complete User Workflow**: Create users, validate data, display results

### Form Fields:
- Username (required)
- Email (required)
- Password (role-dependent validation)
- Role selection (user/admin/guest)
- Birth Date (optional, creates UserProfile)
- Address (optional)

## 🛠️ Setup & Installation

```bash
# 1. Install dependencies
npm install

# 2. Compile TypeScript
npm run build

# 3. Run individual examples
npx ts-node src/1-data-types.ts
npx ts-node src/2-functions.ts
npx ts-node src/3-interfaces-types.ts
npx ts-node src/4-classes-oop.ts
npx ts-node src/5-user-management-system.ts

# 4. Run main guide
npm run dev

# 5. Start web server for interactive demo
npm run serve
# Then open http://localhost:3000
```

## 📋 Project Scripts

```json
{
  "build": "tsc",
  "start": "node dist/index.js", 
  "dev": "ts-node src/index.ts",
  "serve": "npx http-server . -p 3000"
}
```

## 🎯 Learning Objectives Achieved

### ✅ **Type System Mastery**
- Type annotation vs inference
- Union types and literal types
- Type assertions and type guards
- Generic types and constraints

### ✅ **Object-Oriented Programming** 
- Classes with proper encapsulation
- Inheritance and polymorphism
- Abstract classes and interfaces
- Access modifiers and validation

### ✅ **Advanced TypeScript Features**
- Function overloading
- Utility types (Partial, Pick, Omit)
- Index signatures
- Conditional types

### ✅ **Real-World Application**
- Complete user management system
- Type-safe DOM manipulation
- Form validation with TypeScript
- Error handling and type safety

## 🌟 Key TypeScript Concepts Demonstrated

### **Type Safety**
```typescript
// ❌ Runtime error potential
let user: any = getData();
user.invalidMethod(); // No compile-time error

// ✅ Compile-time safety  
let user: User = createUser(data);
user.displayInfo(); // Type-checked method
```

### **Generic Reusability**
```typescript
function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[] {
  return arr.filter(condition);
}

// Works with any type while maintaining type safety
const numbers = filterArray([1,2,3,4], n => n > 2);    // number[]
const strings = filterArray(['a','b'], s => s === 'a'); // string[]
```

### **Interface Contracts**
```typescript
interface Flyable {
  fly(): void;
  altitude: number;
}

class Bird implements Flyable {
  altitude = 0;
  fly() { this.altitude = 100; }
}
```

## 🔍 Code Quality Features

- **Strict TypeScript Configuration**: Full type checking enabled
- **Comprehensive Error Handling**: Try-catch blocks with typed errors
- **Input Validation**: Both runtime and compile-time validation
- **Documentation**: Extensive comments explaining concepts
- **Real-World Examples**: Practical applications of each concept

## 🚀 Advanced Features Implemented

1. **Type Guards**: Runtime type checking with compile-time benefits
2. **Utility Types**: Custom and built-in type transformations
3. **Method Overriding**: Polymorphic behavior in class hierarchies
4. **Index Signatures**: Dynamic property access with type safety
5. **Generic Constraints**: Flexible yet safe generic programming

## 📖 Additional Resources

- Each file contains detailed explanations and comments
- Multiple examples for each concept
- Error scenarios and their solutions
- Best practices and common pitfalls
- Real-world usage patterns

---

**🎉 This assignment provides a complete foundation in TypeScript, from basic types to advanced patterns, culminating in a real-world application that demonstrates professional TypeScript development practices.**
