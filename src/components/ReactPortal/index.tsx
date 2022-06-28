import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface IProps {
  className?: string;
  el?: string;
  children: React.ReactNode;
}

const Portal: React.FC<IProps> = ({
  children,
  className = 'react-portal',
  el = 'div',
}: IProps) => {
  const [container] = useState(document.createElement(el));

  if (className) container.classList.add(className);

  useEffect(() => {
    document.body.appendChild(container);

    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export default Portal;
