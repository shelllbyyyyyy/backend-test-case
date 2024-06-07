export class Book {
  constructor(
    public readonly code: string,
    public readonly title: string,
    public readonly author: string,
    public readonly stock: number,
    public borrowedByMember?: string,
    public borrowedAt?: Date,
    public returnedAt?: Date,
  ) {}
}
