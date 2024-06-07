import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../../TopNav";
import Spinner from "../../Spinner";
import { UserContext } from "../../../contexts/UserContext";

function JobDetails({ jobId: propJobId }) {
  // get userinfo from context
  const { userInfo } = useContext(UserContext);
  const { jobId: paramJobId } = useParams();
  const jobId = propJobId || paramJobId;
  // console.log(jobId);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isCorporate, setIsCorporate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const corporateId = JSON.parse(localStorage.getItem("userInfo"))?._id;
  const changeJobStatus = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/updateJobStatus`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobId, status: selectedStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update job status");
      }
      const data = await response.json();
      setJobDetails(data);

      // window.location.reload();  
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  useEffect(() => {
    if (userInfo === null) {      
     alert("Please login to view job details");
      window.location.href = "/login";
    }
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/jobs/view?jobId=${jobId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJobDetails(data);
        setSelectedStatus(data.status);
        setLoading(false);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };
    if (userInfo?.userType === "admin") {
      setIsAdmin(true);
    } else if (userInfo?.userType === "corporate") {
      setIsCorporate(true);
    } else if (userInfo?.userType === "student") {
      setIsStudent(true);
    }
    fetchJobDetails();
  }, [jobId, userInfo]);

  if (loading) {
    return <Spinner />;
  }

  if (!jobDetails) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-xl font-semibold text-gray-600">
          No job details found.
        </h3>
        <p className="text-gray-500">
          We can't find the details for the requested job. It may have been
          removed or is temporarily unavailable.
        </p>
      </div>
    );
  }

  function Tag({ text }) {
    return (
      <div className="mt-1 h-10 rounded-[15px] shadow-[13px_13px_20px_rgba(203,206,209,1)] bg-orange-200">
        <p className="w-full h-10 p-4 bg-transparent text-gray-700 rounded-[15px] shadow-[0.5rem_0.5rem_gray] border-2 border-black flex items-center">
          {text}{" "}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-sky-100 min-h-screen">
      {/*bg-gradient-to-br from-green-200 via-sky-100 to-violet-200*/}
      <div className="border-b-2 border-slate-300">
        <TopNav />
      </div>

      <div className="p-10 text-black">
        <div className="space-y-1 border-4 border-slate-300 bg-slate-300 rounded-[28px]">
          {/* shadow-[13px_13px_20px_rgba(203,206,209,1),_-13px_-13px_20px_rgba(255,255,255,1)]*/}
          <div className="rounded-t-3xl rounded-b-lg px-5 pt-5 pb-2 bg-[#ecf0f3]">
            {/*bg-opacity-[0.70] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5.4px] border-[1px_solid_rgba(255,255,255,0.29)]*/}
            <div className="flex items-center justify-between">
              <div className="w-2/3 space-y-1 text-xl">
                <h2 className="text-4xl">
                  {(isAdmin || isCorporate) &&
                    (jobDetails.admin_approval ? (
                      <span className="text-blue-500">[Unapproved] </span>
                    ) : jobDetails.status === "active" ? (
                      <span className="text-green-500">[Open] </span>
                    ) : (
                      <span className="text-red-500">[Closed] </span>
                    ))}
                  {jobDetails.positionName} ({jobDetails.jobType})
                </h2>

                <p className="text-blue-500">
                  at {jobDetails.companyName} in {jobDetails.jobLocation}
                </p>

                <hr className="h-1 bg-slate-300 rounded-xl mt-4 mb-2" />

                <p>
                  <strong className="text-orange-500">Salary:</strong> $
                  {jobDetails.salary.toLocaleString()}
                </p>

                <p>
                  <strong className="text-orange-500">Deadline: </strong>
                  {new Date(jobDetails.deadline).toLocaleDateString()}
                </p>

                <div className="pt-2 w-full">
                  {isAdmin && (
                    <div>
                      <form className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <strong>Change Job Status:</strong>

                          <div>
                            <label
                              className={`text-xl border-2 border-[#01cc65] rounded-md font-bold
                                  px-[50px] py-[10px] cursor-pointer flex items-center justify-center
                                  ${
                                    selectedStatus === "active"
                                      ? "bg-[#01cc65] text-white"
                                      : "text-[#01cc65]"
                                  }`}
                            >
                              <input
                                type="radio"
                                name="status"
                                value="active"
                                checked={selectedStatus === "active"}
                                onChange={() => setSelectedStatus("active")}
                                className="hidden"
                              />
                              <div
                                className={`h-[30px] w-[30px] rounded-full mr-[20px] 
                            ${
                              selectedStatus === "active"
                                ? "border-8 border-white bg-[#01cc65]"
                                : "border-2 border-[#01cc65]"
                            }`}
                              ></div>
                              <span>Activate</span>
                            </label>
                          </div>

                          <div>
                            <label
                              className={`text-xl border-2 border-[#01cc65] rounded-md font-bold
                                  px-[50px] py-[10px] cursor-pointer flex items-center justify-center
                                  ${
                                    selectedStatus === "closed"
                                      ? "bg-[#01cc65] text-white"
                                      : "text-[#01cc65]"
                                  }`}
                            >
                              <input
                                type="radio"
                                name="status"
                                value="closed"
                                checked={selectedStatus === "closed"}
                                onChange={() => setSelectedStatus("closed")}
                                className="hidden"
                              />
                              <div
                                className={`h-[30px] w-[30px] rounded-full mr-[20px] 
                            ${
                              selectedStatus === "closed"
                                ? "border-8 border-white bg-[#01cc65]"
                                : "border-2 border-[#01cc65]"
                            }`}
                              ></div>
                              <span>Deactivate</span>
                            </label>
                          </div>
                        </div>

                        <button
                          className="p-3 rounded-xl bg-blue-500 text-white font-bold
                        active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all w-full"
                          onClick={changeJobStatus}
                        >
                          Update Job Status
                        </button>
                      </form>
                    </div>
                  )}

                  {isCorporate && corporateId === jobDetails.corporate && (
                    <div className="w-full">
                      <button
                        className="p-3 rounded-xl bg-blue-500 text-white font-bold 
                  active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all w-full"
                        onClick={() =>
                          (window.location.href = `/edit-job/${jobId}`)
                        }
                      >
                        Edit Job
                      </button>
                    </div>
                  )}

                  {isStudent &&
                    jobDetails.status === "active" &&
                    !jobDetails.admin_approval && (
                      <div className="w-full">
                        <button
                          className="p-3 rounded-xl bg-green-500 text-white font-bold 
                      active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all w-full"
                          onClick={() =>
                            (window.location.href = `/apply-job/${jobId}`)
                          }
                        >
                          Apply
                        </button>
                      </div>
                    )}
                </div>
              </div>

              <div className="w-1/3 h-full ml-5 flex items-center justify-center border-4 border-bg-white rounded-[20px] hover:border-green-300">
                <img
                  src={jobDetails.picture}
                  alt="avatar"
                  className="rounded-[16px] w-full h-full"
                />
              </div>
            </div>
          </div>

          <div className="rounded-b-3xl rounded-t-lg p-5 pt-2 bg-[#ecf0f3]">
            {/*bg-opacity-[0.70] shadow-[0_4px_30px_rgba(0,0,0,0.1)] backdrop-blur-[5.4px] border-[1px_solid_rgba(255,255,255,0.29)]*/}
            <div className="space-y-4 text-xl mb-5">
              <div>
                <strong className="text-orange-500">
                  Job Context & Responsibilities
                </strong>
                <p>The job falls in the category of {jobDetails.category}</p>
                {jobDetails.preferredProgram && (
                  <p>
                    Students of {jobDetails.preferredProgram} are preferred.
                  </p>
                )}
                <p>{jobDetails.jobContext || ""}</p>
                <p>{jobDetails.jobResponsibilities || ""}</p>
              </div>

              <hr className="h-0.5 bg-slate-300 rounded-xl my-2" />

              <div>
                <strong className="text-orange-500">Requirements</strong>
                <p>
                  At least {jobDetails.requiredExperience} of experience is
                  required for this job
                </p>
                <p>
                  CGPA needs to be at least{" "}
                  {jobDetails.cgpaRequirement.toFixed(2)}.
                </p>
                <p>{jobDetails.additionalRequirement || ""}</p>
              </div>

              <hr className="h-0.5 bg-slate-300 rounded-xl my-2" />

              {jobDetails.otherBenefits && (
                <div>
                  <strong className="text-orange-500">Benefits</strong>
                  <p>{jobDetails.otherBenefits}</p>

                  <hr className="h-0.5 bg-slate-300 rounded-xl my-2" />
                </div>
              )}

              {jobDetails.additionalRemarks && (
                <div>
                  <strong className="text-orange-500">Remarks</strong>
                  <p>{jobDetails.additionalRemarks}</p>

                  <hr className="h-0.5 bg-slate-300 rounded-xl my-2" />
                </div>
              )}

              <div>
                <strong className="text-orange-500">
                  Application Procedure
                </strong>
                <p>
                  A CV is {jobDetails.needCV ? "Required" : "Not Required"}.
                </p>
                <p>{jobDetails.applicationProcedure || ""}</p>
              </div>

              <hr className="h-0.5 bg-slate-300 rounded-xl my-2" />

              <div>
                <strong className="text-orange-500">Tags:</strong>{" "}
                <div className="flex flex-wrap gap-4 mt-2">
                  {jobDetails.tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
