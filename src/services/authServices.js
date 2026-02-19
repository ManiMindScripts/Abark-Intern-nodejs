import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";
import { generateToken } from "../utils/jwt.util.js";

export const registerUser = async ({ name, email, password }) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    })
    if (existingUser) {
        throw new Error("Email already exists")
    }
    const userRole = await prisma.role.findUnique({
        where: { name: "USER" },
    })
    if (!userRole) {
        throw new Error("User role Not Found")
    }

    const hashedPassword = await hashPassword(password)

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            roleId: userRole.id
        },
    })
    delete user.password
    return user

}

export const loginUser = async ({ email, password }) => {
    const user = await prisma.user.findUnique({
        where: { email },
         include: { role: true }
    })
    if (!user) {
        throw new Error("Invalid credentials")
    }
    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
        throw new Error("Invalid credentials")
    }
    const token = generateToken({
        id: user.id,
        role: user.role.name
    })
    delete user.password
    return { user, token }
}