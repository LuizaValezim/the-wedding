import DashboardLayout from '../DashboardLayout';

export default function VenuesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout title="Venues" titleKey="venues.title">{children}</DashboardLayout>;
}
