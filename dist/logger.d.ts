import winston from "winston";
export type Attrs = object | undefined;
export type Env = "dev" | "prod";
export type Msg = string | number | Error;
export declare class Logger {
    private readonly winston;
    private readonly env;
    constructor(envArg?: Env, winstonLogger?: winston.Logger | undefined);
    debug(msg: Msg, attrs?: Attrs): void;
    info(msg: Msg, attrs?: Attrs): void;
    warn(msg: Msg, attrs?: Attrs): void;
    error(msg: Msg, attrs?: Attrs): void;
    private getMsg;
}
export declare const logger: Logger;
