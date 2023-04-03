import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import columnsTable from "./columns";
import { App } from "app/app";
import { Columns } from "../../../../core/table/columns.types";
import { Filter, Select } from "../../../../core/table/filter.types";
import Api from "app/util/Api";
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

const moment = _rollupMoment || _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: "list",
  templateUrl: "../../../../layout/common/query-tables/index.html",
  providers: [{
    provide: DateAdapter,
    useClass: MomentDateAdapter,
    deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  },

  {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},],
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
  public key: string = "id";
  public data: Array<Object> = [];
  public deleteFields: Object = {};
  public ctrltColor = new FormControl();
  public filteredColor: Observable<Object>;
  public ctrltBrand = new FormControl();
  public filteredBrand: Observable<Object>;
  public model_year = new FormControl(moment());

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
    const filters = [
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
        name: "Sin Asignar",
        field: "assigned",
        type: "check",
      },
    ];
    this.filters = filters;
    return filters;
  };

  onClickFilter = async ():Promise<boolean> => {
    try {
			this.loader = true;
      let json=JSON.stringify({ filters: this.filters, methods: this.methods });
      json = this.app.formatoXML(json);
      const complete = await Api.get(`vehicle?params=${json}`).then(response => {
        this.loader = false;
        this.data = response?.data?.result;
        return true;
      }).catch(() => {
        return false;
      });
      return complete;
    } catch (e) {
			this.data = [];
			this.loader = false;
      return false;
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
  
  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.model_year.value;
    ctrlValue.year(normalizedYear.year());
    this.model_year.setValue(ctrlValue);
    datepicker.close();
  }

}
