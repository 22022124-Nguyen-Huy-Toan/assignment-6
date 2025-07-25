declare const originalConsoleLog: {
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
};
declare const consoleOutput: HTMLElement | null;
declare function webConsoleLog(...args: any[]): void;
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
declare class WebUserAccount implements WebUser {
    readonly id: number;
    username: string;
    email: string;
    isActive: boolean;
    role: 'admin' | 'user' | 'guest';
    private password;
    constructor(id: number, username: string, email: string, password: string, role?: 'admin' | 'user' | 'guest', isActive?: boolean);
    validatePassword(password: string): boolean;
    protected getMinPasswordLength(): number;
    changePassword(newPassword: string): boolean;
    checkPassword(inputPassword: string): boolean;
    displayInfo(): void;
}
declare class WebAdminUser extends WebUserAccount {
    private permissions;
    constructor(id: number, username: string, email: string, password: string, permissions?: string[], isActive?: boolean);
    protected getMinPasswordLength(): number;
    addPermission(permission: string): void;
    removePermission(permission: string): void;
    getPermissions(): string[];
    displayInfo(): void;
}
declare function createWebUser(userData: Partial<WebUser>): WebUser;
declare function formatWebUserInfo(user: WebUser | WebUserProfile): string;
declare function showResult(message: string, isError?: boolean): void;
declare function displayUserInfo(user: WebUser | WebUserProfile, account?: WebUserAccount | WebAdminUser): void;
