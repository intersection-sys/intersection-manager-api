export enum Role {
  DEV = 'DEV',
  Admin = 'admin',
  RawMaterial = 'raw_material',
  Stock = 'stock',
  Formula = 'formula',
  ProductionOrder = 'production_order',
  User = 'user',
  Analysis = 'analysis',

  // DIVIDED PERMISSIONS
  ViewProductionOrder = 'view_production_order',
  CreateProductionOrder = 'create_production_order',
  UpdateProductionOrder = 'update_production_order',
  DeleteProductionOrder = 'delete_production_order',

  ViewStock = 'view_stock',
  CreateStock = 'create_stock',
  UpdateStock = 'update_stock',
  DeleteStock = 'delete_stock',

  ViewRawMaterial = 'view_raw_material',
  CreateRawMaterial = 'create_raw_material',
  UpdateRawMaterial = 'update_raw_material',
  DeleteRawMaterial = 'delete_raw_material',

  ViewFormula = 'view_formula',
  CreateFormula = 'create_formula',
  UpdateFormula = 'update_formula',
  DeleteFormula = 'delete_formula',

  InsertAnalysis = 'insert_analysis',
  ViewAnalysis = 'view_analysis',
  CreateAnalysis = 'create_analysis',
  UpdateAnalysis = 'update_analysis',
  DeleteAnalysis = 'delete_analysis',

  ViewUser = 'view_user',
  CreateUser = 'create_user',
  UpdateUser = 'update_user',
  DeleteUser = 'delete_user',
}
