import dotenv from "dotenv";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

export default cloudinary;

export const uploadToCloudinary = (fileBuffer: Buffer, folder: string): Promise<UploadApiResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result as UploadApiResponse);
                }
            }
        );

        Readable.from(fileBuffer).pipe(uploadStream);
    });
};
