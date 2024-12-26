// const multer = require("multer")

// const storage = multer.diskStorage({
//     destination : function(req,file,cb){
//         cb(null,"./uploads/temp")
//     },
//     filename : function(req,file,cb){
//         const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//         cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
// })

// const upload = multer({
//     storage
// });

// module.exports = upload;

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
})
// .array("photos", 5); ;

// const uploadHandler = (req, res, next) => {
//   upload(req, res, (err) => {
//     if (err) {
//       if (err.code === 'LIMIT_FILE_SIZE') {
//         return res.status(400).json({
//           success: false,
//           message: "Please upload an image less than 5 MB!",
//         });
//       }
//       return res.status(400).json({
//         success: false,
//         message: err.message,
//       });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "No files uploaded!",
//       });
//     }
//     next();
//   });
// };

module.exports =  upload;






/*

const multer = require('multer');
const path = require('path');

// Define storage for different file types
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let folder = '';

        // Check file field name to determine folder
        switch (file.fieldname) {
            case 'aadharCardAttachment':
                folder = 'uploads/aadharCardAttachments';
                break;
            case 'panCardAttachment':
                folder = 'uploads/panCardAttachments';
                break;
            case 'bankAttachment':
                folder = 'uploads/bankAttachments';
                break;
            case 'joiningFormAttachment':
                folder = 'uploads/joiningForms';
                break;
            case 'otherAttachment':
                folder = 'uploads/otherAttachments';
                break;
            default:
                folder = 'uploads/others';
        }
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Define the file filter
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Unsupported file type!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // Max 5MB
});

module.exports = upload;

*/