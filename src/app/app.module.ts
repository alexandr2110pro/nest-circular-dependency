import { Module } from '@nestjs/common';

import { FooModule } from './foo';
import { BarModule } from './bar';

@Module({
  imports: [FooModule, BarModule],
})
export class ApplicationModule {}
