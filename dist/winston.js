import winston from "winston";
import chalk from "chalk";
import { JsonTransport } from "./JsonTransport.js";
export function createDevLogger() {
    const { combine, timestamp, printf } = winston.format;
    const logFormat = printf(({ level, message, label, timestamp }) => {
        return `${chalk.gray(timestamp)} ${level}:${message}`;
    });
    return winston.createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), logFormat),
        transports: [
            new winston.transports.Console({
                // level: logLevel,
                format: winston.format.combine(winston.format.colorize(), // log level별로 색상 적용
                winston.format.padLevels({
                    levels: { error: 0, warn: 0, info: 0, debug: 0, silly: 0, }
                }), logFormat),
            }),
        ]
    });
}
export function createProdLogger() {
    return winston.createLogger({
        transports: [new JsonTransport()],
    });
}
