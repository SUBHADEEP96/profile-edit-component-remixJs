import type { MetaFunction } from "@remix-run/node";
import ProfileCard from "~/components/ProfileCard";

export const meta: MetaFunction = () => {
  return [{ title: "v1" }, { name: "description", content: "v1" }];
};

export default function Index() {
  return (
    <div className="">
      <ProfileCard />
    </div>
  );
}
