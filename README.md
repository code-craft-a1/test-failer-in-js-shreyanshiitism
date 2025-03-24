# Testing & Dependencies

Decomposition = Making smaller pieces of code - makes testing easier.

Testing = Specifying the output - drives us to decompose better.

Welcome to Test Driven Development. The positive cycle of Testability and Decomposition.

## Make the tests fail

This exercise has a set of buggy implementations. The implementations also have tests (asserts) which pass, despite the bugs. They are 'weak' tests. Such tests are inefficient - you will need to manually check the code anyway.

Your task is to _strengthen the tests_ and make them all fail. You **can refactor** the code to separate the concerns and make it testable. **Do not fix the bug. Do not pass the tests yet**

In this repository, all the tests pass. However, it's a 'false pass'. Your goal is to make them fail and expose the bugs.

## Hints

`tshirts` has a simple error. It tries to classify T-shirt sizes based on shoulder-measurements. It leaves out one input value. Add a test to catch that.

`misaligned` tries to print a map from numbers to colors, as per [this Wiki](https://en.wikipedia.org/wiki/25-pair_color_code). However, the numeric values and the separator (`|`) are misaligned. The functionality is not efficiently testable - the fault needs human inspection. Think of separating the concerns and testing them individually.

`weatherreport` reports weather with the weather data received from the weather sensor. The code stubs the sensor, so that we can test without the weather sensor. However, there is a mistake in one of the conditions, but the sensor-stub does not
give values that expose the mistake. Add a stub to do that.

# Extra challenge

In several places, test-code is together with production code.
Can you think of a way to separate things - so that the production code doesn't change while switching from the unit-test-environment to the integration-environment?
