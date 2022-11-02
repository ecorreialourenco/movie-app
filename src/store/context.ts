import { createContext, useContext } from "react";

export type GlobalContent = {
  session: string;
  setSession: (c: string) => void;
};

export const CredentialsContext = createContext<GlobalContent>({
  session: "", // set a default value
  setSession: () => {},
});

export const useSessionContext = () => useContext(CredentialsContext);
