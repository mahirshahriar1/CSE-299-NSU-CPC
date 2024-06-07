import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex w-full min-h-screen items-center justify-center ">
      <style jsx global>{`
        body {
          background-image: url("https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/299%20final%20presentation.pptx.png?alt=media&token=eb16b380-f923-4ad1-a55f-ad2701c649ac");
          background-size: cover;
          background-position: center;
        }
      `}</style>
      <div className="flex justify-center w-full max-w-screen-lg h-full p-5">
        <div className="flex flex-col md:flex-row w-full h-auto justify-center items-center">
          <div className="md:w-1/2 h-full bg-blue-400 md:rounded-l-lg md:rounded-none hidden lg:block">
            <div className="flex flex-col justify-between h-full">
              <div>
                <div className="h-1/2 mb-5">
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/ratuls-projects.appspot.com/o/pngegg.png?alt=media&token=668bb27a-44be-4da3-9919-40d767f10821"
                    alt=""
                    className="w-full p-5"
                  />
                </div>
                <div className="h-1/3 text-white p-10 text-left">
                  <p
                    className="text-3xl cursor-pointer"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    NSU Career And Placement Center
                  </p>
                  <br></br>
                  <p>&#10003; Find A Job That Suits You</p>
                  <p>&#10003; Find the best Employees</p>
                  <p>&#10003; Expand Your Network</p>
                  <p>&#10003; Grow Your Career</p>
                </div>
              </div>

              <div className="text-white mb-2 text-center text-xs w-full">
                <p>
                  &copy; 2024 NSU Career And Placement Center. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 h-full bg-white rounded-lg lg:rounded-l-none">
            <LoginForm />
          </div>
        </div>
      </div>
      {/*<footer className=" text-white pb-10 text-center fixed bottom-0 left-0 w-full">
        <p>&copy; 2024 NSU Career And Placement Center. All rights reserved.</p>
      </footer>*/}
    </div>
  );
};

export default Login;
