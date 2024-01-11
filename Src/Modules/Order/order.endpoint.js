import { roles } from "../../Middleware/auth.js"

export const endPoint={
    create:[roles.User],
    getall:[roles.User],
    getSpecific:[roles.User,roles.Admin],
    update:[roles.Admin]
}