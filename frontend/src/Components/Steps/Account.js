import { useContext, useEffect } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import { useState } from "react";

export default function Account() {
  const { name, setName } = useContext(StepperContext);
  const { status, setStatus } = useContext(StepperContext);
  const { nsuID, setNsuID } = useContext(StepperContext);
  const { email, setEmail } = useContext(StepperContext);
  const { formError1, updateKey1 } = useContext(StepperContext);

  function isIntegerString(str) {
    // Regular expression pattern to match an integer
    // ^ indicates the start of the string, $ indicates the end
    // \d+ matches one or more digits
    const integerPattern = /^\d+$/;

    // Test if the string matches the integer pattern
    return integerPattern.test(str);
  }

  const [namedisable, setNameDisable] = useState(false);
  const [idDisable, setIdDisable] = useState(false);
  const [emailDisable, setEmailDisable] = useState(false);
  useEffect(() => {
    // localStorage.getItem("userInfo");
    let _name = JSON.parse(localStorage.getItem("userInfo"))?.name;
    let _email = JSON.parse(localStorage.getItem("userInfo"))?.email;

    let _nsuID = _name?.split(" ").pop();
    if (_nsuID) {
      setNsuID(_nsuID);
      updateKey1("nsuID", "");
      setIdDisable(true);
    }
    if (_name) {     
      _name = _name.replace(/[^a-zA-Z ]/g, "");
      setName(_name);
      updateKey1("name", "");
      setNameDisable(true);
    }
    if (_email) {
      updateKey1("email", "");
      setEmail(_email);
      setEmailDisable(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Full Name{" "}
          <p className="text-red-500 text-sm inline">{formError1["name"]}</p>
        </label>
        <div>
          <input
            disabled={namedisable}
            onChange={(e) => {
              updateKey1("name", "");
              setName(e.target.value);
            }}
            value={name || ""}
            placeholder="Enter your Full Name"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError1["name"] === "" ? "border-gray-100" : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Student Status{" "}
          <p className="text-red-500 text-sm inline">{formError1["status"]}</p>
        </label>
        <div className="form-control">
          <div className="input-group">
            <select
              className={`select select-bordered w-full border-2 rounded-xl mt-1 bg-transparent ${
                formError1["status"] === ""
                  ? "border-gray-100"
                  : "border-red-400"
              }`}
              value={status || ""}
              onChange={(e) => {
                updateKey1("status", "");
                setStatus(e.target.value);
              }}
            >
              <option value="" disabled>
                Select Status
              </option>
              <option value="CS">Current Student</option>
              <option value="A">Alumni</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          NSU ID{" "}
          <p className="text-red-500 text-sm inline">{formError1["nsuID"]}</p>
        </label>
        <div>
          <input
            disabled={idDisable}
            onChange={(e) => {
              if (e.target.value.length === 0) setNsuID("");
              else if (isIntegerString(e.target.value)) {
                setNsuID(e.target.value);
                updateKey1("nsuID", "");
              }
            }}
            value={nsuID || ""}
            placeholder="Enter your Student ID"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError1["nsuID"] === "" ? "border-gray-100" : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          NSU Email{" "}
          <p className="text-red-500 text-sm inline">{formError1["email"]}</p>
        </label>
        <div>
          <input
            disabled={emailDisable}
            onChange={(e) => {
              updateKey1("email", "");
              setEmail(e.target.value);
            }}
            value={email || ""}
            placeholder="Enter your NSU Email"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError1["email"] === "" ? "border-gray-100" : "border-red-400"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
