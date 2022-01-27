/**
 * throw if API call failed
 */
export class ExecutionFailedException extends Error {
  /**
   * Error description( basically, don't have to pass any argument )
   */
  constructor(...args: Parameters<typeof Error>) {
    super(...args);
  }
}
