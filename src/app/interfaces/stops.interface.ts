export interface StopsResponce {
  stops: Array<Stops>;
}

export interface Stops {
  id: number;
  stopCount: number;
  option?: string;
  selected: boolean;
}

export interface StopFromForm {
  stopsCount: Array<boolean>;
}

export interface FormSubmit {
  stopsCount: Array<Stops>;
}
