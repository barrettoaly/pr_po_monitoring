import Icon from "@mui/material/Icon";
import {
  Dashboard as DashboardIcon,
  SupervisedUserCircleSharp,
  PersonAddAlt1Outlined,
  ListAltOutlined,
  ApprovalOutlined,
  ShoppingBag,
  DeliveryDiningSharp,
  Handshake,
  ManageAccounts,
  SwitchAccount,
  CloudUpload,
  ShoppingCart,
} from "@mui/icons-material";
import FormatListNumberedRtlIcon from "@mui/icons-material/FormatListNumberedRtl";

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
 */

const routes = [
  {
    forrole: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    type: "collapse",
    collapseName: "MENU",
    icon: <SupervisedUserCircleSharp />,
    list: [
      {
        forrole: [2, 4, 7, 8, 10],
        type: "list",
        rname: "Dashboard",
        key: "dashboard",
        icon: <DashboardIcon />,
        route: "/dashboard",
      },
      {
        forrole: [3],
        type: "list",
        rname: "PR",
        key: "purch-requests",
        icon: <ShoppingBag />,
        route: "/purch-requests",
      },
      {
        forrole: [4, 5, 6, 7, 8, 9, 10],
        type: "list",
        rname: "PR",
        key: "purch-requests",
        icon: <ShoppingCart />,
        route: "/purch-requests",
      },
      {
        forrole: [3, 4, 5, 6, 7, 8, 9, 10],
        type: "list",
        rname: "PO",
        key: "purch-order",
        icon: <DeliveryDiningSharp />,
        route: "/purch-order",
      },
      {
        forrole: [7, 10],
        type: "list",
        rname: "Issuance",
        key: "issuance",
        icon: <Handshake />,
        route: "/issuance",
      },
      // {
      //   forrole: [3, 4, 5, 6, 7, 8, 9],
      //   type: "list",
      //   rname: "Files",
      //   key: "files",
      //   icon: <CloudUpload />,
      //   route: "/files",
      // },
    ],
  },
  // {
  //   forrole: [1, 2, 3, 4, 5, 6, 7],
  //   type: "list",
  //   rname: "Approve PR",
  //   key: "approve-pr",
  //   icon: <ShoppingCart />,
  //   route: "/approve-pr",
  // },
  {
    forrole: [1, 2],
    type: "collapse",
    collapseName: "USER MANAGEMENT",
    icon: <SupervisedUserCircleSharp />,
    list: [
      {
        forrole: [1, 2],
        rname: "Create Admin",
        key: "createAdmin",
        icon: <PersonAddAlt1Outlined />,
        route: "/create-admin",
      },
      {
        forrole: [1, 2],
        rname: "User List",
        key: "ulist",
        icon: <ListAltOutlined />,
        route: "/user-list",
      },
      {
        forrole: [1, 2],
        rname: "Approve",
        key: "approve",
        icon: <ApprovalOutlined />,
        route: "/approve",
      },
    ],
  },
  {
    forrole: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    type: "collapse",
    collapseName: "SETTINGS",
    icon: <SupervisedUserCircleSharp />,
    list: [
      {
        forrole: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        rname: "Account",
        key: "profile",
        icon: <ManageAccounts />,
        route: "/profile",
      },
      // {
      //   forrole: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      //   rname: "Account",
      //   key: "account",
      //   icon: <ManageAccounts />,
      //   route: "/settings",
      // },

      {
        forrole: [1, 2],
        rname: "Evaluation Forms",
        key: "evaluation",
        icon: <FormatListNumberedRtlIcon />,
        route: "/evalutionForm",
      },
    ],
  },
];

export default routes;
