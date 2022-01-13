export interface Accounts {
  name: string;
  crmid: string;
  branches: Array<Branches>;
  benefits: Array<Benefits>;
  tags: Array<Tags>;
  images: Array<Images>;
  location?: string;
  /* [x: string]: any; */
}

export interface Branches {
  location: number; //Luego transformar en mtrs o kg
  crmid: string;
  /* [x: string]: any; */
}

export interface Benefits {
  type: string;
  /* images: Array<Images>;
  [x: string]: any; */
}

export interface Tags {
  name: string; //Debe decir "Turismo en Buenos Aires" para el 1er endpoint
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
