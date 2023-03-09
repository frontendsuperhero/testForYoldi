import { MainLayout } from '@/components/Layout/MainLayout';
import useUserPage from '../api/userPage';
import { useRouter } from 'next/router';
import AvatarHeaderAuthorizedUser from '@/components/Avatar/AvatarHeaderAuthorizedUser';
import useMyProfile from '../api/profile';
import Image from 'next/image';
import Link from 'next/link';
import GuestHeaderZaglushka from '@/components/Header/HeaderGuestZaglushka';
import AvatarZaglushkaUserPage from '@/components/Avatar/AvaUserPageZaglushka';

export default function UserPage() {
  const router = useRouter();
  let query = router.query;

  const { userPage, isLoad } = useUserPage(query.userPage);
  const { profile, isLoading } = useMyProfile();

  console.log(userPage, 'профиль');

  return (
    <MainLayout
      headerRightSide={
        isLoading ? (
          <Image src="/assets/preloader-2.svg" width="50" height="50" alt="preloader" />
        ) : profile === null ? (
          <GuestHeaderZaglushka />
        ) : (
          <AvatarHeaderAuthorizedUser name={profile?.name} image={profile?.image} />
        )
      }
    >
      <section className="user-page">
        {isLoad ? (
          <Image src="/assets/preloader-2.svg" width="100" height="100" className="preloader" alt="preloader" />
        ) : (
          <div>
            <div className="cover">
              {userPage && userPage?.cover !== null && userPage?.cover?.url !== 'unknown' && userPage?.cover?.url !== undefined ? (
                <Image src={userPage?.cover?.url} width="1920" height="200" alt="user-cover" />
              ) : (
                <Image src="/assets/cover-zaglushka.png" width="1920" height="200" alt="user-cover-zaglushka" />
              )}
            </div>

            <div className="user">
              <div className="avatar">
                {userPage && userPage?.image !== null && userPage?.image?.url !== undefined && userPage?.image?.url !== 'unknown' ? (
                  <Image src={userPage?.image?.url} width="100" height="100" alt="user-avatar" />
                ) : (
                  <AvatarZaglushkaUserPage name={userPage?.name} />
                )}
              </div>
              <div className="h1">{userPage?.name}</div>

              <Link href={`mailto: ${userPage?.email}`} className="e-mail">
                {userPage?.email}
              </Link>
              <div>
                {userPage?.description !== null ? (
                  <p>{userPage?.description}</p>
                ) : (
                  <p>
                    Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы
                    содержимым. Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или
                    продемонстрировать типографику в деле.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </MainLayout>
  );
}
