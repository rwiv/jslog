import Transport from "winston-transport";
export class JsonTransport extends Transport {
    constructor() {
        super();
    }
    log(info, next) {
        const msg = {
            level: info.level.toUpperCase(),
            message: info.message,
            ...info.attrs,
        };
        console.log(JSON.stringify(msg));
        if (next) {
            next();
        }
    }
    ;
}
