import React, { useState, useEffect } from "react";
import { categoryGroups } from "../../data/postJobsData";

function ListJobs() {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [filters, setFilters] = useState({
    jobType: "",
    location: "",
    salary: "",
    preferredProgram: "",
    tags: [],
    category: "",
  });

  // create a json list for these filters which should be accessible while posting jobs as well
  const jobTypes = [
    "Full-Time",
    "Part-Time",
    "Internship",
    "Contract",
    "Remote",
  ];
  const preferredPrograms = [
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Business",
  ];
  const min_salaries = [
    "10000",
    "20000",
    "30000",
    "40000",
    "50000",
    "60000",
    "70000",
    "80000",
    "90000",
    "100000",
  ];

  useEffect(() => {
    fetchJobs(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchJobs = async (currentPage) => {
    console.log(filters);
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    const companyName = userinfo?.companyName;

    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: 2,
    });
    if (companyName !== undefined) {
      const corporateId = JSON.parse(localStorage.getItem("userInfo"))._id;
      queryParams.append("corporateId", corporateId);
    }
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        // change this system (make a nested categorical filter)
        if (key === "category") {
          let category = filters[key].split(" (")[0];
          queryParams.append(key, category);
        } else {
          queryParams.append(key, filters[key]);
        }
      }
    });
    console.log(queryParams.toString());

    // const response = await fetch(`http://localhost:5000/jobs/list?${queryParams}`);
    //use env to call abckend
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/jobs/list?${queryParams}`
    );
    const data = await response.json();
    setJobs(data.jobs);
    console.log(data);
    setTotalPages(data.totalPages);
    if (data.jobs.length === 0) setPage(1); // Reset to first page if no results
  };

  const handlePrevious = () => {
    setPage(Math.max(1, page - 1));
  };

  const handleNext = () => {
    setPage(Math.min(totalPages, page + 1));
  };

  const goToJobDetails = (jobId) => {
    window.location.href = `/job/${jobId}`;
  };
  // useEffect (() => {
  //   const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  //   if (userInfo?.companyName === undefined) {
  //     window.location.href = "/login";
  //   }
  // }, []);

  const handleChange = (filterName) => (event) => {
    setFilters({ ...filters, [filterName]: event.target.value });
  };

  const combinedCategories = [
    ...categoryGroups.Functional.map((category) => `${category} (Functional)`),
    ...categoryGroups.Industrial.map((category) => `${category} (Industrial)`),
  ];

  return (
    <div className="container mx-auto px-4 flex">
      <div className="flex flex-col w-1/4 p-4 space-y-4 bg-white shadow-md rounded-lg">
        <Dropdown
          value={filters.jobType}
          onChange={handleChange("jobType")}
          options={jobTypes}
          placeholder="Select Job Type"
        />
        <Dropdown
          value={filters.salary}
          onChange={handleChange("salary")}
          options={min_salaries}
          placeholder="Select Salary"
        />
        <Dropdown
          value={filters.preferredProgram}
          onChange={handleChange("preferredProgram")}
          options={preferredPrograms}
          placeholder="Select Program"
        />
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="mr-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Tags"
          value={filters.tags}
          onChange={(e) =>
            setFilters({ ...filters, tags: e.target.value.split(",") })
          }
          className="mr-2 p-2 border rounded"
        />
        <Dropdown
          value={filters.category}
          onChange={handleChange("category")}
          options={combinedCategories}
          placeholder="Select Category"
        />

        <button
          onClick={() => fetchJobs(1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      <div className="flex-grow">
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobItem key={job._id} job={job} onNavigate={goToJobDetails} />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevious}
            disabled={page <= 1}
            className={`px-4 py-2 rounded bg-blue-500 text-white ${
              page <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={page >= totalPages}
            className={`px-4 py-2 rounded bg-blue-500 text-white ${
              page >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ListJobs;

function Dropdown({ value, onChange, options, placeholder }) {
  return (
    <div className="form-control">
      <select
        value={value}
        onChange={onChange}
        className="select select-bordered w-full text-gray-700"
      >
        <option value="" className="text-gray-500">
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="text-gray-950 font-semibold"
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function JobItem({ job }) {
  const isJobClosed = job.status === "closed";
  const isCorporate =
    JSON.parse(localStorage.getItem("userInfo"))?.companyName !== undefined;
  const isStudent =
    JSON.parse(localStorage.getItem("userInfo"))?.nsu_id !== undefined;
  return (
    <div className="card bg-base-100 shadow-xl p-2">
      <div className="card-body">
        <h2 className="card-title">
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

        <div className="font-semibold">Tags: {job.tags.join(", ")}</div>
        <div className="flex flex-row space-x-2 items-center">
          <button
            className="btn btn-info"
            onClick={() => (window.location.href = `/job/${job._id}`)}
          >
            View Details
          </button>
          {isStudent && !isJobClosed && (
            <button
              className="btn btn-success"
              onClick={() => (window.location.href = `/apply-job/${job._id}`)}
            >
              Apply
            </button>
          )}
          {isCorporate &&
            (isJobClosed ? (
              <p className="text-red-600 bg-red-100 p-2 rounded font-bold w-48 text-center">
                This job is closed
              </p>
            ) : (
              <button
                className="btn btn-error"
                onClick={() => close_job(job._id)}
              >
                Close Job
              </button>
            ))}

          {isCorporate && (
            <button
              className="btn btn-error"
              onClick={() => delete_job(job._id)}
            >
              Delete Job
            </button>
          )}
          {isCorporate && (
            <button
              className="btn btn-warning"
              onClick={() => (window.location.href = `/edit-job/${job._id}`)}
            >
              Edit Job
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function close_job(jobId) {
  // fetch("http://localhost:5000/jobs/close", {
  fetch(`${process.env.REACT_APP_API_URL}/jobs/close`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobId }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        alert("Job closed successfully");
        window.location.reload();
      }
    });
}

function delete_job(jobId) {
  const _corporateid = JSON.parse(localStorage.getItem("userInfo"))._id;
  // fetch("http://localhost:5000/jobs/delete", {
  fetch(`${process.env.REACT_APP_API_URL}/jobs/delete`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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
