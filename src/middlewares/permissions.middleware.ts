import { Request, Response, NextFunction } from "express";

import { tokenService } from "../services";
import { ApiError } from "../errors";

class PermissionsMiddleware {
    public isRoleAllowed(role: string[]) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const tokenPayload = tokenService.checkToken(req.get("Authorization"), "access");
                if (!role.includes(tokenPayload.account_role)) {
                    throw new ApiError("No permission", 403);
                }
                next()
            } catch (e) {
                next(e);
            }
        }
    }
}

export const permissionsMiddleware = new PermissionsMiddleware();