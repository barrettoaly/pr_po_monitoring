import { createContext, useContext, useEffect, useState } from "react";
import { GetMultiple, GetRequest, PostRequest } from "../API/api";
import Swal from "sweetalert2";
import "../src/Assets/css/sweetAlert.css";

//Main context
const Context = createContext();

//Main Context reducer

function ControllerProvider({ children }) {
  const [department, setDepartment] = useState([]);
  const [user, setUser] = useState(null);
  const [rolesData, setRolesData] = useState([]);
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [passreset, setPassreset] = useState(false);
  const [miniSidenav, setMiniSidenav] = useState(false);

  //UserManagement>userlist> for EditButton

  //USER MANAGEMENT DATAS
  const [userList, setUserlist] = useState([]);
  const FetchUserList = () => {
    GetRequest({ url: "api/user" })
      .then((res) => res.data)
      .then((res) => {
        console.log(res.statusText);
        if (!res.statusText === "OK") {
          throw new Error("Bad response", { cause: res });
        }
        setUserlist(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [tabClick, setTabClick] = useState(false);
  // FETCH DEPT
  const FetchDepartment = () => {
    GetRequest({ url: "api/department" }).then((res) => {
      setDepartment(res.data.data);
    });
  };

  // LOGOUT
  const LogoutUser = () => {
    Swal.fire({
      // title: "Are you sure you want to log out?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      customClass: {
        container: "my-swal-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        PostRequest({ url: "api/logout" }).then((res) => {
          setUser(null);
        });

        localStorage.clear();
      }
    });
  };

  // GET TOP SUPPLIERS
  // const FetchTopSuppliers = () => {
  //   GetRequest({ url: "api/supplier/top/s" }).then((res) => {
  //     setTopSuppliers(res.data.data);
  //   });

  // };

  // FETCHING

  useEffect(() => {
    if (user?.role === 7 || user?.role === 8) {
      // FetchTopSuppliers();
    }
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        FetchDepartment,
        department,
        miniSidenav,
        setMiniSidenav,
        FetchUserList,
        userList,
        tabClick,
        setTabClick,
        rolesData,
        LogoutUser,
        topSuppliers,
        passreset,
        setPassreset,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useController() {
  const contexts = useContext(Context);

  if (!contexts) {
    throw new Error("useController should be used inside ControllerProvider.");
  }
  return contexts;
}

export { ControllerProvider, useController };
