import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, Outlet, useNavigate } from "react-router-dom";
// import LoginPage from "../Pages/LoginPage";
import SignupPage from "../Pages/SignupPage";
import { useController } from "../Context/DataContext";
import Layout from "../Components/Layout";
import routesData from "./RouteData";
import { useEffect, useState } from "react";
import DragDropFile from "../Components/DragDropFile";
import { PostRequest } from "../API/Api";
import AnimatedLoader from "../Components/Loader/AnimateLoader";
import Dashboard from "../Pages/Dashboard";
import PR from "../Pages/Dashboards/OMCCDashboard/PR";
import { replace } from "lodash";
import OMCCDashboard from "../Pages/Dashboards/OMCCDashboard/Main";
import omccRoute from "../Pages/Dashboards/OMCCDashboard/RouteOMCC";
import Main from "../Pages/Dashboards/OMCCDashboard/Main";
import Issuance from "../Pages/Dashboards/OMCCDashboard/Issuance";
import { E_Feedback } from "../Pages/E_Feedback";
import { localStorageGetter } from "../utility/ParseData";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetCode from "../Pages/ResetCode";
import NewPassword from "../Pages/NewPassword";
const LoginPage = lazy(() => import("../Pages/LoginPage"));

const ProtectedRoutes = () => {
  const { user } = useController();
  return user == null ? <Navigate to="/login" replace /> : <Outlet />;
};

const AnimatedRoutes = () => {
  const { user, setUser } = useController();
  const [isFetch, setFetch] = useState(true);

  const navigate = useNavigate();

  // const handleUserAuthenticate = () => {
  //   PostRequest({ url: `api/authenticate` })
  //     .then((res) => res.data)
  //     .then((res) => {
  //       if (!res.statusText === "OK") {
  //         throw new Error("Bad response", { cause: res });
  //       }

  //       setUser(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setUser(null);
  //     });
  // };

  useEffect(() => {
    PostRequest({ url: `api/authenticate` }).then((res) => {
      if (res.status == 202) {
        setUser({ ...res.data });
        navigate("/", { replace: true });
      }
    });

    return () => setFetch(false);
  }, [isFetch]);

  useEffect(() => {
    const redirect = routesData.filter(({ index, route, component }) => {
      if (index.includes(user?.role)) {
        return route;
      }
    })[0]?.route;
    if (localStorageGetter("path")) {
      if (localStorageGetter("path") !== null) {
        navigate(localStorageGetter("path"), { replace: true });
        return;
      }
    }
    navigate(redirect, { replace: true });
  }, [user]);

  // useEffect(() => {
  //   // console.log(user);
  //   if (user !== null) {
  //     const redirect = routesData.find(({ index }) =>
  //       index.includes(user?.role)
  //     )?.route;
  //     navigate(redirect || "/", { replace: true });
  //   }
  // }, [user]);

  return (
    <Suspense fallback={<AnimatedLoader />}>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  {/*
                   *
                   *RENDERING ROUTES BASE ON USER ROLE
                   *
                   */}
                  {routesData.map(({ index, route, component }, keyindex) => {
                    if (index.includes(user?.role)) {
                      if (user?.role === 8) {
                        return (
                          <Route key={index} path={route} element={component}>
                            {omccRoute.map(({ href, component }) => {
                              return <Route path={href} element={component} />;
                            })}
                          </Route>
                        );
                      }
                    }

                    return (
                      <Route key={index} path={route} element={component} />
                    );
                  })}
                </Routes>
              </Layout>
            }
          />
        </Route>
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/drag" element={<DragDropFile />} />
        <Route path="/response/eform/:id" element={<E_Feedback />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset" element={<ResetCode />} />
        <Route path="/new-password" element={<NewPassword />} />
      </Routes>
    </Suspense>
  );
};

export default AnimatedRoutes;
