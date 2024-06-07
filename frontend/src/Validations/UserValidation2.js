import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 character, 1 upper case letter, 1 lower case letter, 1 numeric digit.

export const userSchema2 = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .matches(
      passwordRules,
      "min 5 character, 1 uppercase letter, 1 lowercase letter, and 1 digit"
    )
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This field is required"),
  school: yup.string().required("This field is required"),
  department: yup.string().required("This field is required"),
  phone: yup
    .string()
    .length(11, "Please enter a valid phone number")
    .required("This field is required"),
  profilePicture: yup
    .mixed()
    .required("Profile pic is required")
    .test("fileSize", "File size too large (MAX: 2MB)", (value) => {
      if (value) {
        const maxSize = 2 * 1024 * 1024; // 2MB
        return value.size <= maxSize;
      }
      return true;
    }),
});

export const corporateSchema2 = yup.object().shape({
  password: yup
    .string()
    .min(5)
    .matches(
      passwordRules,
      "min 5 character, 1 uppercase letter, 1 lowercase letter, and 1 digit"
    )
    .required("This field is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("This field is required"),
  phone: yup
    .string()
    .length(11, "Please enter a valid phone number")
    .required("This field is required"),
  currentPosition: yup.string().required("This field is required"),
  companyName: yup.string().required("This field is required"),
  companyAddress: yup.string().required("This field is required"),
  companyWebsite: yup.string().required("This field is required"),
  remark: yup.string(),
  profilePicture: yup
    .mixed()
    .required("Profile pic is required")
    .test("fileSize", "File size too large (MAX: 2MB)", (value) => {
      if (value) {
        const maxSize = 2 * 1024 * 1024; // 2MB
        return value.size <= maxSize;
      }
      return true;
    }),
});
