import React, { createContext, FC, ReactNode, useState } from "react";

export interface ContextProp<T> {
  value: T | undefined;
  setValue: (value: T) => void;
}

interface User {
  uuid: string;
}

export interface UserContextProps {
  user: ContextProp<User>;
}

export const UserContext = createContext<UserContextProps>(
  {} as UserContextProps
);
export function createContextProp<T>(
  value: T | undefined,
  setValue: (value: T) => void
): ContextProp<T> {
  return {
    value: value,
    setValue: setValue,
  };
}

interface Props {
  children: ReactNode;
}

export const UserProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | undefined>();

  const initialUserProps: UserContextProps = {
    user: createContextProp<User>(user, setUser),
  };
  return (
    <UserContext.Provider value={initialUserProps}>
      {children}
    </UserContext.Provider>
  );
};
