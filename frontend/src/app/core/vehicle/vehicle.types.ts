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
  catCarState: CatCarState,
  catBrand?: CatBrand
  catColor?: CatColor,
  assigned?:boolean,
  model_year?:number,
  admission_date?:Date
}

export interface VehicleStore {
  assigned: boolean
  admission_date: Date,
  model_year: number,
  cat_brand_id: string,
  cat_color_id: string
  cat_car_state_id: string
}
