import { MainLayout } from '@/components/Layout/MainLayout';
import useUsers from '../api/users';
import Link from 'next/link';
import Image from 'next/image';
import useMyProfile from '../api/profile';
import { useEffect } from 'react';
import GuestHeaderZaglushka from '@/components/Header/HeaderGuestZaglushka';
import AvatarHeaderAuthorizedUser from '@/components/Avatar/AvatarHeaderAuthorizedUser';
import AvatarZaglushka from '@/components/Avatar/AvatarZaglushka';

export default function UsersListing() {
  const { users, loading } = useUsers();
  const { profile, isLoading } = useMyProfile();

  interface Iuser {
    name: string;
    email: string;
    slug: string;
    description?: string;

    image?: {
      id: string;
      url?: string;
      width: string;
      height: string;
    };

    cover?: {
      id: string;
      url: string;
      width: string;
      height: string;
    };
  }

  return (
    <MainLayout
      headerRightSide={
        isLoading ? (
          <Image src="/assets/preloader-2.svg" width="50" height="50" alt="preloader" />
        ) : profile === null ? (
          <GuestHeaderZaglushka />
        ) : (
          <AvatarHeaderAuthorizedUser name={`${profile?.name}`} image={`${profile?.image}`} />
        )
      }
    >
      <section className="container-users-listing">
        <div className="h1">Список аккаунтов</div>
        <ul className="users-listing">
          {loading ? (
            <Image src="/assets/preloader-2.svg" width="100" height="100" className="preloader" alt="preloader" />
          ) : (
            users &&
            users.map((user: Iuser) => (
              <li className="user-listing-item" key={user?.slug}>
                <div className="left-side">
                  <Link href={`users/${user?.slug}`}>
                    <div className="avatar">
                      {user?.image?.url === null || user?.image?.url === undefined || user?.image?.url === 'unknown' ? (
                        <AvatarZaglushka name={user?.name} />
                      ) : (
                        <Image src={user?.image?.url} width="50" height="50" alt="user-avatar" />
                      )}
                    </div>
                  </Link>
                  <div className="container-for-mob">
                    <Link href={`users/${user?.slug}`}>
                      <div className="name">{user?.name}</div>
                    </Link>
                    <Link href={`mailto: ${user?.email}`} className="link-email-mob">
                      {user?.email}
                    </Link>
                  </div>
                </div>

                <Link href={`mailto: ${user?.email}`} className="link-email">
                  {user?.email}
                </Link>
              </li>
            ))
          )}
        </ul>
      </section>
    </MainLayout>
  );
}
