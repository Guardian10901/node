import HttpException from "../exception/http.exception"

class ForbiddenException extends HttpException {
    constructor() {
        super(403, "Forbidden Access");
    }
}

export default ForbiddenException;