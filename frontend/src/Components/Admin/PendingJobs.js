import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import TopNav from "../TopNav";
import NavBar from "../NavBar";

const PendingJobs = () => {
  const { userInfo } = useContext(UserContext);
  const [status, setStatus] = useState("closed");
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handlePrevious = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNext = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  useEffect(() => {
    if (userInfo?.userType !== "admin") {
      alert("You are not authorized to view this page.");
      window.location.href = "/";
    }

    const fetchJobs = async (currentPage) => {
      const queryParams = new URLSearchParams({
        page: currentPage,
        limit: 2,
        admin_approval: true,
      });

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/admin/getPendingJobs?${queryParams}`
      );
      const data = await response.json();
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
      if (data.jobs.length === 0) setPage(1); // Reset to first page if no results
    };

    fetchJobs(page);
  }, [status, page, userInfo?.userType]);

  return (
    <div className="flex  bg-gray-300 ">
      <div className="">
        <NavBar />
      </div>
      <div className="main flex flex-col w-full">
        <TopNav />

        <main className="container  bg-gray-300 mb-5">
          {jobs.length === 0 ? (
            <div className="text-center mt-10 bg-white ">
              <p>
                No jobs available to display. Please check again later or toggle
                the job status.
              </p>
            </div>
          ) : (
            <div className="gap-4 w-full mt-10 mb-10 mx-auto md:w-1/2 ">
              {jobs.map((job, index) => (
                <JobItem key={index} job={job} />
              ))}
            </div>
          )}
          <div className="flex mt-10 justify-between items-center">
            <button
              className="bg-blue-600 text-white px-4 py-2 mr-4 rounded-xl hover:bg-blue-700 transition-colors duration-300 ease-in-out ml-20"
              onClick={handlePrevious}
              disabled={page <= 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors duration-300 ease-in-out mr-20"
              onClick={handleNext}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PendingJobs;

function JobItem({ job }) {
  return (
    <div className="card  shadow-xl p-4 mb-4 rounded-lg bg-white border-4 border-blue-100">
      <div className="card-body mb-3">
        <h2 className="card-title text-2xl font-bold mb-2">
          {job.positionName} - {job.jobType}
        </h2>
        <p className="text-gray-700">
          <b>Company:</b> {job.companyName}
        </p>
        <p className="text-gray-600">
          <b>Location:</b> {job.jobLocation}
        </p>
        <p>
          <b>Deadline:</b> {new Date(job.deadline).toLocaleDateString()}
        </p>
        <p>
          <b>Category:</b> {job.category}
        </p>
        <p>
          <b>CGPA Requirement:</b> {job.cgpaRequirement}
        </p>
        <p>
          <b>Salary:</b> ${job.salary.toLocaleString()}
        </p>
        <p>
          <b>Required Experience:</b> {job.requiredExperience} years
        </p>
        <p>
          <b>Preferred Program:</b> {job.preferredProgram || "N/A"}
        </p>
        <div className="font-semibold mt-2">Tags: {job.tags.join(", ")}</div>
        <button
          className="btn btn-info mt-4"
          onClick={() => (window.location.href = `/job/${job._id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}
