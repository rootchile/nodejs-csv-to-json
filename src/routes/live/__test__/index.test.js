const request = require("supertest");
const app = require("../../../app");

describe("Test live", () => {
    it("It should response return 200", async () => {
        const response = await request(app).get("/");
        expect(response.statusCode).toBe(200);
    });
});