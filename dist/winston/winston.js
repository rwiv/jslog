import winston from "winston";
import { JsonTransport } from "./JsonTransport.js";
import { GRAY, RESET } from "../ansi_consts.js";
export function createDevLogger() {
    const { combine, timestamp, printf } = winston.format;
    const upperCaseLevel = winston.format((info) => {
        info.level = info.level.toUpperCase();
        return info;
    });
    const logFormat = printf(({ level, message, label, timestamp }) => {
        const time = `${GRAY}${timestamp}${RESET}`;
        return `${time} ${level}: ${message}`;
    });
    return winston.createLogger({
        format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), upperCaseLevel(), logFormat),
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(winston.format.colorize(), // log level별로 색상 적용
                logFormat),
            }),
        ]
    });
}
export function createProdLogger() {
    return winston.createLogger({
        transports: [new JsonTransport()],
    });
}
