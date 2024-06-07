import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import UserCV from "./UserCV";
import "./style.css";

const ViewCV = () => {

  const email = window.location.href.split("/").pop();
  const cvId = window.location.href.split("/").slice(-2)[0];
  console.log(email, cvId);
  const [userCV, setUserCV] = useState({
    address: "", certifications: [], education: [], email: "", github: "",
    hobbies: [], languages: [], linkedin: "", name: "", nsu_email: "", nsu_id: "",
    phone: "", projects: [], references: [], skills: [], summary: "", workExperience: []
  });

  const [userInfo, setUserInfo] = useState({
    name: "", email: "", nsu_id: "", school: "", department: "", phone: "",
    status: "", picture: "", CV: "", cgpa: "", credits: ""
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {       

        const [cvResponse, infoResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API_URL}/users/getCV/${cvId}`),
          axios.get(`${process.env.REACT_APP_API_URL}/users/getInfo/${email}`)
        ]);

        setUserCV(cvResponse.data);
        setUserInfo(infoResponse.data);
        console.log(infoResponse.data);
      } catch (error) {
        console.error("Failed to fetch data:", error.message);
      }
    };

    fetchUserDetails();
  }, [email, cvId]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <button onClick={handlePrint} className="m-4 w-[820px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        id="hideArea"
      >
        Print CV </button>
      <div className="card bg-white border-4 border-gray-200 rounded-box  w-[820px] p-2" id="printableArea" >
        <UserContext.Provider value={{ userInfo, userCV }}>
          <UserCV />
        </UserContext.Provider>
      </div>
    </div>
  );
};

export default ViewCV;

