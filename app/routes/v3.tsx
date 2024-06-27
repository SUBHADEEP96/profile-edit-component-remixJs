import type { MetaFunction } from "@remix-run/node";
import Backup2 from "~/components/Backup2";
import B3 from "~/components/B3";

export const meta: MetaFunction = () => {
  return [{ title: "v3" }, { name: "description", content: "v3" }];
};

export default function Profile() {
  return (
    <div className="">
      <Backup2 />
      {/* <B3 /> */}
    </div>
  );
}
