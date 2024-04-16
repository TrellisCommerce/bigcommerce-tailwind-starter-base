/**
 * @typedef {{
 *     method?: 'get' | 'post' | 'put' | 'delete'
 *     body?: any
 *     queries?: Record<string, any>
 *     raw?: boolean
 * }} FetchParameters
 */

class BigCommerceStore {
  hash;
  token;
  verbose;

  /**
   * @param {string} hash
   * @param {string} token
   * @param {boolean} verbose
   */
  constructor(hash, token, { verbose } = {}) {
    this.hash = hash;
    this.token = token;
    this.verbose = verbose;
  }

  /**
   * @param {string} endpoint
   * @param {FetchParameters} params
   */
  async fetch(endpoint, params) {
    const url = new URL(
      `https://api.bigcommerce.com/stores/${this.hash}/${endpoint}`,
    );
    Object.entries(params?.queries ?? {}).forEach(([name, value]) => {
      url.searchParams.append(name, value);
    });
    const headers = {
      accept: 'application/json',
      'x-auth-token': this.token,
    };
    if (params?.body) headers['content-type'] = 'application/json';
    let request;
    for (let tries = 0; tries < 3; tries++) {
      request = await fetch(url, {
        method: params?.method,
        body: params?.body ? JSON.stringify(params.body) : undefined,
        headers,
      });
      if (this.verbose)
        console.log(
          `${(params?.method ?? 'get').toUpperCase()} ${url.toString()} - ${
            request.status
          } ${request.statusText}`,
        );
      if (!request.ok) {
        if (request.status >= 500) continue;
        else break;
      }
      if (request.status === 204) return;
      const result = await request.json();
      if (result.data && !params?.raw) return result.data;
      return result;
    }
    throw new Error(
      `BigCommerce fetch error - ${(params?.method ?? 'get').toUpperCase()} ${
        request.status
      } ${request.statusText} ${await request.text()}`,
    );
  }

  /**
   * @param {string} endpoint
   * @param {FetchParameters} params
   */
  async get(endpoint, params) {
    return this.fetch(endpoint, { ...params, method: 'get' });
  }

  /**
   * @param {string} endpoint
   * @param {FetchParameters} params
   */
  async getAll(endpoint, params) {
    const results = [];
    let total_pages = 1;
    for (let page = 1; page <= total_pages; page++) {
      const current = await this.fetch(endpoint, {
        ...params,
        queries: {
          ...(params?.queries ?? {}),
          page,
        },
        raw: true,
      });
      if (current?.meta?.pagination?.total_pages)
        total_pages = current?.meta?.pagination?.total_pages;
      results.push(...(current?.data ? current.data : current));
    }
    return results;
  }

  /**
   * @param {string} endpoint
   * @param {FetchParameters} params
   */
  async post(endpoint, params) {
    return this.fetch(endpoint, { ...params, method: 'post' });
  }

  /**
   * @param {string} endpoint
   * @param {FetchParameters} params
   */
  async put(endpoint, params) {
    return this.fetch(endpoint, { ...params, method: 'put' });
  }

  /**
   * @param {string} endpoint
   * @param {FetchParameters} params
   */
  async delete(endpoint, params) {
    return this.fetch(endpoint, { ...params, method: 'delete' });
  }
}

module.exports = BigCommerceStore;
