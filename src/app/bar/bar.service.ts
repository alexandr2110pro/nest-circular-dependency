import { Component, forwardRef, Inject } from '@nestjs/common';
import { FooService } from '../foo';

@Component()
export class BarService {
  constructor(
    @Inject(forwardRef(() => FooService))
    private readonly fooService: FooService
  ) {}

  public async check(): Promise<{ data: string }> {
    return {
      data: `foo ${this.fooService.doesItWork()}`,
    };
  }

  public addExclamation(string: string): string {
    return `${string}!`;
  }
}
