import {it} from "vitest";
import {log, Logger} from "./logger.js";
import {LogRecord} from "./LogRecord.js";

it("test", () => {
  // process.env.NODE_ENV = "prod";
  // const log = new Logger();
  log.info("hello1", {
    foo: "bar",
  })
  const person = {
    age: 21,
    name: {
      first: "john",
      last: "park",
    }
  }
  log.info("hello2");
  log.info("hello2", person);
  log.info(new LogRecord("hello2", person))
  log.error(Error("hello3"))
})
