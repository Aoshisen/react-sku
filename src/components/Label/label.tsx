interface ILabelProps {
  children: React.ReactNode;
}
export const Label: React.FC<ILabelProps> = ({ children }) => {
  return <div className="label">{children}</div>;
};
