export class MenuCategory{
    private categoryId: string;
    private name: string;
    private createdOn: Date;

    public getCategoryId = () => this.categoryId;
    public getName = () => this.name;
    public getCreatedOn = () => this.createdOn


    constructor({categoryId = '', name = '', createdOn = new Date().toISOString()} = {}) {
        this.categoryId = categoryId;
        this.name = name;
        // tslint:disable
        // this.createdOn = createdOn;

        if(!name){
            throw new Error('Name for a Menu Category is mandatory');
        }
        Object.freeze<MenuCategory>(this);
    }
}