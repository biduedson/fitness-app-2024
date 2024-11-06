const ActionButton = ({
  onClick,
  icon,
  label,
  bgColor,
}: {
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  bgColor: string;
}) => {
  return (
    <div
      className={`${bgColor} w-full flex items-center  justify-between px-4 py-3 gap-2 text-sm uppercase rounded-lg cursor-pointer transition-transform transform hover:scale-105`}
      onClick={onClick}
    >
      {icon}
      <span className="text-white w-full text-center">{label}</span>
    </div>
  );
};

export default ActionButton;
