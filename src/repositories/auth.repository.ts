import { IUser } from "../interfaces";
import { User } from "../models";

class AuthRepository {
    public async register(body: IUser) {
         await User.create(body);
    }


}

export const authRepository = new AuthRepository();