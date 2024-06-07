import React from "react";
import TopNav from "./TopNav";

const AboutUs = () => {
  return (
    <div className="flex flex-col">
      <TopNav />

      <div className="min-h-screen flex justify-center items-center px-10 py-2">
        <div className="w-full h-auto p-5 overflow-hidden border-4 border-blue-300 flex rounded-box text-black">
          <div className="w-1/2 h-auto overflow-hidden text-black flex flex-row items-center mb-8 justify-center">
            <div className="pr-4 flex justify-center w-full">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/nsucpc-97cd3.appspot.com/o/userpfp%2F20240521_162447.jpg?alt=media&token=636f23b4-e6e5-4c20-a80b-06d2432b5990"
                alt="Your Image Description"
                className="w-full rounded-box object-cover border-4 border-white-500 hover:border-green-400"
              />
            </div>
          </div>

          <div className="w-1/2 h-auto">
            <h1 className="text-2xl">ABOUT US</h1>
            <div className="p-[1px] bg-blue-300"></div>
            <br />
            <p>
              Welcome to the new and improved job board website for the North
              South University Career Placement Center (NSU CPC), created with
              dedication and innovation by Mahir Shahriar Tamim, Sahil Yasar,
              and Shahriar Ratul as part of our CSE299 course project.
            </p>
            <br />
            <p>
              Our goal was to enhance the existing NSU CPC website by
              integrating a range of new features designed to streamline the job
              search process for students and alumni. We worked tirelessly to
              ensure that our platform not only meets but exceeds the
              expectations of its users.
            </p>
            <br />
            <p>
              Through meticulous planning, extensive research, and countless
              hours of coding, we have created a robust and user-friendly
              interface. Key features of our revamped job board include:
            </p>
            <br />
            <ul>
              <li>
                <strong>Enhanced Job Search Filters</strong>: Refine your job
                search with advanced filters to find the perfect match for your
                skills and interests.
              </li>
              <li>
                <strong>User Profiles</strong>: Create comprehensive profiles
                that showcase your academic achievements, work experience, and
                skills to potential employers.
              </li>
              <li>
                <strong>Application Tracking</strong>: Keep track of your job
                applications in one convenient place.
              </li>
              <li>
                <strong>Company Profiles</strong>: Get detailed information
                about potential employers to make informed career decisions.
              </li>
              <li>
                <strong>Notifications and Alerts</strong>: Receive timely
                updates on job postings, application statuses, and upcoming
                career events.
              </li>
            </ul>
            <br />
            <p>
              We believe that our upgraded platform will significantly improve
              the job-seeking experience for NSU students and alumni. Our
              commitment to continuous improvement means we will keep refining
              our website based on user feedback and emerging trends in the job
              market.
            </p>
            <br />
            <p>
              Thank you for choosing our job board as your trusted resource for
              career placement. We look forward to supporting you in your
              professional journey.
            </p>
            <p>Mahir Shahriar Tamim, Sahil Yasar, and Shahriar Ratul</p>
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
    </div>
  );
};

export default AboutUs;
