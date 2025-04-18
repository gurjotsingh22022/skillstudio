import AdminDashboard from "@/components/AdminDashboard";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AdminDashboard>
        {children}
    </AdminDashboard>
  );
}