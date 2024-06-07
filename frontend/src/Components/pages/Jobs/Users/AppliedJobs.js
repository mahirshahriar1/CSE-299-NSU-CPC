import React, { useEffect, useState } from "react";
import NavBar from "../../../NavBar";
import TopNav from "../../../TopNav";

const AppliedJobs = () => {
  const [appliedJobsDetails, setAppliedJobsDetails] = useState([]);
  let email = JSON.parse(localStorage.getItem("userInfo")).email;
  let picture = JSON.parse(localStorage.getItem("userInfo")).picture;
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const studentId = userInfo._id;
      const queryParams = new URLSearchParams({ studentId });
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/applyjob/list-applied-jobs?${queryParams}`
      );
      const appliedJobs = await response.json();

      const jobsDetails = await Promise.all(
        appliedJobs.map(async (job) => {
          const jobResponse = await fetch(
            `${process.env.REACT_APP_API_URL}/jobs/view?${new URLSearchParams({
              jobId: job.jobId,
            })}`
          );
          const jobInfo = await jobResponse.json();
          return { ...job, ...jobInfo };
        })
      );
      console.log(jobsDetails);
      setAppliedJobsDetails(jobsDetails);
    };

    fetchAppliedJobs();
  }, []);

  function isUrl(str) {
    try {
      new URL(str);
      console.log("URL is valid");
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

  const goToJobDetails = (jobId) => {
    window.location.href = `/job/${jobId}`;
  };

  class AppliedJobsComponent extends React.Component {
    render() {
      return (
        <div className=" w-full rounded-box ">
          <div className="border-4 bg-white text-black border-blue-400 p-4 rounded-box overflow-auto ">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl text-left font-sans mb-1 mr-3">
                List of Applied Jobs
              </h2>
            </div>
            <div className="bg-blue-400 p-[1px] my-5"></div>
            <style>{customScrollbarStyles}</style>
            <div className="flex w-auto h-auto flex-col text-black rounded-md overflow-auto mt-3 custom-scrollbar">
              <div className="overflow-x-auto">
                <table className="table w-full table-auto border-collapse">
                  <thead>
                    <tr className="text-blue-500 text-xl">
                      <th>&nbsp;&nbsp;&nbsp;Company</th>
                      <th>Type</th>
                      <th>Location</th>
                      <th>Salary</th>
                      <th>Applied at</th>
                      <th className="text-center">Status</th>
                      <th>CV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appliedJobsDetails.map((job, index) => (
                      <tr
                        key={index}
                        className="border-b-2 border-slate-300 text-md"
                      >
                        <td>
                          <button onClick={() => goToJobDetails(job._id)}>
                            <h1 className="font text-md text-left">
                              {index + 1}. {job.positionName}
                            </h1>
                            <h1 className="font text-gray-400 ml-4 text-xs text-left">
                              {job.companyName}
                            </h1>
                          </button>
                        </td>

                        <td>{job.jobType}</td>

                        <td>{job.jobLocation}</td>

                        <td>${job.salary}</td>

                        <td>
                          {new Date(job.applicationDate).toLocaleDateString()}
                        </td>

                        <td>
                          <div className="flex h-full justify-center items-center">
                            <button
                              className={`font-sans text-xs text-green-800 mr-4 px-4 py-1 rounded-full w-[120px] mx-2 cursor-default
                                        ${
                                          job.status === "active"
                                            ? "bg-green-100"
                                            : "bg-blue-100"
                                        }`}
                            >
                              {job.status === "active" ? "Active" : "Closed"}
                            </button>
                          </div>
                        </td>

                        <td className="w-[130px]">
                          <div className="card-actions justify-start">
                            {isUrl(job.CV) && (
                              <a
                                href={job.CV}
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-xl bg-green-500 text-white font-bold 
                                active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all"
                              >
                                View CV
                              </a>
                            )}
                            {!isUrl(job.CV) && job.CV !== "" && (
                              <a
                                href={`/view-cv/${job.CV}/${email}`}
                                target="_blank"
                                rel="noreferrer"
                                className="p-2 rounded-box bg-green-500 text-white 
                                active:scale-[.98] active:duration-75 hover:scale-[1.1] ease-in-out transition-all"
                              >
                                View CV
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>{" "}
            <div className="bg-blue-400 p-[2px] mt-5 ml-36 mr-36 rounded-full "></div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex flex-row bg-gray-100 ">
      <div className="">
        <NavBar />
      </div>
      <div className="main flex flex-col w-full">
        <TopNav />

        <div className="p-4">
          <div className="flex flex-row justify-around mb-5">
            <div className="w-[110px] h-[110px] flex items-center justify-center rounded-full border-2 border-black  ">
              <img
                className="w-full h-full object-cover rounded-full"
                src={picture}
                alt="Profile Pic"
              />
            </div>

            <div className="flex w-2/3 border-2 border-black rounded-3xl  items-center bg-white px-10">
              <div className="company rounded-l-3xl text-black items-center justify-center w-1/2">
                <p className="text-xl text-center">Applied Jobs:</p>
                <p className="text-3xl text-center font-bold">
                  {appliedJobsDetails.length}
                </p>
              </div>

              <div className="bg-black h-5/6 w-1 rounded-lg mx-5" />

              <div className="company rounded-r-3xl text-black items-center justify-center w-1/2">
                <p className="text-xl text-center">Keep Applying:</p>
                <p className="text-2xl text-center font-bold">
                  <a href="/job-board">Go to Job Board</a>
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Content - AppliedJobsComponent */}
          <div className="w-full rounded-box ">
            <AppliedJobsComponent />
          </div>

          <div className="mt-5 w-full flex justify-center">
            <p
              className="[text-shadow:_8px_8px_12px_rgba(0,0,0,0.04),_-8px_-8px_12px_rgba(255,255,255,0.2)]
             text-9xl text-blue-200 font-mono outline-none font-bold"
            >
              CPC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobs;
