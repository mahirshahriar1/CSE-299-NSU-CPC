import React from "react";

function JobCard({ job, loading }) {
  const isJobClosed = job.status === "closed";
  const admin_approval = job.admin_approval === true;
  const imageUrl = job.picture;
  const corporateId = JSON.parse(localStorage.getItem("userInfo"))?._id;
  const corporate = job.corporate;

  const isAdmin =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "admin";
  const isCorporate =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "corporate";
  const isStudent =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "student";

  function close_job(jobId) {
    if (isAdmin) {
      alert(
        "Admins cannot close jobs but they can deactivate them. Select Details to deactivate the job."
      );
      return;
    }
    if (!window.confirm("Are you sure you want to close this job?")) {
      return;
    }

    // fetch("http://localhost:5000/jobs/close", {
    fetch(`${process.env.REACT_APP_API_URL}/jobs/close`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
      body: JSON.stringify({ jobId }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Failed to close job. Please check your credentials and try again."
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Job closed successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error closing job:", error);
        alert(error.message);
      });
  }

  function delete_job(jobId) {
    const _corporateid = JSON.parse(localStorage.getItem("userInfo"))?._id;
    // fetch("http://localhost:5000/jobs/delete", {
    fetch(`${process.env.REACT_APP_API_URL}/jobs/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("userInfo")).token
        }`,
      },
      body: JSON.stringify({ jobId, _corporateid }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Job deleted successfully");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        alert("Failed to delete job: " + error.message);
      });
  }

  if (loading) {
    return (
      <div className="job-card w-[365px] bg-white pb-3 shadow-md overflow-hidden rounded-3xl h-[535px]">
        <div className="job-header auto h-[365px] bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 rounded-box m-2 overflow-auto  ">
          <div className="flex justify-between items-center">
            <button className="bg-white w-[180px] border border-gray-300 hover:bg-blue-100 transition duration-300 ease-in-out px-2 py-2 rounded-box text-gray-500">
              Loading...
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* jobs card w-1/4*/} {/* jobs card w-1/4*/}
      <div
        className={`job-card w-[365px] bg-white pb-3 shadow-md overflow-hidden rounded-3xl ${
          isCorporate
            ? corporate === corporateId
              ? "h-[695px]"
              : "h-[695px]"
            : isAdmin
            ? "h-[585px]"
            : "h-[535px]"
        }`}
      >
        <div
          className="job-header auto h-[365px] bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-5 rounded-box m-2 overflow-auto  "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <div className="flex justify-between items-center">
            <button className="bg-white w-[180px] border border-gray-300 hover:bg-blue-100 transition duration-300 ease-in-out px-2 py-2 rounded-box text-gray-500">
              Deadline : {new Date(job.deadline).toLocaleDateString()}
            </button>
          </div>

          <div className="flex flex-col justify-center">
            <div className=" flex justify-between h-1/2 items-center mt-3 mb-3 overflow-hidden">
              <div className="w-3/4 h-auto overflow-hidden">
                <h2 className=" text-2xl font-sans pr-2 ">
                  {" "}
                  {job.positionName}
                </h2>
                <h2 className=" text-2xl font-sans pr-2 overflow-auto">
                  {job.jobType}
                </h2>
                <h2 className="text-md font-sans">{job.companyName}</h2>
              </div>
              <div className="flex justify-center items-center w-[80px] h-[80px] rounded-full border-2 border-bg-white">
                <img
                  src={imageUrl}
                  alt="avatar"
                  className="rounded-full w-full h-full"
                />
              </div>
            </div>

            <div>
              <div className="flex text-start">
                <div className="w-6 h-6 mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"
                    />
                  </svg>
                </div>

                <h2 className=" font-sans">Category: {job.category}</h2>
              </div>
              <div className=" flex text-start ">
                <div className="w-6 h-6 mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                    />
                  </svg>
                </div>

                <h2 className=" font-sans">
                  Experience Required: {job.requiredExperience}
                </h2>
              </div>
              <div className="  flex items-center">
                <div className="w-6 h-6 mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                    />
                  </svg>
                </div>

                <h2 className=" font-sans">
                  CGPA Required: {job.cgpaRequirement}
                </h2>
              </div>
            </div>
            <br></br>
            <div className="text-gray  rounded-box  ">
              <h3 className="text-lg font-semibold">
                {job.tags.map((item, index) => (
                  <button
                    key={index}
                    className="bg-white text-sm text-gray-600 px-2 py-2 rounded-box mr-2 transform hover:scale-110 transition duration-200"
                  >
                    {item}
                  </button>
                ))}
              </h3>
            </div>
          </div>
        </div>

        <div className="flex lg:flex-row justify-between p-5">
          <div className="w-full">
            <h3 className="text-lg font-bold text-black">
              &nbsp;{job.salary.toLocaleString()} BDT/Month
            </h3>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <p className="text-black">{job.jobLocation}</p>
            </div>
          </div>
          <div className="text-right lg:text-left ">
            <button
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-3  rounded-full transform hover:scale-110 transition duration-300"
              onClick={() => (window.location.href = `/job/${job._id}`)}
            >
              Details
            </button>
          </div>
        </div>

        <div className="container flex justify-center ">
          {isStudent && !isJobClosed && !admin_approval && (
            <button
              className="mb-2 bg-white border-2 border-gray-300 hover:bg-blue-100 transition duration-300 ease-in-out px-2 py-2 ml-5 mr-5 rounded-box text-gray-500 w-full"
              onClick={() => (window.location.href = `/apply-job/${job._id}`)}
            >
              Apply
            </button>
          )}
        </div>

        {isCorporate && !(corporate === corporateId || isAdmin) && (
          <div className="container flex justify-center flex-wrap">
            <p className="mb-2 text-blue-600 bg-blue-100 p-2 rounded-box font-bold w-full ml-5 mr-5 text-center border-blue-300 border-2">
              This post is from another company
            </p>
            <div className="mt-5 w-full flex justify-center">
              <p
                className="[text-shadow:_8px_8px_12px_rgba(0,0,0,0.04),_-8px_-8px_12px_rgba(255,255,255,0.2)]
             text-9xl text-sky-100 font-mono outline-none font-bold"
              >
                CPC
              </p>
            </div>
          </div>
        )}

        <div className="container flex justify-center ">
          {(isCorporate || isAdmin) &&
            (corporate === corporateId || isAdmin) &&
            (admin_approval ? (
              <p className="mb-2 text-red-600 bg-red-100 p-2 rounded-box font-bold w-full ml-5 mr-5 text-center border-red-300 border-2">
                This job is not approved by admin yet
              </p>
            ) : (
              <button className="mb-2 bg-green-100 border-2 border-gray-300  px-2 py-2 ml-5 mr-5 rounded-box text-green-600 font-bold w-full">
                Admin Approved
              </button>
            ))}
        </div>

        <div className="container flex justify-center ">
          {(isCorporate || isAdmin) &&
            (corporate === corporateId || isAdmin) &&
            (isJobClosed ? (
              <p className="mb-2 text-red-600 bg-red-100 p-2 rounded-box font-bold w-full ml-5 mr-5 text-center border-red-300 border-2">
                This job is closed
              </p>
            ) : isAdmin ? (
              <p className="mb-2 text-blue-600 bg-blue-100 p-2 rounded-box font-bold w-full ml-5 mr-5 text-center border-blue-300 border-2">
                This job is open
              </p>
            ) : (
              <button
                className="mb-2 bg-white border-2 border-gray-300 hover:bg-blue-100 transition duration-300 ease-in-out px-2 py-2 ml-5 mr-5 rounded-box text-gray-500 w-full"
                onClick={() => close_job(job._id)}
              >
                Close Job
              </button>
            ))}
        </div>

        {isCorporate && (corporate === corporateId || isAdmin) && (
          <div className="container flex justify-center ">
            <button
              className="mb-2 bg-white border-2 border-gray-300 hover:bg-blue-100 transition duration-300 ease-in-out px-2 py-2 ml-5 mr-5 rounded-box text-gray-500 w-full"
              onClick={() => delete_job(job._id)}
            >
              Delete Job
            </button>
          </div>
        )}

        {isCorporate && (corporate === corporateId || isAdmin) && (
          <div className="container flex justify-center ">
            <button
              className="mb-2 bg-white border-2 border-gray-300 hover:bg-blue-100 transition duration-300 ease-in-out px-2 py-2 ml-5 mr-5 rounded-box text-gray-500 w-full"
              onClick={() => (window.location.href = `/edit-job/${job._id}`)}
            >
              Edit Job
            </button>
          </div>
        )}
      </div>{" "}
    </div>
  );
}

export default JobCard;
