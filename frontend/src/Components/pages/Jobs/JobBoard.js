import React, { useEffect, useState } from "react";
import NavBar from "../../NavBar";
import { combinedCategories } from "../../data/postJobsData";
import TopNav from "../../TopNav";
import { useLocation } from "react-router-dom";
import JobCard from "../../JobCard";

function JobBoard() {
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("searchTerm") || "";
  const jobQuery = queryParams.get("jobType") || "";
  const initialCategory = queryParams.get("category") || "";

  const isAdmin =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "admin";
  const isCorporate =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "corporate";

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    jobType: jobQuery,
    location: "",
    salary: "",
    preferredProgram: "",
    tags: [],
    category: initialCategory,
    keyword: searchTerm,
    status: "",
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
  const jobStatusOptions = ["active", "closed"];
  const fetchJobs = async (currentPage) => {
    setLoading(true);
    // console.log(filters);
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    // const companyName = userinfo?.companyName;
    let UserType = userinfo?.userType;

    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: 10,
    });
    if (filters.status) {
      queryParams.append("status", filters.status.toLowerCase());
    }
    if (UserType !== "admin" && UserType !== "corporate") {
      //  status: "active",
      queryParams.append("status", "active");
    }
    if (UserType === "alumni" || UserType === "student") {
      queryParams.append("admin_approval", false);
    }
    if (UserType === "admin") {
      queryParams.append("admin", true);
    }
    if (UserType === "corporate") {
      const corporateId = JSON.parse(localStorage.getItem("userInfo"))?._id;
      queryParams.append("corporateId", corporateId);
    }
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
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
    // console.log(data);
    setTotalPages(data.totalPages);
    if (data.jobs.length === 0) setPage(1); // Reset to first page if no results
    setLoading(false);
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

  const handleChange = (filterName) => (event) => {
    setFilters({ ...filters, [filterName]: event.target.value });
  };

  useEffect(() => {
    // if no user is logged in, redirect to login page
    if (!localStorage.getItem("userInfo")) {
      alert("You need to login to view this page");
      window.location.href = "/login";
    }
    fetchJobs(page);

    // let userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // const isUser = JSON.parse(localStorage.getItem("userInfo"));
    // if (isUser?.nsu_id === undefined) {
    //   alert("You are not allowed to visit this page");
    //   window.location.href = "/";
    // }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function Dropdown({ value, onChange, options, placeholder }) {
    return (
      <div className="form-control">
        <select
          value={value}
          onChange={onChange}
          className="select select-bordered bg-white h-[50px] w-[365px]"
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

  return (
    <div className="flex flex-row bg-gray-200 ">
      <div className="">
        <NavBar />
      </div>
      <div className="main bg-gray-100 flex flex-col w-full">
        <TopNav />

        {/* tweaking */}
        <div className="flex flex-col  ">
          <div className="flex flex-wrap gap-3 m-5 justify-center ">
            <button
              onClick={() => fetchJobs(1)}
              className="bg-white text-gray rounded-lg  p-2 text-center w-[365px] h-[50px]"
            >
              <div className="flex justify-center">
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
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
                &nbsp;Customize Your Search
              </div>
            </button>
            {(isAdmin || isCorporate) && (
              <Dropdown
                value={filters.status}
                onChange={handleChange("status")}
                options={jobStatusOptions}
                placeholder="Select Job Status"
              />
            )}
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
            <Dropdown
              value={filters.category}
              onChange={handleChange("category")}
              options={combinedCategories}
              placeholder="Select Category"
            />
            <label className="bg-white input flex items-center h-[50px] w-[365px] ">
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) =>
                  setFilters({ ...filters, location: e.target.value })
                }
              />
            </label>
            <label className="bg-white input flex items-center  h-[50px] w-[365px]  ">
              <input
                type="text"
                placeholder="Tags"
                value={filters.tags}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    tags: e.target.value.split(","),
                  })
                }
              />
            </label>
            <button
              onClick={() => fetchJobs(1)}
              className="bg-white text-blue-500 border-2 border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white p-2 text-center  w-[365px] h-[50px]"
            >
              Apply Filters
            </button>{" "}
          </div>
        </div>

        {/* wrap*/}
        {/* jobs cards*/}
        <div className="flex flex-wrap mt-5 gap-5 justify-center ">
          {jobs.map((job) => (
            <JobCard
              key={job._id}
              job={job}
              onNavigate={goToJobDetails}
              loading={loading}
            />
          ))}
        </div>
        <div className="flex justify-around items-center my-10">
          <button
            onClick={handlePrevious}
            disabled={page <= 1}
            className={`px-4 py-2 rounded-full bg-blue-500 text-white  ${
              page <= 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Previous
          </button>

          <span className="text-xl font-bold">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={page >= totalPages}
            className={`px-4 py-2 rounded-full bg-blue-500 text-white  ${
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

export default JobBoard;
