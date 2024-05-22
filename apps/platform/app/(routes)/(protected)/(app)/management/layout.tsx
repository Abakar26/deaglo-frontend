import { ManagementTabBar } from "./components/ManagementTabBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ManagementTabBar />
      <main>{children}</main>
    </>
  );
}
