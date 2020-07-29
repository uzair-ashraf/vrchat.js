export declare class AuthError extends Error {
    status: number;
    response: object;
    constructor(status: number, response: object);
}
