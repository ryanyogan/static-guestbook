import DashboardShell from "@/components/dashboard-shell";
import EmptyState from "@/components/empty-state";
import FeedbackTable from "@/components/feedback-table";
import SiteTableSkeleton from "@/components/site-table-skeleton";
import useSWR from "swr";
import { useAuth } from "../lib/auth";
import fetcher from "../utils/fetcher";

export default function Feedback() {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/feedback", user.token] : null, fetcher);

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {data.feedback ? (
        <FeedbackTable feedback={data.feedback} />
      ) : (
        <EmptyState />
      )}
    </DashboardShell>
  );
}
