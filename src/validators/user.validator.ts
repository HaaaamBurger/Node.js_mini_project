import joi from "joi";
import { regexConstants } from "../constants";
import { EAccountRoles } from "../enums";

export class UserValidator {
    static username = joi.string().min(2).max(20).trim();
    static surname = joi.string().min(2).max(28).trim();
    static age = joi.number().min(18).max(99);
    static account_role = joi.valid(...Object.values(EAccountRoles))
    static email = joi.string().regex(regexConstants.EMAIL).trim();
    static password = joi.string().regex(regexConstants.PASSWORD).trim();

    static registerIn = joi.object({
        username: this.username.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        account_role: this.account_role.required(),
        email: this.email.required(),
        password: this.password.required(),
    })

    static logIn = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    })

    static updateUser = joi.object({
        username: this.username,
        surname: this.surname,
        age: this.age,
        account_role: this.account_role,
        email: this.email,
        password: this.password,
    })
}