/**
 * throw if SwitchBot API token was not found in firebase config.
 */
export class SwitchBotAPITokenNotFoundException extends Error {
  /**
   * Error description( basically, don't have to pass any argument )
   */
  constructor(...args: Parameters<typeof Error>) {
    super(...args);
  }
}
