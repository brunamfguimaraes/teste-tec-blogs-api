const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../src/routers/userRouter')
chai.use(chaiHttp);

const url = 'http://localhost:3000';

const { expect } = chai;

describe('/POST Chama a função create', () => {
  describe('quando usuário é criado com sucesso', () => {
    let newUser = {
      displayName: "Testando a aplicação",
      email: "email@email.com",
      password: "1234567",
      image: "https://images-na.ssl-images-amazon.com/images/I/91+5a2Dr+5L.jpg",
  }
    it('retorna o código de status 201', async () => {

      response = await chai.request(server)
      .post(`${url}/user`)
      .end((err, res) => {
        res.should.have.status(201);
      })
    });

    it('retorna um objeto', () => {
      expect(newUser).to.be.a('object');
    });

    it('o objeto possui a propriedade "email", "displayName" e "password"', () => {
      expect(newUser).to.have.property('displayName');
      expect(newUser).to.have.property('email');
      expect(newUser).to.have.property('password');
    });
  });
});