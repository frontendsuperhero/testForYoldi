import '@/styles/globals.scss';
import '@/styles/pages/all-pages.scss';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
// import type { Session } from 'next-auth';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

// export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<{ session: Session }>) {
//   return (
//     <SessionProvider session={session}>
//       <Component {...pageProps} />
//     </SessionProvider>
//   );
// }
