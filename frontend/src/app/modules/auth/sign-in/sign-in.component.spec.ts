import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { App } from "app/app";
import Api from "app/util/Api";

describe("unit test auth", () => {
  it("login default validated", async () => {
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
    expect(login).toEqual(true);
  });
});
