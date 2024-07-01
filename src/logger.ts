import {createDevLogger, createProdLogger} from "./winston.js";
import winston from "winston";

export type Attrs = object | undefined;
export type Env = "dev" | "prod";
export type Msg = string | number | Error;

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

  debug(msg: Msg, attrs: Attrs = undefined) {
    this.winston.debug(this.getMsg(msg, attrs));
  }

  info(msg: Msg, attrs: Attrs = undefined) {
    this.winston.info(this.getMsg(msg, attrs));
  }

  warn(msg: Msg, attrs: Attrs = undefined) {
    this.winston.warn(this.getMsg(msg, attrs));
  }

  error(msg: Msg, attrs: Attrs = undefined) {
    this.winston.error(this.getMsg(msg, attrs));
  }

  private getMsg(message: Msg, attrs: Attrs = undefined) {
    if (message instanceof Error) {
      return message.stack;
    }

    if (this.env === "prod") {
      return { message, attrs };
    } else {
      return JSON.stringify(message) + " " + JSON.stringify(attrs);
    }
  }
}

export const logger = new Logger();