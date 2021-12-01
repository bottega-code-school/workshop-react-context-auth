import * as React from "react";
import api from "./api";

export type UserType = {
  email: string;
  password: string;
};
export type UserContext = {
  currentUser?: UserType;
  setCurrentUser: (user: UserType) => void;
  checkLogin: () => void;
  setAuthIsLoading: (isLoading: boolean) => void;
  authIsLoading: boolean;
  handleLogout: () => void;
};
const CurrentUserContext = React.createContext<UserContext>(null);

export default CurrentUserContext;

type ProviderProps = {
  children: React.ReactNode;
};
export const CurrentUserProvider = ({ children }: ProviderProps) => {
  const [currentUser, setCurrentUser] = React.useState<UserType | null>(null);
  const [authIsLoading, setAuthIsLoading] = React.useState(true);

  React.useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = localStorage.getItem("bottega_workshop_token");

    console.log("CHECKING LOGIN");

    setAuthIsLoading(true);

    if (token) {
      api
        .get(`users/${token}`)
        .then((response: { data: { user: UserType } }) => {
          console.log("CURRENT USER RES", response.data.user);
          setCurrentUser(response.data.user);
          setAuthIsLoading(false);
        })
        .catch((_error) => {
          setCurrentUser(null);
          setAuthIsLoading(false);
        });
    } else {
      setCurrentUser(null);
      setAuthIsLoading(false);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("bottega_workshop_token");
    setCurrentUser(null);
  };

  const stateValues = {
    currentUser,
    setCurrentUser,
    checkLogin,
    setAuthIsLoading,
    authIsLoading,
    handleLogout,
  };

  return (
    <CurrentUserContext.Provider value={stateValues}>
      {children}
    </CurrentUserContext.Provider>
  );
};
