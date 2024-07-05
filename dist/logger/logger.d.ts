import winston from "winston";
import { Env, Msg, Attrs } from "../types.js";
import { LogRecord } from "./LogRecord.js";
export declare class Logger {
    private readonly winston;
    private readonly env;
    constructor(envArg?: Env, winstonLogger?: winston.Logger | undefined);
    debug(msg: Msg | LogRecord, attrs?: Attrs): void;
    info(msg: Msg | LogRecord, attrs?: Attrs): void;
    warn(msg: Msg | LogRecord, attrs?: Attrs): void;
    error(msg: Msg | LogRecord, attrs?: Attrs): void;
    private getMsg;
    private convertPrettyMessage;
    private convertPrettyAttrs;
}
export declare const log: Logger;
