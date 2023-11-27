import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
    async resizeImage(inputPath: string, outputPath: string, width: number, height: number) {
        await sharp(inputPath).resize(width, height).toFile(outputPath);
    }
}
