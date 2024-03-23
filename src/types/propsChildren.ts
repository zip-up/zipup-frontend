export type PropsWithChildren<P = unknown> = P & { children: React.ReactNode };

export type PropsWithOptionalChildren<P = unknown> = P & {
  children?: React.ReactNode;
};
