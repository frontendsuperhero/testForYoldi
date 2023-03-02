import useSWR from 'swr';
import { fetcher } from '@/components/hooks/fetcher';
import { useEffect } from 'react';

// Данные моего профиля
export default function useMyProfile() {
  let { data, error, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,
    fetcher({
      headers: { 'X-API-KEY': `${localStorage.getItem('X-API-KEY')}`, 'Content-type': 'application/json' },
    })
  );

  useEffect(() => {
    localStorage.getItem('X-API-KEY');
  }, []);

  if (error || (data && data.statusCode === 401)) {
    return { profile: null, errorProfile: true };
  }

  return {
    profile: data,
    errorProfile: error,
    setUser: (userData) => {
      localStorage.setItem('userWithToken', JSON.stringify(userData));
      mutate(userData);
    },
  };
}
