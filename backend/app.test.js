import sinon from "sinon";
import axios from "axios";
import { expect } from "chai";
import request from "supertest";

import app from "./app.js";

describe("GET /films", () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it("should return filtered movies based on title query", (done) => {
    const response = {
      data: {
        results: [
          { title: "Movie 1" },
          { title: "Movie 2" },
          { title: "Movie 3" },
        ],
      },
    };

    axiosGetStub.resolves(response);

    request(app)
      .get("/films?title=movie")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.data).to.have.lengthOf(3);
        expect(res.body.data[0].title).to.equal("Movie 1");
        expect(res.body.data[1].title).to.equal("Movie 2");
        expect(res.body.data[2].title).to.equal("Movie 3");
        done();
      });
  });

  it("should return movies based on pagination", (done) => {
    const response = {
      data: {
        results: [
          { title: "Movie 1" },
          { title: "Movie 2" },
          { title: "Movie 3" },
          { title: "Movie 4" },
          { title: "Movie 5" },
        ],
      },
    };

    axiosGetStub.resolves(response);

    request(app)
      .get("/films?pageIndex=2&pageSize=2")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.data).to.have.lengthOf(2);
        expect(res.body.data[0].title).to.equal("Movie 3");
        expect(res.body.data[1].title).to.equal("Movie 4");
        done();
      });
  });

  it("should handle internal server errors", (done) => {
    axiosGetStub.rejects(new Error("Internal Server Error"));

    request(app)
      .get("/films?pageIndex=1&pageSize=10")
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.error).to.equal("Internal Server Error");
        done();
      });
  });
});

describe("GET /films/:id", () => {
  let axiosGetStub;

  beforeEach(() => {
    axiosGetStub = sinon.stub(axios, "get");
  });

  afterEach(() => {
    axiosGetStub.restore();
  });

  it("should return a movie with expanded fields", (done) => {
    const response = {
      data: {
        title: "Movie 1",
        characters: ["https://swapi.dev/api/people/1/"],
      },
    };

    const characterResponse = {
      data: {
        name: "Character 1",
      },
    };

    axiosGetStub.withArgs("https://swapi.dev/api/films/1/").resolves(response);

    axiosGetStub
      .withArgs("https://swapi.dev/api/people/1/")
      .resolves(characterResponse);

    request(app)
      .get("/films/1?expand=characters")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.title).to.equal("Movie 1");
        expect(res.body.characters).to.have.lengthOf(1);
        expect(res.body.characters[0].name).to.equal("Character 1");
        done();
      });
  });

  it("should handle internal server errors", (done) => {
    axiosGetStub.rejects(new Error("Internal Server Error"));

    request(app)
      .get("/films/1")
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body.error).to.equal("Internal Server Error");
        done();
      });
  });
});
