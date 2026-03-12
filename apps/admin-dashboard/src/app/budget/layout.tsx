import DashboardLayout from '../DashboardLayout';

export default function BudgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout title="Budget Planning">{children}</DashboardLayout>;
}
