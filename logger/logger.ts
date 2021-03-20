import { ILogger } from "./ILogger";

export class Logger implements ILogger{

    logWarning(object: string | object): void {
        console.warn(object);
    }
    logSuccess(object: string | object): void {
        console.log(object);
    }
    logError(object: string | object): void {
        console.error(object);
    }
    logInsight(object: string | object): void {
        console.log(object);
    }
    logCritical(object: string | object): void {
        console.error(object);
        const errMsg = typeof(object) === 'string' ? object : JSON.stringify(object);
        throw new Error(errMsg);
    }
    logActivity(object: string | object): void {
        throw new Error("Method not implemented.");
    }
    log(object: string | object): void {
        throw new Error("Method not implemented.");
    }

}