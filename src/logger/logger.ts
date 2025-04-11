import winston from "winston";
import {createDevLogger, createProdLogger} from "../winston/winston.js";
import {LogEnv, Msg, Attrs} from "../types.js";
import {LogRecord} from "./LogRecord.js";
import {RESET, BOLD, WHITE_DIMMED} from "../ansi_consts.js";

export class Logger {

  private readonly winston: winston.Logger;
  private readonly env: LogEnv;

  constructor(envArg: LogEnv = "dev", winstonLogger?: winston.Logger) {
    if (envArg === "prod" || process.env.NODE_ENV === "prod") {
      this.env = "prod";
    } else {
      this.env = "dev";
    }

    if (winstonLogger !== undefined) {
      this.winston = winstonLogger;
    } else {
    }

    if (this.env === "prod") {
      this.winston = createProdLogger();
    } else {
      this.winston = createDevLogger();
    }
  }

  setLevel(level: string) {
    this.winston.level = level;
  }

  debug(msg: Msg | LogRecord, attrs: Attrs = undefined) {
    this.winston.debug(this.getMsg(msg, attrs));
  }

  info(msg: Msg | LogRecord, attrs: Attrs = undefined) {
    this.winston.info(this.getMsg(msg, attrs));
  }

  warn(msg: Msg | LogRecord, attrs: Attrs = undefined) {
    this.winston.warn(this.getMsg(msg, attrs));
  }

  error(msg: Msg | LogRecord, attrs: Attrs = undefined) {
    this.winston.error(this.getMsg(msg, attrs));
  }

  private getMsg(message: Msg | LogRecord, attrs: Attrs = undefined) {
    if (message instanceof Error) {
      return message.stack;
    }

    if (message instanceof LogRecord) {
      if (this.env === "prod") {
        return {
          message: message.message,
          attrs: message.attrs,
        };
      } else {
        return this.convertPrettyMessage(message.message) + " " + this.convertPrettyAttrs(message.attrs);
      }
    }

    if (this.env === "prod") {
      return { message, attrs };
    } else {
      const msg = this.convertPrettyMessage(message)
      if (attrs !== undefined) {
        return msg + " " + this.convertPrettyAttrs(attrs);
      } else {
        return msg;
      }
    }
  }

  private convertPrettyMessage(message: string) {
    return `${BOLD}${message}${RESET}`
  }

  private convertPrettyAttrs(attrs: Attrs) {
    const json = JSON.stringify(attrs, null, 2)
    return `${WHITE_DIMMED}${json}${RESET}`
  }
}

export const log = new Logger();