import { type ObjectId, Schema, model } from 'mongoose';

interface IFormResponse {
  form: ObjectId;
  response: {
    elementType: string;
    question: string;
    answer: any;
  }[];
}

const formResponseSchema = new Schema<IFormResponse>(
  {
    form: {
      type: Schema.ObjectId,
      ref: 'Form',
      required: true,
    },
    response: [
      {
        elementType: String,
        question: String,
        answer: Schema.Types.Mixed,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default model<IFormResponse>('FormResponse', formResponseSchema);
