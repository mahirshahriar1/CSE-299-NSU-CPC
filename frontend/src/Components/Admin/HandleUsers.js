import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import "daisyui";
import TopNav from "../TopNav";
import NavBar from "../NavBar";
import { UserContext } from "../../contexts/UserContext";
import JobCard from "../JobCard";

const HandleUsers = () => {
  const { userInfo } = useContext(UserContext);

  const [userType, setUserType] = useState("student");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [jobs, setJobs] = useState([]);

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
    fetchUsers();
    fetchJobs(page);
    // eslint-disable-next-line
  }, [userType, page]);

  const fetchJobs = async (currentPage) => {
    const queryParams = new URLSearchParams({
      page: currentPage,
      limit: 4,
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

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/admin/getUsers?type=${userType}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }       

      );
      const usersWithStatus = await Promise.all(
        res.data.map(async (user) => {
          let email = userType === "corporate" ? user.workEmail : user.email;
          const statusRes = await axios.get(
            `${process.env.REACT_APP_API_URL}/admin/getStatus?email=${email}`
          );
          return { ...user, status: statusRes.data.status };
        })
      );
      setUsers(usersWithStatus);
    } catch (error) {
      console.error("Failed to get users:", error.message);
    }
  };

  const deleteUser = (userEmail) => {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/admin/deleteUser?email=${userEmail}`
      )
      .then(() => fetchUsers())
      .catch((error) => console.error("Failed to delete user:", error.message));
  };

  const markUserInactive = (user) => {
    let userEmail = userType === "corporate" ? user.workEmail : user.email;
    const status = user.status;
    axios
      .patch(
        `${
          process.env.REACT_APP_API_URL
        }/admin/toggleUserStatus?email=${userEmail}&status=${
          status === "active" ? "inactive" : "active"
        }`
      )
      .then(() => fetchUsers())
      .catch((error) =>
        console.error("Failed to update user status:", error.message)
      );
  };

  const filteredUsers = users.filter((user) => {
    // Use optional chaining to safely access properties
    const searchField = userType === "corporate" ? user.workEmail : user.email;
    const nameField = user.personName || user.name; // Adjust based on your data structure

    // Check if searchField or nameField exist and include the searchTerm
    return (
      searchField?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nameField?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderTable = (isCorporate) => (
    <div className="overflow-x-auto">
      <table className="table w-full table-auto border-collapse">
        <thead>
          <tr className="text-blue-500 text-xl">
            {isCorporate ? (
              <>
                <th>Email (Work)</th>
                <th>Name</th>
                <th>Company Name</th>
                <th>Position</th>
              </>
            ) : (
              <>
                <th>Email</th>
                <th>Name</th>
                <th>School</th>
                <th>Department</th>
              </>
            )}
            <th className="text-center">Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-b-2 border-slate-300 text-md">
              {isCorporate ? (
                <>
                  <td>{user.workEmail}</td>
                  <td>{user.personName}</td>
                  <td>{user.companyName}</td>
                  <td>{user.currentPosition}</td>
                </>
              ) : (
                <>
                  <td>{user.email}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.school}</td>
                  <td>{user.department}</td>
                </>
              )}
              <td>
                <div className="flex h-full justify-center items-center">
                  <button
                    className={`font-sans text-xs text-green-800 mr-4 px-4 py-1 rounded-full w-[120px] mx-2 cursor-default
                                        ${
                                          user.status === "active"
                                            ? "bg-green-100"
                                            : "bg-blue-100"
                                        }`}
                  >
                    {user.status === "active" ? "Active" : "Inactive"}
                  </button>
                </div>
              </td>
              <td>
                <div className="flex space-x-1">
                  <button
                    className="p-3 rounded-xl bg-red-500 text-white font-bold 
                  active:scale-[.98] active:duration-75 hover:scale-[1.09] ease-in-out transition-all"
                    onClick={() => deleteUser(user.email)}
                  >
                    Delete
                  </button>
                  <button
                    className="p-3 rounded-xl bg-orange-500 text-white font-bold w-[160px]
                  active:scale-[.98] active:duration-75 hover:scale-[1.05] ease-in-out transition-all"
                    onClick={() => 
                      markUserInactive(user)
                    }
                  >
                    Make {user.status === "active" ? "Inactive" : "Active"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex bg-sky-100">
      <div className="">
        <NavBar />
      </div>
      <div className="main flex flex-col w-full">
        <TopNav />

        <div className="p-4">
          <div className="flex items-center justify-between text-black p-5">
            <p className="text-2xl">Choose Functionality:</p>

            <div>
              <label
                className={`text-xl border-2 border-blue-400 rounded-md font-bold
                            px-[50px] py-[10px] cursor-pointer flex items-center justify-center
                            ${
                              activeTab === "users"
                                ? "bg-blue-400 text-white"
                                : "text-blue-400"
                            }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={activeTab === "users"}
                  onChange={() => handleTabClick("users")}
                  className="hidden"
                />
                <div
                  className={`h-[30px] w-[30px] rounded-full mr-[20px] 
                            ${
                              activeTab === "users"
                                ? "border-8 border-white bg-blue-400"
                                : "border-2 border-blue-400"
                            }`}
                ></div>
                <span>Handle Users</span>
              </label>
            </div>

            <div>
              <label
                className={`text-xl border-2 border-blue-400 rounded-md font-bold
                            px-[50px] py-[10px] cursor-pointer flex items-center justify-center
                            ${
                              activeTab === "jobs"
                                ? "bg-blue-400 text-white"
                                : "text-blue-400"
                            }`}
              >
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={activeTab === "jobs"}
                  onChange={() => handleTabClick("jobs")}
                  className="hidden"
                />
                <div
                  className={`h-[30px] w-[30px] rounded-full mr-[20px] 
                            ${
                              activeTab === "jobs"
                                ? "border-8 border-white bg-blue-400"
                                : "border-2 border-blue-400"
                            }`}
                ></div>
                <span>Handle Jobs</span>
              </label>
            </div>
          </div>

          {activeTab === "users" && (
            <div className=" w-full rounded-box shadow-[0.5rem_0.5rem_darkgray]">
              <div className="border-4 bg-white text-black border-blue-400 p-4 rounded-box overflow-auto ">
                <div className="flex justify-between items-center space-x-2">
                  <div className="flex items-center justify-center flex-wrap">
                    <label className="text-2xl text-left font-sans mb-1 mr-3">
                      Select User Type
                    </label>
                    <select
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                      className="select select-bordered bg-white h-[50px] w-auto rounded-[25px] shadow-md"
                    >
                      <option value="student">Student</option>
                      <option value="alumni">Alumni</option>
                      <option value="corporate">Corporate</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-center flex-wrap">
                    <label className="text-2xl text-left font-sans mb-1 mr-3">
                      Search by Email or Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="input input-bordered bg-white h-[50px] w-auto rounded-[25px] shadow-md"
                    />
                  </div>
                </div>
                <div className="bg-blue-400 p-[1px] my-5"></div>

                <style>{customScrollbarStyles}</style>

                <div className="flex w-auto h-auto flex-col text-black rounded-md overflow-auto mt-3 custom-scrollbar">
                  {userType === "corporate"
                    ? renderTable(true)
                    : renderTable(false)}
                </div>

                <div className="bg-blue-400 p-[3px] mt-5 ml-36 mr-36 rounded-full "></div>
              </div>
            </div>
          )}

          {activeTab === "jobs" && (
            <div>
              {jobs.length === 0 ? (
                <div className="text-center mt-10 bg-white ">
                  <p>
                    No jobs available to display. Please check again later or
                    toggle the job status.
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap mt-5 gap-5 justify-center ">
                  {jobs.map((job) => (
                    <JobCard
                      key={job._id}
                      job={job}
                      onNavigate={() =>
                        (window.location.href = `/job/${job._id}`)
                      }
                    />
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
            </div>
          )}
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
  );
};

export default HandleUsers;
