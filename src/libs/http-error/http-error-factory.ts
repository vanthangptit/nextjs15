import { HttpError } from '@/libs/http-error/http-error';

class HttpErrorFactory {
  // eslint-disable-next-line no-use-before-define
  private static instance: HttpErrorFactory;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): HttpErrorFactory {
    if (!HttpErrorFactory.instance) {
      HttpErrorFactory.instance = new HttpErrorFactory();
    }
    return HttpErrorFactory.instance;
  }

  /**
   * @Bad Request
   * A 400 error indicates that the server cannot
   * or will not process the request due to something that is perceived to be a client error.
   * A 400 Bad Request error include:
   *  + Malformed Request Syntax
   *  + Deceptive Request Routing
   *  + Incorrectly formatted JSON
   *  + Missing Parameters
   *  + Incorrect Values in the Query String
   *  + Unsupported Media Type
   *  + Request Payload Too Large
  */
  public badRequest(message = 'Bad Request') {
    return new HttpError(message, 400);
  }

  /**
   * @Unauthorized
   * A client's request was not completed because it lacked valid authentication credentials for the requested resource
   * A 401 error means the server couldn't verify your credentials, while a 403 error means your
   * credentials are valid, but you're still denied access because of other factors like permissions.
   */
  public unauthorized(message = 'Unauthorized') {
    return new HttpError(message, 401);
  }

  /**
   * @Forbidden
   * A 403 error means the server knows you're trying to access a resource (like a webpage or file),
   * but it's not allowing you to access due to various reasons, such as:
   *  + Insufficient permissions
   *  + Incorrect file permissions
   *  + IP blocking
   *  + Authentication issues
   *  + Access Control Lists (ACLs)
   */
  public forbidden(message = 'Forbidden') {
    return new HttpError(message, 403);
  }

  /**
   * A 404 indicates that a server cannot find the requested resource
   * A 404 can occur due to various reasons, including:
   *  + A broken link on another website
   *  + A typo in the URL.
   *  + The page or file has been removed from the server.
   *  + The page has been moved to a different URL.
   */
  public notFound(message = 'Not Found') {
    return new HttpError(message, 404);
  }

  /**
   * An "Internal Server Error",
   * indicates that the server encountered an unexpected condition and cannot fulfill the request.
   */
  public internal(message = 'Internal Server Error') {
    return new HttpError(message, 500);
  }
}

export const httpErrorFactory = HttpErrorFactory.getInstance();