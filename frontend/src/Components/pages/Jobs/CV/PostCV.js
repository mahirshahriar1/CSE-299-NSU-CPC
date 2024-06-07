import React, { useEffect, useState } from "react";
import axios from "axios";
import UserCV from "./UserCV";
import { UserContext } from "../../../../contexts/UserContext";
import TopNav from "../../../TopNav";

// Define default values for array fields
const getDefaultEducation = () => ({
  institution: "",
  degree: "",
  fieldOfStudy: "",
  entranceDate: "",
  graduationDate: "",
});

const getDefaultWorkExperience = () => ({
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
});

const getDefaultCertification = () => ({
  name: "",
  issuer: "",
  issueDate: "",
});

const getDefaultProject = () => ({
  name: "",
  description: "",
  url: "",
});

const getDefaultLanguage = () => ({
  name: "",
  proficiency: "",
});

const getDefaultReference = () => ({
  name: "",
  position: "",
  company: "",
  email: "",
  phone: "",
});

const inputFields = [
  { name: "name", type: "text", placeholder: "Name", required: true },
  { name: "nsu_id", type: "text", placeholder: "NSU ID", required: true },
  {
    name: "nsu_email",
    type: "email",
    placeholder: "NSU Email",
    required: true,
  },
  { name: "email", type: "email", placeholder: "Email", required: true },
  { name: "phone", type: "text", placeholder: "Phone", required: true },
  { name: "address", type: "text", placeholder: "Address" },
  { name: "summary", type: "text", placeholder: "Summary" },
  { name: "linkedin", type: "text", placeholder: "LinkedIn" },
  { name: "github", type: "text", placeholder: "GitHub" },
];

const arrayFields = [
  {
    name: "education",
    label: "Education",
    inputs: [
      {
        name: "institution",
        type: "text",
        placeholder: "Institution",
        required: true,
      },
      { name: "degree", type: "text", placeholder: "Degree" },
      { name: "fieldOfStudy", type: "text", placeholder: "Field of Study" },
      { name: "entranceDate", type: "date", placeholder: "Entrance Date" },
      { name: "graduationDate", type: "date", placeholder: "Graduation Date" },
    ],
    defaultItem: getDefaultEducation(),
  },
  {
    name: "workExperience",
    label: "Work Experience",
    inputs: [
      { name: "company", type: "text", placeholder: "Company", required: true },
      { name: "position", type: "text", placeholder: "Position" },
      { name: "startDate", type: "date", placeholder: "Start Date" },
      { name: "endDate", type: "date", placeholder: "End Date" },
      { name: "description", type: "text", placeholder: "Description" },
    ],
    defaultItem: getDefaultWorkExperience(),
  },
  {
    name: "certifications",
    label: "Certifications",
    inputs: [
      { name: "name", type: "text", placeholder: "Name" },
      { name: "issuer", type: "text", placeholder: "Issuer" },
      { name: "issueDate", type: "date", placeholder: "Issue Date" },
    ],
    defaultItem: getDefaultCertification(),
  },
  {
    name: "projects",
    label: "Projects",
    inputs: [
      { name: "name", type: "text", placeholder: "Name" },
      { name: "description", type: "text", placeholder: "Description" },
      { name: "url", type: "text", placeholder: "URL" },
    ],
    defaultItem: getDefaultProject(),
  },
  {
    name: "languages",
    label: "Languages",
    inputs: [
      { name: "name", type: "text", placeholder: "Name" },
      { name: "proficiency", type: "text", placeholder: "Proficiency" },
    ],
    defaultItem: getDefaultLanguage(),
  },
  {
    name: "references",
    label: "References",
    inputs: [
      { name: "name", type: "text", placeholder: "Name" },
      { name: "position", type: "text", placeholder: "Position" },
      { name: "company", type: "text", placeholder: "Company" },
      { name: "email", type: "email", placeholder: "Email" },
      { name: "phone", type: "text", placeholder: "Phone" },
    ],
    defaultItem: getDefaultReference(),
  },
];

const GenerateCV = () => {
  // user info

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    nsu_id: "",
    school: "",
    department: "",
    phone: "",
    status: "",
    picture: "",
    CV: "",
    cgpa: "",
    credits: "",
  });

  const getInfo = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo || !userInfo._id) {
        throw new Error("User information not found or invalid.");
      }
      // console.log("User Info: ", userInfo);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getInfo/${userInfo.email}`
      );
      const userData = response.data;

      setUserInfo(userData);
      // console.log("User Data: ", userData);
      // round the percentage to 2 decimal places
    } catch (error) {
      console.error("Failed to get user info:", error.message);
    }
  };

  // User CV
  const [userCV, setUserCV] = useState({
    address: "",
    certifications: [],
    education: [],
    email: "",
    github: "",
    hobbies: [],
    languages: [],
    linkedin: "",
    name: "",
    nsu_email: "",
    nsu_id: "",
    phone: "",
    projects: [],
    references: [],
    skills: [],
    summary: "",
    workExperience: [],
  });
  // setUserCV(contextUserCV);
  // eslint-disable-next-line
  const [cvId, setCVId] = useState("");

  const getCV = async () => {
    try {
      let _email = JSON.parse(localStorage.getItem("userInfo")).email;
      // console.log("Email: ", _email);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getCVEmail/${_email}`
      );
      console.log("Response: ", response.data);
      setCVId(response.data._id);
      const userCV = response.data;

      setUserCV(userCV);
      setFormData(userCV);
      // console.log("User CV", userCV);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to get resume:", error.message);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    nsu_id: "",
    nsu_email: "",
    education: [getDefaultEducation()],
    workExperience: [getDefaultWorkExperience()],
    skills: [],
    certifications: [getDefaultCertification()],
    projects: [getDefaultProject()],
    languages: [getDefaultLanguage()],
    summary: "",
    hobbies: [],
    references: [getDefaultReference()],
  });

  const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
    margin-top: 5px; /* Margin on top of the scrollbar */
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: #edf2f7; /* Track color */
    border-radius: 6px; /* Border radius of the track */
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #90cdf4; /* Thumb color */
    border-radius: 6px; /* Border radius of the thumb */
   s
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #0675c1; /* Thumb color on hover */
  }
  `;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setUserCV({ ...userCV, [name]: value });
  };

  const handleArrayChange = (index, e, field) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = {
      ...updatedArray[index],
      [e.target.name]: e.target.value,
    };
    setFormData({ ...formData, [field]: updatedArray });
    setUserCV({ ...userCV, [field]: updatedArray });
  };

  const addArrayItem = (field, defaultItem) => {
    setFormData({ ...formData, [field]: [...formData[field], defaultItem] });
  };

  const removeArrayItem = (index, field) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [field]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // "http://localhost:5000/users/postCV",
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/postCV`,
        formData
      );
      console.log("CV data submitted:", response.data);
      alert("CV data submitted successfully");
      resetFormData();
    } catch (error) {
      console.error("Error submitting CV data:", error);
      // Handle error: display error message to the user
    }
  };

  const resetFormData = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      linkedin: "",
      github: "",
      nsu_id: "",
      nsu_email: "",
      education: [getDefaultEducation()],
      workExperience: [getDefaultWorkExperience()],
      skills: [],
      certifications: [getDefaultCertification()],
      projects: [getDefaultProject()],
      languages: [getDefaultLanguage()],
      summary: "",
      hobbies: [],
      references: [getDefaultReference()],
    });
  };

  useEffect(() => {
    const nsuid = JSON.parse(localStorage.getItem("userInfo"))?.nsu_id;
    const nsuemail = JSON.parse(localStorage.getItem("userInfo"))?.email;
    const _name = JSON.parse(localStorage.getItem("userInfo"))?.name;
    const isCorporate =
      JSON.parse(localStorage.getItem("userInfo"))?.companyName !== undefined;
    if (isCorporate) {
      alert("You are not authorized to submit a CV");
      window.location.href = "/";
    } else if (nsuid === undefined || nsuemail === undefined) {
      alert("Please login to submit your CV");
      window.location.href = "/login";
    }
    setFormData({
      ...formData,
      nsu_id: nsuid,
      nsu_email: nsuemail,
      name: _name,
    });
    // eslint-disable-next-line
    if (userInfo.name === "") {
      getInfo();
      getCV();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="h-screen w-full">
      <UserContext.Provider value={{ userInfo }}>
        <TopNav />
      </UserContext.Provider>

      {formData.nsu_id === undefined ? (
        <div></div>
      ) : (
        <div className="h-full w-full bg-[#ecf0f3] p-10 flex justify-center ">
          <div className="container w-1/2 bg-[#ecf0f3] rounded-[40px] shadow-[13px_13px_20px_rgba(203,206,209,1)] mr-4 ">
            <style>{customScrollbarStyles}</style>
            <div className="w-full h-full pt-[60px] pr-[35px] pb-[35px] pl-[35px] rounded-[40px] shadow-[-13px_-13px_20px_rgba(255,255,255,1)] overflow-auto custom-scrollbar">
              <h2 className="text-5xl font-bold mb-6 text-center">
                Submit Your CV
              </h2>

              <form
                onSubmit={handleSubmit}
                className="form-control w-full max-w-4xl mx-auto"
              >
                {/* Input fields in a wider two-column layout */}
                {inputFields.map((field, index) => (
                  <div className="w-full mx-2 mt-5 flex-1" key={field.name}>
                    <label className="text-lg font-medium">
                      {field.placeholder}
                    </label>
                    <div className="mt-1 rounded-[25px] shadow-[inset_-8px_-8px_8px_rgba(255,255,255,1)]">
                      <input
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required={field.required}
                        type={field.type}
                        disabled={
                          field.name === "nsu_id" ||
                          field.name === "nsu_email" ||
                          field.name === "name"
                        }
                        className={
                          "w-full p-4 bg-transparent text-gray-700 rounded-[25px] shadow-[inset_8px_8px_8px_rgba(203,206,209,1)]"
                        }
                      />
                    </div>
                  </div>
                ))}

                {/* Array fields */}
                {arrayFields.map((field) => (
                  <div key={field.name} className="mb-5 mt-10">
                    <div className="flex justify-between">
                      <h3 className="text-xl font-semibold pt-3">
                        {field.label}
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          addArrayItem(field.name, field.defaultItem)
                        }
                        className="btn btn-primary text-white text-2xl text-center flex items-center justify-center rounded-3xl"
                      >
                        &#43;
                      </button>
                    </div>

                    {formData[field.name].map((item, index) => (
                      <div key={index} className="w-full mx-2 mt-5 flex-1">
                        {field.inputs.map((input) => (
                          <div key={input.name}>
                            <label className="text-lg font-medium">
                              {input.placeholder}
                            </label>
                            <div className="mt-1 rounded-[25px] shadow-[inset_-8px_-8px_8px_rgba(255,255,255,1)]">
                              <input
                                name={input.name}
                                value={item[input.name]}
                                onChange={(e) =>
                                  handleArrayChange(index, e, field.name)
                                }
                                placeholder={input.placeholder}
                                required={field.required}
                                type={input.type}
                                disabled={
                                  field.name === "nsu_id" ||
                                  field.name === "nsu_email" ||
                                  field.name === "name"
                                }
                                className={
                                  "w-full p-4 bg-transparent text-gray-700 rounded-[25px] shadow-[inset_8px_8px_8px_rgba(203,206,209,1)]"
                                }
                              />
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-center mt-5 h-[30px]">
                          <div className="h-full rounded-[60px] shadow-[-3px_-3px_8px_rgba(255,255,255,1)]">
                            <button
                              type="button"
                              onClick={() => removeArrayItem(index, field.name)}
                              className="btn btn-error text-white text-2xl text-center flex-col items-center justify-center h-full rounded-[60px]
                        shadow-[3px_3px_8px_rgba(177,177,177,1)]"
                            >
                              &#215;
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="flex justify-center mt-5 h-[60px] rounded-[60px] shadow-[-3px_-3px_8px_rgba(255,255,255,1)]">
                  <button
                    type="submit"
                    className="btn bg-[#24cfaa] btn-block py-2 px-4 transition duration-500 ease-in-out
                flex items-center justify-center h-full rounded-[60px] text-white text-xl font-bold border-0
                shadow-[3px_3px_8px_rgba(177,177,177,1)] hover:bg-[#2fdbb6] active:bg-[#1da88a]"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="ml-4 w-1/2 h-full">
            <div className="bg-[#ecf0f3]  shadow-[13px_13px_20px_rgba(203,206,209,1)] h-full">
              <style>{customScrollbarStyles}</style>
              <div className="w-full h-full overflow-auto custom-scrollbar">
                <UserContext.Provider value={{ userInfo, userCV }}>
                  <UserCV />
                </UserContext.Provider>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateCV;
