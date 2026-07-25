import { Link } from "react-router";

interface Props {
  text?: string;
  active?: boolean;
  to: string;
}

export const MobileNavLink = ({ text, active = false, to }: Props) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-semibold transition ${
        active
          ? "bg-[#646cff] text-white shadow-sm shadow-blue-500/40"
          : "text-blue-100 hover:bg-[#2b35f1] hover:text-white"
      }`}
    >
      <span>{text}</span>
    </Link>
  );
};
