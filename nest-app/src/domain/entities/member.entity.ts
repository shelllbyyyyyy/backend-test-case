import { Book } from './book.entity';

export class Member {
  constructor(
    public readonly code: string,
    public readonly name: string,
    public readonly books?: Book[],
    public penalty?: boolean,
    public penalizedAt?: Date,
  ) {}
}
