import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, toNumber } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const height = toNumber(req.query.height), weight = toNumber(req.query.weight);
        res.json(calculateBmi(height, weight));
    } catch(error) {
        res.status(400).json({ error: "malformatted parameters" });
    }
});

app.post('/exercises', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        let { daily_exercises, target } = req.body;
        
        target = toNumber(target);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        daily_exercises = daily_exercises.map(toNumber);

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        res.json(calculateExercises(daily_exercises, target));
    } catch(error) {
        // eslint-disable-next-line
        if (!req.body || !req.body.daily_exercises || !req.body.target) {
            res.status(400).json({ error: "parameters missing" });
        } else {
            res.status(400).json({ error: "malformatted parameter" });
        }        
    }
});


const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
