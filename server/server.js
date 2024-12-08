const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let dt = new Date();
let y = dt.getFullYear();
let m = dt.getMonth();
let d = dt.getDate();

let events = [
    {
        id: 1,
        title: 'Single Day Event',
        start: new Date(y, m, d, 0, 0),
        end: new Date(y, m, d, 23, 59),
        allDay: true,
        description: 'Full day event example',
        situacao: 'C'
    },
    {
        id: 2,
        title: 'Multi Day Event',
        start: new Date(y, m, d-5),
        end: new Date(y, m, d-2),
        allDay: true,
        description: 'Multi-day event example',
        situacao: 'E'
    },
    {
        id: 3,
        title: 'Appointment',
        start: new Date(y, m, d-3, 16, 0),
        end: new Date(y, m, d-3, 16, 30),
        allDay: false,
        description: 'Short appointment example',
        situacao: 'A'
    },
    {
        id: 4,
        title: 'Random Meeting',
        start: new Date(y, m, d+1, 10, 0),
        end: new Date(y, m, d+1, 11, 30),
        allDay: false,
        description: 'Random meeting example',
        situacao: 'A'
    },
    {
        id: 5,
        title: 'Future Event',
        start: new Date(y, m, d+3, 9, 0),
        end: new Date(y, m, d+3, 17, 0),
        allDay: true,
        description: 'Future event example',
        situacao: 'A'
    },
    {
        id: 6,
        title: 'Warning Event',
        start: new Date(y, m, d, 0, 0),
        end: new Date(y, m, d, 23, 59),
        allDay: true,
        description: 'Full day event example',
        situacao: 'N'
    },
];

app.get('/events', (req, res) => {
    let sp = req.query.date.split(/[\s/:]/);
    const [d, m, y, h = 0, i = 0] = sp.map(Number);
    const date = new Date(y, m-1, d, h, i, 0);

    let filter = req.query.filter;
    if (filter && typeof filter === 'string') {
        filter = filter.split(';');
    }

    const filterEv = (dt, fl) => {
        const minDt = new Date(dt);
        minDt.setMonth(minDt.getMonth() - 1);
        minDt.setHours(0, 0, 0, 0);
    
        const maxDt = new Date(dt);
        maxDt.setMonth(maxDt.getMonth() + 2);
        maxDt.setHours(23, 59, 59, 999);
    
        let filtered = fl ? events.filter(ev => fl.includes(ev.situacao)) : events;

        return filtered.filter(ev => {
            const start = new Date(ev.start);
            const end = new Date(ev.end);

            return (start >= minDt && end <= maxDt);
        });
    };

    setTimeout(() => { res.json(filterEv(date, filter)) }, 500);
});

app.post('/events', (req, res) => {
    const newEv = { id: events.length + 1, ...req.body };
    events.push(newEv);
    res.json(newEv);
});

app.put('/events/:id', (req, res) => {
    const id = req.params.id;
    const idx = events.findIndex(ev => ev.id === parseInt(id));

    if (idx === -1) {
        res.status(404).json({ message: 'Event not found' });
        return;
    }

    const updatedEvent = { ...events[idx], ...req.body };
    events[idx] = updatedEvent;
    res.json(updatedEvent);
});

app.delete('/events/:id', (req, res) => {
    const id = req.params.id;
    const idx = events.findIndex(ev => ev.id === parseInt(id));

    if (idx === -1) {
        res.status(404).json({ message: 'Event not found' });
        return;
    }

    events.splice(idx, 1);
    res.json({ message: 'Event deleted successfully' });
});

app.listen(port, () => {
    console.log(`Calendar API running at http://localhost:${port}`);
});