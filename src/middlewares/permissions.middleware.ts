import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors";
import { tokenService } from "../services";

class PermissionsMiddleware {
  public isRoleAllowed(role: string[]) {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        const tokenPayload = tokenService.checkToken(
          req.get("Authorization"),
          "access",
        );
        if (!role.includes(tokenPayload.account_role)) {
          throw new ApiError("No permission", 403);
        }
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const permissionsMiddleware = new PermissionsMiddleware();
