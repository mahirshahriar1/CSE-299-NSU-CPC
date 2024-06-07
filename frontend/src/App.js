import React from "react";

function App() {
  const general = [
    { text: "Go to Login", href: "/login", bgColor: "bg-violet-500" },
    { text: "Home Page", href: "/home", bgColor: "bg-violet-500" },
    {
      text: "Logout",
      onClick: () => {
        localStorage.removeItem("userInfo");
        alert("Logged out successfully");
      },
      bgColor: "bg-red-500",
    },
    // { text: "List Jobs", href: "/list-jobs", bgColor: "bg-orange-600" },
    { text: "Job Board", href: "/job-board", bgColor: "bg-orange-600" },
  ];
  const stu_alum = [
    { text: "Register", href: "/user-register", bgColor: "bg-green-600" },
    {
      text: "Edit Profile",
      href: "/edit-user-profile",
      bgColor: "bg-green-600",
    },
    { text: "Profile", href: "/student-profile", bgColor: "bg-green-600" },
    { text: "Post CV Data", href: "/postCV", bgColor: "bg-green-600" },
    { text: "Applied Jobs", href: "/applied-jobs", bgColor: "bg-green-600" },
  ];
  const corporate = [
    {
      text: "corporate-dashboard",
      href: "/dashboard",
      bgColor: "bg-orange-600",
    },
    {
      text: "Corporate Register",
      href: "/corporate-register",
      bgColor: "bg-orange-600",
    },
    {
      text: "Edit Profile",
      href: "/edit-corporate-profile",
      bgColor: "bg-orange-600",
    },
    { text: "Post Jobs", href: "/postJobs", bgColor: "bg-orange-600" },
  ];

  const admin = [  
    { text: "Handle Users", href: "/handleUsers", bgColor: "bg-blue-600" },

    {
      text: "Pending Jobs for approval",
      href: "/pendingJobs",
      bgColor: "bg-blue-600",
    },
  ];

  function ButtonGroup({ title, buttons, fullWidth = false }) {
    const buttonWidth = fullWidth ? "w-full" : "w-1/2";

    return (
      <div
        className={`grid grid-cols-2 grid-rows-5 gap-4 ${
          fullWidth ? "w-full" : "w-1/2"
        }`}
      >
        <h1 className="text-4xl font-bold text-center col-span-2">{title}</h1>
        {buttons.map((button, index) => (
          <div key={index} className="mt-20 flex justify-center">
            <button
              className={`ease-in-out transition-all ${buttonWidth} py-3 rounded-xl ${button.bgColor} text-white text-lg font-bold`}
              onClick={() => {
                if (button.href) {
                  window.location.href = button.href;
                } else if (button.onClick) {
                  button.onClick();
                }
              }}
            >
              {button.text}
            </button>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-center col-span-2">General</h1>
        {general.map((button, index) => (
          <div
            key={index}
            className="mt-10 w-full flex items-center justify-center"
          >
            <button
              className={` ease-in-out transition-all w-1/6 py-2 rounded-xl ${button.bgColor} text-white text-lg font-bold`}
              onClick={() => {
                if (button.href) {
                  window.location.href = button.href;
                } else if (button.onClick) {
                  button.onClick();
                }
              }}
            >
              {button.text}
            </button>
          </div>
        ))}
      </div>
      <div className="flex">
        <ButtonGroup title="Admin" buttons={admin} />
        <ButtonGroup title="Student/Alumni" buttons={stu_alum} />
        <ButtonGroup title="Corporate" buttons={corporate} />
      </div>
    </>
  );
}
// Export the App component

export default App;
