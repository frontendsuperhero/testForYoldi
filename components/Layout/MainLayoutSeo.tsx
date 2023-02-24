import Head from 'next/head';
import { Header } from '../Header/Header';
import Footer from '../Footer.tsx/Footer';

export function MainLayoutSeo({ children, title }: any) {
  return (
    <div className="container-outter-app">
      <Head>
        <title>{title}</title>
        <meta name="keywords" content="next, typescript, react" />
        <meta name="description" content="This is app on next, typescript, react." />
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <main>{children}</main>
      <Footer></Footer>
    </div>
  );
}
