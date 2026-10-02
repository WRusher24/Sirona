import { getContentMap } from "@/lib/server/content-store";
import HeaderClient from "./HeaderClient";

/** Server wrapper: injects CMS content into the interactive header. */
export default async function SiteHeader() {
  const c = await getContentMap();
  return (
    <HeaderClient
      logo={c["site.logo"]}
      name={c["site.name"]}
      slogan={c["site.slogan"]}
    />
  );
}
