import React, { FC } from 'react';

interface iconProps {
  alt: string;
  className: string;
  src: string;
  onClick: () => void;
}

const Button: FC<iconProps> = (props) => {
  const {
    alt,
    className,
    onClick,
    src,
  } = props;
  return (
    <img alt={alt} className={className} data-testid={alt} src={src} onClick={onClick}/>
  )
}

export default Button;
