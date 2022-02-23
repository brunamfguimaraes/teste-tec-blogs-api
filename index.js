const express = require('express');

const app = express();

app.use(express.json());

const userRouter = require('./src/routers/userRouter');
const postRouter = require('./src/routers/postRouter');

app.use(userRouter);
app.use(postRouter);

app.listen(3000, () => console.log('Rodando na porta 3000!'));
