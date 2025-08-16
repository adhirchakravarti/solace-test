import type { SelectAdvocates } from "@/db/schema";
import { typedFetch } from "@/utils/typedFetch";

import { AdvocateListView } from "@/feature-components/AdvocateListView/AdvocateListView";

export default async function Home({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  console.log("Search Params:", searchParams);
  let advocateList: SelectAdvocates[] = [];
  try {
    const { searchTerm } = searchParams;
    const url = `/advocates${searchTerm ? `?searchTerm=${searchTerm}` : ''}`;
    console.log("RSC SearchTerm", { searchTerm });
    console.log("RSC Fetching advocates with URL:", { url });
    const advocateData = await typedFetch<{ data: SelectAdvocates[] }>(
      url
    );
    if (advocateData?.data && advocateData.data.length) {
      advocateList = advocateList.concat(advocateData.data);
    }
  } catch (error) {
    console.warn("Error when fetching advocate list", error);
  }
  // console.log("RSC advocate List:", { advocateList });

  return (
    <AdvocateListView advocates={advocateList} />
  );
}
