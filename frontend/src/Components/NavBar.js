import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";

const logout = () => {
  localStorage.removeItem("userInfo");
  alert("Logged out successfully");
  window.location.href = "/";
};

function NavButton({ buttonText, destination, svg }) {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Check if the current URL matches the destination
    const currentPath = window.location.pathname;
    if (currentPath === destination) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [destination]);

  const handleClick = () => {
    setIsActive(true);
    window.location.href = destination;
  };

  return (
    <button
      className={`block py-2 px-4 border-[1px] mb-2 border-white rounded-box text-sm font-sans text-left focus:outline-none w-full ${
        isActive
          ? "bg-white text-blue-400"
          : "text-white hover:bg-white hover:text-blue-400"
      }`}
      onClick={handleClick}
    >
      <div className="flex flex-row">
        {svg && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 mr-2"
          >
            {svg}
          </svg>
        )}
        {buttonText}
      </div>
    </button>
  );
}

const NavBar = () => {
  const { userInfo, percent, appliedJobs } = useContext(UserContext);
  const isCorporate =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "corporate";
  const isStudent =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "student";
  const isAdmin =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "admin";

  return (
    <div className="bg-custom-color px-3 h-screen sticky w-[330px] hidden lg:block left-0 top-0 ">
      <div className="h-full w-full flex flex-col justify-between">
        <div>
          <div className="w-full p-2 pt-8 flex justify-center ">
            <div className="flex items-center justify-center">
              <img
                className="h-40 w-auto object-cover"
                src="https://firebasestorage.googleapis.com/v0/b/nsucpc-97cd3.appspot.com/o/userpfp%2FNorth_South_University_Monogram.svg.png?alt=media&token=096d8261-d67c-4173-a193-41880c52bbb9"
                alt="NSU CPC"
              />
            </div>
          </div>
          <br></br>
          <div className="w-full text-center mb-4 text-sm text-white">
            <p className="text-xl">
              {isAdmin ? "Welcome Administrator" : ""}
              {userInfo?.name}
              {userInfo?.isAlumni ? " (Alumni)" : ""}
            </p>

            {isStudent && <p>{userInfo?.email}</p>}
            {isCorporate && <p>{userInfo?.workEmail}</p>}

            {isStudent && <p>Student ID: {userInfo?.nsu_id}</p>}
            {isCorporate && (
              <p>
                {userInfo?.companyName} ({userInfo?.currentPosition})
              </p>
            )}

            <div className="p-1"></div>
            {(isStudent || isCorporate) && (
              <div>
                <p>Profile Completed :{Math.floor(percent)}%</p>

                <progress
                  className="progress progress-info w-[180px] ml-4 mr-4"
                  value={percent}
                  max="100"
                ></progress>
              </div>
            )}
          </div>

          <div className="flex flex-col">
            <NavButton
              buttonText="Home"
              destination="/home"
              svg={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              }
            />
            {isAdmin && (
              <NavButton
                buttonText="Dashboard"
                destination="/admin-dashboard"
                svg={
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                }
              />
            )}
            {isStudent && (
              <NavButton
                buttonText="Profile"
                destination="/student-profile"
                svg={
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                }
              />
            )}
            {isCorporate && (
              <NavButton
                buttonText="Dashboard"
                destination="/dashboard"
                svg={
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                  />
                }
              />
            )}

            <NavButton
              buttonText="Job Board"
              destination="/job-board"
              svg={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                />
              }
            />
            {(isCorporate || isStudent) && (
              <NavButton
                buttonText="Edit Profile"
                destination={
                  isCorporate ? "/edit-corporate-profile" : "edit-user-profile"
                }
                svg={
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                  />
                }
              />
            )}

            <NavButton
              buttonText="About"
              destination="/aboutus"
              svg={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                />
              }
            />

            {isStudent && (
              <NavButton
                buttonText="Edit CV"
                destination="/postCV"
                svg={
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                  />
                }
              />
            )}

            <button
              onClick={logout}
              className="block py-2 px-4 border-[1px] mb-2 border-white rounded-box text-sm font-sans text-left text-white focus:outline-none hover:bg-white hover:text-blue-400 w-full"
            >
              <div className="flex flex-row">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.636 5.636a9 9 0 1 0 12.728 0M12 3v9"
                  />
                </svg>
                &nbsp;Log Out
              </div>
            </button>
          </div>
        </div>

        <div className="mb-5">
          {isStudent && (
            <div className=" flex-col">
              <div
                className="stat  border border-gray-100 hover:border-blue-400 hover:bg-blue w-full text-left rounded-box cursor-pointer"
                onClick={() => (window.location.href = "/applied-jobs")}
              >
                <div className="stat-figure text-secondary">
                  <div className="avatar online">
                    <div className="w-16 rounded-full">
                      <img src={userInfo?.picture} alt="Profile pic" />
                    </div>
                  </div>
                </div>
                <div className="stat-figure text-secondary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-8 h-8 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    ></path>
                  </svg>
                </div>
                <div className="text-white">Applied Jobs</div>
                <div className="stat-value text-white">{appliedJobs}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
