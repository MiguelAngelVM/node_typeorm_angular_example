export interface Select {
  id: String;
  name: String;
}
export interface Filter {
  name: String;
  field: String;
  secondaryField?: String;
  type: String;
  formControl?: String;
  filteredOptions?: String;
  display?: String;
  fnDisplay?: Function;
  filter?: Function;
  list?: Array<Select>;
}
