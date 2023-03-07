export const MenuPermission = {
	Default: 'App.Menus',
	Create: 'App.Menus.Create',
	Edit: 'App.Menus.Edit',
	Delete: 'App.Menus.Delete',
	CUD: [] as string[]
}

MenuPermission.CUD = [MenuPermission.Create, MenuPermission.Edit, MenuPermission.Delete]
export const RolePermission = {
	Default: 'App.Roles',
	Create: 'App.Roles.Create',
	Edit: 'App.Roles.Edit',
	Delete: 'App.Roles.Delete',
	Menus: 'App.Roles.Menus',
	Permissions: 'App.Roles.Permissions',
	CUD: [] as string[]
}
RolePermission.CUD = [RolePermission.Edit, RolePermission.Delete, RolePermission.Menus, RolePermission.Permissions]

export const UserPermission = {
	Default: 'App.Users',
	Create: 'App.Users.Create',
	Edit: 'App.Users.Edit',
	Delete: 'App.Users.Delete',
	ResetPassword: 'App.Users.ResetPassword',
	CUD: [] as string[]
}
UserPermission.CUD = [UserPermission.Edit, UserPermission.Delete, UserPermission.ResetPassword]

export const DepartmentPermission = {
	Default: 'App.Departments',
	Create: 'App.Departments.Create',
	Edit: 'App.Departments.Edit',
	Delete: 'App.Departments.Delete',
	CUD: [] as string[]
}
DepartmentPermission.CUD = [DepartmentPermission.Create, DepartmentPermission.Edit, DepartmentPermission.Delete]

export const PositionPermission = {
	Default: 'App.Positions',
	Create: 'App.Positions.Create',
	Edit: 'App.Positions.Edit',
	Delete: 'App.Positions.Delete',
	CUD: [] as string[]
}
PositionPermission.CUD = [PositionPermission.Create, PositionPermission.Edit, PositionPermission.Delete]

export const AppSettingPermission = {
	Default: 'App.Settings',
	Update: 'App.Settings.Update'
}

export const CachePermission = {
	Default: 'App.Caches',
	Clear: 'App.Caches.Clear'
}

export const LoggingPermission = {
	Default: 'App.Logs',
	Delete: 'App.Logs.Delete'
}
