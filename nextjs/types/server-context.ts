import { UserRole } from "./resolvers";

//! you will get this fields in the context value
interface UserInterface {
  id: string;
  userRole: UserRole;
  isCompleted: boolean;
}
export type ServerContext = {
  // we'd define the properties a users should have
  // in a separate users interface (e.g., email, id, url, etc.)
  user: UserInterface | null;
};
