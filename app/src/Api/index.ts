import Utilities from 'Utilities';
import routes from './routes';

interface ErrorInterface {
  [x: string]: any;
  message: any;
  abortError?: boolean;
  status?: any;
  data?: any;
}

class API_ERROR extends Error {
  constructor(object: ErrorInterface) {
    super(object.message);
    const { message, ...rest } = object;
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context: ErrorInterface = this;
    Object.keys(rest).forEach((key) => {
      context[key] = rest[key];
    });
  }
}

async function get(url: any, params = {}, options = {}) {
  let response: any;
  try {
    response = await fetch(
      `${url}${Utilities.params.toString({ ...params })}`,
      {
        headers: {
          'Content-Language': document.documentElement.lang,
          ...Utilities.generateAuthHeader(),
        },
        ...options,
      }
    );
  } catch (fetchError: any) {
    if (fetchError.name === 'AbortError') {
      throw new API_ERROR({ message: 'AbortError', abortError: true });
    }
  }

  if (response?.ok) {
    const data = await response.json();
    return data;
  }

  const { status }: any = response;
  const data = await response.json();

  throw new API_ERROR({ message: data.error, status, data });
}

async function post(url: any, body: object, options = {}, method = 'post') {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Language': document.documentElement.lang,
      ...Utilities.generateAuthHeader(),
    },
    body: Utilities.params.serializeParams(body),
    ...options,
  });
  const { status } = response;
  if (response.ok) {
    const data = await response.json();
    if (data.error) {
      throw new API_ERROR({
        message: data.error,
        logicsError: true,
        ...data,
        status,
      });
    }
    return data;
  }
  const data = await response.json();
  throw new API_ERROR({ message: data.error, status, data });
}

async function put(url: any, body: any, options = {}) {
  const data = await post(url, body, options, 'put');
  return data;
}

async function deleteRequest(url: any, body: any, options = {}) {
  const data = await post(url, body, options, 'delete');
  return data;
}

function generateAbortController() {
  return new AbortController();
}

export default {
  get,
  post,
  deleteRequest,
  routes,
  put,
  generateAbortController,
};
