import DashboardLayout from '../DashboardLayout';

export default function TablesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout title="Seating Tables" titleKey="tables.title">{children}</DashboardLayout>;
}
