import { roles } from "../../Middleware/auth.js"

export const endPoint={
    create:[roles.User],
    get:[roles.User],
    cancel:[roles.User],
    changeStatus:[roles.Admin]
}