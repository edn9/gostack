import express from 'express';
import routes from './routes';

import './database';

class App {
  // metodo chamado automaticamente quando instanciar a classe App
  constructor() {
    this.server = express();

    this.middlewares(); // chamar para executar
    this.routes();
  }

  middlewares() {
    this.server.use(express.json()); // pronta para receber requisições no formato json
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server; // exportar nova instancia de app, instanciando a aplicação
// cria estrutura da aplicação
