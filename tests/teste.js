const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index')
chai.use(chaiHttp);

const { expect } = chai;

describe('/POST Chama a função create', () => {
  describe('quando usuário é criado com sucesso', () => {
   // let response = {};

    it('retorna o código de status 201', async (done) => {
      chai.request(server)
      .post('/user')
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Acesso negado');
        done();
      })
     /*  const response = await userController();
      expect(response).to.have.status(201); */
    });

    it('retorna um objeto', () => {
      expect(response.body).to.be.a('object');
    });

    it('o objeto possui a propriedade "message"', () => {
      expect(response.body).to.have.property('message');
    });

    it('a propriedade "message" possui o texto "Novo usuário criado com sucesso"',
      () => {
        expect(response.body.message)
          .to.be.equal('Novo usuário criado com sucesso');
      });
  });
});