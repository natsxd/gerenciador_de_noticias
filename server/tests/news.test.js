const request = require("supertest");
const app = require("../app");
const { connect, disconnect } = require('../db/dbConnection');

describe('Test "/news" path', () => {
  beforeEach(async () => {
    await connect();
  });

  afterEach(async () => {
    await disconnect();
  });

  test("Get api called successfully", async () => {
    const response = await request(app).get("/news");
    expect(response.statusCode).toBe(200);
  });
  test("Put at least a single news to db and check if the api returns one or more entries", async () => {
    // (when putting news, if url already exists, than it returns 409, but than the check for news amount still passes)
    await request(app)
      .put('/news')
      .send({
        title: "Cidade mineira registra maior temperatura da história do Brasil",
        url: "https://www.em.com.br/gerais/2023/11/6658170-cidade-mineira-registra-maior-temperatura-da-historia-do-brasil.html"
      })
      .set('Accept', 'application/json');
    const response = await request(app).get("/news");
    expect(response.body.length).toBeGreaterThan(0);
  });
});
