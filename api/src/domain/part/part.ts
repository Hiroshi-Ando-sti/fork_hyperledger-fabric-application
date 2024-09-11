export class Part {
  private constructor(
    private readonly id: string,
    private name: string
  ) {}

  static create(
    id: string,
    name: string
  ): Part {
    return new Part(id, name);
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public getPart(): Part {
    return new Part(this.id, this.name);
  }
}
