import express from 'express';
import {
  ExecutionFailedException,
  SwitchBotAPISceneIdNotFound,
  UserNotFoundException,
} from '@/exception';

/**
 * Response handling of any error types
 * @param {express.Response} res
 * @param {unknown} error thrown error Object
 * @return {express.Response} response.send
 */
export const errorResponseHandle = (
  res: express.Response,
  error: unknown
): express.Response => {
  if (error instanceof UserNotFoundException) {
    return res.status(401).send({ statusCode: 401, message: 'User not found' });
  }

  if (error instanceof SwitchBotAPISceneIdNotFound) {
    return res
      .status(500)
      .send({ statusCode: 500, message: 'SceneId not found.' });
  }

  if (error instanceof ExecutionFailedException) {
    return res
      .status(500)
      .send({ statusCode: 500, message: 'API REQUEST ERROR' });
  }

  return res
    .status(500)
    .send({ statusCode: 500, message: 'Caught Unhandled Exception.' });
};
