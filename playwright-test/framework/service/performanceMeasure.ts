export class PerformanceMeasure {
  static measure(threshold: number, fn: Function, ...args: any[]) {
    const startTime = Date.now(); // Start time before API request

    return fn(...args).then((result: any) => {
      const endTime = Date.now(); // End time after API request
      const responseTime = endTime - startTime;

      // Log the performance result
      console.log(`${fn.name} API response time: ${responseTime} ms`);

      if (responseTime > threshold) {
        console.warn(`${fn.name} API response exceeded the threshold of ${threshold}ms`);
      }

      return result; // Return the result of the API call
    });
  }
}
