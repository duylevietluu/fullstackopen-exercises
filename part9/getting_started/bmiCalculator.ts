interface Result {
    height: number
    weight: number
    bmi: string
}

export const calculateBmi = (height: number, weight: number): Result => {
    const bmi_number: number = (weight * 10000) / (height * height);

    let bmi: string;

    if (bmi_number < 18.5) {
        bmi = "Underweight";
    } else if (bmi_number < 25) {
        bmi = "Normal";
    } else if (bmi_number < 30) {
        bmi = "Overweight (Pre-obese)";
    } else {
        bmi = "Obese";
    }

    return { height, weight, bmi };
};

// interface HeightWeight {
//     h: number;
//     w: number;
// }
// const parseArguments = (args: Array<string>): HeightWeight => {
//     if (args.length < 4) throw new Error('Not enough arguments');
//     if (args.length > 4) throw new Error('Too many arguments');

//     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//         return {
//             h: Number(args[2]),
//             w: Number(args[3])
//         };
//     } else {
//         throw new Error('Provided values were not numbers!');
//     }
// };
// try {
//     const { h, w } = parseArguments(process.argv);
//     console.log(calculateBmi(h, w).bmi);
// } catch (error: unknown) {
//     let errorMessage = 'Something bad happened.';
//     if (error instanceof Error) {
//         errorMessage += ' Error: ' + error.message;
//     }
//     console.log(errorMessage);
// }
