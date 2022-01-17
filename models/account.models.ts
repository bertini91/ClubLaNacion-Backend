import {
  Accounts,
  Benefits,
  Branches,
  Images,
  Tags,
} from "../interface/interfaces";

export class AccountModel {
  name: string;
  benefits: Array<Benefits> = [];
  branches: Array<Branches> = [];
  crmid: string;
  tags: Array<Tags> = [];
  images: Array<Images> = [];
  location: string;

  constructor(
    name: string,
    crmid: string,
    branches: Array<Branches>,
    benefits: Array<Benefits>,
    tags: Array<Tags>,
    images: Array<Images>,
    location: string = ""
  ) {
    this.name = name;
    this.branches = branches;
    this.crmid = crmid;
    this.tags = tags;
    this.benefits = benefits;
    this.images = images;
    this.location = location;
  }
  getNewAccount(): Accounts {
    return this;
  }
}

