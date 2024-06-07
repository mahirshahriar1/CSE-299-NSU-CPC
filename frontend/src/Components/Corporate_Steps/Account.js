import { useContext, useEffect, useState } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export default function Account() {
  const { personName, setPersonName } = useContext(StepperContext);
  const { workEmail, setWorkEmail } = useContext(StepperContext);
  const { isAlumni, setIsAlumni } = useContext(StepperContext);
  const { linkedIn, setLinkedIn } = useContext(StepperContext);
  const { formError1, updateKey1 } = useContext(StepperContext);

  const [emailDisable, setEmailDisable] = useState(false);
  useEffect(() => {
    let _name = JSON.parse(localStorage.getItem("userInfo"))?.name;
    let _email = JSON.parse(localStorage.getItem("userInfo"))?.email;
    if (_name) {
      _name = _name.replace(/[^a-zA-Z ]/g, "");
      setPersonName(_name);
      updateKey1("name", "");
    }
    if (_email) {
      updateKey1("email", "");
      setWorkEmail(_email);
      setEmailDisable(true);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Full Name{" "}
          <p className="text-red-500 text-sm inline">
            {formError1["personName"]}
          </p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey1("personName", "");
              setPersonName(e.target.value);
            }}
            value={personName || ""}
            placeholder="Enter your Full Name"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError1["personName"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Work Email{" "}
          <p className="text-red-500 text-sm inline">
            {formError1["workEmail"]}
          </p>
        </label>
        <div>
          <input
            disabled={emailDisable}
            onChange={(e) => {
              updateKey1("workEmail", "");
              setWorkEmail(e.target.value);
            }}
            value={workEmail || ""}
            placeholder="Enter your work email"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError1["workEmail"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          LinkedIn Profile Link{" "}
          <p className="text-red-500 text-sm inline">
            {formError1["linkedIn"]}
          </p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey1("linkedIn", "");
              setLinkedIn(e.target.value);
            }}
            value={linkedIn || ""}
            placeholder="Enter your LinkedIn Profile Link"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError1["linkedIn"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Student Status{" "}
          <p className="text-red-500 text-sm inline">
            {formError1["isAlumni"]}
          </p>
        </label>
        <div className="form-control">
          <div className="input-group">
            <select
              className={`select select-bordered w-full border-2 rounded-xl mt-1 bg-transparent ${
                formError1["isAlumni"] === ""
                  ? "border-gray-100"
                  : "border-red-400"
              }`}
              value={isAlumni}
              onChange={(e) => {
                updateKey1("isAlumni", "");
                setIsAlumni(e.target.value);
              }}
            >
              <option value="" disabled>
                Are you an Alumni?
              </option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
