import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const TopNav = () => {
  const { userInfo } = useContext(UserContext);
  const loggedIn = localStorage.getItem("userInfo");
  const isStudent =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "student";
  const isAdmin =
    JSON.parse(localStorage.getItem("userInfo"))?.userType === "admin";

  return (
    <div className="bg-white text-black py-2 px-1 flex items-center justify-between p-8 ">
      <a className="btn btn-ghost text-blue-400 text-xl" href="/">
        NSU CPC
      </a>
      <div className="flex items-center ">
        {loggedIn ? (
          <div className="flex">
            <button
              className="btn btn-ghost text-xl mr-2"
              onClick={() => {
                if (isStudent) {
                  window.location.href = "/student-profile";
                } else {
                  window.location.href = isAdmin ? "/" : "/dashboard";
                }
              }}
            >
              Hello {userInfo?.name}
              {isAdmin && <span>Admin</span>}
            </button>

            <div className="stat-figure text-secondary mr-5 transition-transform duration-300 transform hover:scale-105">
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      isAdmin
                        ? "https://firebasestorage.googleapis.com/v0/b/nsucpc-97cd3.appspot.com/o/userpfp%2FNorth_South_University_Monogram.svg.png?alt=media&token=096d8261-d67c-4173-a193-41880c52bbb9"
                        : userInfo?.picture
                    }
                    alt="Avatar"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <button
              className="btn btn-ghost text-xl mr-2"
              onClick={() => (window.location.href = "/login")}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
