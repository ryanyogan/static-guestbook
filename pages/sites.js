import DashboardShell from "@/components/dashboard-shell";
import EmptyState from "@/components/empty-state";
import SiteTable from "@/components/site-table";
import SiteTableSkeleton from "@/components/site-table-skeleton";
import useSWR from "swr";
import { useAuth } from "../lib/auth";
import fetcher from "../utils/fetcher";

export default function Dashboard() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/sites", user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.sites ? <SiteTable sites={data.sites} /> : <EmptyState />}
    </DashboardShell>
  );
}
