import { forwardRef, Module } from '@nestjs/common';
import { FooModule } from '../foo';
import { BarService } from './bar.service';
import { BarController } from './bar.controller';

@Module({
  imports: [forwardRef(() => FooModule)],
  components: [BarService],
  controllers: [BarController],
  exports: [BarService],
})
export class BarModule {}
