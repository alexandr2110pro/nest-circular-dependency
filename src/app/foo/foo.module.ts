import { forwardRef, Module } from '@nestjs/common';
import { BarModule } from '../bar';
import { FooService } from './foo.service';

@Module({
  imports: [forwardRef(() => BarModule)],
  components: [FooService],
  exports: [FooService],
})
export class FooModule {}
