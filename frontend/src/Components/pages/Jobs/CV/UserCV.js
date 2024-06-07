import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";

const UserCV = () => {
  const { userInfo, userCV } = useContext(UserContext);
  console.log("userInfo", userInfo);
  const safeUserInfo = userInfo || {};

  const safeUserCV = userCV || null;
  const Certifications = safeUserCV?.certifications || [];
  const Languages = safeUserCV?.languages || [];
  const Skills = safeUserCV?.skills || [];
  const References = safeUserCV?.references || [];
  const Projects = safeUserCV?.projects || [];
  const WorkExperience = safeUserCV?.workExperience || [];
  // const Hobbies = safeUserCV?.hobbies || [];
  const Education = safeUserCV?.education || [];

  return (
    <div>
      <div className="flex flex-row w-auto h-auto md:grid-cols-2 ">
        {/* Contact Information */}
        <div className="contacts w-1/2 h-auto grid grid-row-5 p-2 bg-[#0675c1] ">
          {/* First part */}
          <div className="w-auto h-auto flex flex-col items-center text-white justify-center">
            <div className=" rounded-full border-4 border-white items-center mb-10">
              <img
                className="w-[160px] h-[160px] object-cover rounded-full"
                src={safeUserInfo.picture}
                alt="Profile Pic"
              />
            </div>
          </div>

          {/* Second part */}
          <div className="w-auto h-auto text-left text-white overflow-hidden  flex flex-col ">
            <div className="flex items-center text-white w-full">
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
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <p className="uppercase">&nbsp;Contacts</p>
            </div>
            <div className="bg-white p-[2px] mt-1 mb-2 "></div>
            <div className="flex items-center text-white text-sm w-full">
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
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              <p className="">&nbsp;{safeUserCV?.address}</p>
            </div>
            <div className="flex items-center text-white text-sm w-full">
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
                  d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3"
                />
              </svg>

              <p className="mt-1">&nbsp;{safeUserInfo.phone}</p>
            </div>
            <div className="flex items-center text-left text-white text-sm w-full">
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
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
              <p className="mt-1">
                &nbsp;
                {safeUserInfo.email}
              </p>
            </div>
          </div>

          {/* Third part */}

          <div className="w-auto h-auto text-left text-white overflow-hidden  flex flex-col ">
            <div className="flex items-center text-white">
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

              <p className="uppercase">&nbsp;Education</p>
            </div>
            <div className="bg-white p-[2px] mt-1 mb-2 "></div>

            <div className="flex flex-wrap overflow-wrap">
              {Education.map((item, index) => (
                <div key={index}>
                  <p className="text-sm overflow-wrap ">
                    {item.degree}
                    {""}
                    <light>
                      {" "}
                      {new Date(item.graduationDate).getFullYear()}
                    </light>
                  </p>
                  <p className="text-sm  overflow-wrap">{item.fieldOfStudy}</p>
                  <b className="text-sm  overflow-wrap">{item.institution}</b>
                </div>
              ))}
            </div>
          </div>
          {/* 4th part */}
          <div className="w-auto h-auto text-left text-white overflow-hidden  flex flex-col ">
            <div className="flex items-center text-white">
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
                  d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                />
              </svg>

              <p className="uppercase">&nbsp;Skills</p>
            </div>
            <div className="bg-white p-[2px] mt-2 mb-2"></div>
            <div>
              {Skills.map((item, index) => (
                <div key={index}>
                  <p className="text-lg">
                    {index + 1}. {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* 5th part*/}
          <div className="w-auto h-auto text-left text-white overflow-hidden  flex flex-col ">
            <div className="flex items-center text-white">
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
                  d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                />
              </svg>

              <p className="uppercase">&nbsp;Languages</p>
            </div>
            <div className="bg-white p-[2px] mt-1 mb-2"></div>
            <div>
              {Languages.map((item, index) => (
                <div key={index}>
                  <p className="text-sm">
                    {index + 1}. {item.name} ({item.proficiency})
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Information - grid-right */}

        <div className="bg-white text-left text-gray-800  w-full h-auto flex flex-col justify-center overflow-hidden">
          {/* First Part */}
          <div className=" h-auto px-4 py-2 text-black justify-center  ">
            <p className="text-4xl text-[#0675c1] uppercase mt-10 ">
              {safeUserInfo.name}
            </p>
          </div>
          {/* 2nd Part Summary*/}
          <div className=" flex-none h-auto px-4 py-2">
            <div className="flex items-center text-black">
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
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <p className="uppercase">&nbsp;Summary</p>
            </div>
            <div className="bg-[#0675c1] p-[2px] mt-1 mb-2"></div>
            <p className="">
              {/* As a highly motivated and creative UI/UX Designer, I am passionate
              about creating impactful and user-centric designs that elevate the
              digital experience. With a strong background in design principles
              and a keen eye for detail, I am dedicated to delivering intuitive
              and visually stunning interfaces that engage users and drive
              business objectives. */}
              {safeUserCV?.summary}
            </p>
          </div>
          {/* 3rd Part */}
          <div className="flex-col h-auto px-4 py-2">
            <div className="flex items-center text-black">
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

              <p className="uppercase">&nbsp;Education</p>
            </div>
            <div className="bg-[#0675c1] p-[2px] mt-1 mb-2"></div>
            <div className="flex flex-col overflow-wrap">
              {Education.map((item, index) => (
                <div key={index}>
                  <p className="text-md overflow-wrap ">
                    {index + 1}.{item.degree}{" "}
                    <light>{new Date(item.graduationDate).getFullYear()}</light>
                  </p>
                  <p className="text-md  overflow-wrap">{item.fieldOfStudy}</p>
                  <b className="text-md  overflow-wrap">{item.institution}</b>
                </div>
              ))}
              <br></br>
            </div>
          </div>
          {/* 3rd Part */}
          <div className="flex-none h-auto px-4 py-2">
            <div className="flex items-center text-black">
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
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>

              <p className="uppercase">&nbsp;Experiences</p>
            </div>
            <div className="bg-[#0675c1] p-[2px] mt-1 mb-2"></div>
            <div>
              {WorkExperience.map((item, index) => (
                <div key={index}>
                  <light>
                    {new Date(item.startDate).getFullYear()} -{" "}
                    <light>{new Date(item.endDate).getFullYear()}</light>
                  </light>
                  <p>
                    {item.company} (<b>{item.position}</b>)
                  </p>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
              <br />
            </div>
          </div>
          {/* 4th Part */}
          <div className="flex-none h-auto px-4 py-2">
            <div className="flex items-center text-black">
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
                  d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 0 1-.657.643 48.39 48.39 0 0 1-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 0 1-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 0 0-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 0 1-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 0 0 .657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 0 1-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 0 0 5.427-.63 48.05 48.05 0 0 0 .582-4.717.532.532 0 0 0-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 0 0 .658-.663 48.422 48.422 0 0 0-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 0 1-.61-.58v0Z"
                />
              </svg>

              <p className="uppercase">&nbsp;Projects</p>
            </div>
            <div className="bg-[#0675c1] p-[2px] mt-1 mb-2"></div>
            <div>
              {Projects.map((item, index) => (
                <div key={index}>
                  <light>
                    {new Date(item.startDate).getFullYear()} -{" "}
                    <light>{new Date(item.endDate).getFullYear()}</light>
                  </light>
                  <p>{item.name}</p>
                  <p className="text-sm">{item.url}</p>
                  <p className="text-sm">{item.description}</p>
                </div>
              ))}
              <br />
            </div>
          </div>

          <div className="flex-none h-auto px-4 py-2">
            <div className="flex items-center text-black">
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

              <p className="uppercase">&nbsp;Certifications</p>
            </div>
            <div className="bg-[#0675c1] p-[2px] mt-1 mb-2"></div>
            <div>
              {Certifications.map((item, index) => (
                <div key={index}>
                  <p>
                    {new Date(item.issueDate).getFullYear()} {item.name}-{" "}
                    {item.issuer}
                  </p>
                </div>
              ))}
              <br />
            </div>
          </div>
          <div className="flex-none h-auto px-4 py-2">
            <div className="flex items-center text-black">
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
                  d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                />
              </svg>

              <p className="uppercase">&nbsp;References</p>
            </div>
            <div className="bg-[#0675c1] p-[2px] mt-1 mb-2"></div>
            <div>
              {References.map((item, index) => (
                <div key={index}>
                  <p>{item.name}</p>
                  <p>
                    {item.company} (<b>{item.position}</b>)
                  </p>
                  <light className="text-sm">
                    <p>Email:{item.email} </p> <p>Phone:{item.phone}</p>
                  </light>
                </div>
              ))}
              <br></br>
            </div>
          </div>
        </div>
      </div>

      {/*BOSS 
          /\   
      //`-||-'\\ 
     (| -=||=- |)
      \\,-||-.// 
        ` ||  '  
          ||     
          ||     
          ||     
          ||     
          ||     
          ()
     SHAHRIAR RATUL
        STUFF*/}
    </div>
  );
};

export default UserCV;
