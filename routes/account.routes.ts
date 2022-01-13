import { Router } from "express";
import {
  getAccountsActiveFlag,
  getAccountsTurism,
} from "../controllers/account.controller";

const accountRoutes = Router();

accountRoutes.get("/tourism", getAccountsTurism);
accountRoutes.get("/active-flag", getAccountsActiveFlag);

export default accountRoutes;
