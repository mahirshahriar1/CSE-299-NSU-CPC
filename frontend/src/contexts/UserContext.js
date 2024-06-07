import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../Components/Spinner';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [percent, setPercent] = useState(0);
  const [appliedJobs, setAppliedJobs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
          if (user.userType === 'corporate') user.name = user.personName;
          setUserInfo(user);

          let _email = user.userType === 'corporate' ? user.workEmail : user.email;
          const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/users/getPercent?email=${_email}`
          );
          setPercent(response.data.percentage.toFixed(2));

          if (user.userType === 'student') {
            const studentId = user._id;
            const jobCountResponse = await axios.get(
              `${process.env.REACT_APP_API_URL}/applyjob/countMyJobs?studentId=${studentId}`
            );
            setAppliedJobs(jobCountResponse.data);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user info:', error.message);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const updateUserInfo = (updatedInfo) => {
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      ...updatedInfo,
    }));
    localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...updatedInfo }));
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <UserContext.Provider value={{ userInfo, percent, appliedJobs, updateUserInfo, setUserInfo, setAppliedJobs, setPercent }}>
      {children}
    </UserContext.Provider>
  );
};
