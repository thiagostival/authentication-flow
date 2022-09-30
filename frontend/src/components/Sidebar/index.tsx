import { Box, Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  // RiGitMergeLine,
  // RiInputMethodLine,
} from "react-icons/ri";

// UTILS
import pagesPermissions from "../../utils/pagesPermissions";

// COMPONENTS
import { Can } from "../Can";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SideBar() {
  return (
    <Box as="aside" w="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="GERAL">
          <NavLink icon={RiDashboardLine} to="/dashboard">
            Dashboard
          </NavLink>

          <Can {...pagesPermissions.users}>
            <NavLink icon={RiContactsLine} to="/users">
              Users
            </NavLink>
          </Can>
        </NavSection>

        {/* <NavSection title="AUTOMATION">
          <NavLink icon={RiInputMethodLine}>Forms</NavLink>
          <NavLink icon={RiGitMergeLine}>Automation</NavLink>
        </NavSection> */}
      </Stack>
    </Box>
  );
}
