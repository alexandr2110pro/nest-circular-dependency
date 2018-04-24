import { Controller, Get } from '@nestjs/common';
import { BarService } from './bar.service';

@Controller('bar')
export class BarController {
  constructor(private readonly barService: BarService) {}

  @Get()
  async find(): Promise<{ data: string }> {
    return await this.barService.check();
  }
}
