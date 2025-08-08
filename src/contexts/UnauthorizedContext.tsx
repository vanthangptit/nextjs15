import React, {
  createContext,
  ReactNode,
  useState
} from 'react';

type Props = {
  children?: ReactNode;
}

type IUnauthorizedContext = {
  unauthorized?: boolean
  setUnauthorized: (_newState?: boolean) => void
}

const initialValue = {
  unauthorized: false,
  setUnauthorized: () => {}
};

const UnauthorizedContext = createContext<IUnauthorizedContext>(initialValue);

const UnauthorizedProvider = ({ children }: Props) => {
  const [unauthorized, setUnauthorized] = useState<boolean | undefined>(false);

  return (
    <UnauthorizedContext.Provider value={{ unauthorized, setUnauthorized }}>
      {children}
    </UnauthorizedContext.Provider>
  );
};

export {  UnauthorizedContext, UnauthorizedProvider };
