import { v4 as uuid } from 'uuid';
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from '../types';

import patients from '../data/patients';

const getPatients = (): Patient[] => {
  return patients;
};

const getNoSsnPatients = (): PublicPatient[] => {
  return patients.map(patient => ({ ...patient, ssn: undefined, entries: undefined }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const patient = findById(id);

  if (!patient) {
    throw Error("malformatted id");
  }

  const newEntry = {
    id: uuid(),
    ...entry,
  };

  patient.entries.push(newEntry);

  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

export default {
  getPatients,
  getNoSsnPatients,
  addPatient,
  addEntry,
  findById
};
