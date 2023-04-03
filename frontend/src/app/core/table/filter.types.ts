export interface Select {
  id: string;
  name: string;
}
export interface Filter {
  name: string;
  field: string;
  secondaryField?: string;
  type: string;
  formControl?: string;
  filteredOptions?: string;
  display?: string;
  fnDisplay?: Function;
  filter?: Function;
  list?: Array<Select>;
  content?: any
}
