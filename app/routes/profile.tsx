import type { MetaFunction } from "@remix-run/node";
import Backup from "~/components/Backup";

export const meta: MetaFunction = () => {
  return [{ title: "v1" }, { name: "description", content: "v1" }];
};

export default function Profile() {
  return (
    <div className="">
      <Backup />
    </div>
  );
}
