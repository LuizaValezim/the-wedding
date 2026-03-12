import DashboardLayout from '../DashboardLayout';

export default function TasksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout title="Wedding Checklist">{children}</DashboardLayout>;
}
