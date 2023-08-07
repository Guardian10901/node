import { ValidationError } from "class-validator";
import HttpException from "./http.exception";

class ValidateException extends HttpException{
  
  public errors: Object;   
   constructor(errors: ValidationError[]) {
     super(400,"Validation Error");
      this.errors = this.parseErrors(errors);
      console.log(this.errors);
  }    
  
  parseErrors = (errors: ValidationError[]) => {
      let errorObject = {};
      for (let e of errors) {
          if (e.children.length === 0) {
              errorObject[e.property] = Object.values(e.constraints);
          } else {
              errorObject[e.property] = this.parseErrors(e.children);
          }
      }
      return errorObject;
  };
}
export default ValidateException;