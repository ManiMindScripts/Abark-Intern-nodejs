import * as authServices from "../services/authServices.js"
import { successResponse } from "../utils/responseHandler.js"


export const register = async (req, res, next) => {
    try {
        const user = await authServices.registerUser(req.body)
        return successResponse(res, 201, "User Registered", user)
    } catch (error) {
        next(error)
    }
}

export const login = async (req, res, next) => {
    try {
        const result = await authServices.loginUser(req.body)
        return successResponse(res,201, "login SuccessFul", result)
    } catch (error) {
        next(error)
    }
}