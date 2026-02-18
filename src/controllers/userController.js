import * as userService from "../services/userService.js"
import { successResponse, errorResponse } from "../utils/responseHandler.js"

export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body)
        return successResponse(res, 201, "User created successfully", user)
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers()
        return successResponse(res, 200, "Users fetched successfully", users)
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id)
        if (!user) {
            return errorResponse(res, 404, "User Not Found")
        }
        return successResponse(res, 200, "Users fetched successfully", user)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id)
        return successResponse(res, 200, "User deleted successfully")
    } catch (error) {
        next(error)
    }
}
