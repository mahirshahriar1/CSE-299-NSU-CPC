import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Register = () => {
    const [name, setName] = useState("");
    const [nsuID, setNsuID] = useState("");
    const [school, setSchool] = useState("");
    const [department, setDepartment] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);

    const submitHandler = (e) => {
        if (phone.length !== 11) {
            setLoading(false);
            alert("Invalid phone number");
            return;
        }
        e.preventDefault();
        setLoading(true);
        uploadtodb();
    };

    const uploadtodb = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            console.log(JSON.parse(localStorage.getItem("userInfo"))._id);
            // "http://localhost:5000/users/update",
            const { data } = await axios.put(
                `${process.env.REACT_APP_API_URL}/users/update`,
                {
                    _id: JSON.parse(localStorage.getItem("userInfo"))._id,
                    name,
                    nsuID,
                    school,
                    department,
                    phone,
                },
                config
            );
            // console.log(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            setLoading(false);
            setName("");
            setNsuID("");
            setSchool("");
            setDepartment("");
            setPhone("");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        const userInfoLength = Object.keys(JSON.parse(userInfo)).length;
        if (userInfoLength > 4) {
            window.location.href = "/";
        }
    }, [loading]);

    return (
        <div className=" w-full flex items-center justify-center">
            <div className="my-20 bg-white px-20 py-20 rounded-3xl border-2 border-gray-200">
                <h1 className="text-5xl font-semibold">
                    Please complete your registration
                </h1>
                <p className="font-medium text-lg text-gray-500 mt-4">
                    Please enter your details.
                </p>
                <div className="mt-8">
                    <div>
                        <label className="text-lg font-medium">Name</label>
                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Enter your Name"
                            onChange={(e) => {
                                setName(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label className="text-lg font-medium">NSU ID</label>
                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Enter your Student ID"
                            onChange={(e) => {
                                setNsuID(e.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <label className="text-lg font-medium">School</label>
                        <div className="form-control">
                            <div className="input-group">
                                <select
                                    className="select select-bordered w-full border-2 border-gray-100 rounded-xl mt-2 bg-transparent"
                                    value={school}
                                    onChange={(e) => {
                                        setSchool(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>
                                        Select a school
                                    </option>
                                    <option value="SBE">
                                        School of Business & Economics (SBE)
                                    </option>
                                    <option value="SEPS">
                                        School of Engineering & Physical
                                        Sciences (SEPS)
                                    </option>
                                    <option value="SHLS">
                                        School of Health & Life Sciences (SHLS)
                                    </option>
                                    <option value="SHSS">
                                        School of Humanities & Social Sciences
                                        (SHSS)
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="text-lg font-medium">
                            Department
                        </label>
                        <div className="form-control">
                            <div className="input-group">
                                <select
                                    className="select select-bordered w-full border-2 border-gray-100 rounded-xl mt-2 bg-transparent"
                                    value={department}
                                    onChange={(e) => {
                                        setDepartment(e.target.value);
                                    }}
                                >
                                    <option value="" disabled>
                                        Select a department
                                    </option>
                                    <option value="ECE">
                                        Department of Electrical & Computer
                                        Engineering (ECE)
                                    </option>

                                    <option value="CEE">
                                        Department of Civil & Environmental
                                        Engineering (CEE)
                                    </option>
                                    <option value="DMP">
                                        Department of Mathematics and Physics
                                        (DMP)
                                    </option>
                                    <option value="BMD">
                                        Department of Biochemistry and
                                        Microbiology (BMD)
                                    </option>

                                    <option value="ESM">
                                        Department of Environmental Science &
                                        Management (ESM)
                                    </option>
                                    <option value="PHARM">
                                        Department of Pharmaceutical Sciences
                                    </option>
                                    <option value="ARCH">
                                        Department of Architecture
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="text-lg font-medium">
                            Phone Number
                        </label>
                        <input
                            className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                            placeholder="Enter your Phone Number"
                            onChange={(e) => {
                                setPhone(e.target.value);
                            }}
                        />
                    </div>
                </div>
                {/* <div>
                        <div>
                        <input type="checkbox" id="remember" />
                        <label for="remember">
                        Remember me for 30 days
                        </label>
                        </div>
                    </div> */}
                {/* Forgot pasword TBA */}
                <div className="mt-8 flex flex-col gap-y-4">
                    {!loading ? (
                        <button
                            className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-violet-500 text-white text-lg font-bold"
                            onClick={submitHandler}
                        >
                            Confirm
                        </button>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <span className="loading loading-spinner text-neutral"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Register;