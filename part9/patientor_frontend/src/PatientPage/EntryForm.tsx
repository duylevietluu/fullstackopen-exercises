/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { Button, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Field, Formik, Form, FieldProps } from "formik";

import { TextField } from "../AddPatientModal/FormField";
import { HealthCheckEntry, HealthCheckRating } from "../types";

export type EntryFormValues = Omit<HealthCheckEntry, "id">;

export type HealthCheckOption = {
  value: HealthCheckRating;
  label: string;
};


const healthCheckOptions: HealthCheckOption[] = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" },
];


interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

export const EntryForm = ({ onSubmit }: Props) => {
  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy,
        description: "",
        date: "",
        specialist: "",
      }}
      onSubmit={onSubmit}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field label="type" placeholder="type"name="type" component={TextField} />
            <Field label="description" placeholder="description" name="description" component={TextField} />
            <Field label="date" placeholder="YYYY-MM-DD" name="date" component={TextField} />
            <Field label="specialist" placeholder="specialist" name="specialist" component={TextField} />

            <SelectField label="healthCheckRating" name="healthCheckRating" options={healthCheckOptions} />

            <Button
                style={{
                float: "right",
                }}
                type="submit"
                variant="contained"
                disabled={!dirty || !isValid}
            >
                Add
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

// type SelectFieldProps = {
//   name: string;
//   label: string;
//   options: GenderOption[];
// };


const FormikSelect = ({ field, ...props }: FieldProps) => <Select {...field} {...props} />;
export const SelectField = ({ name, label, options }: { name: string; label: string; options: HealthCheckOption[] } ) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

export default EntryForm;
