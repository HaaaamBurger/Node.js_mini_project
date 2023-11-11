import joi from "joi";

import { regexConstants } from "../constants";
import { EAccountRoles, EAccountTypes, ESpecialAccountRoles } from "../enums";

export class UserValidator {
    static username = joi.string().min(2).max(20).trim();
    static surname = joi.string().min(2).max(28).trim();
    static age = joi.number().min(18).max(99);
    static phone_number = joi.string().regex(regexConstants.PHONE_NUMBER);
    static email = joi.string().regex(regexConstants.EMAIL).trim();
    static password = joi.string().regex(regexConstants.PASSWORD).trim();
    static account_role = joi.valid(...Object.values(EAccountRoles))
    static special_role = joi.valid(...Object.values(ESpecialAccountRoles));
    static account_type = joi.valid(...Object.values(EAccountTypes))


    static registerIn = joi.object({
        username: this.username.required(),
        surname: this.surname.required(),
        age: this.age.required(),
        phone_number: this.phone_number.required(),
        email: this.email.required(),
        password: this.password.required(),
        account_role: this.account_role.required(),
    })

    static logIn = joi.object({
        email: this.email.required(),
        password: this.password.required(),
    })

    static updateUser = joi.object({
        username: this.username,
        surname: this.surname,
        age: this.age,
        phone_number: this.phone_number,
        account_role: this.account_role,
        email: this.email,
        password: this.password,
    })
    static updateRole = joi.object({
        special_role: this.special_role.required()
    })
    static updateType = joi.object({
        account_type: this.account_type,
    })
}
