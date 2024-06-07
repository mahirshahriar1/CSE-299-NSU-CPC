import React, { useContext, useEffect, useState } from "react";
import {
  formFields,
  preferredPrograms,
  combinedCategories,
} from "../../../data/postJobsData";

import NavBar from "../../../NavBar";
import { UserContext } from "../../../../contexts/UserContext";
import TopNav from "../../../TopNav";

function JobPostingForm() {
  const { userInfo, percent, appliedJobs } = useContext(UserContext);
  // console.log(userInfo);

  const jobTypes = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
    "Remote",
  ];

  const [formData, setFormData] = useState({
    vacancyNumber: "",
    deadline: "",
    cgpaRequirement: "",
    salary: "",
    category: "",
    jobType: "",
    positionName: "",
    jobLocation: "",
    requiredExperience: "",
    preferredProgram: "",
    companyName: "",
    jobContext: "",
    jobResponsibilities: "",
    additionalRequirement: "",
    otherBenefits: "",
    additionalRemarks: "",
    applicationProcedure: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const corporateId = JSON.parse(localStorage.getItem("userInfo"))?._id;
    const token = JSON.parse(localStorage.getItem("userInfo"))?.token; // Retrieve the token
    const submissionData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      corporateId: corporateId,
    };

    let imageUrl = JSON.parse(localStorage.getItem("userInfo"))?.picture;
    submissionData.imageUrl = imageUrl;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/jobs/post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify(submissionData),
        }
      );
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      console.log(result);
      setFormData({
        ...formData,
        vacancyNumber: "",
        deadline: "",
        cgpaRequirement: "",
        salary: "",
        category: "",
        jobType: "",
        positionName: "",
        jobLocation: "",
        requiredExperience: "",
        preferredProgram: "",
        companyName: "",
        jobContext: "",
        jobResponsibilities: "",
        additionalRequirement: "",
        otherBenefits: "",
        additionalRemarks: "",
        applicationProcedure: "",
        tags: "",
      });
      alert("Job posted successfully.");
    } catch (error) {
      console.error("Failed to post job", error);
      alert("Failed to post job.");
    }
  };

  useEffect(() => {
    const isCompany = userInfo?.userType === "corporate";
    const isAdmin = userInfo?.userType === "admin";
    if (!isCompany && !isAdmin) {
      alert("You are not authorized to view this page.");
      window.location.href = "/";
    }
    const _companyName = JSON.parse(
      localStorage.getItem("userInfo")
    )?.companyName;
    if (_companyName) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        companyName: _companyName,
      }));
    }
  }, [userInfo?.userType]);

  const handleCategorySelect = (category) => {
    setFormData({ ...formData, category });
    console.log("Selected category:", category);
  };

  const handleProgramSelect = (program) => {
    setFormData({ ...formData, preferredProgram: program });
    console.log("Selected program:", program);
  };

  function Category({ field }) {
    return (
      <div key={field.id} className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs           font-bold mb-2">
            {field.label}
          </label>
          <select
            name={field.id}
            value={formData[field.id]}
            onChange={(e) => handleCategorySelect(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
          >
            <option value="" disabled>
              Select a category
            </option>
            {combinedCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  function PreferredProgram({ field }) {
    return (
      <div key={field.id} className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {field.label}
          </label>
          <select
            name={field.id}
            value={formData[field.id]}
            onChange={(e) => handleProgramSelect(e.target.value)}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
          >
            <option value="" disabled>
              Select a program
            </option>
            {preferredPrograms.map((program) => (
              <option key={program} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
  function JobType({ field }) {
    return (
      <div key={field.id} className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {field.label}
          </label>
          <select
            name={field.id}
            value={formData[field.id]}
            onChange={(e) =>
              setFormData({ ...formData, jobType: e.target.value })
            }
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
          >
            <option value="" disabled>
              Select a job type
            </option>
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-row">
      <div className="">
        <UserContext.Provider value={{ userInfo, percent, appliedJobs }}>
          <NavBar className=" flex bg-gray-200 w-full" />
        </UserContext.Provider>
      </div>
      <div className="main flex flex-col items-center w-full">
        <div className="w-full">
          <UserContext.Provider value={{ userInfo }}>
            <TopNav />
          </UserContext.Provider>
        </div>
        <div className="flex flex-col items-center pr-4 pl-4 m-6 bg-white border-4 border-blue-400 rounded-box shadow-lg">
          <div className="flex flex-col items-center my-5">
            <h1 className="text-4xl">POST A JOB</h1>
          </div>
          <div className="p-[2px] mt-1 rounded-box bg-blue-400 mb-10 w-full"></div>
          <form
            className="bg-white w-full max-w-lg px-2 ml-10 mr-10 items-center grid grid-cols-2 gap-2"
            onSubmit={handleSubmit}
          >
            {formFields.map((field) => {
              if (field.id === "category") {
                return <Category key={field.id} field={field} />;
              } else if (field.id === "preferredProgram") {
                return <PreferredProgram key={field.id} field={field} />;
              } 
              else if (field.id === "jobType") {
                return <JobType key={field.id} field={field} />;
              }
              else {
                return (
                  <div className="mb-6" key={field.id}>
                    <label
                      className="block text-gray-500 text-sm font-bold mb-2"
                      htmlFor={field.id}
                    >
                      {field.label}
                    </label>
                    <input
                      className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-400"
                      id={field.id}
                      name={field.id}
                      type={field.type}
                      placeholder={field.placeholder || ""}
                      value={formData[field.id]}
                      onChange={handleChange}
                      required={field.required || false}
                      disabled={field.disabled || false}
                    />
                  </div>
                );
              }
            })}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold mb-5 p-3 rounded w-full"
              type="submit"
            >
              Submit
            </button>
          </form>
          <div className="p-[2px] rounded-box bg-blue-400 mb-5 w-[200px]"></div>
        </div>
      </div>
    </div>
  );
}

export default JobPostingForm;
