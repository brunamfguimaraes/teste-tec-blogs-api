const express = require('express');

const app = express();

app.use(express.json());

const userRouter = require('./src/routers/userRouter');
const postRouter = require('./src/routers/postRouter');
//const categoryRouter = require('./routers/categoryRouter');

app.use(userRouter);
app.use(postRouter);
//app.use(categoryRouter);

app.listen(3000, () => console.log('Rodando na porta 3000!'));

/* // não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
}); */
