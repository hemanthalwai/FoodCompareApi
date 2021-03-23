export class Config{

    public config: any;

    constructor(config: any){
        this.config = config;
    }

    public getValue(key: string): string {
        return this.config[key];
    }
}