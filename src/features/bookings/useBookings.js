import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constant";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY

  // useQuery hook is used to fetch data
  const {
    isLoading, // Indicates whether the data is currently being loaded
    data: { data: bookings, count } = {}, // The fetched data
    error, // Any error that occurred during the fetch
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page], // An array representing the query key
    queryFn: () => getBookings({ filter, sortBy, page }), // The function responsible for fetching the data
  });

  // PRE-FETCHING

  // FOR NEXT PAGE
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  // FOR PREV PAGE
  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  // Return the result to be used in the component
  return { isLoading, error, bookings, count };
}
