import { roles } from "../../Middleware/auth.js"

export const endPoint={
    create:[roles.Admin],
    getall:[roles.Admin],
    getSpecific:[roles.User,roles.Admin],
    update:[roles.Admin],
    getActive:[roles.User,roles.Admin]
}