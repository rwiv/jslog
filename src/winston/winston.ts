import winston from "winston";
import {JsonTransport} from "./JsonTransport.js";
import {GRAY, RESET} from "../ansi_consts.js";

const levels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  verbose: 4,
  debug: 5,
  trace: 6,
};

const colors = {
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'cyan',
  debug: 'blue',
  trace: 'magenta',
};

winston.addColors(colors);

export function createDevLogger(): winston.Logger {
  const { combine, timestamp, printf } = winston.format;

  const upperCaseLevel = winston.format((info) => {
    info.level = info.level.toUpperCase();
    return info;
  });
  const logFormat = printf(({ level, message, label, timestamp }) => {
    const time = `${GRAY}${timestamp}${RESET}`
    return `${time} ${level}: ${message}`;
  });

  return winston.createLogger({
    levels,
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      upperCaseLevel(),
      logFormat,
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(), // log level별로 색상 적용
          logFormat,
        ),
      }),
    ]
  });
}

export function createProdLogger(): winston.Logger {
  return winston.createLogger({
    levels,
    transports: [ new JsonTransport() ],
  });
}
