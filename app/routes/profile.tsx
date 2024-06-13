import type { MetaFunction } from "@remix-run/node";
import Backup from "~/components/Backup";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Profile() {
  return (
    <div className="">
      <Backup />
    </div>
  );
}
