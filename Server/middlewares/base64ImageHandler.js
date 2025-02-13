// base64ImageHandler.js
const fs = require("fs/promises");
const path = require("path");

const handleBase64Images = async (photos, folder) => {
  try {
    // console.log(photos,path);
    if (!photos || !Array.isArray(photos) || photos.length === 0) {   
      throw new Error("No images provided!");
    }

    if (photos.length > 4) {
        throw new Error("You can only upload up to 4 images.");
    }

    // const allowedFormats = ["jpeg", "jpg", "png","pdf"]; 
    const uploadDir = path.join(__dirname, `../uploads/${folder}`);
    

    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const savedFiles = [];

    for (const [index, base64Image] of photos.entries()) {
      // Check if the base64 image has the correct prefix for image type
      // const match = base64Image.match(/^data:image\/([a-zA-Z0-9]+|application\/pdf);base64,/);
      // /^data:image\/([a-zA-Z0-9]+);base64,/
      const match = base64Image.match(/^data:(image\/(jpeg|jpg|png)|application\/pdf);base64,/);
      // console.log('hi-1')

      if (!match) {
        throw new Error(`Image ${index + 1} does not have a valid base64 format. ${folder}`);
      }
      // console.log('hi-2');
      // console.log(match)

      const allowedFormats = ["jpeg", "jpg", "png","pdf"];

      const mimeType = match[1]; // Extract MIME type
      const ext = mimeType.includes("image/") ? match[2] : "pdf";
      // mimeType.toLowerCase();
      // .split("/")[1]
      // console.log('hi-3')
      // Validate the image format
      if (!allowedFormats.includes(ext)) {
        throw new Error(`Invalid format for image ${index + 1}. Allowed formats are jpeg, jpg, png, pdf.`);
      }

      // console.log('hi-4')

      const imageData = base64Image.replace(/^data:image\/\w+;base64,/, "");
      const fileName = `${Date.now()}_${index + 1}.${ext}`;
      const filePath = path.join(uploadDir, fileName);

      // console.log('hi-5')

      try {
        // Ensure the base64 data is valid
        const buffer = Buffer.from(imageData, "base64");
        await fs.writeFile(filePath, buffer); // Write the buffer to a file
        savedFiles.push({ fileName, filePath });

        // console.log('hi-6')

      } catch (err) {
        throw new Error(`Error writing image ${index + 1} to disk: ${err.message}`);
      }
    }

    return savedFiles; // Return the list of saved file info

  } catch (error) {
    throw new Error(`Error processing base64 images: ${error.message}`);
  }
};

module.exports = handleBase64Images;