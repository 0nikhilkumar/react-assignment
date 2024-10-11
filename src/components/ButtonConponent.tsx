import React from 'react';
import { Button } from 'react-bootstrap';

interface ButtonComponentProps {
  variant: string;
  onClickEvent: () => void;
  buttonName: string;
}

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  variant,
  onClickEvent,
  buttonName,
}) => {
  return (
    <>
      <Button variant={variant} onClick={onClickEvent}>
        {buttonName}
      </Button>
    </>
  );
};

export default ButtonComponent;
