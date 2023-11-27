import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  // useQuery hook is used to fetch data
  const {
    isLoading, // Indicates whether the data is currently being loaded
    data: cabins, // The fetched data
    error, // Any error that occurred during the fetch
  } = useQuery({
    queryKey: ["cabins"], // An array representing the query key
    queryFn: getCabins, // The function responsible for fetching the data
  });

  // Return the result to be used in the component
  return { isLoading, cabins, error };
}
