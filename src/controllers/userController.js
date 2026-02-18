import * as userService from "../services/userService.js"

export const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body)
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await userService.getAllUsers()
        res.json(users)
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id)
        if (!user) {
            res.status(401).json({ message: "User not found" })
        }
        res.json(user)
    } catch (error) {
        next(error)
    }
}
export const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id)
        res.json({ message: "User deleted successfully" })
    } catch (error) {
        next(error)
    }
}
