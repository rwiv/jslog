import {Msg, Attrs} from "../types.js";

export class LogRecord {
  constructor(
    public readonly message: Msg,
    public readonly attrs: Attrs,
  ) {
  }
}
