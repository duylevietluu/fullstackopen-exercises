import { Gender, HealthCheckRating, NewEntry, NewPatient } from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (str: unknown): string => {
  if (!str || !isString(str)) {
    throw new Error('Incorrect or missing parameter');
  }

  return str;
};

const parseArrayString = (array: unknown): string[] => {
  if (array === undefined) {
    return [];
  }
  if (!Array.isArray(array)) {
    throw new Error('diagnoses code is not an array!');
  }
  return array.map(item => parseString(item));
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender ||  !isGender(gender)) {
    throw new Error('Incorrect or missing gender ' + gender);
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient = {
    name: parseString(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation),
    entries: []
  };

  return newPatient;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheck = (healthCheck: any): healthCheck is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(healthCheck);
};

const parseHealthCheck = (healthCheck: unknown): HealthCheckRating => {
  if (!isHealthCheck(healthCheck)) {
    throw new Error('Incorrect or missing healthCheck ' + healthCheck);
  }
  return healthCheck;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is { date: string, criteria: string } => {
  return Boolean(discharge && discharge.date && discharge.criteria);
};

const parseDischarge = (discharge: unknown): { date: string, criteria: string } => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('missing discharge for hospital type');
  }
  return {
    date: parseDate(discharge.date),
    criteria: parseString(discharge.criteria)
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is { startDate: string, endDate: string } => {
  return Boolean(sickLeave && sickLeave.startDate && sickLeave.endDate);
};

const parseSickLeave = (sickLeave: unknown): { startDate: string, endDate: string } | undefined => {
  console.log(sickLeave);
  
  if (!sickLeave) {
    return undefined;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error('malformatted sick leave');
  }
  return {
    startDate: parseDate(sickLeave.startDate),
    endDate: parseDate(sickLeave.endDate)
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  if (!object.type) {
    throw Error("missing entry type");
  }
  switch(object.type) {
    case "HealthCheck":
      return {
        type: "HealthCheck",
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseArrayString(object.diagnosisCodes),
        healthCheckRating: parseHealthCheck(object.healthCheckRating),
      };
    case "Hospital":
      return {
        type: "Hospital",
        description: parseString(object.description),
        date: parseDate(object.date),
        specialist: parseString(object.specialist),
        diagnosisCodes: parseArrayString(object.diagnosisCodes),
        discharge: parseDischarge(object.discharge),
      };
    case "OccupationalHealthcare": 
    return {
      type: "OccupationalHealthcare",
      description: parseString(object.description),
      date: parseDate(object.date),
      specialist: parseString(object.specialist),
      diagnosisCodes: parseArrayString(object.diagnosisCodes),
      employerName: parseString(object.employerName),
      sickLeave: parseSickLeave(object.sickLeave), 
    };
    default:
      throw Error("illegal type");
  }
};