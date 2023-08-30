class Api {
  constructor({ baseUrl, headers, token }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._token = token;
  }

  _header(customHeaders) {
    if (customHeaders) {
      return customHeaders;
    } else {
      const token = localStorage.getItem("token") || "";
      return {
        ...this._headers,
        Authorization: token ? `Bearer ${token}` : undefined,
      };
    }
  }
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Error: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }
  _apiRequest(urlEnd, method, body, customHeaders) {
    const headers = this._header(customHeaders);

    const requestOptions = {
      method: method,
      headers: headers,
    };
    if (body) {
      requestOptions.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${urlEnd}`, requestOptions).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getData(search) {
    // Get the current date
    const currentDate = new Date().toISOString().split("T")[0];

    // Calculate the date 7 days prior to the current date
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fromDate = sevenDaysAgo.toISOString().split("T")[0];

    // Construct the query parameters
    const queryParams = new URLSearchParams({
      q: search,
      apiKey: this._token,
      from: fromDate,
      to: currentDate,
      pageSize: 100,
    });

    // Construct the full API endpoint URL with the query parameters
    const endpoint = `${this._baseUrl}${queryParams}`;

    // Make the API call using the _request method
    return this._request(endpoint, {});
  }
  register(data) {
    return this._apiRequest("/signup", "POST", {
      password: data.password,
      email: data.email,
      name: data.name,
    });
  }
  authorize(data) {
    return this._apiRequest("/signin", "POST", {
      password: data.password,
      email: data.email,
    });
  }
  getProfileData() {
    return this._apiRequest("/users/me", "GET", null, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
  }

  getCards() {
    return this._apiRequest(`/articles`, "GET", null, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
  }
  addarticleLike(articleId) {
    return this._apiRequest(`/articles/${articleId}/likes`, "PUT", {
      "Content-Type": "application/json",
    });
  }
  removeLike(articleId) {
    return this._apiRequest(`/articles/${articleId}/likes`, "DELETE", {
      "Content-Type": "application/json",
    });
  }
  addNewCard(card) {
    return this._apiRequest(
      "/articles",
      "POST",
      {
        keyword: card.keyword,
        title: card.title,
        date: card.date,
        source: card.source.name,
        link: card.url,
        text: card.text,
        image: card.urlToImage,
        owner: card.owner,
      },
      {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );
  }

  deleteCard(articleId) {
    return this._apiRequest(`/articles/${articleId}`, "DELETE", {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    });
  }
}

export const api = new Api({
  baseUrl: "https://newsapi.org/v2/everything?",
  token: "8a1ff7e5903b463e85f7efb62e46dcc2",
});
export const authApi = new Api({
  baseUrl: "https://herman.goldberg.api.crabdance.com",
  headers: {
    "Content-Type": "application/json",
  },
});
