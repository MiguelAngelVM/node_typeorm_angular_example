import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDatepicker } from "@angular/material/datepicker";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import { App } from "app/app";
import {
  CatBrand,
  Vehicle,
  VehicleStore,
} from "app/core/vehicle/vehicle.types";
import { DialogOverviewExampleDialog } from "app/shared/modal-basic/modal-basic.component";
import Api from "app/util/Api";
import { Observable } from "rxjs";
import { Select } from "../../../../core/table/filter.types";
import * as _moment from "moment";
// tslint:disable-next-line:no-duplicate-imports
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from "@angular/material-moment-adapter";
import { MAT_DATE_FORMATS } from "@angular/material/core";

import { default as _rollupMoment, Moment } from "moment";
import { DateAdapter, MAT_DATE_LOCALE } from "@angular/material/core";

const moment = _rollupMoment || _moment;


@Component({
  selector: "list",
  templateUrl: "./create.html",
})
export class CreateComponent implements OnInit {
  public loader: boolean = true;
  public ctrltColor = new FormControl();
  public filteredColor: Observable<Object>;
  public ctrltBrand = new FormControl();
  public filteredBrand: Observable<Object>;
  public states: Array<Select> = [];
  public brans: Array<CatBrand> = [];
  public data: Vehicle = {
    catCarState: {
      name:undefined,
      id:undefined
    },
    catBrand: undefined,
    catColor: undefined,
  };
  public generalForm: FormGroup = new FormGroup({});
  public brand: FormControl;
  public state: FormControl;
  public color: FormControl;
  public assigned: FormControl;
  public model_year: FormControl;

  public admission_date: FormControl;
  public vehicleId: string;

  constructor(
    private app: App,
    public dialog: MatDialog,
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) {}

  /**
   * On init
   */
  async ngOnInit() {
    this.getStatus();
    this.brand = new FormControl("", [Validators.required]);
    this.state = new FormControl("", [Validators.required]);
    this.color = new FormControl("", [Validators.required]);
    this.assigned = new FormControl("", []);
    this.model_year = new FormControl("", [Validators.required]);
    this.admission_date = new FormControl("", [Validators.required]);
    this.generalForm = new FormGroup({
      brand: this.brand,
      state: this.state,
      color: this.color,
      assigned: this.assigned,
      model_year: this.model_year,
      admission_date: this.admission_date,
    });
    this.validUpdate();
  }

  validUpdate = async () => {
    this.vehicleId = this.activatedRoute?.params["value"]?.pm1;
    if(this.vehicleId){
      const vehicle = await Api.get(`vehicle/${this.vehicleId}`)
      .then((response) => {
        return response?.data?.vehicle || undefined;
      })
      .catch((error) => {
        return undefined;
      });
      if(!vehicle){
        return;
      }
      this.data = {
        ...vehicle,
        model_year: moment(vehicle.model_year).year()
      };
      console.log( moment(vehicle.model_year).year())
    }
  }

  getStatus = async () => {
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

    this.states = states.map(mapList);
    this.loader = false;
  };

  filterBrand = (value) => {
    this.app
      ._filter({ busqueda: value }, "data", "catalog/brans", this.ctrltBrand)
      .then((response: Observable<Object>) => {
        this.filteredBrand = response;
      });
  };

  filterColor = (value) => {
    this.app
      ._filter({ busqueda: value }, "data", "catalog/colors", this.ctrltColor)
      .then((response: Observable<Object>) => {
        this.filteredColor = response;
      });
  };

  fnDisplay = (auto): string => {
    return auto ? auto.name : auto;
  };

  onClickStore = () => {
    if (this.generalForm.valid) {
      let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
        width: "250px",
        data: {
          titulo: "Guardar ",
          subtitulo: "¿Deseas guardar la información?",
          cancelar: "1",
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result == 1) {
          this.loader = true;
          this.createRequest();
        }
      });
    } else {
      this.validateAllFormFields(this.generalForm);
    }
  };

  createRequest = async () => {
    const dataSend: VehicleStore = {
      id: this?.data?.id,
      assigned: this.data.assigned ? true : false,
      admission_date: this.data.admission_date,
      model_year: `${this.data.model_year}-01-01 00:00:00`,
      cat_brand_id: this.data.catBrand.id,
      cat_color_id: this.data.catColor.id,
      cat_car_state_id: this.data.catCarState.id,
    };
    
   this.method(dataSend);
  };

  responseMethod = (response) => {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: "250px",
      data: {
        titulo: response.status === "success" ? "Exito " : "Error",
        subtitulo:
          response.status === "success"
            ? "La información se guardo exitosamente "
            : "Ocurrio un error al guardar",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (response.status === "success") {
        this.router.navigate(["/vehicle/list"]);
      }
    });

    this.loader = false;
  }

  errorResponse = () => {
    this.dialog.open(DialogOverviewExampleDialog, {
      width: "250px",
      data: {
        titulo: "Error",
        subtitulo: "Ocurrio un error al guardar",
      },
    });
    this.loader = false;
  }

  store = async (dataSend)=> {
    await  Api.post(`vehicle`, dataSend)
    .then((response) => {
      this.responseMethod(response);
    })
    .catch(() => {
      this.errorResponse();
    });
  }

  update = async (dataSend)=> {
    await  Api.patch(`vehicle/${dataSend.id}`, dataSend)
    .then((response) => {
      this.responseMethod(response);
    })
    .catch(() => {
      this.errorResponse();
    });
  }

  method = async (dataSend) => {
    if(this.data.id){
      this.update(dataSend);
      return;
    }
    this.store(dataSend);
  }

  validateAllFormFields(formGroup: FormGroup) {
    try {
      Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
      this.loader = false;
    } catch (e) {
      this.loader = false;
    }
  }
}
