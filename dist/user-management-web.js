"use strict";
// ========================================
// WEB VERSION - USER MANAGEMENT SYSTEM
// ========================================
// Redirect console.log to display in the web page
const originalConsoleLog = console.log;
const consoleOutput = document.getElementById('consoleOutput');
function webConsoleLog(...args) {
    const message = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)).join(' ');
    if (consoleOutput) {
        consoleOutput.textContent += message + '\n';
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
    originalConsoleLog(...args);
}
// Override console.log
console.log = webConsoleLog;
// ========================================
// CLASSES
// ========================================
class WebUserAccount {
    constructor(id, username, email, password, role = 'user', isActive = true) {
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
    validatePassword(password) {
        return password.length >= this.getMinPasswordLength();
    }
    getMinPasswordLength() {
        return 8;
    }
    changePassword(newPassword) {
        if (this.validatePassword(newPassword)) {
            this.password = newPassword;
            console.log(`Password changed successfully for ${this.username}`);
            return true;
        }
        else {
            console.log(`Password must be at least ${this.getMinPasswordLength()} characters`);
            return false;
        }
    }
    checkPassword(inputPassword) {
        return this.password === inputPassword;
    }
    displayInfo() {
        console.log(`User: ${this.username} (${this.email}) - Role: ${this.role} - Active: ${this.isActive}`);
    }
}
class WebAdminUser extends WebUserAccount {
    constructor(id, username, email, password, permissions = ['read', 'write'], isActive = true) {
        super(id, username, email, password, 'admin', isActive);
        this.permissions = permissions;
    }
    getMinPasswordLength() {
        return 12;
    }
    addPermission(permission) {
        if (!this.permissions.includes(permission)) {
            this.permissions.push(permission);
            console.log(`Permission '${permission}' added to ${this.username}`);
        }
    }
    removePermission(permission) {
        const index = this.permissions.indexOf(permission);
        if (index > -1) {
            this.permissions.splice(index, 1);
            console.log(`Permission '${permission}' removed from ${this.username}`);
        }
    }
    getPermissions() {
        return [...this.permissions];
    }
    displayInfo() {
        super.displayInfo();
        console.log(`  Permissions: [${this.permissions.join(', ')}]`);
    }
}
// ========================================
// FUNCTIONS
// ========================================
function createWebUser(userData) {
    const defaultUser = {
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
    };
}
function formatWebUserInfo(user) {
    if ('birthDate' in user) {
        const birthDateStr = user.birthDate.toLocaleDateString('vi-VN');
        return `User ${user.username} born on ${birthDateStr}`;
    }
    else {
        return `User ${user.username} (${user.role})`;
    }
}
// ========================================
// WEB DOM HANDLING
// ========================================
function showResult(message, isError = false) {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div class="${isError ? 'result error' : 'result success'}">
                ${message}
            </div>
        `;
    }
}
function displayUserInfo(user, account) {
    let info = `
        <div class="user-info">
<strong>User Created Successfully!</strong>

ID: ${user.id}
Username: ${user.username}
Email: ${user.email}
Role: ${user.role}
Active: ${user.isActive}`;
    if ('birthDate' in user) {
        info += `
Birth Date: ${user.birthDate.toLocaleDateString('vi-VN')}`;
        if (user.address) {
            info += `
Address: ${user.address}`;
        }
    }
    if (account instanceof WebAdminUser) {
        info += `
Permissions: [${account.getPermissions().join(', ')}]`;
    }
    info += `

Formatted Info: ${formatWebUserInfo(user)}
        </div>
    `;
    showResult(info);
}
// ========================================
// FORM HANDLING
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    console.log('🚀 TypeScript User Management System Loaded!');
    console.log('='.repeat(50));
    const form = document.getElementById("userForm");
    const emailInput = document.querySelector("#email");
    if (!form || !emailInput) {
        console.log('❌ Form elements not found');
        return;
    }
    form.onsubmit = (e) => {
        e.preventDefault();
        console.log('\n📝 Form submitted, processing...');
        try {
            // Get form data with proper type assertion
            const usernameInput = form.elements.namedItem("username");
            const passwordInput = form.elements.namedItem("password");
            const roleSelect = form.elements.namedItem("role");
            const birthDateInput = form.elements.namedItem("birthDate");
            const addressInput = form.elements.namedItem("address");
            // Validate required fields
            if (!usernameInput.value.trim()) {
                throw new Error("Username is required");
            }
            if (!emailInput.value.trim()) {
                throw new Error("Email is required");
            }
            if (!passwordInput.value) {
                throw new Error("Password is required");
            }
            // Create user data
            const userData = {
                username: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                role: roleSelect.value
            };
            console.log('Creating user with data:', userData);
            // Create user
            const createdUser = createWebUser(userData);
            console.log('✅ User created:', createdUser);
            // Create user account with password validation
            let userAccount;
            if (createdUser.role === 'admin') {
                userAccount = new WebAdminUser(createdUser.id, createdUser.username, createdUser.email, passwordInput.value, ['read', 'write', 'delete', 'manage_users']);
                console.log('✅ Admin account created');
            }
            else {
                userAccount = new WebUserAccount(createdUser.id, createdUser.username, createdUser.email, passwordInput.value, createdUser.role, createdUser.isActive);
                console.log('✅ User account created');
            }
            // Check if birth date is provided to create UserProfile
            let finalUser = createdUser;
            if (birthDateInput.value) {
                const userProfile = {
                    ...createdUser,
                    birthDate: new Date(birthDateInput.value),
                    address: addressInput.value.trim() || undefined
                };
                finalUser = userProfile;
                console.log('✅ User profile created with birth date');
            }
            // Display results
            userAccount.displayInfo();
            displayUserInfo(finalUser, userAccount);
            // Reset form
            form.reset();
            console.log('📋 Form reset for next user');
        }
        catch (error) {
            const errorMessage = error.message;
            console.log('❌ Error:', errorMessage);
            showResult(`Error: ${errorMessage}`, true);
        }
    };
    // Add real-time password validation
    const passwordInput = form.elements.namedItem("password");
    const roleSelect = form.elements.namedItem("role");
    function validatePasswordRealTime() {
        const password = passwordInput.value;
        const role = roleSelect.value;
        const minLength = role === 'admin' ? 12 : 8;
        if (password.length > 0 && password.length < minLength) {
            passwordInput.style.borderColor = '#dc3545';
            passwordInput.title = `${role} password must be at least ${minLength} characters`;
        }
        else {
            passwordInput.style.borderColor = '#28a745';
            passwordInput.title = '';
        }
    }
    passwordInput.addEventListener('input', validatePasswordRealTime);
    roleSelect.addEventListener('change', validatePasswordRealTime);
    console.log('✅ Form event handlers attached');
    console.log('📝 Ready to create users!');
    console.log('='.repeat(50));
});
