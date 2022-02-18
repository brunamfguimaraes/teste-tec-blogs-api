const express = require('express');
const { Post } = require("./src/database/models")
const app = express();

app.use(express.json());

const userRouter = require('./routers/userRouter');
// const categoryRouter = require('./routers/categoryRouter');
// const blogpostRouter = require('./routers/blogpostRouter');

/* app.use(userRouter);
app.use(categoryRouter);
app.use(blogpostRouter);
 */
app.listen(3000, () => console.log('Rodando na porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
/* app.get('/', (request, response) => {
  Post.findAll().then(dados => {
    response.status(200).json(dados)
  }).catch(e => {
    console.log(e.message)
    res.status(500).json({message: "Coco"});
  });
  //response.send();
}); */