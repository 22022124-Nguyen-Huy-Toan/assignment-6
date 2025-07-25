declare function sum(a: number, b?: number): number;
declare const sumArrow: (a: number, b?: number) => number;
declare function mergeStrings(...strings: string[]): string;
declare function mergeStringsWithSeparator(separator: string, ...strings: string[]): string;
declare function getValue(input: string): string;
declare function getValue(input: number): number;
declare function createArray(length: number): number[];
declare function createArray(item: string): string[];
declare function createArray(items: string[]): string[];
declare function filterArray<T>(arr: T[], condition: (item: T) => boolean): T[];
declare const numbers: number[];
declare const strings: string[];
declare const users: {
    name: string;
    age: number;
}[];
declare const filteredNumbers: number[];
declare const filteredStrings: string[];
declare const filteredUsers: {
    name: string;
    age: number;
}[];
declare function mapAndFilter<T, U>(arr: T[], mapper: (item: T) => U, filter: (item: U) => boolean): U[];
declare const numberToStringFiltered: string[];
declare function getProperty<T, K extends keyof T>(obj: T, key: K): T[K];
declare const person: {
    name: string;
    age: number;
    city: string;
};
declare const personName: string;
declare const personAge: number;
