import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import { UserContext } from "../../contexts/UserContext";
import TopNav from "../TopNav";

const Dashboard = () => {
  const { userInfo, loading } = useContext(UserContext);

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filter, setFilter] = useState("all");
  const [candidateCounts, setCandidateCounts] = useState({});
  const [totalCandidate, setTotalCandidate] = useState(0);
  const id = JSON.parse(localStorage.getItem("userInfo"))?._id;

  const [totalJobs, setTotalJobs] = useState(0);
  const getJobCount = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/corporate/getMyJobCount?corporateId=${id}`
    );
    // console.log(response.data);
    setTotalJobs(response.data);
  };

  const getCount = (jobId) => {
    const queryParams = new URLSearchParams({ jobId });
    fetch(
      `${process.env.REACT_APP_API_URL}/applyjob/countCandidates?${queryParams}`
    )
      .then((response) => response.json())
      .then((data) => {
        setCandidateCounts((prevCounts) => ({
          ...prevCounts,
          [jobId]: data,
        }));
      });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      //alert("Please login to view this page.");
      navigate("/login");
    }

    getJobCount();
    // eslint-disable-next-line
  }, [localStorage]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // `${process.env.REACT_APP_API_URL}/applyjob/list-applied-jobs?${queryParams}`
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/corporate/getMyJobs?corporateId=${id}`
        );
        const data = await response.json();
        console.log(data);
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();
  }, [id]);

  useEffect(() => {
    jobs.forEach((job) => {
      getCount(job._id);
    });
  }, [jobs]);

  useEffect(() => {
    const total = Object.values(candidateCounts).reduce(
      (sum, count) => sum + count,
      0
    );
    setTotalCandidate(total);
  }, [candidateCounts]);

  useEffect(() => {
    let isCorporate = userInfo?.userType === "corporate";
    let isAdmin = userInfo?.userType === "admin";
    // console.log(isCorporate);
    if (!isCorporate && !isAdmin) {
      alert("You are not authorized to view this page");
      window.location.href = "/";
      return;
    }
    const filterJobs = () => {
      switch (filter) {
        case "active":
          setFilteredJobs(jobs.filter((job) => job.status === "active" && job.admin_approval === false));
          break;
        case "closed":
          setFilteredJobs(jobs.filter((job) => job.status === "closed"));
          break;
        case "waiting_approval":
          setFilteredJobs(jobs.filter((job) => job.admin_approval === true));
          break;
        default:
          setFilteredJobs(jobs);
      }
    };
    filterJobs();
    // eslint-disable-next-line
  }, [filter, jobs]);

  if (loading) {
    return <div>Loading...</div>;
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

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const goToCheckCandidates = (jobId) => {
    window.location.href = `/applied-candidates/${jobId}`;
  };
  const goToJobDetails = (jobId) => {
    window.location.href = `/job/${jobId}`;
  };

  class AppliedJobsComponent extends React.Component {
    render() {
      return (
        <div className=" w-full rounded-box ">
          <div className="border-4 bg-white text-black border-blue-400 p-4 rounded-box overflow-auto ">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <h2 className="text-2xl text-left font-sans mb-1 mr-3">
                  List of Posted Jobs
                </h2>
                <button
                  type="button"
                  onClick={() => (window.location.href = "/postJobs")}
                  className="bg-blue-400 hover:bg-blue-600 shadow-transparent border-4 border-white text-white text-xl text-center flex items-center justify-center h-[50px] w-[50px] rounded-full"
                >
                  &#43;
                </button>
              </div>
              <div>
                <select
                  value={filter}
                  onChange={handleFilterChange}
                  className="select select-bordered bg-white h-[50px] w-auto rounded-[25px] shadow-md"
                >
                  <option value="all">All Jobs</option>
                  <option value="active">Active Jobs</option>
                  <option value="closed">Closed Jobs</option>
                  <option value="waiting_approval">
                    Waiting for Admin Approval
                  </option>
                </select>
              </div>
            </div>
            <div className="bg-blue-400 p-[1px] my-5"></div>
            <style>{customScrollbarStyles}</style>
            <div className="flex w-auto h-auto flex-col text-black rounded-md overflow-auto mt-3 custom-scrollbar">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <div
                    key={index}
                    className="flex py-2 border-b items-center justify-between w-full"
                  >
                    <div className="w-1/3">
                      <button onClick={() => goToJobDetails(job._id)}>
                        <h1 className="font text-md text-left">
                          {index + 1}. {job.positionName}
                        </h1>
                        <h1 className="font text-gray-400 ml-4 text-xs text-left">
                          {job.companyName}
                        </h1>
                      </button>
                    </div>

                    <div className="flex justify-between w-2/3">
                      <button
                        className={`font-sans text-xs text-green-800 mr-4 px-4 py-1 rounded-full w-[120px] mx-2 cursor-default
                                        ${
                                          job.admin_approval
                                            ? "bg-red-100"
                                            : job.status === "active"
                                            ? "bg-green-100"
                                            : "bg-blue-100"
                                        }`}
                      >
                        {/* common */}
                        {job.admin_approval
                          ? "Not Approved"
                          : job.status === "active"
                          ? "Active"
                          : "Closed"}
                      </button>
                      <button
                        className="bg-violet-100 font-sans text-xs text-green-800 px-4 py-1 rounded-full w-[145px] mx-2"
                        onClick={() => goToCheckCandidates(job._id)}
                      >
                        {/* corporates only */}
                        Applicants: {candidateCounts[job._id] || 0}
                      </button>
                      <button
                        className="font-sans text-sm text-blue-600 mr-10 ml-2"
                        onClick={() =>
                          (window.location.href = `/edit-job/${job._id}`)
                        }
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">No jobs found.</div>
              )}
            </div>{" "}
            <div className="bg-blue-400 p-[3px] mt-5 ml-36 mr-36 rounded-full "></div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="flex bg-sky-100 ">
      <div className=" w-auto">
        <NavBar />
      </div>
      <div id="main" className="flex flex-col w-full ">
        <TopNav />

        {/* main content of dash */}
        <div className="dash flex flex-col justify-center p-4 gap-5">
          {/* Top Content */}
          <div className="flex flex-row justify-around mb-5">
            <div className="w-[110px] h-[110px] flex items-center justify-center rounded-full border-2 border-black  shadow-[0.5rem_0.5rem_darkgray]">
              <img
                className="w-full h-full object-cover rounded-full"
                src={userInfo?.picture}
                alt="Profile Pic"
              />
            </div>

            <div className="flex w-2/3 border-2 border-black rounded-3xl shadow-[0.5rem_0.5rem_gray] items-center bg-blue-300 px-10">
              <div className="company rounded-l-3xl text-black items-center justify-center w-1/2">
                <p className="text-xl text-center">Jobs Posted:</p>
                <p className="text-3xl text-center font-bold">{totalJobs}</p>
              </div>

              <div className="bg-black h-5/6 w-1 rounded-lg mx-5" />

              <div className="company rounded-r-3xl text-black items-center justify-center w-1/2">
                <p className="text-xl text-center">Total Applicants:</p>
                <p className="text-3xl text-center font-bold">
                  {totalCandidate}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Content - AppliedJobsComponent */}
          <div className="w-full rounded-box shadow-[0.5rem_0.5rem_darkgray]">
            <AppliedJobsComponent />
          </div>

          <div className="mt-5 w-full flex justify-center">
            <p
              className="[text-shadow:_8px_8px_12px_rgba(0,0,0,0.04),_-8px_-8px_12px_rgba(255,255,255,0.2)]
             text-9xl text-sky-100 font-mono outline-none font-bold"
            >
              CPC
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
