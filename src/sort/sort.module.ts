import { Module } from '@nestjs/common';
import { SortController } from './sort.controller';
import { SortServise } from './sort.servise';

@Module({
    controllers: [SortController],
    providers: [SortServise],
    exports: [SortModule],
})
export class SortModule {}
