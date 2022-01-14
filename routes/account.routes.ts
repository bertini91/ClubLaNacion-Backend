import { Router } from "express";
import { getAccountsTurism } from "../controllers/account.controller";
import { getAccountsActiveFlag } from "../controllers/acoountFlag.controller";

const accountRoutes = Router();

accountRoutes.get("/tourism", getAccountsTurism);
accountRoutes.get("/active-flag", getAccountsActiveFlag);

export default accountRoutes;
