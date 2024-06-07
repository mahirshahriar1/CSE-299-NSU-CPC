import * as yup from "yup";

export const userSchema1 = yup.object().shape({
  name: yup.string().required("This field is required"),
  status: yup.string().required("This field is required"),
  nsuID: yup
    .string()
    .length(10, "Please enter a valid ID")
    .required("This field is required"),
  email: yup
    .string()
    .email("Please enter your NSU Email")
    .matches(/@northsouth\.edu$/, "Please enter your NSU Email")
    .required("This field is required"),
});

export const corporateSchema1 = yup.object().shape({
  personName: yup.string().required("This field is required"),
  workEmail: yup
    .string()
    .email("Please enter your work email")
    .required("This field is required"),
  linkedIn: yup.string().required("This field is required"),
  isAlumni: yup.string().required("This field is required"),
});