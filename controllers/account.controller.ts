import { Request, Response } from "express";
import { Accounts, Branches, Tags, Benefits } from "../interface/interfaces";
import { AccountModel } from '../models/account.models';
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
  let result: Array<any> = [];
  accounts.forEach((account) => {
    const resultFilter = filterTags(account);
    if (typeof resultFilter == "object") {
      const obj = new AccountModel(
        account.name,
        account.crmid,
        account.branches,
        account.benefits,
        account.tags,
        account.images
      );
      result.push(obj);
    }
  });


  //Ordernar los branches por location y dejar type en benefitis
  result.forEach((account: AccountModel) => {
    account.branches = orderBranches(account.branches);
    const location = account.branches[0].location;
    const locationKm = location / 1000;
    let valueL = "";
    if (locationKm < 1) {
      valueL = `${location} mtrs`;
    } else {
      valueL = `${locationKm} km`;
    }
    account.location = valueL;
    //Dejar type en benefits
    //account.benefits = filterBenefits(account.benefits);
  });
  //Ordenar account por branch.location
  result = orderAccounts(result);
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

const orderAccounts = (accounts: Array<AccountModel>) => {
  accounts.sort((a, b) => a.branches[0].location - b.branches[0].location);
  //Dejar solo los 4 primeros accounts
  accounts.splice(4);
  return accounts;
};

//Se lo debe usar si solo quiero dejar el type en el array de Benefits
const filterBenefits = (benefits: Array<Benefits>) => {
  let result: Array<Benefits> = [];
  benefits.forEach((ben) => {
    if (typeof ben !== "undefined" && ben.hasOwnProperty("type")) {
      result.push({ type: ben.type });
    }
  });
  return result;
};

export const getAccountsTurism = (req: Request, res: Response) => {
  const list = accountsList;
  const result = filterTourismBA(list);
  res.json(result);
};
