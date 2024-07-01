import { Msg, Attrs } from "../types.js";
export declare class LogRecord {
    readonly message: Msg;
    readonly attrs: Attrs;
    constructor(message: Msg, attrs: Attrs);
}
