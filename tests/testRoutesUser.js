const chai = require('chai');
const chaiHttp = require('chai-http');

chai.should();

const server = require('../src/routers/userRouter')
chai.use(chaiHttp);

describe('/GET Chama a função getUsers', () => {
  describe("quando todos usuários são retornados com sucesso", () => {
    it("retorna um array de usuários", (done) => {
      chai.request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eq(3);
        });
    done();
});

    it("Não retorna nenhum usuário", (done) => {
      chai.request(server)
        .get("/user")
        .end((err, res) => {
          res.should.have.status(400);
    });
    done();
    });
  });
});


describe("/GET Chama a função getById", () => {
  it("Encontra usuário por Id", (done) => {
  const userId = 1;
  chai.request(server)
    .get("/user/:id" + userId)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.should.have.property('displayName');
      res.body.should.have.property('email');
      res.body.should.have.property('id').eq(1);
    });
    done();
  });

  it("Não encontrou nenhum usuário por Id ou Id inválido", (done) => {
    const userId = 123;
    chai.request(server)
      .get("/user/:id" + userId)
      .end((err, res) => {
        res.should.have.status(404);
        res.text.should.be.eq("Usuário não existe");
      });
      done();
  });
});

describe("/POST Chama a função create", () => {
  it("Cria um novo usuário", (done) => {
  const user = {
    displayName: "Ronaldo Fenômeno",
    email: "ronaldo@email.com",
    password: "123456789",
    image: "https://www.lance.com.br/files/article_main/uploads/2018/11/15/5bedcf90501e4.jpeg",
  };
    chai.request(server)
      .post("/user")
      .send(user)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('displayName').eq("Ronaldo Fenômeno");
        res.body.should.have.property('password');
      });
      done();
  });

  it("Retorna um erro se não tiver a propriedade email", (done) => {
    const user = {
      email: "ronaldo@email.com"
    };
    chai.request(server)
      .post("/user")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.be.eq("\"email\" is required");
      });
      done();
  });
});

describe("/POST Chama a função createLogin", () => {
  it("Faz o login do usuário", (done) => {
  const user = {
    email: "ronaldo@email.com",
    password: "123456789",
  };
    chai.request(server)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
      });
      done();
  });

  it("Retorna um erro se não tiver a propriedade email", (done) => {
    const user = {
      email: "ronaldo@email.com"
    };
    chai.request(server)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(400);
        res.text.should.be.eq("\"email\" is required");
      });
      done();
  });
});
