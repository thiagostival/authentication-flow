type User = {
  roles?: string[];
  permissions?: string[];
};

type ValidateUserPermissionsParams = {
  user: User;
  roles?: string[];
  permissions?: string[];
};

export function validateUserPermissions({
  user,
  roles = [],
  permissions = [],
}: ValidateUserPermissionsParams) {
  try {
    if (permissions?.length > 0) {
      const hasAllPermissions = permissions?.every?.((permission) => {
        return user?.permissions?.includes?.(permission);
      });

      if (!hasAllPermissions) {
        return false;
      }
    }

    if (roles?.length > 0) {
      const hasAllRoles = roles?.some?.((role) => {
        return user?.roles?.includes?.(role);
      });

      if (!hasAllRoles) {
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}
