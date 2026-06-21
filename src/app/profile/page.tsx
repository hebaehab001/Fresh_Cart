import ProfileSection from "@/components/layout/Profile/ProfileSection";
import { getloggedUserAddressesAction } from "@/Actions/ProfileActions/getloggedUserAddressesAction";
export default async function Profile() {
  const { data } = await getloggedUserAddressesAction();
  console.log(data);
  
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col gap-3 items-center w-full">
      <ProfileSection addresses={data} />
    </section>
  );
}
