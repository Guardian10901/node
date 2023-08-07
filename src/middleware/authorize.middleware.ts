import { NextFunction } from "express";
import { RequestWithUser } from "../../utils/requestWithUser";
import HttpException from "../exception/http.exception";
import { Role } from "../../utils/role.enum";
import ForbiddenException from "../exception/forbidden.exception";

const authorize = (role: Role[]) => {
    return async (
        req: RequestWithUser,
        res: Express.Response,
        next: NextFunction
    ) => {
        try {
            const role = req.role;
            if (!(role.includes(req.role))) {
                throw new ForbiddenException()
            }
            next();
        } catch (error) {
            next(error);
        }

    }
}
export default authorize;