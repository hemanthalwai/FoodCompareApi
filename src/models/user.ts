export class User{
    private userId: string;
    private email: string;
    private password: string;

    private name: string;
    private createdOn: Date;

    public getUserId = () => this.userId;
    public getName = () => this.name;
    public getemail = () => this.email;


    constructor({email = null, name = '' } = {}) {
        if(!email){
            throw new Error('Name for a Menu Category is mandatory');
        }
        Object.freeze<User>(this);
    }
}