import {it} from "vitest";
import {Logger} from "./logger.js";
import {LogRecord} from "./LogRecord.js";

it("test", () => {
  process.env.NODE_ENV = "prod";
  const log = new Logger();
  log.setLevel("trace");
  log.trace("hello1", {
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
  log.debug("hello")
})
