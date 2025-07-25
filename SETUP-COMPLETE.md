# 🚀 TypeScript Assignment 6 - SETUP COMPLETE!

## ✅ What's Been Created

I've created a comprehensive TypeScript assignment covering all the topics you requested:

### 📁 Project Structure
```
d:\Ky II nam 3\Thực tập FPT\assignment-6\
├── 📄 README.md                          # Complete documentation
├── 📄 package.json                       # Project configuration  
├── 📄 tsconfig.json                      # TypeScript configuration
├── 📄 index.html                         # Web interface
├── 📄 test.ts                            # Simple test file
└── 📁 src/
    ├── 📄 index.ts                       # Main entry point
    ├── 📄 1-data-types.ts                # Section 1: Data Types
    ├── 📄 2-functions.ts                 # Section 2: Functions  
    ├── 📄 3-interfaces-types.ts          # Section 3: Interfaces
    ├── 📄 4-classes-oop.ts               # Section 4: Classes
    ├── 📄 5-user-management-system.ts    # Complete system
    └── 📄 user-management-web.ts         # Web version
```

## 📚 Assignment Content

### 1. Data Types & Type Annotation (Section 1)
✅ **Bài 1**: Fixed type errors with explanations
✅ **Bài 2**: User object with name, age?, roles tuple  
✅ **Bài 3**: Type assertion for HTMLInputElement
✅ **Bài 4**: Unknown vs Any with examples

### 2. Functions (Section 2)  
✅ **Bài 1**: Sum function with default parameter (b=10)
✅ **Bài 2**: mergeStrings with rest parameters
✅ **Bài 3**: getValue function overloading (string→uppercase, number→*2)
✅ **Bài 4**: Generic filterArray function with examples

### 3. Interfaces & Types (Section 3)
✅ **Bài 1**: Car interface (readonly brand, speed, start())
✅ **Bài 2**: Employee type extending Person  
✅ **Bài 3**: Dictionary type with index signature
✅ **Bài 4**: OptionalFields<T> utility type

### 4. Classes & OOP (Section 4)
✅ **Bài 1**: Animal class with private name
✅ **Bài 2**: Cat class extending Animal (override speak())
✅ **Bài 3**: Abstract Shape class with Rectangle/Circle
✅ **Bài 4**: Person class with age validation getter/setter

### 5. Complete User Management System (Section 5)
✅ **All Requirements Met**:
- User interface with readonly id, optional isActive
- UserProfile type with birthDate  
- UserAccount class with password validation (8+ chars)
- AdminUser class with 12+ char password requirement
- createUser function with Partial<User>
- formatUserInfo with type guards
- DOM handling with type assertions
- Complete form validation

## 🌐 Web Demo Features

The `index.html` provides a complete interactive demo:
- ✅ Real-time password validation based on role
- ✅ Type-safe form handling
- ✅ Live console output showing TypeScript execution
- ✅ User/Admin account creation with validation
- ✅ UserProfile creation with birth date
- ✅ Beautiful responsive interface

## 🛠️ How to Run

### Option 1: Individual Files (Recommended for Learning)
```bash
# Navigate to project
cd "d:\Ky II nam 3\Thực tập FPT\assignment-6"

# Install dependencies  
npm install

# Run each section individually
npx ts-node src/1-data-types.ts
npx ts-node src/2-functions.ts  
npx ts-node src/3-interfaces-types.ts
npx ts-node src/4-classes-oop.ts
npx ts-node src/5-user-management-system.ts
```

### Option 2: Web Interface (Interactive Demo)
```bash
# Compile TypeScript for web
npx tsc src/user-management-web.ts --outDir dist --target es2020 --lib dom,es2020

# Start web server
npx http-server . -p 3000

# Open browser to http://localhost:3000
```

### Option 3: All at Once
```bash
npm run dev  # Shows project guide
```

## 📖 Learning Guide

### Start Here: `src/1-data-types.ts`
- Basic type annotation
- Type assertion examples  
- Unknown vs Any comparison
- Detailed explanations and fixes

### Then: `src/2-functions.ts`
- Default parameters
- Rest parameters
- Function overloading
- Generic functions with real examples

### Next: `src/3-interfaces-types.ts`
- Interface vs Type differences
- Inheritance patterns
- Index signatures
- Utility type creation

### Advanced: `src/4-classes-oop.ts`
- OOP principles in TypeScript
- Access modifiers
- Abstract classes
- Validation patterns

### Master Project: `src/5-user-management-system.ts`
- Complete real-world system
- All concepts combined
- Professional patterns
- Error handling

## 🎯 Key Features Implemented

### Type Safety
- Strict TypeScript configuration
- Comprehensive error handling
- Runtime and compile-time validation

### Real-World Patterns  
- User management with roles
- Password validation by role type
- Form handling with type safety
- Generic reusable functions

### Best Practices
- Clean separation of concerns
- Proper encapsulation
- Interface contracts
- Type guards and assertions

## 🌟 Bonus Features

### Advanced TypeScript
- Utility types (Partial, Pick, Omit)
- Conditional types
- Generic constraints
- Method overloading

### Web Integration
- DOM type assertions
- Event handling with types
- Real-time validation
- Console output redirection

## 📋 Assignment Checklist

✅ All 4 main sections completed with examples
✅ Complete user management system 
✅ Web interface with DOM interaction
✅ Password validation (8 chars user, 12 chars admin)
✅ Type guards and assertions
✅ Generic functions
✅ OOP principles (encapsulation, inheritance, polymorphism)
✅ Error handling and validation
✅ Real-world application patterns

## 🎉 Ready to Learn!

Your TypeScript assignment is completely set up and ready. Each file contains:
- ✅ Complete implementations  
- ✅ Detailed explanations
- ✅ Multiple examples
- ✅ Error scenarios and fixes
- ✅ Best practices

**Start with `src/1-data-types.ts` and work through each section!**
