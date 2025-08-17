import type { SelectAdvocates } from "@/db/schema";
import { typedFetch } from "@/utils/typedFetch";

import { AdvocateListView } from "@/features/AdvocateListView/AdvocateListView";

export default async function RootPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  let advocateList: SelectAdvocates[] = [];
  try {
    const { searchTerm } = searchParams;
    const url = `/advocates${searchTerm ? `?searchTerm=${searchTerm}` : ''}`;
    const advocateData = await typedFetch<{ data: SelectAdvocates[] }>(
      url
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
