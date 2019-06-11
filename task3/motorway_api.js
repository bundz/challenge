const got = require(`got`);

class MotorWayApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getbaseUrl() {
    return this.baseUrl
  }

  getToken() {
    return this.token;
  }

  async login() {
    const { body } = await got(`${this.baseUrl}/api/login`, { json: true });
    this.token = body.token;
  }

  async getVisits(page = 1) {
    if(!this.token) {
      throw new Error(`You should login first`);
    }

    const { body } = await got(`${this.baseUrl}/api/visits?page=${page}&token=${this.token}`, { json: true });
    return body;
  }
}

module.exports = MotorWayApi;