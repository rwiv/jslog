import winston from "winston";
import {createDevLogger, createProdLogger} from "../winston/winston.js";
import {Env, Msg, Attrs} from "../types.js";
import {LogRecord} from "./LogRecord.js";

export class Logger {

  private readonly winston: winston.Logger;
  private readonly env: Env;

  constructor(
    envArg: Env = "dev",
    winstonLogger: winston.Logger | undefined = undefined,
  ) {
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
        return JSON.stringify(message.message) + " " + JSON.stringify(message.attrs);
      }
    }

    if (this.env === "prod") {
      return { message, attrs };
    } else {
      return JSON.stringify(message) + " " + JSON.stringify(attrs);
    }
  }
}

export const logger = new Logger();