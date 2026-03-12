import DashboardLayout from '../DashboardLayout';

export default function HoneymoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout title="Honeymoon Fund">{children}</DashboardLayout>;
}
