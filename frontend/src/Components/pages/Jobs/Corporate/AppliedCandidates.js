// AppliedCandidates.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import TopNav from "../../../TopNav";
import Spinner from "../../../Spinner";

const AppliedCandidates = () => {
  let { jobId } = useParams();
  // console.log(jobId);
  const [candidates, setCandidates] = useState([]);
  // console.log(jobId);
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isCorporate, setIsCorporate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("active");
  const corporateId = JSON.parse(localStorage.getItem("userInfo"))._id;
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

      window.location.reload();
    } catch (error) {
      console.error("Error updating job status:", error);
    }
  };

  useEffect(() => {
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
        console.log(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setLoading(false);
      }
    };
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo?.userType === "admin") {
      setIsAdmin(true);
    } else if (userInfo?.userType === "corporate") {
      setIsCorporate(true);
    } else if (userInfo?.userType === "student") {
      setIsStudent(true);
    }
    fetchJobDetails();

    if (jobId) {
      const fetchCandidates = async () => {
        setLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/applyjob/candidates?jobId=${jobId}`
        );
        const candidatesData = await response.json();
        setCandidates(candidatesData);
        setLoading(false);
      };

      fetchCandidates();
    }
  }, [jobId]);

  if (loading) {
    return <Spinner />;
  }

  function isUrl(str) {
    try {
      new URL(str);
      return true;
    } catch (e) {
      return false;
    }
  }

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
                    (jobDetails?.admin_approval ? (
                      <span className="text-blue-500">[Unapproved] </span>
                    ) : jobDetails?.status === "active" ? (
                      <span className="text-green-500">[Open] </span>
                    ) : (
                      <span className="text-red-500">[Closed] </span>
                    ))}
                  {jobDetails?.positionName} ({jobDetails?.jobType})
                </h2>

                <p className="text-blue-500">
                  at {jobDetails?.companyName} in {jobDetails?.jobLocation}
                </p>

                <hr className="h-1 bg-slate-300 rounded-xl mt-4 mb-2" />

                <p>
                  <strong className="text-orange-500">Salary:</strong> $
                  {jobDetails?.salary.toLocaleString()}
                </p>

                <p>
                  <strong className="text-orange-500">Deadline: </strong>
                  {new Date(jobDetails?.deadline).toLocaleDateString()}
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

                  {isCorporate && corporateId === jobDetails?.corporate && (
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
                    jobDetails?.status === "active" &&
                    !jobDetails?.admin_approval && (
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
                  src={jobDetails?.picture}
                  alt="avatar"
                  className="rounded-[16px] w-full h-full"
                />
              </div>
            </div>
          </div>

          {/*Candidates*/}
          <div className="rounded-b-3xl rounded-t-lg p-5 pt-2 bg-[#ecf0f3]">
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loading" />
              </div>
            ) : candidates.length > 0 ? (
              <div>
                <h2 className="text-2xl text-left font-sans mb-1 mr-3">
                  List of Job Candidates
                </h2>
                <style>{customScrollbarStyles}</style>
                <hr className="h-1 bg-slate-300 rounded-xl mt-4 mb-2" />
                {renderCandidatesTable()}
              </div>
            ) : (
              <div>
                <strong className="text-2xl mb-4 text-orange-500">
                  No Candidates Found
                </strong>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  function renderCandidatesTable() {
    return (
      <div className="overflow-x-auto">
        <table className="table w-full table-auto border-collapse">
          <thead>
            <tr className="text-orange-500 text-xl">
              <th>Name</th>
              <th>Applied At</th>
              <th className="text-center">Status</th>
              <th>Email</th>
              <th>CV</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate, candidateIndex) => (
              <tr
                key={candidateIndex}
                className="border-b-2 border-slate-300 text-md"
              >
                <td>
                  {candidateIndex + 1}. {candidate.name}
                </td>
                <td>{new Date(candidate.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="flex h-full justify-center items-center">
                    <button className="bg-red-100 font-sans text-green-800 px-4 py-1 rounded-full w-[145px] cursor-default">
                      {candidate.status}
                    </button>
                  </div>
                </td>
                <td>{candidate.email}</td>
                <td className="w-[130px]">
                  <div className="card-actions justify-start">
                    {candidate.CV && (
                      <>
                        {isUrl(candidate.CV) ? (
                          <a
                            href={candidate.CV}
                            target="_blank"
                            rel="noreferrer"
                            className="p-3 rounded-xl bg-green-500 text-white font-bold 
                            active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all"
                          >
                            View CV
                          </a>
                        ) : (
                          <a
                            href={`/view-cv/${candidate.CV}/${candidate.email}`}
                            className="p-3 rounded-xl bg-green-500 text-white font-bold 
                            active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all"
                          >
                            View CV
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
};

export default AppliedCandidates;
