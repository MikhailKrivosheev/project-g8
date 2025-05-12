import Utilities from 'Utilities';
import * as apiTokenStorage from 'Utilities/apiTokenStorage';
import pageRoutes from 'Dictionaries/routes';
import routes from './routes';

const generateData = {
  json: (data) => Utilities.params.toString(data),
  formData: (data) => Utilities.params.serializeParams(data),
};

class API_ERROR extends Error {
  constructor(object) {
    super(object.message);
    const { message, ...rest } = object;
    const context = this;
    Object.keys(rest).forEach((key) => {
      context[key] = rest[key];
    });
  }
}

async function get(url, params = {}, options = {}) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      ...Utilities.generateAuthHeader(),
    },
  };

  let response;
  try {
    response = await fetch(`${url}${Utilities.params.parse({ ...params })}`, {
      ...defaultOptions,
      ...options,
    });
  } catch (fetchError) {
    if (fetchError.name === 'AbortError') {
      throw new API_ERROR({ message: 'AbortError', abortError: true });
    }
  }

  const contentType = response?.headers.get('content-type');
  if (response.ok) {
    let data;
    if (contentType === 'application/json') {
      data = await response.json();
      return data;
    }
    return true;
  }
  const data = await response.text();
  if (response.status === 401) {
    apiTokenStorage.remove();
    window.location.href = pageRoutes.signin();
  } else if (response.status === 403) {
    apiTokenStorage.remove();
    window.location.href = pageRoutes.signin();
  }
  throw new Error(data);
}

async function post(
  url,
  body,
  options = {},
  method = 'post',
  dataType = 'formData'
) {
  const defaultOptions = {
    credentials: 'include',
    headers: {
      ...Utilities.generateAuthHeader(),
    },
  };
  const response = await fetch(url, {
    method,
    body: generateData[dataType](body),
    ...defaultOptions,
    ...options,
  });
  if (response.ok) {
    const data = await response.json();
    if (data.error) {
      throw new API_ERROR({ message: data.error, logicsError: true, ...data });
    }
    return data;
  }
  const { status } = response;
  const data = await response.json();
  if (status === 401) {
    apiTokenStorage.remove();
    window.location.href = pageRoutes.signin();
  } else if (status === 403) {
    apiTokenStorage.remove();
    window.location.href = pageRoutes.signin();
  } else if (status === 500) {
    // window.location.href = '/';
  }
  throw new API_ERROR({ message: response.statusText, status, data });
}

async function put(url, body, options = {}) {
  const data = await post(url, body, options, 'put');
  return data;
}

// eslint-disable-next-line no-underscore-dangle
async function _delete(url, body, options = {}) {
  const data = await post(url, body, options, 'delete');
  return data;
}

function generateAbortController() {
  return new AbortController();
}

export default {
  get,
  post,
  routes,
  put,
  delete: _delete,
  generateAbortController,
};
