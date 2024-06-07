import { useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import React, { useEffect } from "react";
import { corporateSchema1 } from "../../Validations/UserValidation1";
import { corporateSchema2 } from "../../Validations/UserValidation2";
import axios from "axios";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";

import Stepper from "../Stepper";
import StepperControl from "../StepperControl";
import Account from "../Corporate_Steps/Account";
import Details from "../Corporate_Steps/Details";
import Final from "../Steps/Final";
import TopNav from "../TopNav";

const CorporateRegister = () => {
  const steps = ["Account Information", "Personal Details", "Complete"];
  const [currentStep, setCurrentStep] = useState(1);

  const [personName, setPersonName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [isAlumni, setIsAlumni] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [profilePicture, setProfilePicture] = useState(undefined);
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [remark, setRemark] = useState("");
  const [inputs, setInputs] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formError1, setFormError1] = useState({
    personName: "",
    workEmail: "",
    isAlumni: "",
    linkedIn: "",
  });
  const updateKey1 = (key, value) => {
    setFormError1((prevState) => ({
      ...prevState, // Copy the previous state
      [key]: value, // Override the specific key with its new value
    }));
  };
  const [formError2, setFormError2] = useState({
    password: "",
    confirmPassword: "",
    phone: "",
    companyName: "",
    currentPosition: "",
    companyAddress: "",
    companyWebsite: "",
    remark: "",
    profilePicture: "",
  });
  const updateKey2 = (key, value) => {
    setFormError2((prevState) => ({
      ...prevState, // Copy the previous state
      [key]: value, // Override the specific key with its new value
    }));
  };

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <Final />;
      default:
    }
  };

  const handleClick = async (direction) => {
    const isValid = await validateUser(currentStep);

    let newStep = currentStep;
    if (isValid) {
      if (direction === "confirm" && submitHandler()) newStep++;
      else direction === "next" ? newStep++ : newStep--;
    } else if (direction === "") newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  const validateUser = async (n) => {
    switch (n) {
      case 1:
        let formData1 = {
          personName: personName,
          workEmail: workEmail,
          isAlumni: isAlumni,
          linkedIn: linkedIn,
        };
        try {
          await corporateSchema1.validate(formData1, { abortEarly: false });
          setFormError1({
            personName: "",
            workEmail: "",
            isAlumni: "",
            linkedIn: "",
          });

          return true; // Return true if validation succeeds
        } catch (err) {
          console.log(err);
          // Form validation failed, update errors state
          const newErrors = {
            personName: "",
            workEmail: "",
            isAlumni: "",
            linkedIn: "",
          };
          err.inner.forEach((e) => {
            newErrors[e.path] = e.message;
          });
          setFormError1(newErrors);
          return false; // Return false if validation fails
        }
      case 2:
        let formData2 = {
          password: password,
          confirmPassword: confirmPassword,
          phone: phone,
          companyName: companyName,
          currentPosition: currentPosition,
          companyAddress: companyAddress,
          companyWebsite: companyWebsite,
          remark: remark,
          profilePicture: profilePicture,
        };
        try {
          await corporateSchema2.validate(formData2, { abortEarly: false });
          setFormError2({
            password: "",
            confirmPassword: "",
            phone: "",
            companyName: "",
            currentPosition: "",
            companyAddress: "",
            companyWebsite: "",
            remark: "",
            profilePicture: "",
          });
          return true; // Return true if validation succeeds
        } catch (err) {
          // Form validation failed, update errors state
          const newErrors = {
            password: "",
            confirmPassword: "",
            phone: "",
            companyName: "",
            currentPosition: "",
            companyAddress: "",
            companyWebsite: "",
            remark: "",
            profilePicture: "",
          };
          err.inner.forEach((e) => {
            newErrors[e.path] = e.message;
          });
          setFormError2(newErrors);
          return false; // Return false if validation fails
        }
      default:
        return true;
    }
  };

  const uploadFile = (file, fileType) => {
    // Implement later
    // if (file.size > 1024 * 1024 * 2) {
    //   alert("File size should be less than 2MB");
    //   return;
    // }
    const storage = getStorage(app);
    const folder = fileType === "image" ? "userpfp" : "userfiles";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setInputs((prev) => {
            return { ...prev, [fileType]: downloadURL };
          });
        });
      }
    );
  };

  const submitHandler = () => {
    // if (phone.length !== 11) {
    //   setError("Invalid phone number");
    //   setLoading(false);
    //   alert("Invalid phone number");
    //   return false;
    // }

    setLoading(true);

    if (profilePicture) {
      uploadFile(profilePicture, "image");
    }

    console.log(inputs);
    return true;
  };

  const uploadtodb = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // "http://localhost:5000/corporate/register",
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/corporate/register`,
        {
          personName,
          workEmail,
          password,
          phone,
          linkedIn,
          isAlumni,
          currentPosition,
          companyName,
          companyAddress,
          companyWebsite,
          remark,
          picture: inputs.image,
        },
        config
      );
      console.log(data);
      // localStorage.setItem("userInfo", JSON.stringify(data));
      //clear local storage
      localStorage.clear();
      setLoading(false);
      // clear the form
      setPersonName("");
      setWorkEmail("");
      setPassword("");
      setPhone("");
      setLinkedIn("");
      setIsAlumni("");
      setCurrentPosition("");
      setCompanyName("");
      setCompanyAddress("");
      setCompanyWebsite("");
      setRemark("");
      setProfilePicture(undefined);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    // let isCorporate = userInfo?.userType === "corporate";
    // let isAdmin = userInfo?.userType === "admin";
    // if (!isCorporate && !isAdmin ) {
    //   alert("You are not authorized to view this page");
    //   window.location.href = "/";
    // }
    const status = JSON.parse(userInfo)?.status;
    if (status !== "pending" && userInfo && currentStep !== steps.length) {
      window.location.href = "/";
    }
    if (inputs.image) {
      uploadtodb();
    }
    // eslint-disable-next-line
  }, [inputs]);

  return (
    <div className="min-h-screen bg-sky-100">
      <div className="border-b-2 border-slate-300">
        <TopNav />
      </div>

      <div className="p-10">
        {error ? (
          <div className="flex items-center justify-center">
            <div
              role="alert"
              className=" alert alert-error w-1/3 flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>{" "}
              <span>Something went wrong. Try again.</span>
            </div>
          </div>
        ) : (
          <div />
        )}

        <div className="md:w-1/2 mx-auto shadow-xl rounded-3xl pb-2 bg-white border-2 border-slate-200">
          {/* Stepper */}
          <div className="container horizontal mt-5">
            <Stepper steps={steps} currentStep={currentStep} />
          </div>

          {/* Display Components */}
          <div className="my-10 p-10">
            <StepperContext.Provider
              value={{
                personName,
                setPersonName,
                workEmail,
                setWorkEmail,
                isAlumni,
                setIsAlumni,
                linkedIn,
                setLinkedIn,
                password,
                setPassword,
                confirmPassword,
                setConfirmPassword,
                phone,
                setPhone,
                currentPosition,
                setCurrentPosition,
                companyName,
                setCompanyName,
                companyAddress,
                setCompanyAddress,
                companyWebsite,
                setCompanyWebsite,
                remark,
                setRemark,
                formError1,
                formError2,
                updateKey1,
                updateKey2,
                profilePicture,
                setProfilePicture,
              }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>
          </div>

          {
            /* Navigation controls */
            currentStep !== steps.length && (
              <StepperControl
                handleClick={handleClick}
                currentStep={currentStep}
                steps={steps}
                loading={loading}
              />
            )
          }
        </div>
      </div>
    </div>
  );
};

export default CorporateRegister;
