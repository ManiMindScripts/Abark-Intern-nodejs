import { prisma } from "../config/prisma.js";

export const getAllUsers = async () => {
    return await prisma.user.findMany({
       include: { role: true }
    })
}

export const getUserById = async (id) => {
     return await prisma.user.findUnique({
        where: { id: Number(id) },
         include: { role: true }
     })
}

export const deleteUser = async (id) => {
     return await prisma.user.delete({
        where: { id: Number(id) },
     })
}