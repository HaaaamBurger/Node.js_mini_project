import { ApiError } from "../errors";
import { IUser } from "../interfaces";
import { authRepository } from "../repositories";

class AuthService {
    public async register(body: IUser) {
        try {
            await authRepository.register(body);
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const authService = new AuthService();