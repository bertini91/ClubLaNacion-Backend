import { Request, Response } from "express";
import { AccountFlag, Accounts, Branches, Tags } from "../interface/interfaces";
const fs = require("fs");

let accountsList: Array<any>;
const tagName = "Turismo en Buenos Aires";
let pathJSON = "./db/accounts.json";

if (fs.existsSync(pathJSON)) {
  pathJSON = "../db/accounts.json";
} else {
  pathJSON = "./accounts.json";
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
    const location = account.branches[0].location;
    if (location / 1000 < 1) {
      account.location = `${location} mtrs` || "";
    } else {
      account.location = `${location / 1000} km` || "";
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



export const getAccountsTurism = (req: Request, res: Response) => {
  const list = accountsList;
  const result = filterTourismBA(list);
  res.json(result);
};


