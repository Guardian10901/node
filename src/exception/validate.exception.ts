import { ValidationError } from "class-validator";

class ValidateException extends Error {
  public status: number;
  public errors: Object;
  constructor(status: number, message: string, error: ValidationError[]) {
    super(message);
    this.status = status;
    this.errors = this.getFormat(error);
  }
  getFormat(error:ValidationError[]): Object{
    const err: Object  ={}
    error.forEach(element => {
      
      err[ element.property] = element.constraints.values;
      
    });
    console.log(err);
    return err;

    

  }


}

export default ValidateException;