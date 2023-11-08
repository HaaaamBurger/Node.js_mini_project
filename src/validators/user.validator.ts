import joi, { ObjectSchema } from "joi";
import { regexConstants } from "../constants";

export class UserValidator {
    static username = joi.string().min(2).max(20).trim();
    static surname = joi.string().min(2).max(28).trim();
    static age = joi.number().min(18).max(99);
    static email = joi.string().regex(regexConstants.EMAIL).trim();
    static password = joi.string().regex(regexConstants.PASSWORD).trim();

    static register = joi.object({
        username: this.username.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        email: this.email.required(),
        password: this.password.required(),
    })
}