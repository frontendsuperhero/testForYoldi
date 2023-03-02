import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '@/components/hooks/fetcher';
import { useEffect, useState } from 'react';

// Данные моего профиля
export default function useMyProfile() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('X-API-KEY') : null;

  let { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, () =>
    fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
      method: 'GET',
      headers: { 'X-API-KEY': token, 'Content-type': 'application/json' },
    })
  );

  if (error || (data && data.statusCode === 401)) {
    return { profile: null, errorProfile: true };
  }

  return {
    profile: data,
    errorProfile: error,
  };
}
