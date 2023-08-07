import { ValidationError } from "class-validator";

class ValidateException extends Error {
  //public status: number;
  public errors: Object;   
   constructor(errors: ValidationError[], message: string) {
      super(message);
      //this.status = status;
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