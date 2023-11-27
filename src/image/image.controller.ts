import { Controller, Get, Param, Post, UploadedFile, UseInterceptors, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { Public } from '@common/decorators';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Public()
@Controller('image')
export class ImageController {
    constructor(
        private readonly imageService: ImageService,
        private readonly configService: ConfigService,
    ) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        const inputPath = file.path;
        const outputPath = `./uploads/resized-${file.originalname}`;
        const width = 300;
        const height = 200;

        await this.imageService.resizeImage(inputPath, outputPath, width, height);

        const downloadLink = `${this.configService.get('APP_BASE_URL')}api/image/download/resized-${file.originalname}`;

        return res.json({ message: 'File uploaded, resized, and saved to the database successfully', downloadLink });
    }

    @Get('download/:filename')
    async downloadImage(@Param('filename') filename: string, @Res() res: Response) {
        const filePath = `./uploads/${filename}`;
        const file = await fs.promises.readFile(filePath);

        res.setHeader('Content-Type', 'image/jpg');
        res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

        return res.send(file);
    }
}
