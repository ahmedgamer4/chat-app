export declare class User {
    id: number;
    name: string;
    passwordHash: string;
    messages: string[];
    groups: string[];
    bio?: string;
    photo?: string;
    email: string;
    phone?: string;
    googleId?: string;
    githubId?: string;
    facebookId?: string;
}
