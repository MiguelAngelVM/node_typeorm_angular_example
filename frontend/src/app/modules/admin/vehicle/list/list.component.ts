import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import columnsTable from "./columns";
import { App } from "app/app";
import { Columns } from "../../../../core/table/columns.types";
import { Filter, Select } from "../../../../core/table/filter.types";
import Api from "app/util/Api";

@Component({
  selector: "list",
  templateUrl: "../../../../layout/common/query-tables/index.html",
  providers: [],
})
export class ListComponent implements OnInit {
  public loader: boolean = true;
  public isCollapsed: boolean = false;
  public filters: Array<Filter> = [];
  public columns: Array<Columns> = [];
  public methods: Object = {
    row: 100,
    orderMethod: "model_year",
    order: "ASC",
  };
  public complete: boolean = false;
  public key: String = "id";
  public data: Array<Object>;
  public deleteFields: Object = {};
  public ctrltColor = new FormControl();
  public filteredColor: Observable<Object>;
  public ctrltBrand = new FormControl();
  public filteredBrand: Observable<Object>;

  constructor(private app: App) {}

  /**
   * On init
   */
  async ngOnInit() {
    this.getFilters();
    this.columns = columnsTable;
    this.onClickFilter();
  }

  getStatus = async (): Promise<Array<Select>> => {
    const states = await Api.get(`catalog/states`)
      .then((response) => {
        return response?.data?.result || [];
      })
      .catch((error) => {
        return [];
      });
    const mapList = ({ id, name }) => {
      return { name, id };
    };

    return states.map(mapList);
  };

  getStatusFilter = async (): Promise<Filter> => {
    const status = await this.getStatus();
    return {
      name: "Estatus",
      field: "catCarState",
      secondaryField: "name",
      type: "select",
      list: status,
    };
  };

  getAutocompletes = (): Array<Filter> => {
    return [
      {
        name: "Marca",
        field: "catBrand",
        secondaryField: "name",
        type: "auto",
        formControl: "ctrltBrand",
        filteredOptions: "filteredBrand",
        display: "name",
        fnDisplay: (auto): string => {
          return auto ? auto.name : auto;
        },
        filter: (value) => {
          this.app
            ._filter(
              { busqueda: value },
              "data",
              "catalog/brans",
              this.ctrltBrand
            )
            .then((response: Observable<Object>) => {
              this.filteredBrand = response;
            });
        },
      },
      {
        name: "Color",
        field: "catColor",
        secondaryField: "name",
        type: "auto",
        formControl: "ctrltColor",
        filteredOptions: "filteredColor",
        display: "name",
        fnDisplay: (auto): string => {
          return auto ? auto.name : auto;
        },
        filter: (value) => {
          this.app
            ._filter(
              { busqueda: value },
              "data",
              "catalog/colors",
              this.ctrltColor
            )
            .then((response: Observable<Object>) => {
              this.filteredColor = response;
            });
        },
      },
    ];
  };

  getFilters = async () => {
    const statusFilter: Filter = await this.getStatusFilter();
    const autocomplete: Array<Filter> = await this.getAutocompletes();
    this.filters = [
      {
        name: "ID",
        field: "id",
        type: "text",
      },
      statusFilter,
      {
        name: "F. Admisión",
        field: "admission_date",
        type: "date",
      },
      {
        name: "Año",
        field: "model_year",
        type: "date",
      },
      ...autocomplete,
      {
        name: "Asignado",
        field: "assigned",
        type: "check",
      },
    ];
  };

  onClickFilter = async () => {
    try {
			this.loader = true;
      let json=JSON.stringify({ filters: this.filters, methods: this.methods });
      json = this.app.formatoXML(json);
      Api.get(`vehicle?params=${json}`).then(response => {
        this.loader = false;
        this.data = response?.data?.result;
      }).catch(() => {
        return [];
      });
    } catch (e) {
			this.data = [];
			this.loader = false;
		}
  }

  onClickDelete = async () => {
    this.loader = true;
    Object.entries(this.deleteFields).forEach( async ([key, value]) => {
      await Api.delete(`vehicle/${key}`, null).then(response => {
      }).catch(() => {
        return [];
      });
    });
    setTimeout(() => {
      this.onClickFilter();  
    }, 1000);
  }
}
