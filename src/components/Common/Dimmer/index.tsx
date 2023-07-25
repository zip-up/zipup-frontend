type DimmerProps = {
  onCloseModal: () => void;
}

const Dimmer = ({ onCloseModal }: DimmerProps) => {
  return (
    <div
      className="bg-black bg-opacity-20 fixed top-0 left-0 right-0 bottom-0"
      onClick={onCloseModal}
    />
  );
};

export default Dimmer;
