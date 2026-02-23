import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/password.util.js";

export const registerIntern = async (data) => {

    const hashed = await hashPassword(data.password)

    const user = await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashed,
            role: "INTERN"
        }
    })
    await prisma.intern.create({
        data: {
            userId: user.id
        }
    })
    return user
}
export const loginUser = async ({ email, password }) => {
    if(!email || !password){
        throw new Error("These are required")
    }
    const user = await prisma.user.findUnique({
        where: { email },
    })
    if (!user) {
        throw new Error("Invalid credentials")
    }
    const isMatch = await comparePassword(password, user.password)

    if (!isMatch) {
        throw new Error("Invalid credentials")
    }
    return user
}