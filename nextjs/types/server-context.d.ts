import { UserRole } from "./resolvers";

//! you will get this fields in the context value 
interface UserInterface {
    id: string;
    userRole: UserRole;
}
export type ServerContext = {
    // we'd define the properties a user should have
    // in a separate user interface (e.g., email, id, url, etc.)
    user: UserInterface | null;
}
