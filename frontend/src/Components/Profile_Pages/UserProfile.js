import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
// import html2canvas from "html2canvas-pro";
// import jsPDF from "jspdf";
import UserCV from "../pages/Jobs/CV/UserCV";
import { UserContext } from "../../contexts/UserContext";
import NavBar from "../NavBar";
import Spinner from "../Spinner";

function Profile() {
  const { userInfo, percent, appliedJobs, loading } = useContext(UserContext);
  console.log(loading);
  // eslint-disable-next-line
  const [loader, setLoader] = useState(false);
  const getCV = async () => {
    try {
      let _email = JSON.parse(localStorage.getItem("userInfo")).email;
      // console.log("Email: ", _email);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getCVEmail/${_email}`
      );
      // console.log("Response: ", response.data);
      setCVId(response.data._id);
      const userCV = response.data;

      setUserCV(userCV);
      // console.log("User CV", userCV);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to get resume:", error.message);
    }
  };
  useEffect(() => {
    const isUser = JSON.parse(localStorage.getItem("userInfo"));
    if (isUser?.nsu_id === undefined) {
      alert("You are not allowed to visit this page");
      window.location.href = "/";
    }
    if (userInfo?.name !== "") {
      console.log("User Info: ", userInfo.name);
      getCV();
    }
  }, [userInfo]);
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

  const [cvId, setCVId] = useState("");

  if (loading) {
    return  <Spinner />;
  }

  return (
    <div>
      <div className="flex">
        {/* First Card */}
        <div>
          <UserContext.Provider value={{ userInfo, percent, appliedJobs }}>
            <NavBar />
          </UserContext.Provider>
        </div>
        <div className="main bg-gray-100 flex justify-center w-full m-2">
          <div className="shadow-sm"></div>
          {/* Second card */}

          <div className="card bg-white border-4 flex items-center border-blue-400 rounded-box p-4 mb-2 mr-4 h-screen ">
            <h1 className="text-xl ">STUDENT</h1>
            <div className="w-full p-8 flex justify-center">
              <div className="w-56 h-56 sm:w-40 sm:h-40 flex items-center justify-center rounded-full border-4 border-white-500 hover:border-green-400  overflow-hidden">
                <img
                  className="w-full h-full object-cover rounded-full"
                  src={userInfo?.picture}
                  alt="Profile Pic"
                />
              </div>
            </div>
            <div className="w-full text-center mb-4 text-black">
              <h1 className="text-xl ">{userInfo?.name}</h1>
              <p>Student ID: {userInfo?.nsu_id}</p>
              <br></br>
              <p>Profile Completed :{Math.floor(percent)}%</p>

              <progress
                className="progress progress-success w-56"
                value={percent}
                max="100"
              ></progress>
              <div className="p-2"></div>

              <button
                className="bg-[#0675c1] text-white btn btn-wide transition-transform duration-200 transform hover:scale-105"
                onClick={() => {
                  window.location.href = "/edit-user-profile";
                }}
              >
                <svg
                  className="h-6 w-6 "
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
                  <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
                  <line x1="16" y1="5" x2="19" y2="8" />
                </svg>
                Edit Profile
              </button>
            </div>

            <div className="w-full text-center mb-4 text-black">
              <button
                className="bg-[#0675c1] text-white btn btn-wide transition-transform duration-200 transform hover:scale-105"
                onClick={() => {
                  window.location.href = `/view-cv/${cvId}/${userCV?.nsu_email}`;
                }}
                disabled={!(loader === false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                </svg>
                {loader ? (
                  <span>&nbsp;Downloading</span>
                ) : (
                  <span>&nbsp;Download CV</span>
                )}
              </button>
            </div>

            <div className="w-full  mb-4 ">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <rect x="3" y="5" width="18" height="14" rx="2" />{" "}
                  <polyline points="3 7 12 13 21 7" />
                </svg>
                <h1 className="ml-2">
                  <b>Email:</b>
                </h1>
              </div>
              <p>{userInfo?.email}</p>

              <div className="flex items-center">
                <svg
                  className="h-5 w-5 "
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" />{" "}
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                </svg>

                <h1 className="ml-2">
                  <b>Phone:&nbsp;</b>
                  {userInfo?.phone}
                </h1>
              </div>

              <div className="flex items-center">
                <svg
                  className="h-5 w-5 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>

                <h1 className="ml-2">
                  <b>School:&nbsp;</b>
                  {userInfo?.school}
                </h1>
              </div>

              <div className="flex items-center">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />{" "}
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>

                <h1 className="ml-2">
                  <b>Department:&nbsp;</b>
                  {userInfo?.department}
                </h1>
              </div>

              <div className="flex items-center">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />{" "}
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                </svg>

                <h1 className="ml-2">
                  <b>Status:&nbsp;</b>
                </h1>
                {userInfo?.status === "CS" && <p>Current Student</p>}
                {userInfo?.status === "A" && <p>Alumni</p>}
                {userInfo?.status !== "CS" && userInfo?.status !== "A" && (
                  <p>{userInfo?.status}</p>
                )}
              </div>
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V13.5Zm0 2.25h.008v.008H8.25v-.008Zm0 2.25h.008v.008H8.25V18Zm2.498-6.75h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V13.5Zm0 2.25h.007v.008h-.007v-.008Zm0 2.25h.007v.008h-.007V18Zm2.504-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5Zm0 2.25h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V18Zm2.498-6.75h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V13.5ZM8.25 6h7.5v2.25h-7.5V6ZM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 0 0 2.25 2.25h10.5a2.25 2.25 0 0 0 2.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0 0 12 2.25Z"
                  />
                </svg>

                <h1 className="ml-2">
                  <b>CGPA:&nbsp;</b>
                  {userInfo?.cgpa}
                </h1>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  />
                </svg>

                <h1 className="ml-2">
                  <b>Credits Completed:&nbsp;</b>
                  {userInfo?.credits}
                </h1>
              </div>

              <br></br>

              <div className="p-1"></div>
              <div className="w-full flex justify-left">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 "
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <path d="M10 14a3.5 3.5 0 0 0 5 0l4 -4a3.5 3.5 0 0 0 -5 -5l-.5 .5" />{" "}
                    <path d="M14 10a3.5 3.5 0 0 0 -5 0l-4 4a3.5 3.5 0 0 0 5 5l.5 -.5" />{" "}
                    <line x1="16" y1="21" x2="16" y2="19" />{" "}
                    <line x1="19" y1="16" x2="21" y2="16" />{" "}
                    <line x1="3" y1="8" x2="5" y2="8" />{" "}
                    <line x1="8" y1="3" x2="8" y2="5" />
                  </svg>

                  <h1 className="ml-2">
                    <b>Links:&nbsp;</b>
                  </h1>
                </div>
                <a href={userCV?.facebook}>
                  <svg
                    className="h-8 w-8 text-blue-600 mr-5 transition-transform duration-200 transform hover:scale-125"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                <a href={userCV?.linkedin}>
                  <svg
                    className="h-8 w-8 text-blue-700 mr-5 transition-transform duration-200 transform hover:scale-125"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />{" "}
                    <rect x="2" y="9" width="4" height="12" />{" "}
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                <a href={userCV?.github}>
                  <svg
                    className="h-8 w-8 text-purple-700 mr-5 transition-transform duration-200 transform hover:scale-125"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Third card */}

          <div className="card bg-white items-left mb-1 w-[210mm]">
            <UserContext.Provider value={{ userInfo, userCV }}>
              <UserCV />
            </UserContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
