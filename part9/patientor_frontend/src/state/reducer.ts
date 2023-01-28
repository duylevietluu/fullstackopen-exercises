/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT";
      payload: Patient | null; 
    }
  | {
      type: "MODIFY_PATIENT";
      payload: {id: string, patient: Patient};
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnoses
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT":
      return {
        ...state,
        patient: action.payload,
      };
    case "MODIFY_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          id: action.payload.patient
        },
        patient: state.patient !== null && state.patient.id === action.payload.patient.id ? 
          action.payload.patient : 
          state.patient
      };
    default:
      return state;
  }
};

export const setPatientList = (patients: Patient[]): Action => ({
  type: "SET_PATIENT_LIST", payload: patients
});

export const setDiagnosisList = (diagnoses: Diagnosis[]): Action => ({
  type: "SET_DIAGNOSIS_LIST", payload: diagnoses
});

export const addPatient = (patient: Patient): Action => ({
  type: "ADD_PATIENT", payload: patient
});

export const setPatient = (patient: Patient | null): Action => ({
  type: "SET_PATIENT", payload: patient
});

export const modifyPatient = (id: string, patient: Patient): Action => ({
  type: "MODIFY_PATIENT", payload: {id, patient}
});
