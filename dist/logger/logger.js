import { createDevLogger, createProdLogger } from "../winston/winston.js";
import { LogRecord } from "./LogRecord.js";
export class Logger {
    winston;
    env;
    constructor(envArg = "dev", winstonLogger = undefined) {
        if (envArg === "prod" || process.env.NODE_ENV === "prod") {
            this.env = "prod";
        }
        else {
            this.env = "dev";
        }
        if (winstonLogger !== undefined) {
            this.winston = winstonLogger;
        }
        else {
        }
        if (this.env === "prod") {
            this.winston = createProdLogger();
        }
        else {
            this.winston = createDevLogger();
        }
    }
    debug(msg, attrs = undefined) {
        this.winston.debug(this.getMsg(msg, attrs));
    }
    info(msg, attrs = undefined) {
        this.winston.info(this.getMsg(msg, attrs));
    }
    warn(msg, attrs = undefined) {
        this.winston.warn(this.getMsg(msg, attrs));
    }
    error(msg, attrs = undefined) {
        this.winston.error(this.getMsg(msg, attrs));
    }
    getMsg(message, attrs = undefined) {
        if (message instanceof Error) {
            return message.stack;
        }
        if (message instanceof LogRecord) {
            if (this.env === "prod") {
                return {
                    message: message.message,
                    attrs: message.attrs,
                };
            }
            else {
                return JSON.stringify(message.message) + " " + JSON.stringify(message.attrs);
            }
        }
        if (this.env === "prod") {
            return { message, attrs };
        }
        else {
            return JSON.stringify(message) + " " + JSON.stringify(attrs);
        }
    }
}
export const log = new Logger();
