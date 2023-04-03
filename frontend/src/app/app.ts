import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import Api from "app/util/Api";
import { map, startWith } from "rxjs/operators";

@Injectable()
export class App {
  constructor( ) {}
  public color;

  mouseEnter(celda) {
    this.color = (<HTMLInputElement>(
      document.getElementById("iTr" + celda)
    )).style.background;
    (<HTMLInputElement>(
      document.getElementById("iTr" + celda)
    )).style.background = "#D3D3D3";
  }

  mouseLeave(celda) {
    (<HTMLInputElement>(
      document.getElementById("iTr" + celda)
    )).style.background = this.color;
  }

  _filter(value: any, save, route, ctrl) {
    if (!value.busqueda || typeof value?.busqueda !== "string") {
      return new Promise((resolve, _) => {
        resolve(
          ctrl.valueChanges.pipe(
            startWith(null),
            map((state) => [].slice())
          )
        );
      });
    }
    return new Promise((resolve, reject) => {
      Api.get(`${route}?name=${value.busqueda}`)
        .then((response) => {
          resolve(
            ctrl.valueChanges.pipe(
              startWith(null),
              map((state) =>
                state ? this.empty() : response[save]["result"].slice()
              )
            )
          );
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  empty() {}

  public formatoXML(cadena: string = ""): string {
    if (!cadena) cadena = "";
    cadena = cadena.replace(/&/g, "-mav-amp-mav-");
    cadena = cadena.replace(/'/g, "-mav-apos-mav-");
    cadena = cadena.replace(/%/g, "-mav-por-mav-");
    return cadena;
  }
  
}
