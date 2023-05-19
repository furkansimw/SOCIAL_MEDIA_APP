import cloudinary from "cloudinary";
const cd = cloudinary.v2;

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

cloudinary.v2.config({ cloud_name, api_key, api_secret });

const upload = (image: string, public_id: string, folder: string) =>
  cd.uploader.upload(image, { folder, public_id }).then((r) => r.url);

const destroy = (public_id: string, folder: string) =>
  cd.uploader.destroy(folder + public_id);

export { upload, destroy };
