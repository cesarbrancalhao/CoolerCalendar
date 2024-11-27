let dt = new Date();
let y = dt.getFullYear();
let m = dt.getMonth();
let d = dt.getDate();

const placeholders = [
    {
        id: 1,
        title: 'Single Day Event',
        start: new Date(y, m, 1, 0, 0),
        end: new Date(y, m, 1, 23, 59),
        allDay: true,
        description: 'teste',
        situacao: 'C'
    },
    {
        id: 2,
        title: 'Multi Day Event',
        start: new Date(y, m, d-5),
        end: new Date(y, m, d-2),
        allDay: true,
        description: 'teste',
        situacao: 'E'
    },
    {
        id: 3,
        title: 'Appointment',
        start: new Date(y, m, d-3, 16, 0),
        end: new Date(y, m, d-3, 16, 30),
        allDay: false,
        description: 'teste',
        situacao: 'A'
    },
];