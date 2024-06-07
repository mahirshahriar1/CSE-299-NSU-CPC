import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../../../Spinner";
import TopNav from "../../../TopNav";
import { UserContext } from "../../../../contexts/UserContext";

function EditJob() {
  const { userInfo } = useContext(UserContext);
  let { jobId } = useParams();
  let navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState({
    positionName: "",
    companyName: "",
    jobLocation: "",
    cgpaRequirement: "",
    salary: "",
    category: "",
    jobType: "",
    requiredExperience: "",
    preferredProgram: "",
    jobContext: "",
    jobResponsibilities: "",
    additionalRequirement: "",
    needCV: false,
    otherBenefits: "",
    additionalRemarks: "",
    applicationProcedure: "",
    tags: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/jobs/view?jobId=${jobId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch job details");
        }
        const data = await response.json();
        setJobDetails(data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const corporateId = JSON.parse(localStorage.getItem("userInfo"))._id;
    // console.log(corporateId);
    // console.log(jobDetails);
    console.log(jobDetails);
    try {
      console.log(JSON.stringify(jobDetails));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/jobs/update?jobId=${jobId}&corporateId=${corporateId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userInfo.token}`,
          },
          body: JSON.stringify(jobDetails),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to update job details");
      }
      navigate("/job-board");
    } catch (error) {
      console.error("Error updating job details:", error);
      setError("Failed to update job details.");
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  const ignoreKeys = [
    "createdAt",
    "updatedAt",
    "__v",
    "_id",
    "corporate",
    "tags",
    "admin_approval",
    "picture",
  ];
  const handleTagsChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleAddTag = () => {
    if (tagInput && !jobDetails.tags.includes(tagInput)) {
      setJobDetails({
        ...jobDetails,
        tags: [...jobDetails.tags, tagInput],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setJobDetails({
      ...jobDetails,
      tags: jobDetails.tags.filter((tag) => tag !== tagToRemove),
    });
  };
  console.log(jobDetails);

  return (
    <div className="flex flex-col bg-gray-300 justify-center">
      <UserContext.Provider value={{ userInfo }}>
        <TopNav />
      </UserContext.Provider>

      <div className="h-full w-full bg-[#ecf0f3] p-10 flex justify-center">
        <div className="container w-1/2 bg-[#ecf0f3] rounded-[40px] shadow-[13px_13px_20px_rgba(203,206,209,1)] mr-4">
          <div className="w-full h-full pt-[60px] pr-[35px] pb-[35px] pl-[35px] rounded-[40px] shadow-[-13px_-13px_20px_rgba(255,255,255,1)]">
            <h2 className="text-5xl font-bold mb-6 text-center">
              Edit Job Details
            </h2>

            <form
              onSubmit={handleSubmit}
              className="form-control w-full max-w-4xl mx-auto"
            >
              {/* Input fields in a wider two-column layout */}
              {Object.entries(jobDetails).map(([key, value]) => {
                if (ignoreKeys.includes(key)) {
                  return null;
                }
                return (
                  <div className="w-full mx-2 mt-5 flex-1" key={key}>
                    <label className="text-lg font-medium">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </label>

                    {key === "deadline" ? (
                      <div className="mt-1 rounded-[25px] shadow-[inset_-8px_-8px_8px_rgba(255,255,255,1)]">
                        <input
                          name={key}
                          value={value ? value.split("T")[0] : ""}
                          onChange={handleChange}
                          type="date"
                          className={
                            "w-full p-4 bg-transparent text-gray-700 rounded-[25px] shadow-[inset_8px_8px_8px_rgba(203,206,209,1)]"
                          }
                        />
                      </div>
                    ) : key === "status" ? (
                      <div className="h-full mt-1 rounded-[25px] shadow-[inset_-8px_-8px_8px_rgba(255,255,255,1)]">
                        <select
                          name={key}
                          value={value}
                          onChange={handleChange}
                          className={
                            "select w-full h-[58px] p-4 bg-transparent text-gray-700 rounded-[25px] shadow-[inset_8px_8px_8px_rgba(203,206,209,1)]"
                          }
                        >
                          <option value="active">Active</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    ) : key === "needCV" ? (
                      <div className="h-full mt-1 rounded-[25px] shadow-[inset_-8px_-8px_8px_rgba(255,255,255,1)]">
                        <select
                          name={key}
                          value={value}
                          onChange={(e) => {
                            setJobDetails({
                              ...jobDetails,
                              needCV: e.target.value === "true" ? true : false,
                            });
                          }}
                          className={
                            "select w-full h-[58px] p-4 bg-transparent text-gray-700 rounded-[25px] shadow-[inset_8px_8px_8px_rgba(203,206,209,1)]"
                          }
                        >
                          <option value={true}>Yes</option>
                          <option value={false}>No</option>
                        </select>
                      </div>
                    ) : (
                      <div className="mt-1 rounded-[25px] shadow-[inset_-8px_-8px_8px_rgba(255,255,255,1)]">
                        <input
                          name={key}
                          value={value}
                          onChange={handleChange}
                          type="text"
                          className={
                            "w-full p-4 bg-transparent text-gray-700 rounded-[25px] shadow-[inset_8px_8px_8px_rgba(203,206,209,1)]"
                          }
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="w-full mx-2 mt-5 flex-1 flex-col">
                <label className="text-lg font-medium">Tags</label>

                <div className="flex items-center w-full">
                  <div className="mt-1 rounded-[25px] shadow-[inset_-8px_-8px_8px_rgba(255,255,255,1)]">
                    <input
                      placeholder="Add a tag"
                      value={tagInput}
                      onChange={handleTagsChange}
                      type="text"
                      className="w-full p-4 bg-transparent text-gray-700 rounded-[25px] shadow-[inset_8px_8px_8px_rgba(203,206,209,1)]"
                    />
                  </div>

                  <div className="ml-3 rounded-full shadow-[13px_13px_20px_rgba(203,206,209,1)]">
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="bg-blue-400 hover:bg-blue-600 border-2 border-blue-600 text-white text-xl text-center 
                      flex items-center justify-center h-[50px] w-[50px] rounded-full shadow-[-13px_-13px_20px_rgba(255,255,255,1)]"
                    >
                      &#43;
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mt-2">
                  {jobDetails.tags.map((tag) => (
                    <div
                      key={tag}
                      onClick={() => handleRemoveTag(tag)}
                      className="mt-1 h-10 rounded-[15px] shadow-[13px_13px_20px_rgba(203,206,209,1)] bg-orange-200"
                    >
                      <p className="w-full h-10 p-4 bg-transparent text-gray-700 rounded-[15px] shadow-[0.5rem_0.5rem_gray] border-2 border-black flex items-center">
                        {tag}{" "}
                        <span className="text-red-500 font-extrabold">
                          &nbsp;&nbsp;&#215;
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center mt-5 h-[60px] rounded-[60px] shadow-[-3px_-3px_8px_rgba(255,255,255,1)]">
                <button
                  type="submit"
                  className="bg-[#24cfaa] btn-block py-2 px-4 transition duration-500 ease-in-out
                flex items-center justify-center h-full rounded-[60px] text-white text-xl font-bold
                shadow-[3px_3px_8px_rgba(177,177,177,1)] hover:bg-[#1da88a] active:bg-[#1da88a] 
                border-2 border-green-600 active:border-0"
                >
                  Update Job
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditJob;
