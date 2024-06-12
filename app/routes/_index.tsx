import type { MetaFunction } from "@remix-run/node";
import ProfileCard from "~/components/ProfileCard";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="">
      <ProfileCard />
    </div>
  );
}
