import useSWR from 'swr';
import { fetcher } from '@/components/hooks/fetcher';

export default function useUserPage(slug?: any) {
  const { data, mutate, error, isLoading: isLoad } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${slug}`, fetcher);

  return { userPage: data, isLoad };
}
