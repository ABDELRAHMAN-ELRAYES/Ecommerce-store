import { error } from "./../interfaces/error";
export class ErrorType implements error {
  status: string;
  statusCode: number;
  name: string = "";
  message: string;
  constructor(statusCode: number, message: string) {
    this.statusCode = statusCode || 500;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}
