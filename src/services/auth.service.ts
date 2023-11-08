import { ApiError } from "../errors";
import {ITokenPair, IUser, TUserCredentials } from "../interfaces";
import { authRepository, userRepository } from "../repositories";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";


class AuthService {
    public async registerIn(body: IUser): Promise<void> {
        try {
            await authRepository.registerIn(body);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async logIn(credentials: TUserCredentials): Promise<ITokenPair> {
        try {
            const user = await userRepository.getOneByParams({email: credentials.email});
            if (!user) {
                throw new ApiError("Invalid credentials provided", 401)
            }
            const isMatched = await passwordService.compare(credentials.password, user.password);
            if (!isMatched) {
                throw new ApiError("Invalid credentials provided", 401);
            }

            const tokenPair = tokenService.generateToken({ _userId: user.id ,email: credentials.email, account_status: user.acount_status});
            return tokenPair;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authService = new AuthService();