import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { ConfigService } from '@nestjs/config';

// cloudinary.v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

@Injectable()
export class MediaService {
  constructor(private readonly configService: ConfigService) {}
  async onModuleInit() {
    cloudinary.v2.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  async uploadImage(file: Express.Multer.File, tags?: string[]): Promise<any> {
    try {
        console.log('Uploading image...')
        const result = await cloudinary.v2.uploader.upload(file.path, {
            folder: 'inminutes',
            resource_type: 'image',
            use_filename: true,
            unique_filename: true,
            overwrite: false,
            tags: tags?.join(","),
        });
        return result.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new InternalServerErrorException('Unknown error, please try again');
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.v2.uploader.destroy(publicId);
    } catch (error) {
      console.error({error});
      throw new InternalServerErrorException('Unknown error, please try again');
    }
  }
}