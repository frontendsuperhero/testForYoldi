import useSWR from 'swr';
import { fetcher } from '@/components/hooks/fetcher';

// Лист юзеров
export default function useUsers() {
  const { data, mutate, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`, fetcher);

  return { users: data, loading: isLoading };
}
