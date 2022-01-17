import { Request, Response } from "express";
import { AccountFlag, Accounts } from "../interface/interfaces";
import { AccountFlagModel } from '../models/accountFlag.models';
const fs = require("fs");

let accountsList: Array<any>;
let pathJSON = "./db/accounts.json";

if (fs.existsSync(pathJSON)) {
  pathJSON = "../db/accountsFlaw.json";
} else {
  pathJSON = "./accountsFlaw.json";
}

interface ObjectJSON {
  accounts: Array<Accounts>;
}

const loadDB = () => {
  try {
    const objectJSON: ObjectJSON = require(pathJSON);
    accountsList = objectJSON.accounts;
  } catch (error) {
    console.log("Error en la lectura del JSON ", error);
  }
};
loadDB();

const activeFlag = (accounts: Array<AccountFlag>) => {
  let result: Array<AccountFlagModel> = [];
  accounts.forEach((account) => {
    if (account.haveVoucher === true) {
      const obj = new AccountFlagModel(account.name, account.crmid, account.images);

      result.push(obj);
    }
  });

  return result;
};

const alphabeticalOrder = (accounts: Array<AccountFlagModel>) => {
  accounts.sort((a, b) => a.name.localeCompare(b.name));

  return accounts;
};

const filterAccountActiveFlag = (accounts: Array<AccountFlag>) => {
  let result = activeFlag(accounts);
  result.splice(4);
  result = alphabeticalOrder(result);
  return result;
};

export const getAccountsActiveFlag = (req: Request, res: Response) => {
  const list = accountsList;
  const resultActive = filterAccountActiveFlag(list);
  res.json(resultActive);
};
