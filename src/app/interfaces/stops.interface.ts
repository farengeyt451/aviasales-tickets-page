export interface IStopsResponce {
  stops: Array<IStops>;
}

export interface IStops {
  id: number;
  option: string;
  stopCount: number | null;
  selected: boolean;
}

export interface IStopFromForm {
  stopsCount: Array<boolean>;
}

export interface IFormSubmit {
  stopsCount: Array<IStops>;
}
