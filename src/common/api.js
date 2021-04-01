import {apiEndpoint} from 'env';

function get(url, ...params) {
  return new Promise((resolve, reject) => {
    window.fetch(url)
      .then((res) => res.json())
      .then((jsonRes) => {
        resolve(jsonRes);
      });
  })
}

function post(url, body) {
  const fetchOptions = {
    method: 'POST'
  }

  if (body != null) {
    fetchOptions.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    fetchOptions.body = JSON.stringify(user);
  }

  return new Promise((resolve, reject) => {
    window.fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((jsonRes) => {
        resolve(jsonRes);
      });
  })
}

function put(url, body) {
  const fetchOptions = {
    method: 'PUT'
  }

  if (body != null) {
    fetchOptions.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    fetchOptions.body = JSON.stringify(user);
  }

  return new Promise((resolve, reject) => {
    window.fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((jsonRes) => {
        resolve(jsonRes);
      });
  })
}

function destroy(url, body) {
  const fetchOptions = {
    method: 'DELETE'
  }

  if (body != null) {
    fetchOptions.headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    fetchOptions.body = JSON.stringify(user);
  }

  return new Promise((resolve, reject) => {
    window.fetch(url, fetchOptions)
      .then((res) => res.json())
      .then((jsonRes) => {
        resolve(jsonRes);
      });
  })
}

function create_url_builder(param_names, url_func) {
  return function builder(params={}){
    const keys = Object.keys(params);
    const allPresent = param_names.length == 0 || param_names
      .map(x => keys.includes(x))
      .reduce((ac, dc) => ac && dc, true);

    if (allPresent === false) {
      return null
    }
    return apiEndpoint + url_func(params)
  }
}

function create_endpoint(method, url_builder) {
  return function (params, body){
    const url = url_builder(params);

    if (url === null) {
      return Promise.reject('Invalid url parameters.');
    } else {
      return method(url, body);
    }
  }
}

export const shop_api = {
  get_health: create_endpoint(
    get,
    create_url_builder(
      [],
      () => '/health'
    )
  ),
  get_categories: create_endpoint(
    get,
    create_url_builder(
      [],
      () => '/shop/categories'
    )
  ),
  get_category_products: create_endpoint(
    get,
    create_url_builder(
      ['category_id'],
      ({category_id}) => `/shop/categories/${category_id}/products`
    )
  ),
  get_product: create_endpoint(
    get,
    create_url_builder(
      ['product_id'],
      ({product_id}) => `/shop/products/${product_id}/specs`
    )
  ),
  get_factory_model: create_endpoint(
    get,
    create_url_builder(
      ['product_id'],
      ({product_id}) => `/shop/products/${product_id}/factory_model`
    )
  ),
  get_option_choices: create_endpoint(
    get,
    create_url_builder(
      ['product_id'],
      ({product_id, option_name}) => `/shop/products/${product_id}/option/${option_name}/choices`
    )
  ),
};

export const admin_api = {
  get_categories: create_endpoint(
    get,
    create_url_builder(
      [],
      () => `/admin/categories`
    )
  ),
  get_category_products: create_endpoint(
    get,
    create_url_builder(
      ['category_id'],
      ({category_id}) => `/admin/categories/${category_id}/products`
    )
  ),
  get_category_options: create_endpoint(
    get,
    create_url_builder(
      ['category_id'],
      ({category_id}) => `/admin/categories/${category_id}/options`
    )
  ),
  get_category_option: create_endpoint(
    get,
    create_url_builder(
      ['category_id', 'option_id'],
      ({category_id, option_id}) => `/admin/categories/${category_id}/options/${option_id}`
    )
  ),
  get_category_option_choices: create_endpoint(
    get,
    create_url_builder(
      ['category_id', 'option_id'],
      ({category_id, option_id}) => `/admin/categories/${category_id}/options/${option_id}/choices`
    )
  ),
  get_category_option_choice: create_endpoint(
    get,
    create_url_builder(
      ['category_id', 'option_id', 'choice_id'],
      ({category_id, option_id, choice_id}) => `/admin/categories/${category_id}/options/${option_id}/choices/${choice_id}`
    )
  ),
  // POST
  create_category: create_endpoint(
    post,
    create_url_builder(
      [],
      () => `/admin/categories`
    )
  ),
  create_product: create_endpoint(
    post,
    create_url_builder(
      ['category_id'],
      ({category_id}) => `/admin/categories/${category_id}/products`
    )
  ),
  create_category_option: create_endpoint(
    post,
    create_url_builder(
      ['category_id'],
      ({category_id}) => `/admin/categories/${category_id}/options`
    )
  ),
  create_option_choice: create_endpoint(
    post,
    create_url_builder(
      ['category_id', 'option_id'],
      ({category_id, option_id}) => `/admin/categories/${category_id}/options/${option_id}/choices`
    )
  ),
  create_choice_line: create_endpoint(
    post,
    create_url_builder(
      ['category_id', 'product_id'],
      ({category_id, option_id, choice_id}) => `/admin/categories/${category_id}/products/${product_id}/choices`
    )
  ),
};