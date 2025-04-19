import winston from "winston";
import { LogEnv, Msg, Attrs } from "../types.js";
import { LogRecord } from "./LogRecord.js";
export declare class Logger {
    private readonly winston;
    private readonly env;
    constructor(envArg?: LogEnv, winstonLogger?: winston.Logger);
    setLevel(level: string): void;
    trace(msg: Msg | LogRecord, attrs?: Attrs): void;
    debug(msg: Msg | LogRecord, attrs?: Attrs): void;
    info(msg: Msg | LogRecord, attrs?: Attrs): void;
    verbose(msg: Msg | LogRecord, attrs?: Attrs): void;
    warn(msg: Msg | LogRecord, attrs?: Attrs): void;
    error(msg: Msg | LogRecord, attrs?: Attrs): void;
    fatal(msg: Msg | LogRecord, attrs?: Attrs): void;
    private getMsg;
    private convertPrettyMessage;
    private convertPrettyAttrs;
}
export declare const log: Logger;
