"use client";

import { fetchAPI } from "@/apis";
import { END_POINT } from "@/constants/api";
import { QUERY_KEY } from "@/constants/queryKey";
import { HomeUser } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

type useLoggedInUserProps = {
  isUsedErrorBoundary: boolean;
};

function useLoggedInUser({ isUsedErrorBoundary = true }: useLoggedInUserProps) {
  return useQuery<HomeUser>({
    queryKey: [QUERY_KEY.ME],
    queryFn: () => fetchAPI.get(END_POINT.ME),
    suspense: true,
    useErrorBoundary: () => (isUsedErrorBoundary ? true : false),
  });
}
// suspense가 true일땜만 session이 없는 경우의 분기문이 실행됨
// errorboundary가 없어서 일까? -> useErrorBoundary를 true로 했을 때도
// errorboundary로 에러를 던지는 거랬는데, true로 설정해도 에러가 안남.
// try catch와 route handler 로직 플로우 따라서 다시 생각해보기..
// suspense의 대상이 되는 promise가 무엇인가? ::getuserInfo
// 그렇다면 suspense는 어떨 때 언제 동작해서 언제 끝나야 하는가?
export { useLoggedInUser };
