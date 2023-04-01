import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Router } from "@angular/router";

@Injectable()
export class App {
  constructor(public http: HttpClient, public router: Router) {}
}
