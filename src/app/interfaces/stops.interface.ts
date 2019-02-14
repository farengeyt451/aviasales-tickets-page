export interface StopsResponce {
  stops: Array<Stops>;
}

export interface Stops {
  id: number;
  option: string;
  stopCount: number | null;
  selected: boolean;
}

export interface StopFromForm {
  stopsCount: Array<boolean>;
}

export interface FormSubmit {
  stopsCount: Array<Stops>;
}
