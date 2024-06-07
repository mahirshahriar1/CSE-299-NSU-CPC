import axios from "axios";
import React, { useEffect, useState } from "react";
import TopNav from "../../../TopNav";

const ApplyJob = () => {
  let jobId = window.location.href.split("/").pop();
  let studentId = JSON.parse(localStorage.getItem("userInfo"))?._id;
  let email = JSON.parse(localStorage.getItem("userInfo"))?.email;
  let name = JSON.parse(localStorage.getItem("userInfo"))?.name;
  const [CVUrl, setCVUrl] = useState("");
  const [CVId, setCVId] = useState("");
  const [CVneed, setCVneed] = useState(false);
  const [selectedCV, setSelectedCV] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false);
  const [existingApplication, setExistingApplication] = useState(null);
  const [percent, setPercent] = useState(110);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const email = JSON.parse(localStorage.getItem("userInfo")).email;
      try {
        const [userInfoResponse, cvResponse, jobResponse, percentResponse] =
          await Promise.all([
            axios.get(
              `${process.env.REACT_APP_API_URL}/users/getInfo/${email}`
            ),
            axios.get(
              `${process.env.REACT_APP_API_URL}/users/getCVEmail/${email}`
            ),
            axios.get(
              `${process.env.REACT_APP_API_URL}/jobs/view?jobId=${jobId}`
            ),
            axios.get(
              `${process.env.REACT_APP_API_URL}/users/getPercent?email=${email}`
            ),
          ]);

        const appliedResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}/applyjob/isApplied?jobId=${jobId}&studentId=${studentId}`
        );

        if (appliedResponse.data.alreadyApplied !== null) {
          setIsAlreadyApplied(true);
          setExistingApplication(appliedResponse.data.alreadyApplied);
        }

        if (userInfoResponse.data.CV) {
          setCVUrl(userInfoResponse.data.CV);
        }
        if (cvResponse.data._id) {
          setCVId(cvResponse.data._id);
        }
        if (jobResponse.data.needCV) {
          setCVneed(true);
        }
        if (percentResponse.data.percentage) {
          setPercent(percentResponse.data.percentage);
        }
        console.log(jobResponse);
        if (jobResponse !== null && jobResponse.data.admin_approval) {
          alert("This job is not approved by the admin yet.");
          window.location.href = "/job-board";
        }
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jobId, studentId]);

  useEffect(() => {
    
    console.log(existingApplication);
    if (percent < 80) {
      alert("You need to complete your profile to 80% to apply for a job.");
      window.location.href = "/edit-profile";
    }
    if (!loading && CVneed && !CVUrl && !CVId) {
      alert("This job requires a CV. Please upload a CV in your profile.");
      window.location.href = "/edit-profile";
    }
  });
  const handleSubmit = async () => {
    if (!selectedCV && CVneed) {
      alert("Please select a CV to submit.");
      return;
    }
    if (percent < 70) {
      alert("You need to complete your profile to 80% to apply for a job.");
      window.location.href = "/edit-profile";
    }
    try {
      console.log(jobId);
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/applyjob/apply`,
        {
          studentId,
          jobId,
          CV: selectedCV,
          email,
          name,
        }
      );
      console.log(response.data);
      alert("Application submitted successfully!");
      window.location.href = "/applied-jobs";
    } catch (error) {
      console.error("Failed to submit application:", error.message);
    }
  };
  console.log(CVId);

  function isUrl(str) {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  }

  return (
    <div className="flex bg-sky-100 flex-col min-h-screen">
      <div className="border-b-2 border-slate-300">
        <TopNav />
      </div>

      <div className="flex justify-center items-center p-10 text-black h-full">
        <div className="space-y-1 border-4 border-slate-300 bg-slate-300 h-full rounded-[28px]">
          {/* shadow-[13px_13px_20px_rgba(203,206,209,1),_-13px_-13px_20px_rgba(255,255,255,1)]*/}
          <div className="rounded-t-3xl rounded-b-lg p-4 bg-[#ecf0f3]">
            <h1 className="text-4xl font-bold mb-4">Job Application</h1>
            <p>
              Upon submission of this form, your application will be sent to the
              company.
            </p>
            <p>
              We will take your email address from your profile to send you the
              company
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <p className="text-xl">Loading...</p>
            </div>
          ) : (
            <div className="flex flex-col w-full h-full justify-center space-y-1 items-center">
              <div className="flex w-full h-full space-y-1">
                {isAlreadyApplied && existingApplication && (
                  <div className="bg-orange-100 p-4 rounded-lg w-full h-full">
                    <h2 className="text-xl font-semibold mb-2">
                      You have already applied for this job
                    </h2>
                    <p className="mb-4">
                      Your previous application details are as follows:
                    </p>
                    <p>
                      Application Date:{" "}
                      {new Date(
                        existingApplication.applicationDate
                      ).toLocaleDateString()}
                    </p>
                    <p>Application Status: {existingApplication.status}</p>
                    <p>
                      CV:{" "}
                      {existingApplication.CV === ""
                        ? "Not provided"
                        : "Provided"}
                    </p>

                    {existingApplication.CV !== "" &&
                      isUrl(existingApplication.CV) && (
                        <div className="w-full mt-4">
                          <button
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-blue-500 text-white font-bold 
                      active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all w-full"
                            onClick={() =>
                              (window.location.href = existingApplication.CV)
                            }
                          >
                            View CV
                          </button>
                        </div>
                      )}
                    {existingApplication.CV !== "" &&
                      !isUrl(existingApplication.CV) && (
                        <div className="w-full mt-4">
                          <button
                            className="p-3 rounded-xl bg-blue-500 text-white font-bold 
                      active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all w-full"
                            onClick={() =>
                              (window.location.href = `/view-cv/${existingApplication.CV}/${email}`)
                            }
                          >
                            View CV
                          </button>
                        </div>
                      )}
                  </div>
                )}
              </div>

              <div className="flex w-full h-full">
                {CVneed && (CVUrl || CVId) && (
                  <div className="bg-[#ecf0f3] p-4 rounded-lg rounded-b-3xl shadow w-full">
                    <h2 className="text-xl font-semibold mb-2">
                      CV is required for this job
                    </h2>
                    <p className="mb-4">Select your CV:</p>
                    <div className="flex justify-between mb-4 space-x-1">
                      {CVUrl && (
                        <div>
                          <label
                            className={`text-xl border-2 border-[#01cc65] rounded-md font-bold
                              px-[50px] py-[10px] cursor-pointer flex items-center justify-center
                              ${
                                selectedCV === CVUrl
                                  ? "bg-[#01cc65] text-white"
                                  : "text-[#01cc65]"
                              }`}
                          >
                            <input
                              type="radio"
                              name="cvChoice"
                              value={CVUrl}
                              onChange={(e) => setSelectedCV(e.target.value)}
                              checked={selectedCV === CVUrl}
                              className="hidden"
                            />
                            <div
                              className={`h-[30px] w-[30px] rounded-full mr-[20px] 
                        ${
                          selectedCV === CVUrl
                            ? "border-8 border-white bg-[#01cc65]"
                            : "border-2 border-[#01cc65]"
                        }`}
                            ></div>
                            <span>Uploaded CV</span>
                          </label>
                        </div>
                      )}
                      {CVId && (
                        <div>
                          <label
                            className={`text-xl border-2 border-[#01cc65] rounded-md font-bold
                            px-[50px] py-[10px] cursor-pointer flex items-center justify-center
                            ${
                              selectedCV === CVId
                                ? "bg-[#01cc65] text-white"
                                : "text-[#01cc65]"
                            }`}
                          >
                            <input
                              type="radio"
                              name="cvChoice"
                              value={CVId}
                              onChange={(e) => setSelectedCV(e.target.value)}
                              checked={selectedCV === CVId}
                              className="hidden"
                            />
                            <div
                              className={`h-[30px] w-[30px] rounded-full mr-[20px] 
                      ${
                        selectedCV === CVId
                          ? "border-8 border-white bg-[#01cc65]"
                          : "border-2 border-[#01cc65]"
                      }`}
                            ></div>
                            <span>CV from Database</span>
                          </label>
                        </div>
                      )}
                    </div>

                    <div className="w-full">
                      <button
                        className="p-3 rounded-xl bg-green-500 text-white font-bold 
                      active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all w-full"
                        onClick={handleSubmit}
                      >
                        {isAlreadyApplied
                          ? "Replace Existing Application"
                          : "Apply"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {!CVneed && (
            <div className="flex w-full h-full">
              <div className="bg-gray-100 p-4 rounded-lg rounded-b-3xl shadow w-full">
                <h2 className="text-xl font-semibold mb-2">
                  CV is not required for this job
                </h2>
                <div className="w-full">
                  <button
                    className="p-3 rounded-xl bg-green-500 text-white font-bold 
                      active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all w-full"
                    onClick={handleSubmit}
                  >
                    {isAlreadyApplied ? "Replace Existing Application" : "Apply"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
