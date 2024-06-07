import React, { useContext, useEffect, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import app from "../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";
import { UserContext } from "../../contexts/UserContext";
import TopNav from "../TopNav";
import Spinner from "../Spinner";
const EditUserProfile = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [cvFile, setCvFile] = useState(null);
  const [cvDownloadURL, setCVDownloadURL] = useState("");
  const [pictureDownloadURL, setPictureDownloadURL] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    userInfo,
    setUserInfo,
    percent,
    appliedJobs,
    setAppliedJobs,
    updateUserInfo,
  } = useContext(UserContext);
  console.log("User Info: ", userInfo);
  function getAppliedJobsCount() {
    let studentId = JSON.parse(localStorage.getItem("userInfo"))?._id;
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/applyjob/countMyJobs?studentId=${studentId}`
      )
      .then((res) => {
        setAppliedJobs(res.data);
      })
      .catch((error) => {
        console.error("Failed to get applied jobs:", error.message);
      });
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteFile = (filePath) => {
    const storage = getStorage(app);
    console.log("File Path: ", filePath);
    const fileRef = ref(storage, filePath);
    deleteObject(fileRef)
      .then(() => {
        console.log("File deleted successfully");
        // Update component state or notify user
      })
      .catch((error) => {
        console.error("Error removing file: ", error);
        // Handle errors here
      });
  };
  const uploadFile = (fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "image" ? "userpfp" : "userfiles";
    const fileName =
      new Date().getTime() +
      (folder === "userpfp" ? pictureFile.name : cvFile.name);
    const storageRef = ref(storage, `${folder}/${fileName}`);
    const file = fileType === "image" ? pictureFile : cvFile;
    const uploadTask = uploadBytesResumable(storageRef, file);
    setLoading(true);
    console.log(loading);
    uploadTask.on(  
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("CV Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("CV Upload is paused");
            break;
          case "running":
            console.log("CV Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the CV upload
            break;
          // Handle other CV upload errors...
          default:
            break;
        }
      },
      () => {
        if (fileType === "image" && userInfo.picture !== "") {
          handleDeleteFile(userInfo.picture);
        }
        if (fileType === "cv" && userInfo.CV !== undefined) {
          console.log("CV: ", userInfo.CV);
          handleDeleteFile(userInfo.CV);
        }
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("CV available at", downloadURL);
          if (fileType === "image") {
            setPictureDownloadURL(downloadURL);
            // console.log("Picture Download URL: ", downloadURL);
            setUserInfo({ ...userInfo, picture: downloadURL });
          }
          if (fileType === "cv") {
            setCVDownloadURL(downloadURL);
            setUserInfo({ ...userInfo, CV: downloadURL });
          }
        });

        setLoading(false);
      }
    );
  };

  const handleCVSubmit = (event) => {
    event.preventDefault();
    if (!cvFile) {
      alert("Please select a CV file.");
      return;
    }
    uploadFile("cv");
  };
  const handlePictureSubmit = (event) => {
    event.preventDefault();
    if (!pictureFile) {
      alert("Please select a picture file.");
      return;
    }
    uploadFile("image");
  };
  const [pictureFile, setPictureFile] = useState(null);
  const updateCV = async (userData) => {
    // console.log("User Data: ", userData);
    try {
      // "http://localhost:5000/users/uploadCV",
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/uploadCV`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating CV:", error);
      throw new Error("Failed to update CV. Please try again.");
    }
  };

  const handleCVUpload = async () => {
    if (cvDownloadURL === "") {
      alert("Please select a CV file and make sure user data is available.");
      return;
    }

    try {
      // eslint-disable-next-line
      const updatedUserData = await updateCV({
        email: JSON.parse(localStorage.getItem("userInfo")).email,
        CV: cvDownloadURL,
      });

      // console.log('CV updated successfully:', updatedUserData);
      alert("CV updated successfully.");
      updateUserInfo(updatedUserData);
    } catch (error) {
      // Handle error, show error message, etc.
      console.error("Failed to update CV:", error.message);
    }
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo._id) {
      throw new Error("User information not found or invalid.");
    }
    try {
      // eslint-disable-next-line
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/changePassword`,
        {
          email: userInfo.email,
          oldPassword: oldPassword,
          newPassword: newPassword,
        }
      );
      // const userData = response.data;
      // console.log("User Data: ", userData);
      alert("Password Changed Successfully");
    } catch (error) {
      console.error("Failed to change password:", error.message);
    }
  };

  // You can use this function to get the percentage of the user's profile completion
  // eslint-disable-next-line
  const getPercentage = async () => {
    try {
      let _email = JSON.parse(localStorage.getItem("userInfo")).email;
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/users/getPercent?email=${_email}`
      );
      return response.data;
      // console.log(response.data);
    } catch (error) {
      console.error("Failed to get percentage:", error.message);
    }
  };

  const updateInfo = async () => {
    console.log("User Info: ", userInfo);
    try {
      // "http://localhost:5000/users/update",
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/users/update`,
        userInfo
      );
      alert("User Info Updated Successfully");
      // append to userInfo
      updateUserInfo(userInfo);

      return response.data;
    } catch (error) {
      console.error("Error updating user info:", error);
      throw new Error("Failed to update user info. Please try again.");
    }
  };

  const navigate = useNavigate();
  useEffect(() => {
    getAppliedJobsCount();
    if (!localStorage.getItem("userInfo")) {
      //alert("Please login to view this page.");
      navigate("/login");
    }
    if (cvDownloadURL !== "") {
      // console.log("CV Download URL: ", cvDownloadURL);
      handleCVUpload();
      setCVDownloadURL("");
    }
    if (pictureDownloadURL !== "") {
      // console.log("Picture Download URL: ", pictureDownloadURL);
      setUserInfo({ ...userInfo, picture: pictureDownloadURL });
      updateInfo();
      setPictureDownloadURL("");
    }
    // eslint-disable-next-line
  }, [cvDownloadURL, pictureDownloadURL]);


  return (
    <div className="flex">
      {/* First Card */}
      <UserContext.Provider value={{ userInfo, percent, appliedJobs }}>
        <NavBar />
      </UserContext.Provider>
      
      <div className="main bg-gray-100 flex-grow">
        <UserContext.Provider value={{ userInfo }}>
          <TopNav />
        </UserContext.Provider>
        <hr></hr>
        {loading && <Spinner />}
        <div className="w-full max-w-3xl mx-auto my-4 flex-col items-center justify-center shadow-xl rounded-3xl p-2 bg-white">
          <div className="flex justify-between m-4 text-teal-600">
            <button
              className={`py-2 px-4 rounded-lg transition duration-500 ease-in-out 
              border-2 border-gray-300
              flex items-center justify-center ${
                activeTab === "general"
                  ? "bg-green-600 text-white font-bold border border-green-600"
                  : ""
              }`}
              onClick={() => handleTabClick("general")}
            >
              General Info
            </button>

            <button
              className={`py-2 px-4 rounded-lg transition duration-500 ease-in-out 
              border-2 border-gray-300
              flex items-center justify-center ${
                activeTab === "changePassword"
                  ? "bg-green-600 text-white font-bold border border-green-600"
                  : ""
              }`}
              onClick={() => handleTabClick("changePassword")}
            >
              Change Password
            </button>

            <button
              className={`py-2 px-4 rounded-lg transition duration-500 ease-in-out 
              border-2 border-gray-300
              flex items-center justify-center ${
                activeTab === "updateInfo"
                  ? "bg-green-600 text-white font-bold border border-green-600"
                  : ""
              }`}
              onClick={() => handleTabClick("updateInfo")}
            >
              Update Info
            </button>

            <button
              className={`py-2 px-4 rounded-lg transition duration-500 ease-in-out 
              border-2 border-gray-300
              flex items-center justify-center ${
                activeTab === "updateCV"
                  ? "bg-green-600 text-white font-bold border border-green-600"
                  : ""
              }`}
              onClick={() => handleTabClick("updateCV")}
            >
              Update CV
            </button>
            <button
              className={`py-2 px-4 rounded-lg transition duration-500 ease-in-out 
              border-2 border-gray-300
              flex items-center justify-center ${
                activeTab === "updatePicture"
                  ? "bg-green-600 text-white font-bold border border-green-600"
                  : ""
              }`}
              onClick={() => handleTabClick("updatePicture")}
            >
              Update Picture
            </button>
          </div>

          <div className="p-4">
            {activeTab === "general" && (
              <div className="flex justify-between">
                <div className="w-1/2">
                  {/* percentage */}
                  <p className="mb-2 text-lg font-medium">
                    Profile Completion: {percent}%
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Name: {userInfo.name}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Email: {userInfo.email}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    NSU ID: {userInfo.nsu_id}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    School: {userInfo.school}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Department: {userInfo.department}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Phone: {userInfo.phone}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Status: {userInfo.status}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    CGPA : {userInfo.cgpa}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Credits Completed : {userInfo.credits}
                  </p>
                </div>
                <div className="flex-col justify-start w-1/2">
                  <img
                    className="max-w-full h-auto object-contain"
                    src={userInfo.picture}
                    alt="user"
                  />
                </div>
              </div>
            )}

            {activeTab === "changePassword" && (
              <div className="flex-col">
                <div className="w-full mx-2 flex-1">
                  <label className="text-lg font-medium">Old Password</label>
                  <div>
                    <input
                      onChange={(e) => {
                        setOldPassword(e.target.value);
                      }}
                      type="password"
                      placeholder="Enter your old password"
                      className={
                        "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                      }
                    />
                  </div>
                </div>

                <div className="w-full mx-2 flex-1 mt-4">
                  <label className="text-lg font-medium">New Password</label>
                  <div>
                    <input
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                      type="password"
                      placeholder="Enter your new password"
                      className={
                        "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={changePassword}
                    className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl 
                  font-semibold cursor-pointer border-2 border-slate-300
                  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === "updateCV" && (
              <div>
                <form onSubmit={handleCVSubmit}>
                  <div className="flex-col">
                    <div className="w-full mx-2 flex-1">
                      <label className="text-lg font-medium">New CV(PDF)</label>
                      <div>
                        <input
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setCvFile(file);
                          }}
                          type="file"
                          accept=".pdf"
                          className={
                            "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                          }
                        />
                      </div>
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                        type="submit"
                        className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl 
                        font-semibold cursor-pointer border-2 border-slate-300
                      hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                      >
                        Upload CV
                      </button>
                    </div>
                  </div>

                  {userInfo.CV && (
                    <p className="mb-2">
                      Current CV:{" "}
                      <button
                        type="button"
                        onClick={() => window.open(userInfo.CV)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        View CV
                      </button>
                    </p>
                  )}
                </form>
              </div>
            )}

            {activeTab === "updatePicture" && (
              <div>
                <form onSubmit={handlePictureSubmit}>
                  {userInfo.picture && (
                    <p className="text-lg font-medium mx-2">
                      Current Picture: <img src={userInfo.picture} alt="user" />
                    </p>
                  )}
                  <div className="flex-col">
                    <div className="w-full mx-2 flex-1">
                      <label className="text-lg font-medium">New Picture</label>
                      <div>
                        <input
                          onChange={(e) => {
                            const file = e.target.files[0];
                            setPictureFile(file);
                          }}
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          className={
                            "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                          }
                        />
                      </div>
                    </div>

                    <div className="flex mx-2 justify-center mt-4">
                      <button
                        type="submit"
                        className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl 
                        font-semibold cursor-pointer border-2 border-slate-300
                      hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                      >
                        Upload Picture
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}

            {activeTab === "updateInfo" && (
              <div className="w-full mx-2 flex-1">
                <label className="text-lg font-medium">Name</label>
                <div>
                  <input
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, name: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter your name"
                    className={
                      "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                    }
                  />
                  <div />
                </div>

                <div className="w-full mx-2 flex-1 mt-4">
                  <label className="text-lg font-medium">School</label>
                  <div>
                    <input
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, school: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter your School name"
                      className={
                        "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                      }
                    />
                  </div>
                </div>

                <div className="w-full mx-2 flex-1 mt-4">
                  <label className="text-lg font-medium">Department</label>
                  <div>
                    <input
                      onChange={(e) => {
                        setUserInfo({
                          ...userInfo,
                          department: e.target.value,
                        });
                      }}
                      type="text"
                      placeholder="Enter your Department name"
                      className={
                        "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                      }
                    />
                  </div>
                </div>

                <div className="w-full mx-2 flex-1 mt-4">
                  <label className="text-lg font-medium">Phone</label>
                  <div>
                    <input
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, phone: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter your Phone Number"
                      className={
                        "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                      }
                    />
                  </div>
                </div>

                <div className="w-full mx-2 flex-1 mt-4">
                  <label className="text-lg font-medium">CGPA</label>
                  <div>
                    <input
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, cgpa: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter your Current CGPA"
                      className={
                        "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                      }
                    />
                  </div>
                </div>

                <div className="w-full mx-2 flex-1 mt-4">
                  <label className="text-lg font-medium">Credit Finished</label>
                  <div>
                    <input
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, credits: e.target.value });
                      }}
                      type="text"
                      placeholder="Enter your Credit Finished"
                      className={
                        "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-center mt-4">
                  <button
                    onClick={updateInfo}
                    className="bg-white text-slate-400 uppercase py-2 px-4 rounded-xl 
                    font-semibold cursor-pointer border-2 border-slate-300
                  hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                  >
                    Update Info
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserProfile;
