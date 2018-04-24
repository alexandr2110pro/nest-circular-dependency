import { Component, forwardRef, Inject } from '@nestjs/common';
import { BarService } from '../bar';

@Component()
export class FooService {
  constructor(
    @Inject(forwardRef(() => BarService))
    private readonly barService: BarService
  ) {}

  public doesItWork(): string {
    return this.barService.addExclamation('works');
  }
}
