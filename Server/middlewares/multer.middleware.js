const multer = require("multer");
const path = require("path");
const fs = require("fs/promises"); 

const getCurrentDate = () => {
  return Date.now().toString();
};

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    let folderPath = ''
    try {
      switch(file.fieldname){
        case 'aadharCardAttachment':
            folderPath = 'uploads/aadharCardAttachments';
            break;
        case 'panCardAttachment':
            folderPath = 'uploads/panCardAttachments';
            break;
        case 'bankAttachment':
            folderPath = 'uploads/bankAttachments';
            break;
        case 'joiningFormAttachment':
            folderPath = 'uploads/joiningForms';
            break;
        case 'otherAttachment':
            folderPath = 'uploads/otherAttachments';
            break;
        default:
            folderPath = 'uploads/others';
      }
      await fs.mkdir(folderPath, { recursive: true }); 
      cb(null, folderPath);
    } 
    catch (error) {
      cb(new Error("Failed to create uploads directory"));
    }
  },
  filename: (req, file, cb) => {
    const currentDate = getCurrentDate();
    const fileExtension = path.extname(file.originalname).toLowerCase();
    cb(null, `${currentDate}${fileExtension}`);
  },
});


const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Only image files with .jpeg, .jpg, or .png extensions are allowed!"
      )
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

module.exports =  upload;