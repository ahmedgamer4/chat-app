import { v2 } from 'cloudinary';
import cloudinaryConfig from 'src/config/cloudinary.config';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  useFactory: () => {
    return v2.config(cloudinaryConfig);
  },
};
