import type { SelectAdvocates } from "@/db/schema";
import { typedFetch } from "@/utils/typedFetch";

import { AdvocateListView } from "@/feature-components/AdvocateListView/AdvocateListView";

export default async function Home() {
  let advocateList: SelectAdvocates[] = [];
  try {
    const advocateData = await typedFetch<{ data: SelectAdvocates[] }>(
      "/advocates"
    );
    if (advocateData?.data && advocateData.data.length) {
      advocateList = advocateList.concat(advocateData.data);
    }
  } catch (error) {
    console.warn("Error when fetching advocate list", error);
  }

  return (
    <AdvocateListView advocates={advocateList} />
  );
}
