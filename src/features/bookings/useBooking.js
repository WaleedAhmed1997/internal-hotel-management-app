import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();
  // useQuery hook is used to fetch data
  const {
    isLoading, // Indicates whether the data is currently being loaded
    data: booking, // The fetched data
    error, // Any error that occurred during the fetch
  } = useQuery({
    queryKey: ["booking".bookingId], // An array representing the query key
    queryFn: () => getBooking(bookingId),
    retry: false, // The function responsible for fetching the data
  });

  // Return the result to be used in the component
  return { isLoading, booking, error };
}
