import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

// https://app.clickup.com/t/86ctzb4tj
describe("CalculatorService", () => {

  let loggerSpy: any,
    calculator: CalculatorService;

  beforeEach(() => {
    console.log("Before each test");
    loggerSpy = jasmine.createSpyObj("LoggerService", ['log']); // create fake implementation of both LoggerService and it's log method

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        { provide: LoggerService, useValue: loggerSpy }
      ]
    })

    calculator = TestBed.inject(CalculatorService);
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
