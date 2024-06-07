import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { combinedCategories } from "./data/postJobsData";
import { UserContext } from "../contexts/UserContext";

const slides = [
  {
    id: 1,
    content: (
      <div className="w-full h-full bg-black relative flex flex-col justify-end">
        <div className="w-full h-full bg-black relative flex flex-col justify-end">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/310385711_481559224014190_5948701520618209569_n.jpg?alt=media&token=e5bda6dc-443f-4b77-be0b-5eef36be70d2"
            alt="Overlay Image"
            className="absolute bg-gradient-to-r from-indigo-500 inset-0 w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-left">
            <div className="w-full text-center text-white p-4 flex flex-col items-center">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/cpc_home_logo%20(1).png?alt=media&token=c4286b74-4b88-4318-961e-7179936f5f12"
                alt="Overlay Image"
                className="w-[250px] h-auto object-contain mb-4"
              />
              <h1 className="text-3xl md:text-6xl lg:text-6xl ">
                NSU Career and Placement Center
              </h1>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 2,

    content: (
      <div className="bg-gradient-to-r from-indigo-500 w-full h-full flex flex-row md:flex-row items-center justify-center ">
        <div className="bg-white h-full w-full md:w-1/2 flex flex-col items-center justify-center p-3 ">
          <p className="pb-4 text-black text-sm md:text-5xl text-center md:text-left md:m-5 md:w-1/2">
            All Set For Your Corporate Journey
          </p>
          <button
            className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
            onClick={() => (window.location.href = "/job-board")}
          >
            <p className="text-center ">Apply For Jobs</p>
          </button>
          <button
            className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
            onClick={() => (window.location.href = "/postCV")}
          >
            <p className="text-center ">Generate Your CV</p>
          </button>
          <button
            className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
            onClick={() => (window.location.href = "/user-register")}
          >
            <p className="text-center ">Sign Up Today</p>
          </button>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/web-development-services.gif?alt=media&token=b4f03329-e9f1-45a8-9ba3-7bad55ffb748"
            alt=""
            className="w-3/4"
          />
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className=" w-full h-full flex flex-row md:flex-row items-center justify-center border-gray-00">
        <div className="w-full md:w-2/3 flex items-center justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/1617684067travel.gif?alt=media&token=039ca06a-87d8-443f-9e22-3a785daa6525"
            alt=""
            className="rounded-xl"
          />
        </div>{" "}
        <div className="bg-white h-full w-full md:w-1/2 flex flex-col items-center justify-center p-3 rounded-">
          <p className="pb-4 text-gray-600 text-sm md:text-5xl text-center md:text-left md:m-5 md:w-1/2">
            All the tools you need for your buisness to look for their next star
            employee
          </p>

          <button
            className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
            onClick={() => (window.location.href = "/postJobs")}
          >
            <p className="text-center ">Post Jobs</p>
          </button>
          <button
            className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
            onClick={() => (window.location.href = "/corporate-register")}
          >
            <p className="text-center ">Sign Up Today</p>
          </button>
        </div>
      </div>
    ),
  },
  {
    id: 4,
    content: (
      <div className="bg-gradient-to-r from-indigo-500 w-full h-full flex flex-row md:flex-row items-center justify-center border-gray-00">
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/image_processing20201121-12418-dvhknv.gif?alt=media&token=7f16009f-a9ef-478c-850e-563ecd61d7ad"
            alt=""
            className="rounded-xl"
          />
        </div>{" "}
        <div className="bg-white h-full w-full md:w-1/2 flex flex-col items-center justify-center p-3 rounded-">
          <p className="pb-4 text-gray-600 text-sm md:text-5xl text-center md:text-left md:m-5 md:w-1/2">
            Discover a diverse range of job opportunities from reputable
            companies across various industries
          </p>

          <button
            className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
            onClick={() => (window.location.href = "/job-board")}
          >
            <p className="text-center ">Job Board</p>
          </button>
          <button
            className="w-full md:w-1/2 bg-white text-sm md:text-lg text-blue-400 mb-2 md:mb-3 p-2 md:p-3 border-2 rounded-full font-semibold"
            onClick={() => (window.location.href = "/user-register")}
          >
            <p className="text-center ">Sign Up Today</p>
          </button>
        </div>
      </div>
    ),
  },
];

const DivSlider = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);
  const [sliderHeight, setSliderHeight] = useState(400); // Default height

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSliderHeight(240);
      } else {
        setSliderHeight(830);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isAnimating && slides.length > 0) {
        goToNextSlide();
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isAnimating, slides.length]);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex === slides.length - 1) {
        setIsAnimating(false);
        setTimeout(() => {
          setCurrentIndex(0);
          setIsAnimating(true);
        }, 100);
        return prevIndex;
      } else {
        return prevIndex + 1;
      }
    });
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex transition-transform duration-500 ${
          !isAnimating && "transition-none"
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          height: `${sliderHeight}px`,
        }}
      >
        {slides.concat(slides).map((slide, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full">
            {slide.content}
          </div>
        ))}
      </div>
      <button
        onClick={goToPrevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full ml-2"
      >
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
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={goToNextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full mr-2"
      >
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
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
};

const Navbar = () => {
  const [isloggedIn, setIsLoggedIn] = useState(false);
  const { userInfo } = useContext(UserContext);
  const isCorporate =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "corporate";
  const isStudent =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "student";
  const isAdmin =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "admin";

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, []);

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="bg-[#0675c1] w-full flex justify-between items-center text-white p-5 text-md relative">
      <div className="flex items-center space-x-2 ">
        <a href="/" className="text-2xl hover:text-gray-300">
          NSU CPC
        </a>
      </div>

      <div className="hidden lg:flex space-x-2 items-center">
        {isloggedIn && (
          <button
            className="flex items-center hover:text-blue-400 hover:bg-white p-2 rounded-lg"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">&nbsp;Home</p>
            </div>
          </button>
        )}

        <div className="relative z-10">
          <button
            onClick={() => handleDropdownClick("about")}
            className="flex items-center hover:text-blue-400 hover:bg-white p-2 rounded-lg"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">&nbsp;About</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 15"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                activeDropdown === "about" ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {activeDropdown === "about" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-20">
              <a
                href="/about/history"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                History
              </a>
              <a
                href="/about/team"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                Team
              </a>
              <a
                href="/about/contact"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                Contact
              </a>
            </div>
          )}
        </div>
        <div className="relative z-10">
          <button
            onClick={() => handleDropdownClick("resources")}
            className="flex items-center hover:text-blue-400 hover:bg-white p-2 rounded-lg"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">&nbsp;Resourses</p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 15"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                activeDropdown === "resources" ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {activeDropdown === "resources" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-20">
              <a
                href="/resources/articles"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                Articles
              </a>
              <a
                href="/resources/guides"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                Guides
              </a>
              <a
                href="/resources/tools"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                Tools
              </a>
            </div>
          )}
        </div>
        <div className="relative z-10">
          <button
            onClick={() => handleDropdownClick("programs")}
            className="flex items-center hover:text-blue-400 hover:bg-white p-2 rounded-lg"
          >
            <div className="flex items-center">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                  />
                </svg>

                <p className="not-italic hover:text-blue-500">&nbsp;Programs</p>
              </div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 15"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                activeDropdown === "programs" ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {activeDropdown === "programs" && (
            <div className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md z-20">
              <a
                href="/programs/workshops"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                Workshops
              </a>
              <a
                href="/programs/courses"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                Courses
              </a>
              <a
                href="/programs/mentorship"
                className="block rounded-lg px-4 py-2 hover:bg-gray-200"
              >
                Mentorship
              </a>
            </div>
          )}
        </div>
        <a
          href="/events"
          className="hover:text-blue-400 hover:bg-white p-2 rounded-lg"
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
              />
            </svg>

            <p className="not-italic hover:text-blue-500">
              &nbsp;Events and Seminars
            </p>
          </div>
        </a>
        <div className="flex items-center">
          <button className="flex items-center hover:text-blue-400 hover:bg-white p-2 rounded-lg">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>

              <button
                className="not-italic hover:text-blue-500"
                onClick={() => {
                  window.location.href = "/job-board";
                }}
              >
                &nbsp;Job Board
              </button>
            </div>
          </button>
        </div>
        <div className="relative z-10">
          <button
            onClick={() => handleDropdownClick("login")}
            className="ml-3 flex items-center hover:text-blue-400 hover:bg-white p-2 rounded-lg"
          >
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">
                &nbsp; {isloggedIn ? "Profile" : "Login"}
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 15"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                activeDropdown === "login" ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {activeDropdown === "login" && (
            <div className="absolute right-0 mt-2 w-[200px] bg-white text-black shadow-lg rounded-md z-20">
              <div className="flex justify-center items-center">
                <div className="  w-[200px] justify-center text-center">
                  <div className="flex justify-center items-center">
                    <div className="m-1 mx-3 mt-3 w-full  flex justify-center items-center">
                      <img
                        className="w-[130px] h-[130px]  object-cover border-4 rounded-full"
                        src={
                          isloggedIn
                            ? isAdmin
                              ? "https://firebasestorage.googleapis.com/v0/b/nsucpc-97cd3.appspot.com/o/userpfp%2FNorth_South_University_Monogram.svg.png?alt=media&token=096d8261-d67c-4173-a193-41880c52bbb9"
                              : userInfo?.picture
                            : "https://firebasestorage.googleapis.com/v0/b/nsucpc-97cd3.appspot.com/o/userpfp%2FNorth_South_University_Monogram.svg.png?alt=media&token=096d8261-d67c-4173-a193-41880c52bbb9"
                        }
                        alt="Avatar"
                      />
                    </div>
                  </div>

                  <div>
                    {isloggedIn && (
                      <div className="mx-1">
                        <p className="text-xl mb-1">
                          {userInfo?.name}
                          {isAdmin && <span>Admin</span>}
                        </p>
                        <p className="text-sm mb-1">
                          {isStudent && <p>{userInfo?.email}</p>}
                          {isCorporate && <p>{userInfo?.workEmail}</p>}
                          {isAdmin ? "Welcome Administrator" : ""}
                        </p>
                      </div>
                    )}

                    {isloggedIn && (
                      <button
                        className="flex items-center justify-start w-full p-2 text-back text-base hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          window.location.href = isAdmin
                            ? "/admin-dashboard"
                            : isCorporate
                            ? "/dashboard"
                            : isStudent
                            ? "/student-profile"
                            : "/";
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                          />
                        </svg>
                        &nbsp; Dashboard
                      </button>
                    )}

                    {isloggedIn && (isCorporate || isStudent) && (
                      <button
                        className="flex items-center justify-start w-full p-2 text-back text-base hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          window.location.href = isCorporate
                            ? "/edit-corporate-profile"
                            : "edit-user-profile";
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
                          />
                        </svg>
                        &nbsp; Edit Profile
                      </button>
                    )}

                    {isloggedIn && isStudent && (
                      <button
                        className="flex items-center justify-start w-full p-2 text-back text-base hover:bg-blue-600 hover:text-white"
                        onClick={() => {
                          window.location.href = "/postCV";
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                          />
                        </svg>
                        &nbsp; Edit CV
                      </button>
                    )}

                    <button
                      className="flex items-center justify-start w-full p-2 text-back text-center hover:bg-blue-600 hover:text-white"
                      onClick={() => {
                        if (isloggedIn) {
                          localStorage.removeItem("userInfo");
                          window.location.href = "/";
                        } else {
                          window.location.href = "/login";
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                        />
                      </svg>
                      &nbsp; {isloggedIn ? "Logout" : "Login"}
                    </button>
                    {/* <button className="flex items-center justify-start w-full p-2 text-back hover:bg-blue-600 hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                        />
                      </svg>
                      &nbsp;Corporate Login
                    </button>
                    <button className="flex items-center justify-start w-full p-2 text-back hover:bg-blue-600 hover:text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
                        />
                      </svg>
                      &nbsp;Admin Login
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="lg:hidden flex items-center">
        <button
          onClick={handleMobileMenuToggle}
          className="hover:text-blue-400 hover:bg-white p-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-[#0675c1] text-white lg:hidden">
          <a href="/" className="block hover:text-blue-400 hover:bg-white p-2 ">
            Home
          </a>
          <button
            onClick={() => handleDropdownClick("about")}
            className="w-full text-left flex items-center hover:text-blue-400 hover:bg-white p-2 "
          >
            About
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 15"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                activeDropdown === "about" ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {activeDropdown === "about" && (
            <div className="bg-white text-black shadow-lg ">
              <a
                href="/about/history"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                History
              </a>
              <a
                href="/about/team"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                Team
              </a>
              <a
                href="/about/contact"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                Contact
              </a>
            </div>
          )}
          <button
            onClick={() => handleDropdownClick("resources")}
            className="w-full text-left flex items-center hover:text-blue-400 hover:bg-white p-2 "
          >
            Resources
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 15"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                activeDropdown === "resources" ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {activeDropdown === "resources" && (
            <div className="bg-white text-black shadow-lg ">
              <a
                href="/resources/articles"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                Articles
              </a>
              <a
                href="/resources/guides"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                Guides
              </a>
              <a
                href="/resources/tools"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                Tools
              </a>
            </div>
          )}
          <button
            onClick={() => handleDropdownClick("programs")}
            className="w-full text-left flex items-center hover:text-blue-400 hover:bg-white p-2 "
          >
            Programs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 15"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                activeDropdown === "programs" ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {activeDropdown === "programs" && (
            <div className="bg-white text-black shadow-lg ">
              <a
                href="/programs/workshops"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                Workshops
              </a>
              <a
                href="/programs/courses"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                Courses
              </a>
              <a
                href="/programs/mentorship"
                className="block  px-4 py-2 hover:bg-gray-200"
              >
                Mentorship
              </a>
            </div>
          )}
          <a
            href="/events"
            className="block hover:text-blue-400 hover:bg-white p-2 "
          >
            Events and Seminars
          </a>
          <a
            href="/job-board"
            className="block hover:text-blue-400 hover:bg-white p-2 "
          >
            Job Portal
          </a>
          <button
            onClick={() => handleDropdownClick("login")}
            className="w-full text-left flex items-center hover:text-blue-400 hover:bg-white p-2 "
          >
            Login
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 15"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-3 h-3 ml-1 transition-transform duration-200 ${
                activeDropdown === "login" ? "transform rotate-180" : ""
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
          {activeDropdown === "login" && (
            <div className="bg-white text-black shadow-lg ">
              <a href="/login" className="block px-4 py-2 hover:bg-gray-200 ">
                Login
              </a>
              <a
                href="/register"
                className="block px-4 py-2 hover:bg-gray-200 "
              >
                Register
              </a>
              <a href="/profile" className="block px-4 py-2 hover:bg-gray-200 ">
                Profile
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
const Footer = () => (
  <footer
    className="byrazedNdazed w-full text-white"
    style={{ backgroundColor: "#02284e" }}
  >
    <div
      className="py-1.5 flex justify-between items-center text-black"
      style={{ backgroundColor: "#6eb9ff" }}
    ></div>

    <div className="px-4 py-8 bg-[#0a2f55] text-white justify-between ">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/5 flex flex-col items-center justify-center md:mr-20 mb-8 md:mb-0">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/cpc_home_logo%20(1).png?alt=media&token=c4286b74-4b88-4318-961e-7179936f5f12"
            alt="Image"
            className="h-40 md:mr-8 mb-4 md:mb-0"
          />
          <p>NSU Career And Placement Center</p>
        </div>

        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <header className="text-2xl bg-transparent bg-opacity-10">
            <h6 className="text-3xl">Follow Us</h6>
          </header>
          <br></br>
          <div className="flex items-center mb-4">
            <svg
              className="h-8 w-8 text-blue-700 mr-5 transition-transform duration-200 transform hover:scale-125"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <p>LinkedIn</p>
          </div>
          <br></br>
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-purple-700 mr-5 transition-transform duration-200 transform hover:scale-125"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            <p>GitHub</p>
          </div>{" "}
          <br></br>
          <div className="flex items-center">
            <svg
              className="h-8 w-8 text-blue-600 mr-5 transition-transform duration-200 transform hover:scale-125"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
            <p>Facebook</p>
          </div>
        </div>

        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <header className="text-2xl bg-transparent bg-opacity-30">
            <h6 className="text-3xl">Quick Links</h6>
          </header>
          <address className="mt-2">
            <div
              className="flex items-center"
              onClick={() => (window.location.href = "/")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">&nbsp;Home</p>
            </div>

            <div
              className="flex items-center"
              onClick={() => (window.location.href = "/login")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">&nbsp;Log In</p>
            </div>

            <div
              className="flex items-center"
              onClick={() => (window.location.href = "/job-board")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">&nbsp;Job Board</p>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">&nbsp;About</p>
            </div>

            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>

              <p className="not-italic hover:text-blue-500">&nbsp;Contacts</p>
            </div>
          </address>
        </div>

        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <header className="text-2xl bg-transparent bg-opacity-30">
            <h6 className="text-3xl">Contacts</h6>
          </header>
          <address className="mt-4">
            <strong>
              <h1></h1>North South University
            </strong>
            <br />
            <i className="fa-solid fa-stairs"></i>
            <span>5th Floor, Admin Building</span>
            <br />
            <i className="fa-solid fa-house"></i>
            <span> Plot #15, Block #B, Bashundhara</span>
            <br />
            <i className="fa-solid fa-city"></i>
            <span> Dhaka-1229, Bangladesh</span>
            <br />
            <i className="fa fa-phone"> </i>
            <span className="underline">Telephone:</span> +880-2-55668200 (Ext:
            6045)
            <br />
            <i className="fa fa-envelope"> </i>
            <span className="underline">Email:</span>{" "}
            <a href="mailto:cpc@northsouth.edu" className="underline">
              cpc@northsouth.edu
            </a>
            <br />
            <i className="fa-solid fa-briefcase"></i>
            <span>Office Hour: Sun. – Thur.: 9:00am – 5:00pm</span>
          </address>
        </div>

        <div className="w-full md:w-1/4">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/pngegg.png?alt=media&token=668bb27a-44be-4da3-9919-40d767f10821"
            alt="Image"
            className="w-full"
          />
        </div>
      </div>
    </div>

    <div
      className="px-4 py-2 text-center text-gray-400"
      style={{ backgroundColor: "#02284e" }}
    >
      <p>&copy; Copyright 2024 - NSU Career and Placement Center</p>
    </div>
  </footer>
);
const HomePage = () => {
  // HOME RATUL MAHIR AND BUNNY WARLOCK
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [jobType, setJobType] = useState("");

  const handleCategoryClick = (category) => {
    navigate(`/job-board?category=${category}`);
  };

  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.append("searchTerm", searchTerm);
    if (jobType) queryParams.append("jobType", jobType);

    navigate(`/job-board?${queryParams.toString()}`);
  };
  const jobTypes = [
    { id: "Full-Time", label: "Full-Time" },
    { id: "Part-Time", label: "Part-Time" },
    { id: "Contract", label: "Contract" },
    { id: "Internship", label: "Internship" },
    { id: "Remote", label: "Remote" },
  ];

  // Add more image URLs as need
  const images = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/2.png?alt=media&token=bd0b558d-d8b3-4d4c-b984-2fc4478a3abd",
      text: "asdasdssssssssssssssssss",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/ezgif.com-crop.gif?alt=media&token=6dbc77d0-470f-4fa1-8229-600b0ea5eaf2",
      text: "Caption for imagesaxas asdsa 1",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/_7df6ba04-b9fd-4dce-b3b9-ba78931d63fb.jpeg?alt=media&token=e8edeed6-8ce3-4cf1-9a2f-0f1906ee4748",
      text: "Caption for image 2",
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/SENTINEL-FINAL-WHITE.png?alt=media&token=c9917fc1-b971-4daa-8301-9b4a5ce30497",
      text: "Caption for image 3",
    },
  ];

  return (
    <div className="bg-white flex flex-col justify-center items-center">
      <div className="w-full " style={{ zIndex: 100 }}>
        <Navbar />
      </div>

      <div class="w-full overflow-hidden">
        <DivSlider slides={slides} />
      </div>
      <div class="shahriarratulsmargin bg-blue-400 mb-10"></div>

      <div className="1 flex flex-col w-full p-3 gap-3 md:flex-row justify-center">
        <div className="image-container w-full md:w-full lg:w-1/3 flex flex-col border-4 rounded-box  md:order-1 md:flex-row md:flex-col">
          <div className="bg-white w-full border-gray-200 rounded-lg justify-center">
            <h2 className="text-2xl text-start text-black pl-6 mt-3 font-semibold">
              Find the Right Job for You{" "}
            </h2>
            <div className="w-full flex justify-between items-center p-5 pt-3 ">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by keyword"
                className="bg-white input input-bordered border-2 border-blue-400 w-full rounded-full"
              />

              <select
                id="jobType"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className=" select select-bordered w-1/3  border-2 border-blue-400 bg-white rounded-full  ml-2 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                  />
                </svg>
                <option value="">Select By Job Type</option>
                {jobTypes.map((type) => (
                  <option
                    key={type.id}
                    value={type.id}
                    className="bg-white hover:bg-gray-100"
                  >
                    {type.label}
                  </option>
                ))}
              </select>

              <button
                onClick={handleSearch}
                className="p-2 bg-white rounded-full ml-2 border-2 border-blue-400 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className={`w-6 h-6 `}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>{" "}
          </div>
          <img
            src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/ezgif.com-gif-maker-9.gif?alt=media&token=9c0420aa-e029-424c-b6b9-744ce7b1ada0"
            className="w-full h-full object-cover rounded-box"
          />
        </div>
        <div className="rightContent w-full lg:w-1/2 md:w-full md:order-2  ">
          <div className="w-full justify-center items-center ">
            <div className="w-full bg-[#0675c1]  rounded-xl overflow-hidden ">
              <h2 className="text-3xl text-center text-white p-3 bg-[#0675c1]">
                Browse By Category
              </h2>
              <div className="w-full bg-gray-100 grid gap-2 p-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
                {combinedCategories.map((category) => (
                  <href
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="block flex flex-row p-2 bg-white hover:bg-gray-200 hover:text-blue-500 rounded-xl text-gray-600 text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mt-[2px] mr-2 bg-blue-500 rounded-box text-white"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                      />
                    </svg>

                    {category}
                  </href>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="2 flex flex-col p-3 gap-3 md:flex-row justify-center rounded-box">
        <div className="noticeboard w-full lg:w-1/2 md:w-full md:order-2 ">
          <div className="w-full justify-center items-center">
            <div className="w-full bg-[#0675c1] rounded-xl overflow-y-auto custom-scrollbar">
              <h2 className="text-3xl text-center text-white p-3 bg-green-600">
                Notice Board
              </h2>
              <div className="w-full bg-gray-100 h-[1050px]  p-4 overflow-y-auto custom-scrollbar">
                {[
                  {
                    title: "Great Work in NSU CPC Website",
                    date: "2024-05-28",
                    text: " UI. Who Made this ? Me Of Course !",
                  },
                  {
                    title: "Sahils UI  ",
                    date: "2024-05-27",
                    text: "He took Inspiration from Apple Thats why",
                  },
                  {
                    title: "Mahir Kiddo is Cool",
                    date: "2024-05-26",
                    text: "Employee Of the Year goes to Mahir",
                  },
                  {
                    title: "Notice 4",
                    date: "2024-05-25",
                    text: "This is the content of Notice 4.",
                  },
                  {
                    title: "Notice 5",
                    date: "2024-05-24",
                    text: "This is the content of Notice 5.",
                  },
                  {
                    title: "Notice 1",
                    date: "2024-05-28",
                    text: "This is the content of Notice 1.",
                  },
                  {
                    title: "Notice 2",
                    date: "2024-05-27",
                    text: "This is the content of Notice 2.",
                  },
                  {
                    title: "Notice 3",
                    date: "2024-05-26",
                    text: "This is the content of Notice 3.",
                  },
                  {
                    title: "Notice 4",
                    date: "2024-05-25",
                    text: "This is the content of Notice 4.",
                  },
                  {
                    title: "Notice 5",
                    date: "2024-05-24",
                    text: "This is the content of Notice 5.",
                  },
                  {
                    title: "Notice 1",
                    date: "2024-05-28",
                    text: "This is the content of Notice 1.",
                  },
                  {
                    title: "Notice 2",
                    date: "2024-05-27",
                    text: "This is the content of Notice 2.",
                  },
                  {
                    title: "Notice 3",
                    date: "2024-05-26",
                    text: "This is the content of Notice 3.",
                  },
                  {
                    title: "Notice 4",
                    date: "2024-05-25",
                    text: "This is the content of Notice 4.",
                  },
                  {
                    title: "Notice 5",
                    date: "2024-05-24",
                    text: "This is the content of Notice 5.",
                  },
                ].map((notice) => (
                  <div
                    key={notice.title}
                    className="p-4 mb-2 bg-white hover:bg-gray-200 rounded-xl text-gray-600 text-sm"
                  >
                    <div className="flex items-center mb-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-green-600 rounded-sm"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
                        />
                      </svg>
                      <span className="font-semibold ml-2">{notice.title}</span>
                    </div>
                    <p className="text-gray-500 text-xs mb-2 ml-6">
                      {notice.date}
                    </p>
                    <hr className="mb-2" />
                    <p className="ml-6">{notice.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" director w-full md:w-1/3 overflow-hidden border-4 border-blue-300 flex flex-col rounded-box p-5 text-black">
          <div className="w-full h-auto overflow-hidden text-black flex flex-row items-center mb-8 ">
            <div className="w-1/3 pr-4">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/khasro.jpg?alt=media&token=edfb91da-e73f-4611-89d9-5c69b155cd92"
                alt="Your Name"
                className="w-full border-4  rounded-box object-cover"
              />
            </div>

            <div className="w-2/3">
              <h1 className="text-xl mb-2">
                Professor Mohammad Khasro Miah, Ph.D.
              </h1>
              <h1 className="text-lg">
                Director, Career and Placement Center (CPC)
              </h1>
            </div>
          </div>

          <div className="w-full">
            <h1 className="text-2xl">DIRECTOR'S MESSAGE</h1>
            <div className="p-[1px] bg-blue-300"></div>
            <br />
            <p>
              It is my utmost pleasure to welcome you to the Office of the
              Career and Placement Center (CPC). Our mission is to provide
              career guidance for entering the job market, both local and global
              and provide advice regarding growth in their careers. We also
              organize various occupation and job-related events. We provide a
              host of different programs/services to help students determine
              their knowledge base, strengths, skills, and career passions.
              Besides, we help students acquire necessary skills and knowledge
              to compete in the job market through Excel Boot Camp, IELTS, GRE,
              corporate seminars with respective industry experts, networking
              events, workshop presentations, different training and
              co-curricular activities, such as campus recruitment, internships,
              interview skill development, and corporate grooming session.
              <br />
              <br />
              I extend my appreciation to our different corporate stakeholders.
              Students at North South University clearly stand out among their
              peers representing different majors from our School of Business
              and Economics (SBE); School of Engineering and Physical Sciences
              (SEPS); School of Health and Life Sciences (SHLS); and School of
              Humanities and Social Sciences (SHSS).
              <br />
              <br />
              Please visit our website for further information. If you would
              like to post an internship or career opportunity with our office,
              please use our website. Please contact our CPC office at any time
              to talk to one of our team members. We recommend calling to make
              an appointment between 9:00 am-5:00 pm. Walk-ins are welcome. We
              are located on the 5th floor of the Administration Building and
              can be reached at + 880-2-55668200 Ext. 1767, 2122, 6045 or
              cpc@northsouth.edu.
              <br />
              <br />
              We look forward to working with you
              <br />
              <br />
            </p>
          </div>
        </div>
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 12px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #16a34a;
            border-radius: 10px;
            border: 3px solid #f1f1f1;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background-color: #005c99;
          }
        `}</style>
      </div>
      {/*
      <div className="w-full bg-blue-300 flex flex-col p-3 gap-3 md:flex-row justify-center  border-2">
        <div className="w-full md:w-1/3 overflow-hidden border-4 border-blue-300 flex flex-col rounded-box p-5 text-black"></div>

        <div className="rightContent w-full lg:w-1/2 md:w-full md:order-2  overflow-y-auto custom-scrollbar border-2"></div>
      </div>
*/}

      <Footer />
    </div>
  );
};

export default HomePage;
