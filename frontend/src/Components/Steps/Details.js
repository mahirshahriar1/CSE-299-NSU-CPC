import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export default function Account() {
  const { password, setPassword } = useContext(StepperContext);
  const { school, setSchool } = useContext(StepperContext);
  const { department, setDepartment } = useContext(StepperContext);
  const { phone, setPhone } = useContext(StepperContext);
  const { setProfilePicture } = useContext(StepperContext);
  const { confirmPassword, setConfirmPassword } = useContext(StepperContext);
  const { formError2, updateKey2 } = useContext(StepperContext);

  function isIntegerString(str) {
    // Regular expression pattern to match an integer
    // ^ indicates the start of the string, $ indicates the end
    // \d+ matches one or more digits
    const integerPattern = /^\d+$/;

    // Test if the string matches the integer pattern
    return integerPattern.test(str);
  }

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Password{" "}
          <p className="text-red-500 text-sm inline">
            {formError2["password"]}
          </p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey2("password", "");
              setPassword(e.target.value);
            }}
            value={password || ""}
            type="password"
            placeholder="Enter your password"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError2["password"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Confirm Password{" "}
          <p className="text-red-500 text-sm inline">
            {formError2["confirmPassword"]}
          </p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey2("confirmPassword", "");
              setConfirmPassword(e.target.value);
            }}
            value={confirmPassword || ""}
            type="password"
            placeholder="Enter your password again"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError2["confirmPassword"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          School{" "}
          <p className="text-red-500 text-sm inline">{formError2["school"]}</p>
        </label>
        <div className="form-control">
          <div className="input-group">
            <select
              className={`select select-bordered w-full border-2 rounded-xl mt-1 bg-transparent ${
                formError2["school"] === ""
                  ? "border-gray-100"
                  : "border-red-400"
              }`}
              value={school || ""}
              onChange={(e) => {
                updateKey2("school", "");
                setSchool(e.target.value);
              }}
            >
              <option value="" disabled>
                Select a school
              </option>
              <option value="SBE">School of Business & Economics (SBE)</option>
              <option value="SEPS">
                School of Engineering & Physical Sciences (SEPS)
              </option>
              <option value="SHLS">
                School of Health & Life Sciences (SHLS)
              </option>
              <option value="SHSS">
                School of Humanities & Social Sciences (SHSS)
              </option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Department{" "}
          <p className="text-red-500 text-sm inline">
            {formError2["department"]}
          </p>
        </label>
        <div className="form-control">
          <div className="input-group">
            <select
              className={`select select-bordered w-full border-2 rounded-xl mt-1 bg-transparent ${
                formError2["department"] === ""
                  ? "border-gray-100"
                  : "border-red-400"
              }`}
              value={department || ""}
              onChange={(e) => {
                updateKey2("department", "");
                setDepartment(e.target.value);
              }}
            >
              <option value="" disabled>
                Select a department
              </option>
              <option value="ECE">
                Department of Electrical & Computer Engineering (ECE)
              </option>

              <option value="CEE">
                Department of Civil & Environmental Engineering (CEE)
              </option>
              <option value="DMP">
                Department of Mathematics and Physics (DMP)
              </option>
              <option value="BMD">
                Department of Biochemistry and Microbiology (BMD)
              </option>

              <option value="ESM">
                Department of Environmental Science & Management (ESM)
              </option>
              <option value="PHARM">
                Department of Pharmaceutical Sciences
              </option>
              <option value="ARCH">Department of Architecture</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Phone Number{" "}
          <p className="text-red-500 text-sm inline">{formError2["phone"]}</p>
        </label>
        <div>
          <input
            onChange={(e) => {
              if (e.target.value.length === 0) setPhone("");
              else if (isIntegerString(e.target.value)) {
                setPhone(e.target.value);
                updateKey2("phone", "");
              }
            }}
            value={phone || ""}
            placeholder="Enter your Phone Number"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError2["phone"] === "" ? "border-gray-100" : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Profile Picture{" "}
          <p className="text-red-500 text-sm inline">
            {formError2["profilePicture"]}
          </p>
        </label>
        <div>
          <input
            type="file"
            accept="image/*"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent cursor-pointer ${
              formError2["profilePicture"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
            placeholder="Upload your Profile Picture"
            onChange={(e) => {
              updateKey2("profilePicture", "");
              setProfilePicture(e.target.files[0]);
            }}
          />
        </div>
      </div>
    </div>
  );
}
