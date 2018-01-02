import BaseModel from "./baseModel";
import {Cell} from "./cell";
import {Tasktype} from "./tasktype";
import {Cycle} from "./cycle";

export class Event extends BaseModel {
  id: number;
  task_type: Tasktype;
  cell: Cell;
  cycle: Cycle;
  start_date: string;
  end_date: string;
  volunteers: number[];
  volunteers_standby: number[];
}



