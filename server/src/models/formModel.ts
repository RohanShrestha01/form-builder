import { type ObjectId, Schema, model } from 'mongoose';
import type { FormElementsType } from '@form-builder/validation/src/types';

interface IForm {
  name: string;
  elements: FormElementsType[];
  isActive: boolean;
  user: ObjectId;
}

const formSchema = new Schema<IForm>(
  {
    name: {
      type: String,
      required: true,
    },
    elements: Array,
    isActive: {
      type: Boolean,
      default: true,
    },
    user: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default model<IForm>('Form', formSchema);
