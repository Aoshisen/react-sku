import classNames from "classnames";
import "./button.css";
export interface IButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  disable?: boolean;
}
export const Button: React.FC<IButtonProps> = ({
  children,
  active = false,
  disable = false,
  onClick = () => {},
}) => {
  return (
    <div
      className={classNames({
        button: true,
        active: active,
        disable: disable,
      })}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
