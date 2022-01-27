/**
 * throw if using sceneId not found.
 */
export class SceneIdNotFoundException extends Error {
  /**
   * Error description( basically, don't have to pass any argument )
   */
  constructor(...args: Parameters<typeof Error>) {
    super(...args);
  }
}
