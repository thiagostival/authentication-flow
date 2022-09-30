import { Navigate, useLocation, Outlet } from "react-router-dom";
import { parseCookies } from "nookies";

// HOOKS
import { useAuth } from "../../contexts/AuthContext";

// UTILS
import pagesPermissions from "../../utils/pagesPermissions";
import { validateUserPermissions } from "../../utils/validateUserPermissions";

// STYLES
import { Flex } from "@chakra-ui/react";

// COMPONENTS
import { SideBar } from "../../components/Sidebar";
import { Header } from "../../components/headers/Header";

export const AuthLayout = () => {
  const location = useLocation();
  const { "reactauth.token": token } = parseCookies();

  // HOOKS AUTH
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated && !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const path = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  ) as keyof typeof pagesPermissions;

  const pagePermissions = pagesPermissions[path];
  if (pagePermissions && user) {
    const userHasValidPermissions = validateUserPermissions({
      user,
      ...pagePermissions,
    });

    if (!userHasValidPermissions) {
      return <Navigate to="/dashboard" state={{ from: location }} replace />;
    }
  }

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />

        <Outlet />
      </Flex>
    </Flex>
  );
};
