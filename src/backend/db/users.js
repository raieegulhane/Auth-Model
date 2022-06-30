import { v4 as uuid } from "uuid";
import { formatDate } from "../utils/authUtils";

export const users = [
  {
    _id: uuid(),
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@example.com",
    password: "janeDoe123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
];
