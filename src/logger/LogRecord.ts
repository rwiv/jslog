import {Attrs} from "../types.js";

export class LogRecord {
  constructor(
    public readonly message: string,
    public readonly attrs: Attrs,
  ) {
  }
}
