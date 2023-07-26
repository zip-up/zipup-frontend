import Button from "@/components/Common/Button";

type DimmerProps = {
  onCloseModal: () => void;
};

const Dimmer = ({ onCloseModal }: DimmerProps) => {
  return (
    <div
      className="bg-slate-900 bg-opacity-40 fixed top-0 left-0 right-0 bottom-0"
      onClick={onCloseModal}
    >
      <Button
        onClick={onCloseModal}
        className="absolute top-1 right-3 text-2xl"
      >
        X
      </Button>
    </div>
  );
};

export default Dimmer;
