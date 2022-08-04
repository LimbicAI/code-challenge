import React from 'react';

export interface AlertParams {
  onFailure: (message: string) => void;
  onSuccess: (message: string) => void;
}

export default React.createContext<AlertParams>({
  onFailure: () => {},
  onSuccess: () => {},
});
