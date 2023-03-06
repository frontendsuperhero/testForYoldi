import Link from 'next/link';
import { BsArrowRight } from 'react-icons/bs';

export default function GuestHeaderZaglushka() {
  return (
    <div className="avatar-header">
      <span>Гость</span> <div className="avatar-zaglushka-sm">Г</div>
      <div className="arrow">
        <BsArrowRight />
        <div className="title">Наведитесь, чтобы войти</div>
        <div className="title-mob">Нажмите , чтобы войти</div>
      </div>
      <div className="hover">
        <Link href={'/auth/sign-in'}>
          <button className="button button-outline">Войти</button>
        </Link>
      </div>
    </div>
  );
}
