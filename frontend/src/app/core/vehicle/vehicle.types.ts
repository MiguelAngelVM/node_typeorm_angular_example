export interface CatBrand {
  id: string,
  name: string,
}

export interface CatColor {
  id: string,
  name: string,
}

export interface CatCarState {
  id: string,
  name: string,
}

export interface Vehicle {
  id?: string,
  catCarState: CatCarState,
  catBrand?: CatBrand
  catColor?: CatColor,
  assigned?:boolean,
  model_year?:number,
  admission_date?:Date
}

export interface VehicleStore {
  id?:string,
  assigned: boolean
  admission_date: Date,
  model_year: string,
  cat_brand_id: string,
  cat_color_id: string
  cat_car_state_id: string
}
