import { ApiError } from "../errors";
import {ITokenPair, ITokenPayload, IUser, TUserCredentials } from "../interfaces";
import { User } from "../models";
import { userRepository } from "../repositories";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";


class AuthService {
    public async registerIn(body: IUser): Promise<void> {
        try {
            const hashedPassword = await passwordService.hash(body.password);
            await User.create({...body ,password: hashedPassword});
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

            const tokenPair = tokenService.generateToken({
                _userId: user.id ,
                email: credentials.email,
                account_status: user.account_status,
                account_role: user.account_role,
            });
            return tokenPair;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }

    public async refreshIn(tokenPayload: ITokenPayload): Promise<ITokenPair> {
        try {
            const tokenPair = tokenService.generateToken({
                _userId: tokenPayload._userId,
                email: tokenPayload.email,
                account_status: tokenPayload.account_status,
                account_role: tokenPayload.account_role
            })

            return tokenPair;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authService = new AuthService();