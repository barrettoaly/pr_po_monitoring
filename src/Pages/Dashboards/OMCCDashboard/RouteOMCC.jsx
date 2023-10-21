import Main from "./Main";
import Issuance from "./Issuance";
import PR from "./PR";

const omccRoute = [
  {
    label: "General",
    href: "",
    active: true,
    component: <Main />,
  },
  {
    label: "PR",
    full: "Purchase Requests",
    href: "pr",
    component: <PR />,
  },
  {
    label: "Issuance",
    href: "issuance",
    component: <Issuance />,
  },
];

export default omccRoute;
