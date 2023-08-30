import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('OK 👍');
});


const server = app.listen(3000, () => {
    console.log('Server is running at http://localhost:' + (server.address() as any).port);
});

