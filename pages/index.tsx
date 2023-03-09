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
import { useState, useEffect, useRef } from 'react';
import ReactModal from 'react-modal';
import { fetcher } from '@/components/hooks/fetcher';
import { useSWRConfig } from 'swr';
import * as yup from 'yup';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { redirect } from 'next/navigation';

export default function Profile() {
  const { mutate }: any = useSWRConfig();
  const { profile, isLoading } = useMyProfile();
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const [nameProfile, setNameProfile] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>('');
  const [imageCover, setImageCover] = useState();
  const [imageAvatar, setImageAvatar] = useState();
  const router = useRouter();

  const imageCoverChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      handleEditCover(event.target.files[0]);
      setImageCover(event.target.files[0]);
    }
  };

  const imageAvatarChange = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      handleEditAvatar(event.target.files[0]);
      setImageAvatar(event.target.files[0]);
    }
  };

  useEffect(() => {
    ReactModal.setAppElement('#profile');
  });

  const handleEditAvatar = async (avatarFile?: File) => {
    let formData = new FormData();
    formData.append('file', avatarFile as Blob);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image`, {
      method: 'POST',
      body: formData,
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        if (response) {
          localStorage.setItem('avatarId', `${response?.id}`);

          handleEditProfile(
            profile?.name,
            localStorage.getItem('avatarId') ?? profile?.image?.id,
            localStorage.getItem('password') ?? '',
            profile?.slug,
            localStorage.getItem('coverId') ?? profile?.cover?.id,
            profile?.description
          );

          return response;
        } else {
          return Promise.reject(response);
        }
      })
      .catch((response: any) => {
        alert(response);
      });
  };

  const handleEditCover = async (coverFile?: File) => {
    let formData = new FormData();
    formData.append('file', coverFile as Blob);

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/image`, {
      method: 'POST',
      body: formData,
    })
      .then((response: any) => response.json())
      .then((response: any) => {
        if (response) {
          localStorage.setItem('coverId', `${response?.id}`);

          handleEditProfile(
            profile?.name,
            localStorage.getItem('avatarId') ?? profile?.image?.id,
            localStorage.getItem('password') ?? '',
            profile?.slug,
            localStorage.getItem('coverId') ?? profile?.cover?.id,
            profile?.description
          );

          return response;
        } else {
          return Promise.reject(response);
        }
      })
      .catch((response: any) => {
        alert(response);
      });
  };

  const handleEditProfile = (name: string, imageId: string, password: string, slug: string, coverId: string, description: string) => {
    mutate(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`,

      fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/api/profile`, {
        method: 'PATCH',
        withCredentials: true,

        headers: {
          'X-API-KEY': `${localStorage.getItem('X-API-KEY')}`,
          'Content-type': 'application/json',
        },

        body: JSON.stringify({
          name,
          imageId,
          password,
          slug,
          coverId,
          description,
        }),
      })
        .then((response: any) => {
          if (response) {
            return response;
          } else {
            return Promise.reject(response);
          }
        })
        .catch((response: any) => {
          alert(response);
        })
    );
  };

  const logout = () => {
    router.push('/users');
    localStorage.clear();
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Обязательное поле'),
    address: yup.string().min(6, 'В адресе должно быть не меньше 6 символов').required('Обязательное поле'),
    slug: yup.string().min(6, 'В пароле должно не меньше 6 символов').typeError(`Должно быть строкой`),
  });

  let initialValues = {
    name: null,
    address: null,
    description: null,
  };

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
        <div className="cover-and-edit">
          <div className="cover">
            {profile && profile?.cover !== null && profile?.cover?.url !== 'unknown' ? (
              imageCover ? (
                <Image src={URL.createObjectURL(imageCover)} width="1920" height="200" alt="user-cover-preload" />
              ) : (
                <Image src={`${profile?.cover?.url}`} width="1920" height="200" alt="user-cover" />
              )
            ) : imageCover ? (
              <Image src={URL.createObjectURL(imageCover)} width="1920" height="200" alt="user-cover-preload" />
            ) : (
              <Image src={'/assets/cover-zaglushka.png'} width="1920" height="200" alt="user-cover-zaglushka" />
            )}
            <div className="hover">
              <label>
                <button className="button button-outline">
                  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.5 3.30762L11.9385 3.84473L6.46973 9.31348L7.59277 10.4365L11.7188 6.31055V19.25H13.2812V6.31055L17.4072 10.4365L18.5303 9.31348L13.0615 3.84473L12.5 3.30762ZM5.46875 20.8125V22.375H19.5312V20.8125H5.46875Z"
                      fill="black"
                    />
                  </svg>
                  <p>Загрузить</p>
                  <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.5625 4.40625V21.5938H23.4375V4.40625H1.5625ZM3.125 5.96875H21.875V16.833L17.749 12.6826L17.1875 12.1211L13.6475 15.6611L9.15527 11.1201L8.59375 10.5586L3.125 16.0273V5.96875ZM18.75 7.53125C17.8864 7.53125 17.1875 8.2301 17.1875 9.09375C17.1875 9.9574 17.8864 10.6562 18.75 10.6562C19.6136 10.6562 20.3125 9.9574 20.3125 9.09375C20.3125 8.2301 19.6136 7.53125 18.75 7.53125ZM8.59375 12.7803L15.7715 20.0312H3.125V18.249L8.59375 12.7803ZM17.1875 14.3428L21.875 19.0303V20.0312H17.9932L14.7461 16.7598L17.1875 14.3428Z"
                      fill="black"
                    />
                  </svg>
                </button>
                <input type="file" onChange={imageCoverChange} />
              </label>
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

        <div className="user">
          <div className="avatar">
            {profile && profile?.image?.url !== null && profile?.image?.url !== undefined && profile?.image?.url !== 'unknown' ? (
              imageAvatar ? (
                <Image src={URL.createObjectURL(imageAvatar)} width="100" height="100" alt="user-avatar-preload" />
              ) : (
                <Image src={profile?.image?.url} width="100" height="100" alt="user-avatar" />
              )
            ) : imageAvatar ? (
              <Image src={URL.createObjectURL(imageAvatar)} width="100" height="100" alt="user-avatar-preload" />
            ) : (
              <AvatarZaglushkaUserPage name={profile?.name} />
            )}

            <div className="hover">
              <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M17.9688 9.375L17.4805 10.0098L15.625 12.5H4.6875V40.625H45.3125V12.5H34.375L32.5195 10.0098L32.0312 9.375H17.9688ZM19.5312 12.5H30.4688L32.3242 14.9902L32.8125 15.625H42.1875V37.5H7.8125V15.625H17.1875L17.6758 14.9902L19.5312 12.5ZM12.5 17.1875C11.6394 17.1875 10.9375 17.8894 10.9375 18.75C10.9375 19.6106 11.6394 20.3125 12.5 20.3125C13.3606 20.3125 14.0625 19.6106 14.0625 18.75C14.0625 17.8894 13.3606 17.1875 12.5 17.1875ZM25 17.1875C19.8425 17.1875 15.625 21.405 15.625 26.5625C15.625 31.72 19.8425 35.9375 25 35.9375C30.1575 35.9375 34.375 31.72 34.375 26.5625C34.375 21.405 30.1575 17.1875 25 17.1875ZM25 20.3125C28.4729 20.3125 31.25 23.0896 31.25 26.5625C31.25 30.0354 28.4729 32.8125 25 32.8125C21.5271 32.8125 18.75 30.0354 18.75 26.5625C18.75 23.0896 21.5271 20.3125 25 20.3125Z"
                  fill="white"
                />
              </svg>
              <input type="file" onChange={imageAvatarChange} />
            </div>
          </div>

          <div className="h1">{profile?.name}</div>

          <Link href={`mailto: ${profile?.email}`} className="e-mail">
            {profile?.email}
          </Link>
          <div className="description">
            {profile?.description !== null ? (
              <p>{profile?.description}</p>
            ) : (
              <p>
                Рыбатекст используется дизайнерами, проектировщиками и фронтендерами, когда нужно быстро заполнить макеты или прототипы содержимым.
                Это тестовый контент, который не должен нести никакого смысла, лишь показать наличие самого текста или продемонстрировать типографику
                в деле.
              </p>
            )}
          </div>

          <button onClick={logout} className="button-outline logout">
            <svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.5 3.625C7.33032 3.625 3.125 7.83032 3.125 13C3.125 18.1697 7.33032 22.375 12.5 22.375C15.6647 22.375 18.4692 20.8033 20.166 18.3955L18.8965 17.4922C17.4835 19.5002 15.1489 20.8125 12.5 20.8125C8.17566 20.8125 4.6875 17.3243 4.6875 13C4.6875 8.67566 8.17566 5.1875 12.5 5.1875C15.1489 5.1875 17.4805 6.49976 18.8965 8.50781L20.166 7.60449C18.4692 5.19666 15.6647 3.625 12.5 3.625ZM18.2373 9.31348L17.1143 10.4365L18.8965 12.2188H9.375V13.7812H18.8965L17.1143 15.5635L18.2373 16.6865L21.3623 13.5615L21.8994 13L21.3623 12.4385L18.2373 9.31348Z"
                fill="black"
              />
            </svg>
            Выйти
          </button>
        </div>

        <Modal className="Modal" isOpen={modalIsOpen} onRequestClose={closeModal} closeTimeoutMS={200}>
          <Formik initialValues={initialValues} validateOnBlur onSubmit={(values) => {}} validationSchema={validationSchema}>
            {({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
              <form className="form-edit-profile">
                <div className="h1">Редактировать профиль</div>

                <label>
                  <div className="name">Имя</div>

                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={values.name === null ? profile?.name : nameProfile}
                    onBlur={handleBlur}
                    // @ts-ignore
                    onChange={((event) => setNameProfile(event.target.value), handleChange)}
                  />
                  {touched.name && errors.name && <p className="error">{errors.name}</p>}
                </label>

                <label>
                  <div className="address">Адрес профиля</div>
                  <div className="container-adress-input">
                    <div className="adress-zaglushka">example.com/</div>
                    <input
                      type="text"
                      name="address"
                      value={values.address === null ? profile?.slug : address}
                      onBlur={handleBlur}
                      // @ts-ignore
                      onChange={((event) => setAddress(event.target.value), handleChange)}
                    />
                  </div>
                  {touched.address && errors.address && <p className="error">{errors.address}</p>}
                </label>

                <label>
                  <div className="description">Описание</div>
                  <textarea onChange={(event) => setDescription(event.target.value)}></textarea>
                </label>

                <div className="container-buttons">
                  <button
                    className="button button-outline"
                    onClick={(event) => {
                      event.preventDefault();
                      closeModal();
                    }}
                  >
                    Отмена
                  </button>
                  <button
                    className="button button-black"
                    onClick={(event) => {
                      event.preventDefault();

                      handleEditProfile(
                        values.name ?? profile?.name,
                        localStorage.getItem('avatarId') ?? profile?.image?.id,
                        localStorage.getItem('password') ?? '',
                        values.address ?? profile?.slug,
                        localStorage.getItem('coverId') ?? profile?.cover?.id,
                        description ?? profile?.description
                      );

                      closeModal();
                    }}
                  >
                    Сохранить
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal>
      </section>
    </MainLayout>
  );
}
