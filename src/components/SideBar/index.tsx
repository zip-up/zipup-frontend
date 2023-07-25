import { User } from "../../types/user";
import Avatar from "../UI/Avatar";

type SideBarProps = {
  user: User;
};

export default function SideBar({
  user: { name, username, image },
}: SideBarProps) {
  return (
    <>
      <div className="flex items-center">
        {image && <Avatar image={image} size="md" />}
        <div className="ml-2 text-xs">
          <p className="font-bold">{name}</p>
          <p className="text-neutral-500 leading-4">{name}</p>
        </div>
      </div>
      <p className="text-2xs text-neutral-500 mt-8">
        소개 · 도움말 · 홍보 센터 · API · 채용정보 · 개인정보처리방침 · 약관 ·
        위치 · 언어 · Meta Verified
      </p>
      <p className="text-2xs text-neutral-500 mt-8">
        © 2023 INSTAGRAM FROM META
      </p>
    </>
  );
}
