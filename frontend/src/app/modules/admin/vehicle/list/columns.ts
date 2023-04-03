import {Columns} from "../../../../core/table/columns.types";
const columns: Array<Columns> = [
  {
    name: "S",
    field: "check",
    type: "check",
    order: 0,
    long: "1em",
  },
  {
    name: "ID",
    field: "id",
    type: "menu",
    order: 1,
  },
  {
    name: "Asignado",
    field: "assigned",
    type: "icon",
    order: 0,
  },
  {
    name: "Estatus",
    field: "catCarState",
    secondaryField: "name",
    type:"text",
    order: 1,
  },
  {
    name: "F. Admisión",
    field: "admission_date",
    type: "date",
    order: 1,
  },
  {
    name: "Año",
    field: "model_year",
    type: "year",
    order: 1,
  },
  {
    name: "Marca",
    field: "catBrand",
    secondaryField: "name",
    type: "text",
    order: 1,
  },
  {
    name: "Color",
    field: "catColor",
    secondaryField: "name",
    type: "text",
    order: 1,
    long: "10em",
  },
];
export default columns;