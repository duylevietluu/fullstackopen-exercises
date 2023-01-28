interface Evaluation { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (hours: Array<number>, target: number): Evaluation => {
    const periodLength = hours.length;
    let sum = 0, trainingDays = 0;
    for (let i = 0; i < periodLength; ++i) {
        sum += hours[i];
        if (hours[i] > 0) {
            trainingDays++;
        }
    }
    const average = sum / periodLength, success = average >= target;
    let rating: number, ratingDescription: string;

    if (success) {
        rating = 3;
        ratingDescription = "good job! met your target";
    } else if (target - average < 0.5) {
        rating = 2;
        ratingDescription = "not too bad. can be better...";
    } else {
        rating = 1;
        ratingDescription = "should be trying more";
    }

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

export const toNumber = (x: unknown): number => {
    if (!isNaN(Number(x))) {
        return Number(x);
    } else {
        throw new Error('Provided values were not numbers!');
    }
};

// try {
//     if (process.argv.length < 4) throw new Error('Not enough arguments');

//     const TARGET: number = toNumber(process.argv[2]);
//     const HOURS: Array<number> = [];

//     for (let i = 3; i < process.argv.length; i++) {
//         HOURS.push(toNumber(process.argv[i]));
//     }

//     console.log(calculateExercises(HOURS, TARGET));
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }

