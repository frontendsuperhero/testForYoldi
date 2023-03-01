import { useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import useSWR, { useSWRConfig } from 'swr';
import { fetcher } from '@/components/hooks/fetcher';
import Image from 'next/image';
import { MainLayout } from '@/components/Layout/MainLayout';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignIn() {
  const { mutate }: any = useSWRConfig();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Введите верный e-mail').required('Обязательное поле'),
    password: yup.string().min(6, 'В пароле должно не меньше 6 символов').typeError(`Должно быть строкой`).required('Обязательное поле'),
  });

  let initialValues = {
    email: '',
    password: '',
  };

  const handleSignUp = (email: string, password: string) => {
    mutate(
      'https://frontend-test-api.yoldi.agency/api/auth/login',

      fetcher('https://frontend-test-api.yoldi.agency/api/auth/login', {
        method: 'POST',
        headers: { 'X-API-KEY': '5cbfb38a-c832-4035-889d-28ed90e1b4a0', 'Content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
        .then((response: any) => {
          if (response.status === 201 || 200) {
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
          еще нет аккаунта?
          <Link href={'/auth/sign-up'} className="footer-sign-up-link">
            Зарегистрироваться
          </Link>
        </>
      }
    >
      <div className="container-form">
        <Formik initialValues={initialValues} validateOnBlur onSubmit={(values) => {}} validationSchema={validationSchema}>
          {({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
            <form className={'form-sign-up'}>
              <div className="h1">Вход в Yoldi Agency</div>
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
              <button className="button-gray" disabled={!isValid && !dirty} type="button" onClick={() => handleSignUp(values.email, values.password)}>
                Войти
              </button>
            </form>
          )}
        </Formik>
      </div>
    </MainLayout>
  );
}
