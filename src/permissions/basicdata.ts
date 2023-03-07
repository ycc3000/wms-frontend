export const WarehousePermission = {
	Default: 'BasicData.Warehouses',
	Create: 'BasicData.Warehouses.Create',
	Edit: 'BasicData.Warehouses.Edit',
	Delete: 'BasicData.Warehouses.Delete',
	CUD: [] as string[]
}
WarehousePermission.CUD = [WarehousePermission.Edit, WarehousePermission.Delete]

export const WarehouseZonePermission = {
	Default: 'BasicData.WarehouseZones',
	Create: 'BasicData.WarehouseZones.Create',
	Edit: 'BasicData.WarehouseZones.Edit',
	Delete: 'BasicData.WarehouseZones.Delete',
	CUD: [] as string[]
}
WarehouseZonePermission.CUD = [WarehouseZonePermission.Edit, WarehouseZonePermission.Delete]

export const WarehouseLocationPermission = {
	Default: 'BasicData.WarehouseLocations',
	Create: 'BasicData.WarehouseLocations.Create',
	Edit: 'BasicData.WarehouseLocations.Edit',
	Delete: 'BasicData.WarehouseLocations.Delete',
	CUD: [] as string[]
}
WarehouseLocationPermission.CUD = [WarehouseLocationPermission.Edit, WarehouseLocationPermission.Delete]

export const SupplierPermission = {
	Default: 'BasicData.Suppliers',
	Create: 'BasicData.Suppliers.Create',
	Edit: 'BasicData.Suppliers.Edit',
	Delete: 'BasicData.Suppliers.Delete',
	CUD: [] as string[]
}
SupplierPermission.CUD = [SupplierPermission.Edit, SupplierPermission.Delete]

export const PackageTypePermission = {
	Default: 'BasicData.PackageTypes',
	Create: 'BasicData.PackageTypes.Create',
	Edit: 'BasicData.PackageTypes.Edit',
	Delete: 'BasicData.PackageTypes.Delete',
	CUD: [] as string[]
}
PackageTypePermission.CUD = [PackageTypePermission.Edit, PackageTypePermission.Delete]

export const PackagePermission = {
	Default: 'BasicData.Packages',
	Create: 'BasicData.Packages.Create',
	Edit: 'BasicData.Packages.Edit',
	Delete: 'BasicData.Packages.Delete',
	CUD: [] as string[]
}
PackagePermission.CUD = [PackagePermission.Edit, PackagePermission.Delete]

export const MaterialPermission = {
	Default: 'BasicData.Materials',
	Create: 'BasicData.Materials.Create',
	Edit: 'BasicData.Materials.Edit',
	Delete: 'BasicData.Materials.Delete',
	CUD: [] as string[]
}
MaterialPermission.CUD = [MaterialPermission.Edit, MaterialPermission.Delete]

export const MaterialDlocPermission = {
	Default: 'BasicData.MaterialDlocs',
	Create: 'BasicData.MaterialDlocs.Create',
	Edit: 'BasicData.MaterialDlocs.Edit',
	Delete: 'BasicData.MaterialDlocs.Delete',
	CUD: [] as string[]
}
MaterialDlocPermission.CUD = [MaterialDlocPermission.Edit, MaterialDlocPermission.Delete]

export const MaterialSupplierPermission = {
	Default: 'BasicData.MaterialSuppliers',
	Create: 'BasicData.MaterialSuppliers.Create',
	Edit: 'BasicData.MaterialSuppliers.Edit',
	Delete: 'BasicData.MaterialSuppliers.Delete',
	CUD: [] as string[]
}
MaterialSupplierPermission.CUD = [MaterialSupplierPermission.Edit, MaterialSupplierPermission.Delete]

export const MaterialPackagePermission = {
	Default: 'BasicData.MaterialPackages',
	Create: 'BasicData.MaterialPackages.Create',
	Edit: 'BasicData.MaterialPackages.Edit',
	Delete: 'BasicData.MaterialPackages.Delete',
	CUD: [] as string[]
}
MaterialPackagePermission.CUD = [MaterialPackagePermission.Edit, MaterialPackagePermission.Delete]

export const MeasureUnitPermission = {
	Default: 'BasicData.MeasureUnits',
	Create: 'BasicData.MeasureUnits.Create',
	Edit: 'BasicData.MeasureUnits.Edit',
	Delete: 'BasicData.MeasureUnits.Delete',
	CUD: [] as string[]
}
MeasureUnitPermission.CUD = [MeasureUnitPermission.Edit, MeasureUnitPermission.Delete]
