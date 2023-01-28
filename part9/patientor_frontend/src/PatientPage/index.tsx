/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Card } from '@material-ui/core';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import { modifyPatient, setPatient, useStateValue } from "../state";
import { Entry, Patient } from '../types';
import EntryForm, { EntryFormValues } from './EntryForm';

const PatientPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const [{ patient, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return null;
  }

  useEffect(() => {
    if (patient && patient.id === id) {
      return;
    }
    
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        dispatch(setPatient(patient));
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          console.error(e?.response?.data || "Unrecognized axios error");
        } else {
          console.error("Unknown error", e);
        }
      }
    };

    void fetchPatient();
  }, [dispatch]);

  if (!patient) {
    return null;
  }

  const handleEntry = async (values: EntryFormValues)  => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `${apiBaseUrl}/patients/${patient.id}/entries`,
        values
      );
      
      const newPatient: Patient = { ...patient, entries: patient.entries.concat(newEntry) };

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      dispatch(modifyPatient(patient.id, newPatient));
    }
    catch (error) {
      console.log(error);
    }
  };

  return (<>
    <h2>{patient.name}</h2>
    <div>gender: {patient.gender}</div>
    <div>ssn: {patient.ssn}</div>
    <div>occupation: {patient.occupation}</div>

    <h4>entries</h4>
    {
      patient.entries.map(entry =>
        <Card key={entry.id} variant="outlined" style={ {marginTop: 20, marginBottom: 20, padding: 5} }>
          <div>{entry.date}<em> {entry.description}</em></div>
          <ul>
            {
              entry.diagnosisCodes?.map((diag, id) => 
                <li key={id}>
                  {diag} {diagnoses[diag]?.name}
                </li>)
            }
          </ul>
          <EntryDetailView entry={entry} />
          <div style={ {textAlign: "right"} }>diagnosed by {entry.specialist}</div>
        </Card>)
    }

    <EntryForm onSubmit={handleEntry} />
  </>);
};

const EntryDetailView = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return (<>
        <div>Health Rating: {entry.healthCheckRating}</div>
      </>);
    case "Hospital":
      return (<>
        <div>Discharge Date: {entry.discharge.date}</div>
        <div>Discharge Criteria: {entry.discharge.criteria}</div>
      </>);
    case "OccupationalHealthcare":
      return (<>
        <div>Employer Name: {entry.employerName}</div>
        {
          entry.sickLeave ?
          <div>Sick Leave: from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</div> :
          null
        }
      </>);
    default:
      return null;
  }
};

export default PatientPage;