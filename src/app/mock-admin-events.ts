import { AdminEvent } from './models/admin-event';

export const ADMIN_EVENTS: AdminEvent[] = [
    {
    id: 1,
    url: "a-preciser",
    description: "collecte chaussures",
    start_time: "2021-08-07 12:00:00",
    end_time: "2021-08-07 18:00:00",
    nb_volunteers_needed: 2,
    nb_volunteers_standby_needed: 0,
    nb_volunteers: 0,
    nb_volunteers_standby: 0
    },
    {
    id: 2,
    url: "a-preciser-2",
    description: "vente beignets",
    start_time: "2021-08-14 06:00:00",
    end_time: "2021-08-14 18:00:00",
    nb_volunteers_needed: 4,
    nb_volunteers_standby_needed: 2,
    nb_volunteers: 0,
    nb_volunteers_standby: 0
    }

]


