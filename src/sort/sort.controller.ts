import {Controller, Get} from '@nestjs/common';
import { SortService } from './sort.servise';
import {SortDto} from "./dto/sort.dto";


@Controller()
export class SortController {
    constructor(private readonly sortServise: SortService
    ) {}

    @Get('Sort')
    GetRat(sortDto:SortDto): any {
        return this.sortServise.GetSort(sortDto);
    }
}
