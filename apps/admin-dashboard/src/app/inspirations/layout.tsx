import DashboardLayout from '../DashboardLayout';

export default function InspirationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout title="Inspirations">{children}</DashboardLayout>;
}
