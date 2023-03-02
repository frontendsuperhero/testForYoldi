import useSWR from 'swr';
import { fetcher } from '@/components/hooks/fetcher';

// Лист юзеров
export default function useUsers() {
  const { data, mutate, error } = useSWR('https://frontend-test-api.yoldi.agency/api/user', fetcher);

  return { users: data };
}
