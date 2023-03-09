import Image from 'next/image';
import Link from 'next/link';

export default function AvatarHeaderAuthorizedUser({ name, image }: { name: string; image?: any }) {
  return (
    <Link href="/">
      <div className="avatar-header">
        <span>{name}</span>
        <div className="avatar-zaglushka-sm">
          {image && image !== null && image !== 'undefined' && image !== 'unknown' ? (
            <Image src={image} width="50" height="50" alt="user-image" />
          ) : (
            `${name?.slice(0, 1)}`
          )}
        </div>
      </div>
    </Link>
  );
}
