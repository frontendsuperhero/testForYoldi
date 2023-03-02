import { MainLayout } from '@/components/Layout/MainLayout';
import useUsers from '../api/users';
import Link from 'next/link';
import Image from 'next/image';
import useMyProfile from '../api/profile';
import { useEffect } from 'react';
import GuestHeaderZaglushka from '@/components/Zaglushka/HeaderGuestZaglushka';
import AvatarAuthorizedUser from '@/components/Avatar/AvatarAuthorizedUser';

export default function usersListing() {
  const { users } = useUsers();
  const { profile, errorProfile } = useMyProfile();

  // console.log(users);
  console.log(profile, 'Профиль');

  interface Iuser {
    name: string;
    email: string;
    slug: string;
    description: string;

    image?: {
      id: string;
      url: string;
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
    <MainLayout headerRightSide={profile === null ? <GuestHeaderZaglushka /> : <AvatarAuthorizedUser name={'name'} />}>
      <section className="container-users-listing">
        <div className="h1">Список аккаунтов</div>
        <ul className="users-listing">
          {users &&
            users.map((user: Iuser) => (
              <li className="user-listing-item" key={user.slug}>
                <Link href={`users/${user.slug}`}>
                  <div className="left-side">
                    <div className="avatar">
                      {user.image === null ? (
                        <div className="avatar-zaglushka">{`${user.name.slice(0, 1)}`}</div>
                      ) : (
                        <Image src={`${user?.image?.url}`} width="50" height="50" alt="user-image" />
                      )}
                    </div>
                    <div>{user.name}</div>
                  </div>
                </Link>

                <Link href={`mailto: ${user.email}`}>{user.email}</Link>
              </li>
            ))}
        </ul>
      </section>
    </MainLayout>
  );
}
