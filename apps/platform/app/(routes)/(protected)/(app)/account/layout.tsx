import { AccountTabBar } from "./components/AccountTabBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AccountTabBar />
      <main>{children}</main>
    </>
  );
}
