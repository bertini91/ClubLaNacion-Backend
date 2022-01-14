export interface Accounts {
  name: string;
  crmid: string;
  branches: Array<Branches>;
  benefits: Array<Benefits>;
  tags: Array<Tags>;
  images: Array<Images>;
  location?: string;
}

export interface Branches {
  location: number; //Luego transformar en mtrs o kg
  crmid: string;
}

export interface Benefits {
  type: string;
  /* images: Array<Images>;
  [x: string]: any; */
}

export interface Tags {
  name: string;
  id_web: string;
  type_id: string;
  type: string;
}

export interface Images {
  id: string;
  type: string;
  url: string;
  highlighted: boolean;
  thumb: boolean;
}

export interface AccountFlag extends Accounts {
  haveVoucher: boolean;
}
