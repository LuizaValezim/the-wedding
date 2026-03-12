import DashboardLayout from '../DashboardLayout';

export default function GuestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout title="Manage Guests">{children}</DashboardLayout>;
}
