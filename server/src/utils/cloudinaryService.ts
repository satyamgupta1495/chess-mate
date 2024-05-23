import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
}
cloudinary.config(config);

export const uploadToCloudinary = async (filePath: string) => {
    try {
        if (!filePath) return null;
        //! Ensure the file path uses the correct slashes for the operating system
        const normalizedPath = path.resolve(filePath);

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(normalizedPath, {
            resource_type: 'auto'
        });
        // Delete the file saved on the local machine after upload
        fs.unlinkSync(normalizedPath);
        return uploadResult;

    } catch (error) {

        console.error("Error during file upload:", error);
        // Attempt to delete the file saved on the local machine in case of error
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return null;
    }
};
