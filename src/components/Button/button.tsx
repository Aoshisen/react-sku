import classNames from "classnames";
import "./button.css"
interface IButtonProps {
  children: React.ReactNode;
  active?: boolean;
  disable?: boolean;
}
export const Button: React.FC<IButtonProps> = ({
  children,
  active = false,
  disable = false,
}) => {
  return (
    <div
      className={classNames({
        button: true,
        active: active,
        disable: disable,
      })}
    >
      {children}
    </div>
  );
};
