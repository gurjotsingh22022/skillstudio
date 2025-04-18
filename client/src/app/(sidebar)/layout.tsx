import Dashboard from "@/components/Dashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Dashboard>
        {children}
    </Dashboard>
  );
}