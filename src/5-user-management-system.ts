console.log("=== BÀI TẬP TỔNG HỢP: USER MANAGEMENT SYSTEM ===\n");

// Task 1: Interface 'User'
interface User {
  readonly id: number;           
  username: string;             
  email: string;                
  isActive?: boolean;            
  role: 'admin' | 'user' | 'guest'; 
}

// Task 2: Type 'UserProfile' kết hợp User
type UserProfile = User & {
  birthDate: Date;               
  address?: string;            
};

console.log("✅ Đã định nghĩa User interface và UserProfile type");

// Task 3: Class 'UserAccount' implement interface 'User'
class UserAccount implements User {
  readonly id: number;
  username: string;
  email: string;
  isActive?: boolean;
  role: 'admin' | 'user' | 'guest';
  private password: string;     
  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    role: 'admin' | 'user' | 'guest' = 'user',
    isActive: boolean = true
  ) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.isActive = isActive;

    if (!this.validatePassword(password)) {
      throw new Error(`Password for ${role} must be at least ${this.getMinPasswordLength()} characters`);
    }
  }

  validatePassword(password: string): boolean {
    return password.length >= this.getMinPasswordLength();
  }

  protected getMinPasswordLength(): number {
    return 8;
  }

  changePassword(newPassword: string): boolean {
    if (this.validatePassword(newPassword)) {
      this.password = newPassword;
      console.log(`Password changed successfully for ${this.username}`);
      return true;
    } else {
      console.log(`Password must be at least ${this.getMinPasswordLength()} characters`);
      return false;
    }
  }

  checkPassword(inputPassword: string): boolean {
    return this.password === inputPassword;
  }

  displayInfo(): void {
    console.log(`User: ${this.username} (${this.email}) - Role: ${this.role} - Active: ${this.isActive}`);
  }
}

// Task 4: Class 'AdminUser' kế thừa 'UserAccount'
class AdminUser extends UserAccount {
  private permissions: string[];

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    permissions: string[] = ['read', 'write'],
    isActive: boolean = true
  ) {
    super(id, username, email, password, 'admin', isActive);
    this.permissions = permissions;
  }

  protected getMinPasswordLength(): number {
    return 12;
  }

  addPermission(permission: string): void {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
      console.log(`Permission '${permission}' added to ${this.username}`);
    }
  }

  removePermission(permission: string): void {
    const index = this.permissions.indexOf(permission);
    if (index > -1) {
      this.permissions.splice(index, 1);
      console.log(`Permission '${permission}' removed from ${this.username}`);
    }
  }

  getPermissions(): string[] {
    return [...this.permissions]; 
  }

  displayInfo(): void {
    super.displayInfo();
    console.log(`  Permissions: [${this.permissions.join(', ')}]`);
  }
}

console.log("\n✅ Đã tạo UserAccount và AdminUser classes");

try {
  const regularUser = new UserAccount(1, "john_doe", "john@example.com", "password123", "user");
  regularUser.displayInfo();

  const adminUser = new AdminUser(2, "admin_jane", "jane@admin.com", "adminpassword123", ["read", "write", "delete"]);
  adminUser.displayInfo();
  adminUser.addPermission("manage_users");
  console.log("Admin permissions:", adminUser.getPermissions());

} catch (error) {
  console.log("Error creating user:", (error as Error).message);
}

// Task 5: Hàm 'createUser' với Partial<User>
function createUser(userData: Partial<User>): User {
  const defaultUser: User = {
    id: Date.now(),              
    username: userData.username || "default_user",
    email: userData.email || "user@example.com",
    isActive: userData.isActive ?? true, 
    role: userData.role || 'user'
  };

  if (!userData.username) {
    throw new Error("Username is required");
  }
  if (!userData.email) {
    throw new Error("Email is required");
  }

  return {
    ...defaultUser,
    username: userData.username,
    email: userData.email
  } as User; 
}

function formatUserInfo(user: User | UserProfile): string {
  if ('birthDate' in user) {
    const birthDateStr = user.birthDate.toLocaleDateString('vi-VN');
    return `User ${user.username} born on ${birthDateStr}`;
  } else {
    return `User ${user.username} (${user.role})`;
  }
}

function isUserProfile(user: User | UserProfile): user is UserProfile {
  return 'birthDate' in user;
}

function formatUserInfoAlternative(user: User | UserProfile): string {
  if (isUserProfile(user)) {
    return `User ${user.username} born on ${user.birthDate.toLocaleDateString('vi-VN')}`;
  }
  return `User ${user.username} (${user.role})`;
}

console.log("\n✅ Đã tạo createUser và formatUserInfo functions");

try {
  const newUser1 = createUser({
    username: "test_user",
    email: "test@example.com"
  });
  console.log("Created user 1:", formatUserInfo(newUser1));

  const newUser2 = createUser({
    username: "admin_test",
    email: "admin@example.com",
    role: "admin",
    isActive: false
  });
  console.log("Created user 2:", formatUserInfo(newUser2));

  const userProfile: UserProfile = {
    ...newUser1,
    birthDate: new Date("1990-05-15"),
    address: "123 Main St, Hanoi"
  };
  console.log("User profile:", formatUserInfo(userProfile));

} catch (error) {
  console.log("Error in function test:", (error as Error).message);
}

console.log("\n=== DOM SIMULATION (Browser environment needed for actual DOM) ===");

export function setupFormHandling(): void {
  console.log(`
// Task 7: DOM Type Assertion Example
const form = document.getElementById("userForm") as HTMLFormElement;
const emailInput = document.querySelector("#email") as HTMLInputElement;

// Task 8: Form Submit Handler
form.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  
  const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
  const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
  const roleSelect = form.elements.namedItem("role") as HTMLSelectElement;
  
  const newUser: Partial<User> = {
    username: usernameInput.value,
    email: emailInput.value,
    role: roleSelect.value as 'admin' | 'user' | 'guest'
  };
  
  try {
    const createdUser = createUser(newUser);
    console.log("User created from form:", createdUser);
    
    // Tạo UserAccount instance
    const userAccount = new UserAccount(
      createdUser.id,
      createdUser.username,
      createdUser.email,
      passwordInput.value,
      createdUser.role,
      createdUser.isActive
    );
    
    userAccount.displayInfo();
  } catch (error) {
    console.error("Error creating user from form:", error);
  }
};
  `);
}


console.log("\n=== DEMO TỔNG HỢP ===");

// Tạo một số users để demo
const users: User[] = [];
const userAccounts: (UserAccount | AdminUser)[] = [];

// Demo 1: Tạo regular users
console.log("\n1. Creating regular users:");
for (let i = 0; i < 3; i++) {
  const userData: Partial<User> = {
    username: `user${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: 'user'
  };
  
  const user = createUser(userData);
  users.push(user);
  
  const userAccount = new UserAccount(
    user.id,
    user.username,
    user.email,
    `password${i + 1}23`,
    user.role,
    user.isActive
  );
  userAccounts.push(userAccount);
  
  console.log(`  ${formatUserInfo(user)}`);
}

console.log("\n2. Creating admin user:");
const adminData: Partial<User> = {
  username: "super_admin",
  email: "admin@company.com",
  role: "admin"
};

const adminUser = createUser(adminData);
users.push(adminUser);

const adminAccount = new AdminUser(
  adminUser.id,
  adminUser.username,
  adminUser.email,
  "supersecurepassword123",
  ["read", "write", "delete", "manage_users", "system_config"]
);
userAccounts.push(adminAccount);

console.log(`  ${formatUserInfo(adminUser)}`);
adminAccount.displayInfo();

console.log("\n3. Creating user profiles:");
const profileUsers: UserProfile[] = users.slice(0, 2).map(user => ({
  ...user,
  birthDate: new Date(1990 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
  address: `Address for ${user.username}`
}));

profileUsers.forEach(profile => {
  console.log(`  ${formatUserInfo(profile)}`);
});

console.log("\n4. Testing password validation:");
try {
  new UserAccount(999, "test", "test@test.com", "123", "user");
} catch (error) {
  console.log(`  Regular user short password: ${(error as Error).message}`);
}

try {
  new AdminUser(998, "admin_test", "admin@test.com", "shortpass");
} catch (error) {
  console.log(`  Admin short password: ${(error as Error).message}`);
}

console.log("\n5. Demonstrating type safety:");
const mixedUsers: (User | UserProfile)[] = [...users, ...profileUsers];

mixedUsers.forEach((user, index) => {
  console.log(`  User ${index + 1}: ${formatUserInfo(user)}`);
});