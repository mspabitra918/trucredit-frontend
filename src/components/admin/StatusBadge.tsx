import { ApplicantStatus } from "../../types";

const STYLES: Record<ApplicantStatus, string> = {
  new: "bg-infobg text-brand",
  review: "bg-amber-50 text-amber-700",
  interview: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

const LABELS: Record<ApplicantStatus, string> = {
  new: "New",
  review: "In Review",
  interview: "Interview",
  rejected: "Rejected",
};

export default function StatusBadge({ status }: { status: ApplicantStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}
    >
      {LABELS[status]}
    </span>
  );
}
