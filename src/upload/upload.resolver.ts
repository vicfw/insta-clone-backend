import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Query } from '@nestjs/common';
const fs = require('fs').promises;

@Resolver()
export class FileResolver {
  constructor() {}

  @Mutation(() => String)
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename, mimetype }: FileUpload,
  ): Promise<string> {
    const fileType = mimetype.split('/');

    const uploadDir = './uploads';

    const path = `${uploadDir}/${Date.now()}.${fileType[1]}`;
    const fileName = `${Date.now()}.${fileType[1]}`;

    return new Promise(async (resolve, reject) => {
      if (!fileType[0].includes('image')) {
        return reject('Unsupported file type');
      }

      createReadStream()
        .on('error', async (error) => {
          if (error.message.includes('truncated')) {
            await fs.unlink(path);
            return reject(error);
          }
          return reject(error);
        })
        .pipe(createWriteStream(path))
        .on('finish', () => {
          return resolve(fileName);
        })

        .on('error', (error) => {
          return reject(error);
        });
    });
  }
}
