import Approve from "../Pages/Approve";
import CreateAdmin from "../Pages/CreateAdmin";
import Dashboard from "../Pages/Dashboard";
import Issuance from "../Pages/Issuance";
import Settings from "../Pages/Settings";
import Profile from "../Pages/Profile";
import PurchaseRequest from "../Pages/PurchaseRequests";
import TrackPR from "../Pages/TrackPR";
import ViewPO from "../Pages/ViewPO";
import UploadFile from "../Components/ModalContents/UploadFile";
import UserList from "../Pages/UserList";
import PurchaseOrder from "../Pages/PurchaseOrder";
import Route from "../Pages/Dashboards/Route";
import { ManageEvaluation } from "../Pages/ManageEvaluation";
import Uploads from "../Pages/Uploads";
import { EditForm } from "../Pages/EditForm";
import ViewIssuance from "../Pages/ViewIssuance";

import { EvaluationForm } from "../Pages/EvaluationForm";
import { E_Feedback } from "../Pages/E_Feedback";
import { EuserFeedbacks } from "../Pages/euserFeedbacks";
import { Eview } from "../Pages/Eview";
//Role:
/*
 * SuperAdmin: 1
 * Admin:2
 * EndUser:3
 * Procurement: 4
 * Budget: 5
 * Accounting: 6
 * MMS:7
 * OMCC: 8
 * Finance: 9
 * Dept. Head: 10
 */

const routesData = [
  {
    index: [2, 4, 7, 8, 10],
    route: "/dashboard",
    component: <Route />,
  },
  {
    index: [3, 4, 5, 6, 7, 8, 9, 10],
    route: "/purch-requests",
    component: <PurchaseRequest />,
  },
  {
    index: [3, 4, 5, 6, 7, 8, 9, 10],
    route: "/purch-order",
    component: <PurchaseOrder />,
  },
  {
    index: [1, 2, 4, 5, 6, 7, 8, 9],
    route: "/create-admin",
    component: <CreateAdmin />,
  },
  {
    index: [1, 2, 4, 5, 6, 7, 8, 9],
    route: "/user-list",
    component: <UserList />,
  },
  {
    index: [1, 2, 4, 5, 6, 7, 8, 9],
    route: "/approve",
    component: <Approve />,
  },
  {
    index: [7, 10],
    route: "/issuance",
    component: <Issuance />,
  },

  // {
  //   index: [1, 2, 4, 5, 6, 7, 8, 9],
  //   route: "/files",
  //   component: <Uploads />,
  // },

  {
    index: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    route: "/profile",
    component: <Profile />,
  },
  {
    index: [3, 4, 5, 6, 7, 8, 9],
    route: "/track-pr/:id",
    component: <TrackPR />,
  },
  {
    index: [3, 4, 5, 6, 7, 8, 9, 10],
    route: "/view-po/:id",
    component: <ViewPO />,
  },
  {
    index: [7, 10],
    route: "/view-issuance/:id",
    component: <ViewIssuance />,
  },
  // {
  //   index: [1, 4, 7],
  //   route: "/approve-pr",
  //   component: <ApprovePR />,
  // },

  // {
  //   index: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  //   route: "/settings",
  //   component: <Settings />,
  // },
  {
    index: [1, 2],
    route: "/evalutionForm",
    component: <EvaluationForm />,
  },
  {
    index: [1, 2],
    route: "/manage/evalutionForm",
    component: <ManageEvaluation />,
  },
  {
    index: [1, 2],
    route: "/manage/edit/evalutionForm",
    component: <EditForm />,
  },

  {
    index: [1, 2],
    route: "/userFeedback/evalutionForm",
    component: <EuserFeedbacks />,
  },

  {
    index: [1, 2],
    route: "/view/feedback/evalutionForm",
    component: <Eview />,
  },
];

export default routesData;
