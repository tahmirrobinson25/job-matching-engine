import cors from 'cors';
import express from 'express';
import { router } from './routes/jobs.ts';
const app = express();

app.use(express.json());
app.use(cors());
app.use('/jobs', router);

const PORT : number = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});