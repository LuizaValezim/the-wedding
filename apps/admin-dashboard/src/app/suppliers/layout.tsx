import DashboardLayout from '../DashboardLayout';

export default function SuppliersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout title="Suppliers">{children}</DashboardLayout>;
}
