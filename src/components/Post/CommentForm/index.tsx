import Button from "../../Common/Button";
import SmileIcon from "../../UI/icons/SmileIcon";

export default function CommentForm() {
  return (
    <form className="flex items-center border-t border-neutral-300 p-3">
      <SmileIcon />
      <input
        type="text"
        placeholder="Add a comment..."
        className="w-full ml-2 border-none outline-none p-3"
      />
      <Button className="font-bold text-sky-500 ml-2">Post</Button>
    </form>
  );
}
