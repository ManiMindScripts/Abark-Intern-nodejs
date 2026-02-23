import * as internService from "../services/intern.services.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

export const createIntern = async (req, res, next) => {
    try {
        const intern = await internService.createIntern(req.body);
        return successResponse(res, 200, "Intern created successfully", intern)
    } catch (error) {
        next(error);
    }
};

export const getAllInterns = async (req, res, next) => {
    try {
        const interns = await internService.getAllInterns();
        return successResponse(res, 200, "Interns fetched successfully", interns)
    } catch (error) {
        next(error);
    }
};

export const getInternById = async (req, res, next) => {
    try {
        const intern = await internService.getInternById(req.params.id);
        if (!intern) return errorResponse(res, 400, "Intern not Found")
        return successResponse(res, 200, "Intern fetched successfully", intern)
    } catch (error) {
        next(error);
    }
};

export const deleteIntern = async (req, res, next) => {
    try {
        await internService.deleteIntern(req.params.id);
        return successResponse(res, 200, "Deleted successfully")
    } catch (error) {
        next(error);
    }
};

export const uploadProfileImage = async (req, res, next) => {
    try {
        const internId = req.params.id;
        const filePath = req.file?.path;
        if (!filePath) return errorResponse(res, 400, "Missing");

        const intern = await internService.updateInternProfileImage(internId, filePath);
        return successResponse(res, 200, "Image uploaded successfully", intern)
    } catch (error) {
        next(error);
    }
};