import { TestBed } from "@angular/core/testing";
import { App } from "app/app";
import { Columns } from "../../../../core/table/columns.types";
import { ListComponent } from "./list.component";

import { Filter } from "../../../../core/table/filter.types";

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
    expect(listComponent.key).toEqual("id");
    expect(listComponent.deleteFields).toEqual({});
  });

  it("interface list component validate", async () => {
    expect(listComponent.filters).toBeInstanceOf(Array<Filter>);
    expect(listComponent.columns).toBeInstanceOf(Array<Columns>);
    expect(listComponent.filters.length).toBe(0);
    expect(listComponent.columns.length).toBe(0);
  });
});
