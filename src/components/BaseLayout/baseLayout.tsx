import { Label } from "../Label";
import { Button } from "../Button";
import React from "react";
import "./baseLayout.css";
interface IBaseProps {
  label: string;
  buttons?: string[];
}

export const BaseLayout: React.FC<IBaseProps> = ({ label, buttons }) => {
  return (
    <div className="base-layout">
      <div className="label">
        <Label>{label}</Label>
      </div>
      <div className="button-container">
        {buttons && buttons.length ? (
          <React.Fragment>
            {buttons.map((button, index) => (
              <Button key={index}>{button}</Button>
            ))}
          </React.Fragment>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
