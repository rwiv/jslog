import { Attrs } from "../types.js";
export declare class LogRecord {
    readonly message: string;
    readonly attrs: Attrs;
    constructor(message: string, attrs: Attrs);
}
