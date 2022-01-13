import { Request, Response } from "express";
import { AccountFlag, Accounts, Branches, Tags } from "../interface/interfaces";

let accountsList: Array<any>;
const tagName = "Turismo en Buenos Aires";

interface ObjectJSON {
  accounts: Array<Accounts>;
}

const loadDB = () => {
  try {
    const objectJSON: ObjectJSON = require("./accounts.json");
    accountsList = objectJSON.accounts;
  } catch (error) {
    accountsList = [];
    console.log("Error en la lectura del JSON ", error);
  }
};

const getAccountList = () => {
  loadDB();
  return accountsList;
};
const filterTourismBA = (accounts: Array<Accounts>) => {
  let result: Array<Accounts> = [];
  accounts.forEach((account) => {
    const resultFilter = filterTags(account);
    if (typeof resultFilter == "object") {
      result.push(account);
    }
  });
  //Ordernar los branches por location
  result.forEach((account: Accounts) => {
    account.branches = orderBranches(account.branches);
    if (account.branches[0].location / 1000 < 1) {
      account.location = `${account.branches[0].location} mtrs` || "";
    } else {
      account.location = `${account.branches[0].location / 1000} km` || "";
    }
  });
  //Ordenar account por branch.location
  result = orderAccounts(accounts);
  return result;
};

const filterTags = (account: Accounts) => {
  const resultFilter: Tags | undefined = account.tags.find(
    (tag) => tag.name === tagName
  );
  return resultFilter;
};

const orderBranches = (branches: Array<Branches>) => {
  branches.sort((a, b) => a.location - b.location);
  //Dejar solo el primero elemento
  branches.splice(1);
  return branches;
};

const orderAccounts = (accounts: Array<Accounts>) => {
  accounts.sort((a, b) => a.branches[0].location - b.branches[0].location);
  //Dejar solo los 4 primeros accounts
  accounts.splice(4);
  return accounts;
};

const activeFlag = (accounts: Array<AccountFlag>) => {
  let result: Array<AccountFlag> = [];
  accounts.forEach((account) => {
    if (account.haveVoucher) {
      result.push(account);
    }
  });

  return result;
};

const alphabeticalOrder = (accounts: Array<AccountFlag>) => {
  accounts.sort((a, b) => a.name.localeCompare(b.name));

  return accounts;
};
export const getAccountsTurism = (req: Request, res: Response) => {
  const list = getAccountList();
  let result = filterTourismBA(list);
  res.json(result);
};

export const getAccountsActiveFlag = (req: Request, res: Response) => {
  const list = getAccountList();
  //haveVoucher = true
  let result = activeFlag(list);
  // Devolver los primeros 4 elementos
  result.splice(4); //unicamente las 4 primeras
  // Ordenamiento cards por nombre alfabetico de manera descendente
  result = alphabeticalOrder(result);
  res.json(result);
};
