import type { MetaFunction } from "@remix-run/node";
import Backup2 from "~/components/Backup2";

export const meta: MetaFunction = () => {
  return [{ title: "v3" }, { name: "description", content: "v3" }];
};

export default function Profile() {
  return (
    <div className="">
      <Backup2 />
    </div>
  );
}
