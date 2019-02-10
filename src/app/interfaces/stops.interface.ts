export interface IStopsResponce {
  stops: Array<IStops>;
}

export interface IStops {
  id: number;
  option: string;
  stopCount: number | null;
  selected: boolean;
}
