import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      if (file.fieldname === 'image') {
        cb(null, './uploads/images/');
      } else if (file.fieldname === 'audio') {
        cb(null, './uploads/audios/');
      }
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = uuidv4();
      const ext = extname(file.originalname);
      cb(null, `${uniqueSuffix}${ext}`);
    },
  }),
};

export const getFileNames = (files) => {
  const image = files.image[0];
  const audio = files.audio[0];

  return {
    imageFileName: image.filename,
    audioFileName: audio.filename,
  };
};