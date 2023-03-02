import { MainLayout } from '@/components/Layout/MainLayout';
import useUserPage from '../api/userPage';
import { useRouter } from 'next/router';

export default function UserPage() {
  const router = useRouter();
  let query = router.query;

  const { userPage } = useUserPage(query.userPage);

  console.log(userPage, 'Страница юзера');

  return (
    <MainLayout>
      <section></section>
    </MainLayout>
  );
}
