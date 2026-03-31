import React from "react";
import PageTitle from "@/components/layout/Common/PageTitle/PageTitle";
import ProfileSection from "@/components/layout/Profile/ProfileSection";
export default function page() {
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col gap-3 items-center w-full">
      <PageTitle title="My Account" />
      <ProfileSection />
    </section>
  );
}
