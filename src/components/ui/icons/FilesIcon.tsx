import { FaPhotoVideo } from "react-icons/fa";

export default function FilesIcon({ size = "w-6 h-6" }: { size?: string }) {
  return <FaPhotoVideo className={`${size}`} />;
}
