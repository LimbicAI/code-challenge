import React from 'react';

export default (title: string) => {
  React.useEffect(() => {
    document.title = `${title} | Limbic Challenge`;
  }, []);
};
