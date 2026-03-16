import { RequestPriorityStats, RequestsTable } from "../components/requests";
import { serviceRequests } from "../data/mockData";

export function RequestsPage() {
  return (
    <div>
      <RequestPriorityStats requests={serviceRequests} />
      <RequestsTable requests={serviceRequests} />
    </div>
  );
}
