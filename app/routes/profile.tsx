import type { MetaFunction } from "@remix-run/node";
import Backup from "~/components/Backup";

export const meta: MetaFunction = () => {
  return [{ title: "v2" }, { name: "description", content: "v2" }];
};

export default function Profile() {
  return (
    <div className="">
      <Backup />
    </div>
  );
}
