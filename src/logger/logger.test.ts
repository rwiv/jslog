import {it} from "vitest";
import {Logger} from "./logger.js";
import {LogRecord} from "./LogRecord.js";

it("test", () => {
  // process.env.NODE_ENV = "prod";
  const logger = new Logger();
  const person = {
    age: 21,
    name: {
      first: "john",
      last: "park",
    }
  }
  logger.info("hello", person);
  logger.info(new LogRecord("hello", person))
  // logger.info(Error("hello"))
})
