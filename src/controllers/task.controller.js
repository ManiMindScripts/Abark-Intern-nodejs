import * as taskService from "../services/task.services.js";
import { successResponse,errorResponse } from "../utils/responseHandler.js";

export const createTask = async (req, res, next) => {
  try {
    const { title, description, internId } = req.body;
    const attachment = req.file?.path || null;

    const task = await taskService.createTask({ title, description, internId, attachment });
    successResponse(res, 201, "Task created successfully",task);
  } catch (error) {
    next(error);
  }
};

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks();
    successResponse(res, 200, "Tasks fetched successfully",tasks);
  } catch (error) {
    next(error);
  }
};

export const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return errorResponse(res, 404,  "Task not found");
    successResponse(res, 200, "Task fetched successfully",task);
  } catch (error) {
    next(error);
  }
};

export const updateTaskStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const task = await taskService.updateTaskStatus(req.params.id, status);
    successResponse(res, 200, "Task status updated successfully",task);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.params.id);
    successResponse(res, 200, "Task deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const uploadTaskAttachment = async (req, res, next) => {
  try {
    const attachmentPath = req.file?.path;
    if (!attachmentPath) return errorResponse(res, 400, "File missing");

    const task = await taskService.updateTaskAttachment(req.params.id, attachmentPath);
     return successResponse(res, 200, "Task attachment uploaded successfully", task)
  } catch (error) {
    next(error);
  }
};

export const downloadTaskAttachment = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task || !task.attachment) return errorResponse(res, 404, "Attachment not found");

    res.setHeader("Content-Disposition", `attachment; filename=${task.attachment.split("/").pop()}`);
    res.setHeader("Content-Type", "application/octet-stream");

    const fs = await import("fs");
    const stream = fs.createReadStream(task.attachment);
    stream.pipe(res);
  } catch (error) {
    next(error);
  }
};