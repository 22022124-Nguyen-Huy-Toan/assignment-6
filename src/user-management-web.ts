const originalConsoleLog = console.log;
const consoleOutput = document.getElementById('consoleOutput');

function webConsoleLog(...args: any[]): void {
    const message = args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
    ).join(' ');
    
    if (consoleOutput) {
        consoleOutput.textContent += message + '\n';
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
    originalConsoleLog(...args);
}

console.log = webConsoleLog;

interface WebUser {
    readonly id: number;
    username: string;
    email: string;
    isActive: boolean;
    role: 'admin' | 'user' | 'guest';
}

type WebUserProfile = WebUser & {
    birthDate: Date;
    address?: string;
};

class WebUserAccount implements WebUser {
    readonly id: number;
    username: string;
    email: string;
    isActive: boolean;
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

class WebAdminUser extends WebUserAccount {
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


function createWebUser(userData: Partial<WebUser>): WebUser {
    const defaultUser: WebUser = {
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
    } as WebUser;
}

function formatWebUserInfo(user: WebUser | WebUserProfile): string {
    if ('birthDate' in user) {
        const birthDateStr = user.birthDate.toLocaleDateString('vi-VN');
        return `User ${user.username} born on ${birthDateStr}`;
    } else {
        return `User ${user.username} (${user.role})`;
    }
}

function showResult(message: string, isError: boolean = false): void {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div class="${isError ? 'result error' : 'result success'}">
                ${message}
            </div>
        `;
    }
}

function displayUserInfo(user: WebUser | WebUserProfile, account?: WebUserAccount | WebAdminUser): void {
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

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 TypeScript User Management System Loaded!');
    console.log('='.repeat(50));
    
    const form = document.getElementById("userForm") as HTMLFormElement;
    const emailInput = document.querySelector("#email") as HTMLInputElement;
    
    if (!form || !emailInput) {
        console.log('❌ Form elements not found');
        return;
    }

    form.onsubmit = (e: SubmitEvent) => {
        e.preventDefault();
        
        console.log('\n📝 Form submitted, processing...');
        
        try {
            const usernameInput = form.elements.namedItem("username") as HTMLInputElement;
            const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
            const roleSelect = form.elements.namedItem("role") as HTMLSelectElement;
            const birthDateInput = form.elements.namedItem("birthDate") as HTMLInputElement;
            const addressInput = form.elements.namedItem("address") as HTMLInputElement;
            
            if (!usernameInput.value.trim()) {
                throw new Error("Username is required");
            }
            if (!emailInput.value.trim()) {
                throw new Error("Email is required");
            }
            if (!passwordInput.value) {
                throw new Error("Password is required");
            }
            
            const userData: Partial<WebUser> = {
                username: usernameInput.value.trim(),
                email: emailInput.value.trim(),
                role: roleSelect.value as 'admin' | 'user' | 'guest'
            };
            
            console.log('Creating user with data:', userData);
            
            const createdUser = createWebUser(userData);
            console.log('✅ User created:', createdUser);
            
            let userAccount: WebUserAccount | WebAdminUser;
            
            if (createdUser.role === 'admin') {
                userAccount = new WebAdminUser(
                    createdUser.id,
                    createdUser.username,
                    createdUser.email,
                    passwordInput.value,
                    ['read', 'write', 'delete', 'manage_users']
                );
                console.log('✅ Admin account created');
            } else {
                userAccount = new WebUserAccount(
                    createdUser.id,
                    createdUser.username,
                    createdUser.email,
                    passwordInput.value,
                    createdUser.role,
                    createdUser.isActive
                );
                console.log('✅ User account created');
            }
            
            let finalUser: WebUser | WebUserProfile = createdUser;
            
            if (birthDateInput.value) {
                const userProfile: WebUserProfile = {
                    ...createdUser,
                    birthDate: new Date(birthDateInput.value),
                    address: addressInput.value.trim() || undefined
                };
                finalUser = userProfile;
                console.log('✅ User profile created with birth date');
            }
            
            userAccount.displayInfo();
            displayUserInfo(finalUser, userAccount);
            
            form.reset();
            console.log('📋 Form reset for next user');
            
        } catch (error) {
            const errorMessage = (error as Error).message;
            console.log('❌ Error:', errorMessage);
            showResult(`Error: ${errorMessage}`, true);
        }
    };
    
    const passwordInput = form.elements.namedItem("password") as HTMLInputElement;
    const roleSelect = form.elements.namedItem("role") as HTMLSelectElement;
    
    function validatePasswordRealTime(): void {
        const password = passwordInput.value;
        const role = roleSelect.value as 'admin' | 'user' | 'guest';
        const minLength = role === 'admin' ? 12 : 8;
        
        if (password.length > 0 && password.length < minLength) {
            passwordInput.style.borderColor = '#dc3545';
            passwordInput.title = `${role} password must be at least ${minLength} characters`;
        } else {
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
