import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ListComponent } from "./list.component";
import { App } from "app/app";
import { HttpClient, HttpHandler,  } from "@angular/common/http";
import { Router } from "@angular/router";
import Api from "app/util/Api";
import columnsTable from "./columns";
import { Columns } from "../../../../core/table/columns.types";

import { Filter, Select } from "../../../../core/table/filter.types";

const auth = async () => {
  const credentials = {email:"pulpo@mail.com", password:"pulpo123"};
  const login = await  Api.post(`auth/login`, credentials)
  .then((response) => {
    if(response.status === 'success'){
      localStorage.setItem('accessToken', response.access_token);
      return true;
    }
    return false;
  })
  .catch(() => {
    return false;     
  });
  return login;
}

const wsList = async () => {
  let json=JSON.stringify({ filters:{}, methods:{}});

  const complete = await Api.get(`vehicle?params=${json}`).then(response => {
      return true;
  }).catch(() => {
    return false;
  });
  return complete;
}

describe("unit test ListComponent", () => {
  const app: App = new App();
  const listComponent = new ListComponent(app);

  beforeEach(async function () {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
    }).compileComponents();
  });

  it("should create ListComponent", () => {
    expect(listComponent).toBeDefined();
    expect(listComponent).toBeInstanceOf(ListComponent);
    expect(listComponent).toBeTruthy();
  });

  it("should create ListComponent const", () => {
    expect(listComponent.data.length).toBe(0);
    expect(listComponent.filters.length).toBe(0);

    const methods: Object = {
      row: 100,
      orderMethod: "model_year",
      order: "ASC",
    };

    expect(listComponent.methods).toEqual(methods);
    expect(listComponent.loader).toEqual(true);
    expect(listComponent.isCollapsed).toEqual(false);
    expect(listComponent.complete).toEqual(false);
    expect(listComponent.key).toEqual('id');
    expect(listComponent.deleteFields).toEqual({});
  });

  it("interface list component validate", async () => {
    expect(listComponent.filters).toBeInstanceOf(Array<Filter>);
    expect(listComponent.columns).toBeInstanceOf(Array<Columns>);
    expect(listComponent.filters.length).toBe(0);
    expect(listComponent.columns.length).toBe(0);
  });  
});
