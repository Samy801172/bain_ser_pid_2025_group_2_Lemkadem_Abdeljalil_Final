// models/type/type.model.ts
export interface Type {
  id_type: number;
  name: string;
  description: string;
  icon: string;
  prescription_required: boolean;
}
