import Transport from "winston-transport";
export declare class JsonTransport extends Transport {
    constructor();
    log(info: any, next: () => void): any;
}
