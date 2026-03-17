import type { Civility } from "./Civility";

export type Address = {
  civility:  Civility;
  firstName: string;
  lastName:  string;
  company?:  string;
  address1:  string;
  address2?: string;
  city:      string;
  state?:    string;
  postcode:  string;
  email:     string;
  phone:     string;
};
