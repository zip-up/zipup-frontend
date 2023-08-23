import { ImSpinner2 } from "react-icons/im";

type SpinnerProps = {
  size?: string;
};

export default function Spinner({ size = "20" }: SpinnerProps) {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <ImSpinner2 className="animate-spin" size={size} />
    </div>
  );
}
