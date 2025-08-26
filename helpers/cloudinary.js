import cloudinary from  "cloudinary"
import multer from "multer"

cloudinary.config({
  cloud_name: "dtr7p6rlu",
  api_key: "635329623319385",
  api_secret: "0sG71YUUXVDVGNZdV6WKRcO4Dbo",
});

const storage = new multer.memoryStorage();

export default async function imageUploadUtil(file) {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });

  return result;
}

export const upload = multer({ storage });

// module.exports = { upload, imageUploadUtil };