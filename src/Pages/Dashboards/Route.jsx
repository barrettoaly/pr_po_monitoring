import React from "react";
import { useController } from "../../Context/DataContext";
import AdminDashboard from "./AdminDashboard";
import MMSDashboard from "./MMSDashboard";
import ProcurementDashboard from "./ProcurementDashboard";
import OMCCDashboard from "./OMCCDashboard";
import DepartmentDashboard from "./DepartmentDashboard";

const Route = ({ arrayRole }) => {
  const { user } = useController();

  // console.log(user);

  if (2 == user?.role) {
    return (
      <>
        <AdminDashboard />
      </>
    );
  } else if (7 == user?.role) {
    return (
      <>
        <MMSDashboard />
      </>
    );
  } else if (4 == user?.role) {
    return (
      <>
        <MMSDashboard />
      </>
    );
  } else if (8 == user?.role) {
    return (
      <>
        <OMCCDashboard />
      </>
    );
  } else if (10 == user?.role) {
    return (
      <>
        <DepartmentDashboard />
      </>
    );
  }
};

export default Route;
