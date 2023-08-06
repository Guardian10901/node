import { NextFunction } from "express";
import { RequestWithUser } from "../../utils/requestWithUser";
import HttpException from "../exception/http.exception";
import { Role } from "../../utils/role.enum";

const authorize = (role: Role[]) => {
    return async (
        req: RequestWithUser,
        res: Express.Response,
        next: NextFunction
    ) => {
        try {
            const role = req.role;
            if (!(role.includes(req.role))) {
                throw new HttpException(403, "You are not authorized ")
            }
            next();
        } catch (error) {
            next(error);
        }

    }
}
export default authorize;