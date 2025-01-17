

import cloudinary from './cloudinary';

export const uploadToCloudinary = async (base64Image) => {
    const imageData = `data:image/jpeg;base64,${base64Image}`;
  try {
    const result = await cloudinary.v2.uploader.upload(imageData, {
      upload_preset: 'AI Image Enhancer',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Upload failed');
  }
};