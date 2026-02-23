import * as authServices from "../services/authServices.js"
import { generateToken } from "../utils/jwt.util.js"
import { successResponse } from "../utils/responseHandler.js"


export const register = async (req, res, next) => {
    try {
        const user = await authServices.registerIntern(req.body)
        return successResponse(res, 201, "Intern Registered SuccessFully", user)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const user = await authServices.loginUser({
          email:  req.body.email,
          password:  req.body.password
     })
        const token = generateToken({
            id: user.id,
            role: user.role
        })
        return successResponse(res, 201, "login SuccessFul", {
            token
        })
    } catch (error) {
        next(error)
    }
}