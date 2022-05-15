import { Module } from '@nestjs/common';
import { FileResolver } from './upload.resolver';

@Module({
  providers: [FileResolver],
})
export class UploadModule {}
