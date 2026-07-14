import multer from 'multer'; import { ApiError } from '../utils/apiError.js';
const storage = multer.memoryStorage(); export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: (_req, file, cb) => cb(null, /^(image\/(jpeg|png|webp)|application\/pdf)$/.test(file.mimetype)) });
export const uploadError = (err, _req, _res, next) => { if (err instanceof multer.MulterError) return next(new ApiError(400, err.message)); next(err); };
