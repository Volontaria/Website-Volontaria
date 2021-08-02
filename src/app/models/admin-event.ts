import {TaskType} from './taskType';
import {Cell} from './cell';


export interface AdminEvent {
    id?: number;
    url?: string;
    description: string;
    start_time: string;
    end_time: string;
    nb_volunteers_needed: number;
    nb_volunteers_standby_needed: number;
    nb_volunteers: number;
    nb_volunteers_standby: number;
    // cell: Cell;  TODO: see how to treat foreign keys
    // task_type: TaskType;

}