import { IAuthGuard } from "./auth-guard.interface";

export class AuthGuard implements IAuthGuard{

    private authService;
    constructor(authService) {
        this.authService = authService;
    }

    authenticate(req: Request, res: Response, callback: () => void) {
        
    }
   
}