import { PlaygroundTabBar } from "./components/PlaygroundTabBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PlaygroundTabBar />
      <main>{children}</main>
    </>
  );
}
