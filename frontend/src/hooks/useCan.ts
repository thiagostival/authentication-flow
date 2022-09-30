// HOOKS
import { useAuth } from "../contexts/AuthContext";

// UTILS
import { validateUserPermissions } from "../utils/validateUserPermissions";

type UseCanParams = {
  /** @default [] */
  permissions?: string[];
  /** @default [] */
  roles?: string[];
};

export function useCan({ roles = [], permissions = [] }: UseCanParams) {
  try {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated || !user) {
      return false;
    }

    const userHasValidPermissions = validateUserPermissions({
      user,
      roles,
      permissions,
    });

    return userHasValidPermissions;
  } catch (error) {
    return false;
  }
}
