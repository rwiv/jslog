import { createDevLogger, createProdLogger } from "../winston/winston.js";
import { LogRecord } from "./LogRecord.js";
import { RESET, BOLD, WHITE_DIMMED } from "../ansi_consts.js";
export class Logger {
    winston;
    env;
    constructor(envArg = "dev", winstonLogger) {
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
    setLevel(level) {
        this.winston.level = level;
    }
    trace(msg, attrs = undefined) {
        this.winston.trace(this.getMsg(msg, attrs));
    }
    debug(msg, attrs = undefined) {
        this.winston.debug(this.getMsg(msg, attrs));
    }
    info(msg, attrs = undefined) {
        this.winston.info(this.getMsg(msg, attrs));
    }
    verbose(msg, attrs = undefined) {
        this.winston.verbose(this.getMsg(msg, attrs));
    }
    warn(msg, attrs = undefined) {
        this.winston.warn(this.getMsg(msg, attrs));
    }
    error(msg, attrs = undefined) {
        this.winston.error(this.getMsg(msg, attrs));
    }
    fatal(msg, attrs = undefined) {
        this.winston.fatal(this.getMsg(msg, attrs));
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
                return this.convertPrettyMessage(message.message) + " " + this.convertPrettyAttrs(message.attrs);
            }
        }
        if (this.env === "prod") {
            return { message, attrs };
        }
        else {
            const msg = this.convertPrettyMessage(message);
            if (attrs !== undefined) {
                return msg + " " + this.convertPrettyAttrs(attrs);
            }
            else {
                return msg;
            }
        }
    }
    convertPrettyMessage(message) {
        return `${BOLD}${message}${RESET}`;
    }
    convertPrettyAttrs(attrs) {
        const json = JSON.stringify(attrs, null, 2);
        return `${WHITE_DIMMED}${json}${RESET}`;
    }
}
export const log = new Logger();
