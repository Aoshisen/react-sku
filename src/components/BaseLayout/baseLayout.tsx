import { Label } from "../Label";
import { Button, IButtonProps } from "../Button";
import React, { useEffect, useRef, useState } from "react";
import "./baseLayout.css";
export interface IBaseProps {
  label: string;
  buttons?: { disable: boolean; value: string; active: boolean }[];
  onButtonsClick?: (button: string) => void;
}

export const BaseLayout: React.FC<IBaseProps> = ({
  label,
  buttons,
  onButtonsClick,
}) => {
  return (
    <div className="base-layout">
      <div className="label">
        <Label>{label}</Label>
      </div>
      <div className="button-container">
        {buttons && buttons.length ? (
          <React.Fragment>
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={() => {
                  onButtonsClick && onButtonsClick(button.value);
                }}
                disable={button?.disable}
                active={button?.active}
              >
                {button.value}
              </Button>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
