import Login from "./Components/Login";
// import App from "./App";
import UserRegister from "./Components/Registration_Pages/UserRegister";
import AuthRedirect from "./Components/AuthRedirect";
import AdditionalInfo from "./Components/AdditionalInfo";
import PostCV from "./Components/pages/Jobs/CV/PostCV";
import UserProfile from "./Components/Profile_Pages/UserProfile";
import CorporateRegister from "./Components/Registration_Pages/CorporateRegister";
import PostJobs from "./Components/pages/Jobs/Corporate/PostJobs";
import ListJobs from "./Components/pages/Jobs/ListJobs";
import JobDetails from "./Components/pages/Jobs/JobDetails";
import EditJobs from "./Components/pages/Jobs/Corporate/EditJobs";
import PendingJobs from "./Components/Admin/PendingJobs";
import ApplyJob from "./Components/pages/Jobs/Users/ApplyJob";
import ViewCV from "./Components/pages/Jobs/CV/ViewCV";
import JobBoard from "./Components/pages/Jobs/JobBoard";
import AppliedJobs from "./Components/pages/Jobs/Users/AppliedJobs";
import AppliedCandidates from "./Components/pages/Jobs/Corporate/AppliedCandidates";
import SelectRegType from "./Components/Registration_Pages/SelectRegType";
import CorporateDashboard from "./Components/Profile_Pages/CorporateDashboard";
import HandleUsers from "./Components/Admin/HandleUsers";
import EditCorporateProfile from "./Components/Profile_Pages/EditCorporateProfile";
import EditUserProfile from "./Components/Profile_Pages/EditUserProfile";
import HomePage from "./Components/HomePage";
import AboutUs from "./Components/AboutUs";

const routes = [
  { path: "/", component: HomePage },
  { path: "/login", component: Login },
  { path: "/user-register", component: UserRegister },
  { path: "/authredirect", component: AuthRedirect },
  { path: "/additional-info", component: AdditionalInfo },
  { path: "/edit-user-profile", component: EditUserProfile },
  { path: "/student-profile", component: UserProfile },
  { path: "/postCV", component: PostCV },

  { path: "/corporate-register", component: CorporateRegister },

  { path: "/postJobs", component: PostJobs },
  { path: "/list-jobs", component: ListJobs },
  { path: "/job-board", component: JobBoard },
  { path: "/job/:jobId", component: JobDetails },
  { path: "/edit-job/:jobId", component: EditJobs },
  { path: "/pendingJobs", component: PendingJobs },
  { path: "/apply-job/:jobId", component: ApplyJob },
  { path: "/applied-candidates/:jobId", component: AppliedCandidates },
  { path: "/view-cv/:cvId/:nsuEmail", component: ViewCV },
  { path: "/applied-jobs", component: AppliedJobs },

  { path: "/edit-corporate-profile", component: EditCorporateProfile },
  { path: "/select-reg-type", component: SelectRegType },
  { path: "/admin-dashboard", component: HandleUsers },
  { path: "/dashboard", component: CorporateDashboard },

  { path: "/home", component: HomePage },
  { path: "/aboutus", component: AboutUs },
];

export default routes;
