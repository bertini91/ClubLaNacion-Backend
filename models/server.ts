import express, { Application } from "express";
import accountRoutes from "../routes/account.routes";
import cors from "cors";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    accounts: "/api/accounts",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "8080";

    this.middlewares();
    this.routes();
  }

  //Seria innecesario porque no estamos trabajando con validaciones de parametros o body
  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPaths.accounts, accountRoutes);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto" + this.port);
    });
  }
}

export default Server;