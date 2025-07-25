interface Car {
    readonly brand: string;
    speed: number;
    start(): void;
}
declare class MyCar implements Car {
    readonly brand: string;
    speed: number;
    constructor(brand: string, speed: number);
    start(): void;
}
declare const toyota: MyCar;
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
declare const employee: Employee;
declare const employeeInterface: EmployeeInterface;
type Dictionary<T = any> = {
    [key: string]: T;
};
type StringDictionary = Dictionary<string>;
type NumberDictionary = Dictionary<number>;
declare const config: StringDictionary;
declare const scores: NumberDictionary;
type FlexibleDictionary = {
    [key: string]: string | number | boolean;
    name: string;
    count: number;
};
declare const flexible: FlexibleDictionary;
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
declare const partialUser: PartialUser;
type BuiltInPartial = Partial<User>;
declare const builtInPartialUser: BuiltInPartial;
type RequiredFields<T> = {
    [K in keyof T]-?: T[K];
};
type UserNameEmail = Pick<User, "name" | "email">;
type UserWithoutId = Omit<User, "id">;
declare const nameEmail: UserNameEmail;
declare const userWithoutId: UserWithoutId;
type UserRole = "admin" | "user" | "guest";
type RolePermissions = Record<UserRole, string[]>;
declare const permissions: RolePermissions;
type IsString<T> = T extends string ? true : false;
type Test1 = IsString<string>;
type Test2 = IsString<number>;
