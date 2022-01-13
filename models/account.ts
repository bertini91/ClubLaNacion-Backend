import {
  Accounts,
  Benefits,
  Branches,
  Images,
  Tags,
} from "../interface/interfaces";

export class AccountModel {
  accountObject: Accounts = {
    name: "",
    benefits: [],
    branches: [],
    crmid: "",
    tags: [],
    images: [],
  };
  constructor(
    name: string,
    crmid: string,
    branches: Array<Branches>,
    benefits: Array<Benefits>,
    tags: Array<Tags>,
    images: Array<Images>
  ) {
    this.accountObject.name = name;
    this.accountObject.branches = branches;
    this.accountObject.crmid = crmid;
    this.accountObject.tags = tags;
    this.accountObject.benefits = benefits;
    this.accountObject.images = images;
  }
  getNewAccount(): Accounts {
    return this.accountObject;
  }
}

/* name: string;
  crmid: string;
  branches: Array<Branches>;
  benefits: Array<Benefits>;
  tags: Array<Tags>; */
