import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '@/components/hooks/fetcher';
import Image from 'next/image';
import { MainLayout } from '@/components/Layout/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignUp() {
  const { mutate }: any = useSWRConfig();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = yup.object().shape({
    name: yup.string().required('Обязательное поле'),
    email: yup.string().email('Введите верный e-mail').required('Обязательное поле'),
    password: yup.string().min(6, 'В пароле должно не меньше 6 символов').typeError(`Должно быть строкой`).required('Обязательное поле'),
  });

  let initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const handleSignUp = (email: string, name: string, password: string) => {
    mutate(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`,

      fetcher(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-up`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      })
        .then((response: any) => {
          if (response.status === 201 || 200) {
            localStorage.setItem('X-API-KEY', `${response.value}`);
            return response;
          } else {
            return Promise.reject(response);
          }
        })
        .then(() => {
          router.push('/');
        })
        .catch((response: any) => {
          alert(response.message);
        })
    );
  };

  return (
    <MainLayout
      headerRightSide={
        <Link href={'/auth/sign-in'}>
          <button className="button button-outline">Войти</button>
        </Link>
      }
      footerTitle={
        <>
          Уже есть аккаунт?
          <Link href={'/auth/sign-in'} className="footer-sign-up-link">
            Войти
          </Link>
        </>
      }
    >
      <div className="container-form">
        <Formik initialValues={initialValues} validateOnBlur onSubmit={(values) => {}} validationSchema={validationSchema}>
          {({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
            <form
              className="form-sign-up"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSignUp(values.email, values.name, values.password);
                }
              }}
            >
              <div className="h1">
                Регистрация
                <br /> в Yoldi Agency
              </div>
              <div className="input-name">
                <input
                  className="input"
                  type="text"
                  name="name"
                  //@ts-ignore
                  onChange={((e) => setName(e.target.value), handleChange)}
                  onBlur={handleBlur}
                  value={values.name}
                  placeholder="Имя"
                />
              </div>
              {touched.name && errors.name && <p className="error">{errors.name}</p>}
              <div className="input-e-mail">
                <input
                  className="input"
                  type="text"
                  name="email"
                  //@ts-ignore
                  onChange={((e) => setEmail(e.target.value), handleChange)}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="E-mail"
                />
              </div>
              {touched.email && errors.email && <p className="error">{errors.email}</p>}
              <div className="input-pass">
                <input
                  className="input"
                  type={`${showPassword ? 'text' : 'password'}`}
                  name="password"
                  //@ts-ignore
                  onChange={((e) => setPassword(e.target.value), handleChange)}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Пароль"
                />

                <Image
                  src={'/assets/eye-solid.svg'}
                  width="25"
                  height="25"
                  alt="eye-icon"
                  className="eye"
                  onClick={() => setShowPassword(!showPassword)}
                />
              </div>
              {touched.password && errors.password && <p className="error">{errors.password}</p>}
              <button
                className="button-gray"
                disabled={!isValid && !dirty}
                type="button"
                onClick={() => handleSignUp(values.email, values.name, values.password)}
              >
                Создать аккаунт
              </button>
            </form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}
