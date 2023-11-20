import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

/**
 * When we test a service then we provide the real instance of that service only while writing it's test.
 * For services which are injected we create a fake implementation.
 */

// https://app.clickup.com/t/86ctzaqdd
describe("CalculatorService", () => {

  let loggerSpy: any,
    calculator: CalculatorService;

  beforeEach(() => {
    console.log("Before each test");
    loggerSpy = jasmine.createSpyObj("LoggerService", ['log']); // create fake implementation of both LoggerService and it's log method
    calculator = new CalculatorService(loggerSpy);
  })

  it("should add 2 numbers", () => {
    console.log("Add 2 numbers");
    const result = calculator.add(2, 2);
    expect(result).toBe(4);
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  })

  it("should subtract 2 numbers", () => {
    console.log("Subtract 2 numbers");
    const result = calculator.subtract(10, 5);
    expect(result).toBe(5, "unexpected subtraction result");
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  })

})
