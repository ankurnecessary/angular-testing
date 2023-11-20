import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

/**
 * When we test a service then we provide the real instance of that service only while writing it's test.
 * For services which are injected we create a fake implementation.
 */
describe("CalculatorService", () => {

  it("should add 2 numbers", () => {
    const logger = jasmine.createSpyObj("LoggerService", ['log']); // create fake implementation of both LoggerService and it's log method
    // spyOn(logger, "log"); // Creates a fake implementation of logger.log() method
    const calculator = new CalculatorService(logger);
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(logger.log).toHaveBeenCalledTimes(1);
  })

  it("should subtract 2 numbers", () => {
    const calculator = new CalculatorService(new LoggerService());
    const result = calculator.subtract(10, 5);
    expect(result).toBe(5, "unexpected subtraction result");
  })

})
