export interface role{
    key?: string,
    role?: string,
    description?:string,
}

export enum Role {
    SuperAdmin = "SuperAdmin",
    Admin = "Admin",
    Subscriber = "Subscriber"
}