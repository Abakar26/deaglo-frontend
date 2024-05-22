import type { PropsWithChildren } from "react";

type LayoutProps = {
  modal: React.ReactNode;
};

export default function Layout({ children, modal }: PropsWithChildren<LayoutProps>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
