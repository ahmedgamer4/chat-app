import { BadRequestException, Injectable } from '@nestjs/common';
import toStream from 'buffer-to-stream';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    if (file.size > 1000000) {
      throw new BadRequestException({
        error: 'Image size limit',
      });
    }

    if (!file.mimetype.startsWith('image')) {
      throw new BadRequestException({
        error: 'The file should be an image',
      });
    }

    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      toStream(file.buffer).pipe(upload);
    });
  }
}
