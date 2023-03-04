import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/pages/Home.module.scss';
import { MainLayout } from '@/components/Layout/MainLayout';
import useUsers from './api/users';
import useMyProfile from './api/profile';
import GuestHeaderZaglushka from '@/components/Header/HeaderGuestZaglushka';
import AvatarHeaderAuthorizedUser from '@/components/Avatar/AvatarHeaderAuthorizedUser';
import AvatarZaglushkaUserPage from '@/components/Avatar/AvaUserPageZaglushka';
import Link from 'next/link';
import Modal from 'react-modal';
import { useState } from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#profile');

export default function Profile() {
  const { profile, isLoading } = useMyProfile();

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // let subtitle;
    // // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  console.log(profile);

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
      <section id="profile" className="user-page profile-page">
        <div className="cover-and-user">
          <div className="cover">
            {profile && profile?.cover !== null ? (
              <Image src={profile?.cover?.url} width="100" height="200" alt="user-cover" />
            ) : (
              <Image src={'/assets/cover-zaglushka.png'} width="100" height="200" alt="user-cover-zaglushka" />
            )}
          </div>
          <div className="user">
            <div className="avatar">
              {profile && profile?.image !== null ? (
                <Image src={profile?.image?.url} width="100" height="100" alt="user-avatar" />
              ) : (
                <AvatarZaglushkaUserPage name={profile?.name} />
              )}
            </div>
            <div className="h1">{profile?.name}</div>

            <Link href={`mailto: ${profile?.email}`} className="e-mail">
              {profile?.email}
            </Link>
            <div>
              {profile?.description !== null ? (
                <p>profile?.description</p>
              ) : (
                <p>
                  Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым.
                  Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать
                  типографику в деле.
                </p>
              )}
            </div>
          </div>
          <button onClick={openModal} className="button-outline edit">
            <svg width="19" height="19" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18.6768 3.60059C17.8589 3.60059 17.041 3.91797 16.4062 4.55273L4.05273 16.9062L4.00391 17.1504L3.14941 21.4473L2.90527 22.5947L4.05273 22.3506L8.34961 21.4961L8.59375 21.4473L20.9473 9.09375C22.2168 7.82422 22.2168 5.82227 20.9473 4.55273C20.3125 3.91797 19.4946 3.60059 18.6768 3.60059ZM18.6768 5.08984C19.0704 5.08984 19.4672 5.2699 19.8486 5.65137C20.6085 6.41125 20.6085 7.23523 19.8486 7.99512L19.2871 8.53223L16.9678 6.21289L17.5049 5.65137C17.8864 5.2699 18.2831 5.08984 18.6768 5.08984ZM15.8691 7.31152L18.1885 9.63086L8.74023 19.0791C8.22754 18.0781 7.42188 17.2725 6.4209 16.7598L15.8691 7.31152ZM5.41992 18.0293C6.35681 18.4077 7.09229 19.1432 7.4707 20.0801L4.90723 20.5928L5.41992 18.0293Z"
                fill="black"
              />
            </svg>
            Редактировать
          </button>
        </div>

        <Modal className="Modal" isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} closeTimeoutMS={200}>
          <h2>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </section>
    </MainLayout>
  );
}
