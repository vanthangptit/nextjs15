export class HttpError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'HttpError';
    this.status = status;

    // Restore prototype chain. If the prototype is not reset,
    // instanceof HttpError may return false in some runtimes.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}