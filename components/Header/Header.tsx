import Link from 'next/link';
import Image from 'next/image';

export function Header({ headerRightSide }: any) {
  return (
    <header>
      <div className="container container-header">
        <div className="left-side">
          <Link href="/users">
            <Image src="/assets/logo.svg" alt="logo" width="80" height="50" />
          </Link>
          <p>Разрабатываем и запускаем сложные веб проекты</p>
        </div>

        <div>{headerRightSide}</div>
      </div>
    </header>
  );
}
