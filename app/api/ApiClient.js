import superagent from 'superagent';
import { polyfill } from 'es6-promise';

polyfill();

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path, clientConfig) {
  const adjustedPath = path[0] !== '/' ? `/${path}` : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return `http://${clientConfig.host}:${clientConfig.port}${adjustedPath}`;
  }
  return adjustedPath;
}

class ApiClient {
  constructor(req, clientConfig) {
    methods.forEach((method) => {
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path, clientConfig));

        if (params) {
          request.query(params);
        }

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, { body } = {}) => {
          return err ? reject(body || err) : resolve(body);
        });
      });
    });
  }
}

export default ApiClient;
