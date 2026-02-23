import { prisma } from "../config/prisma.js";


export const createTask = async ({ title, description, internId, attachment }) => {
  return await prisma.task.create({
    data: {
      title,
      description,
      internId: Number(internId),
      attachment: attachment || null,
    },
  });
};


export const getAllTasks = async () => {
  return await prisma.task.findMany({
    include: { intern: { include: { user: true } } },
  });
};

export const getTaskById = async (id) => {
  return await prisma.task.findUnique({
    where: { id: Number(id) },
    include: { intern: { include: { user: true } } },
  });
};

export const updateTaskStatus = async (id, status) => {
  return await prisma.task.update({
    where: { id: Number(id) },
    data: { status },
  });
};


export const deleteTask = async (id) => {
  return await prisma.task.delete({
    where: { id: Number(id) },
  });
};

export const updateTaskAttachment = async (id, attachmentPath) => {
  return await prisma.task.update({
    where: { id: Number(id) },
    data: { attachment: attachmentPath },
  });
};