import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../../firebase";
import { UserContext } from "../../contexts/UserContext";
import NavBar from "../NavBar";
import TopNav from "../TopNav";

const UpdateUserForm = () => {
  const { userInfo, percent, loading, updateUserInfo, setUserInfo } =
    useContext(UserContext);
  const [pictureFile, setPictureFile] = useState(null);
  const [activeTab, setActiveTab] = useState("general");
  const [error, setError] = useState("");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleDeleteFile = (filePath) => {
    const storage = getStorage(app);
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
  const uploadFile = (file, fileType) => {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject("No file provided");
        return;
      }
      const storage = getStorage(app);
      const folder = "userpfp";
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, `${folder}/${fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(fileType + " Upload is " + progress + "% done");
        },
        (error) => {
          console.error("Error during file upload:", error);
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log(fileType + " available at", downloadURL);
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const changePassword = async () => {
    if (!userInfo?.workEmail || !oldPassword || !newPassword) {
      alert("Please fill in all fields");
      return;
    }

    const token = userInfo?.token;

    try {
      await axios.put(
        `${process.env.REACT_APP_API_URL}/corporate/changePassword`,
        {
          workEmail: userInfo?.workEmail,
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password Changed Successfully");
    } catch (error) {
      alert("Failed to change password");
      console.error("Failed to change password:", error.message);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedPictureUrl = userInfo.picture;

      if (pictureFile) {
        if (userInfo.picture) {
          try {
            await handleDeleteFile(userInfo.picture);
          } catch (error) {
            console.error("Failed to delete previous picture", error);
          }
        }
        updatedPictureUrl = await uploadFile(pictureFile, "image");
      }

      const updatedUserInfo = { ...userInfo, picture: updatedPictureUrl };

      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/corporate/updateUser`,
        updatedUserInfo
      );
      console.log(response);
      console.log(updatedPictureUrl);
      const _update_jobs = await axios.put(
        `${process.env.REACT_APP_API_URL}/jobs/updateImage`,
        {
          id: userInfo._id,
          imageUrl: updatedPictureUrl,
        }
      );
      console.log(_update_jobs);

      alert("User updated successfully");
      updateUserInfo(updatedUserInfo);

      // setUserInfo(updatedUserInfo)
    } catch (error) {
      console.error("Failed to update user:", error.message);
      setError(error.message);
    }
  };
  useEffect(() => {
    let isCorporate = userInfo?.userType === "corporate";
    let isAdmin = userInfo?.userType === "admin";
    if (!isCorporate && !isAdmin) {
      alert("You are not authorized to view this page");
      window.location.href = "/";
    }
  }, [userInfo]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      <NavBar />

      <div className="main bg-gray-100 flex-grow">
        <TopNav />
        <hr></hr>

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
                    Name: {userInfo?.name}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Status: {userInfo?.isAlumni ? "Alumni" : "Not Alumni"}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Email: {userInfo?.workEmail}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    LinkedIn: {userInfo?.linkedIn}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Current Position: {userInfo?.currentPosition}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Company Name: {userInfo?.companyName}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Company Address: {userInfo?.companyAddress}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Comapny Website : {userInfo?.companyWebsite}
                  </p>
                  <p className="mb-2 text-lg font-medium">
                    Remark : {userInfo?.remark}
                  </p>
                </div>

                <div className="flex-col justify-start w-1/2">
                  <img
                    className="max-w-full h-auto object-contain"
                    src={userInfo?.picture}
                    alt="user"
                  />
                </div>
              </div>
            )}

            {activeTab === "updateInfo" && (
              <div className="flex flex-col">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="alert alert-error shadow-lg mb-5">
                      {error}
                    </div>
                  )}

                  <div className="w-full mx-2 flex-1">
                    <label className="text-lg font-medium">Name</label>
                    <div>
                      <input
                        value={userInfo.personName}
                        onChange={handleChange}
                        type="text"
                        name="personName"
                        placeholder="Enter Your Name"
                        className={
                          "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full mt-4 mx-2 flex-1">
                    <label className="text-lg font-medium">Phone</label>
                    <div>
                      <input
                        value={userInfo.phone}
                        onChange={handleChange}
                        type="text"
                        name="phone"
                        placeholder="Enter Your Phone Number"
                        className={
                          "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full mt-4 mx-2 flex-1">
                    <label className="text-lg font-medium">LinkedIn</label>
                    <div>
                      <input
                        value={userInfo.linkedIn}
                        onChange={handleChange}
                        type="text"
                        name="linkedIn"
                        placeholder="Enter Your LinkedIn"
                        className={
                          "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full mt-4 mx-2 flex-1">
                    <label className="text-lg font-medium">
                      Current Position
                    </label>
                    <div>
                      <input
                        value={userInfo.currentPosition}
                        onChange={handleChange}
                        type="text"
                        name="currentPosition"
                        placeholder="Enter Your Current Position"
                        className={
                          "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full mt-4 mx-2 flex-1">
                    <label className="text-lg font-medium">Company Name</label>
                    <div>
                      <input
                        value={userInfo.companyName}
                        onChange={handleChange}
                        type="text"
                        name="companyName"
                        placeholder="Enter Your Company Name"
                        className={
                          "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full mt-4 mx-2 flex-1">
                    <label className="text-lg font-medium">
                      Company Address
                    </label>
                    <div>
                      <input
                        value={userInfo.companyAddress}
                        onChange={handleChange}
                        type="text"
                        name="companyAddress"
                        placeholder="Enter Your Company Address"
                        className={
                          "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full mt-4 mx-2 flex-1">
                    <label className="text-lg font-medium">
                      Company Website
                    </label>
                    <div>
                      <input
                        value={userInfo.companyWebsite}
                        onChange={handleChange}
                        type="text"
                        name="companyWebsite"
                        placeholder="Enter Your Company Website"
                        className={
                          "w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
                        }
                      />
                    </div>
                  </div>

                  <div className="w-full mt-4 mx-2 flex-1">
                    <label className="text-lg font-medium">Remark</label>
                    <div>
                      <input
                        value={userInfo.remark}
                        onChange={handleChange}
                        type="text"
                        name="remark"
                        placeholder="Enter Your Remark"
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
                      Update Info
                    </button>
                  </div>
                </form>
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

            {activeTab === "updatePicture" && (
              <div>
                <form onSubmit={handleSubmit}>
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
                          name="picture"
                          onChange={(e) => setPictureFile(e.target.files[0])}
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          className="w-full border-2 rounded-xl p-4 mt-1 bg-transparent"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserForm;
