export interface FormElementsType {
  id: string;
  label: string;
  type: string;
  required: boolean;
  options?: { label: string; value: string }[];
}
