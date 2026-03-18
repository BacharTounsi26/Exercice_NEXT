import type { Metadata }     from "next";
import PageHeader            from "@/shared/ui/PageHeader";
import RecentlyViewedGrid   from "@/features/product/ui/RecentlyViewedGrid";

export const metadata: Metadata = {
  title: "Recently Viewed",
  description: "Products you have visited recently.",
};

export default function RecentlyViewedPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <PageHeader
        title="Recently Viewed"
        subtitle="Products you have visited recently"
      />
      <RecentlyViewedGrid />
    </div>
  );
}
