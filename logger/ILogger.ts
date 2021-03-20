export interface ILogger{

    // LOG_STATUS: 'SUCCESS' | 'CRITICAL';
    logWarning?(object: string | object): void;
    logSuccess(object: string | object): void;
    logError(object: string | object): void;
    logInsight?(object: string | object): void;
    logCritical?(object: string | object): void;
    logActivity?(object: string | object): void;
}