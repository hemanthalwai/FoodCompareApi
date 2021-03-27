export interface IAuthGuard{

    authenticate(req: Request, res: Response, callback: () => void);
}