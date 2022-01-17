import { Images } from "../interface/interfaces";

export class AccountFlagModel {
  name: string;
  crmid: string;
  images: Array<Images> = [];

  constructor(name: string, crmid: string, images: Array<Images>) {
    this.name = name;
    this.crmid = crmid;
    this.images = images;
  }
}
