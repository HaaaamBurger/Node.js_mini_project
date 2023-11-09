import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { User } from "../models";
import { passwordService } from "../services";

class AuthRepository {
    public async registerIn(body: IUser): Promise<void> {
        try {
            const hashedPassword = await passwordService.hash(body.password);
            await User.create({...body ,password: hashedPassword});
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authRepository = new AuthRepository();