import { IAuthService } from "./IAuthService";
import jwt from 'jsonwebtoken';
import { ILogger } from "../logger/ILogger";
import { Config } from "../config/index";

export class JwtAuthService implements IAuthService{

    private config;
    private logger: ILogger;
    private isLoggerInitialized: boolean;

    constructor(config: Config, logger = null) {
        this.config = config;
        this.logger = logger;
        if(this.logger){
            this.isLoggerInitialized = true;
        }
    }

    getToken(payload: {}): string | object {
        return jwt.sign(payload, this.config.ACCESS_TOKEN_SECRET);
    }

    verifyToken(token: string): boolean {
        let verifyTokenResult = false;
        try{
            jwt.verify(token, this.config.ACCESS_TOKEN_SECRET);
            verifyTokenResult = true;
        }
        catch(err){
            if(this.isLoggerInitialized) {
                this.logger.logInsight(err.message);
            }
        }
        return verifyTokenResult;
    }

    refreshToken(): string | object {
        throw new Error("Method not implemented.");
    }

    invalidateToken(token: string): void {
        throw new Error("Method not implemented.");
    }
}