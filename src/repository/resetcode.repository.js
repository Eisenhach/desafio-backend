import { nanoid } from "nanoid";

export class ResetRepository {
  create = () => {
    return nanoid(5);
  };
}
