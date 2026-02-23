import { prisma } from "../config/prisma.js";


export const createIntern =  async(userId,profileImage) => {
    return await prisma.intern.create({
        data:{
            userId,
            profileImage
        }
    })
}

export const getAllInterns = async () => {
    return await prisma.intern.findMany({
        include:{user: true, tasks: true}
    })
}

export const getInternById = async (id) =>{
    return await prisma.intern.findUnique({
        where:{id: Number(id)},
        include:{user: true, tasks: true}
    })
}

export const deleteIntern = async (id) => {
   return await prisma.intern.delete({
      where:{id: Number(id)}
   })
}
export const updateInternProfileImage = async (id,profileImage) => {
    return await prisma.intern.update({
        where:{id: Number(id)},
        data:{profileImage}
    })
}