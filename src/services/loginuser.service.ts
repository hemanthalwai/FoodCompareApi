import { User } from "../models/user";
import { DBHelper } from "../data-access";

class LoginUserService{

    private dbHelper: DBHelper;
    constructor(dbHelper: DBHelper) {
        this.dbHelper = dbHelper;
    }
    getUserByEmail = (email: string) : User=> {
        return null;
    }
}

export function loginUserService() {
     return (dBHelper: DBHelper) => {
       const loginservice = new LoginUserService(dBHelper);
}
};