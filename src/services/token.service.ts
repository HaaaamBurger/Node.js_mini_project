import * as jwt from "jsonwebtoken";

import {ITokenPair, ITokenPayload } from "../interfaces";
import { configs } from "../configs";
import { ApiError } from "../errors";

class TokenService {
    public generateToken(payload: ITokenPayload): ITokenPair {
        const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, {
            expiresIn: "2h"
        });

        return {
            accessToken,
            refreshToken
        }
    }

    public checkToken(token: string, type: "access" | "refresh"): ITokenPayload {
        try {
            let secret: string;

            switch (type) {
                case "access":
                    secret = configs.JWT_ACCESS_SECRET;
                    break;
                case "refresh":
                    secret = configs.JWT_REFRESH_SECRET;
                    break;
            }
            return jwt.verify(token, secret) as ITokenPayload;
        } catch (e) {
            throw new ApiError(e.message, e.status);
        }
    }
}

export const tokenService = new TokenService();
