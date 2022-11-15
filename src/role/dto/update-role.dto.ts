export class UpdateRoleDto {
  name?: string;
  access?:
    | {
        add: string | string[];
        remove: string | string[];
      }
    | string[];
}
