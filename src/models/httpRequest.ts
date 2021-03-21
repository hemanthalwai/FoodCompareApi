interface Dictionary<T> {
    [key: string]: T;
}

export class HttpRequest {
    private body: any
    private query: any
    private params: Dictionary<string>
    private ip: string
    private method: string
    private path: string
    private headers: any


    constructor(req:
        {
            body: any
            ,query: any
            ,params: any
            ,ip: string
            ,method: string
            ,path: string
            ,headers: any
        }){
            this.body = req.body;
            this.query = req.query;
            this.params = req.params;
            this.ip = req.ip;
            this.method = req.method;
            this.path = req.path;
            this.headers = req.headers;
            Object.freeze(this);
        }

        public getParam(key: string): string{
            return (this.params == null) ? null : this.params[key];
        }
        public getParams(): Dictionary<string>{
            return this.params;
        }
        public getBody(): any{
            return this.body;
        }
}