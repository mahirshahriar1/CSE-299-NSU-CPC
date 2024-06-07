import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export default function Account() {
  const { password, setPassword } = useContext(StepperContext);
  const { confirmPassword, setConfirmPassword } = useContext(StepperContext);
  const { phone, setPhone } = useContext(StepperContext);
  const { currentPosition, setCurrentPosition } = useContext(StepperContext);
  const { companyName, setCompanyName } = useContext(StepperContext);
  const { companyAddress, setCompanyAddress } = useContext(StepperContext);
  const { companyWebsite, setCompanyWebsite } = useContext(StepperContext);
  const { remark, setRemark } = useContext(StepperContext);
  const { setProfilePicture } = useContext(StepperContext);

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
          Current Position{" "}
          <p className="text-red-500 text-sm inline">
            {formError2["currentPosition"]}
          </p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey2("currentPosition", "");
              setCurrentPosition(e.target.value);
            }}
            value={currentPosition || ""}
            placeholder="Enter your Current Position"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError2["currentPosition"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Company Name{" "}
          <p className="text-red-500 text-sm inline">
            {formError2["companyName"]}
          </p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey2("companyName", "");
              setCompanyName(e.target.value);
            }}
            value={companyName || ""}
            placeholder="Enter your Company Name"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError2["companyName"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Company Address{" "}
          <p className="text-red-500 text-sm inline">
            {formError2["companyAddress"]}
          </p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey2("companyAddress", "");
              setCompanyAddress(e.target.value);
            }}
            value={companyAddress || ""}
            placeholder="Enter your Company Address"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError2["companyAddress"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Company Website{" "}
          <p className="text-red-500 text-sm inline">
            {formError2["companyWebsite"]}
          </p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey2("companyWebsite", "");
              setCompanyWebsite(e.target.value);
            }}
            value={companyWebsite || ""}
            placeholder="Enter your Company Website"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError2["companyWebsite"] === ""
                ? "border-gray-100"
                : "border-red-400"
            }`}
          />
        </div>
      </div>

      <div className="w-full mx-2 flex-1">
        <label className="text-lg font-medium">
          Remark{" "}
          <p className="text-red-500 text-sm inline">{formError2["remark"]}</p>
        </label>
        <div>
          <input
            onChange={(e) => {
              updateKey2("remark", "");
              setRemark(e.target.value);
            }}
            value={remark || ""}
            placeholder="Enter your Remark"
            className={`w-full border-2 rounded-xl p-4 mt-1 bg-transparent ${
              formError2["remark"] === "" ? "border-gray-100" : "border-red-400"
            }`}
          />
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
    </div>
  );
}
