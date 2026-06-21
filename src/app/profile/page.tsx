import ProfileSection from "@/components/layout/Profile/ProfileSection";
import { getloggedUserAddressesAction } from "@/Actions/ProfileActions/getloggedUserAddressesAction";
export default async function Profile() {
  const { data: Addresses } = await getloggedUserAddressesAction();
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col gap-3 items-center w-full">
      <ProfileSection {...Addresses} />
    </section>
  );
}
