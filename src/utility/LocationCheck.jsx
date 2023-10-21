import { useLocation } from "react-router-dom";

function isActive(url) {
  const location = useLocation();
  return location.pathname.replace("/", "") === url;
}

function getLocation() {
  const location = useLocation();
  const parts = url.split(location.pathname);
  return parts[parts.length - 1];
}

export { isActive, getLocation };
