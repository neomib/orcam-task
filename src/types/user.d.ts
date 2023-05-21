export interface User {
    userId: string;
    email: string;
    role: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    createdAt: string;
    country: string;
}