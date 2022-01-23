/**
 * throw if authorization user not found.
 */
export class UserNotFoundException extends Error {
  /**
   * Error description( basically, don't have to pass any argument )
   */
  constructor(...args: Parameters<typeof Error>) {
    super(...args);
  }
}
