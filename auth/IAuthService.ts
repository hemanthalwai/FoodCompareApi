export interface IAuthService{
    getToken(payload: {}): string | object;
    verifyToken(token: string): boolean;
    refreshToken(): string | object;
    invalidateToken(token: string): void;
}