import { upload } from "../db/cloudinary";

export default (id: string, img: string) => upload(img, `${id}-pp`, "pp");
