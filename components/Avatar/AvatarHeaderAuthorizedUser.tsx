import Image from 'next/image';

export default function AvatarHeaderAuthorizedUser({ name, image }: { name: string; image?: any }) {
  return (
    <div className="avatar-header">
      <span>{name}</span>
      <div className="avatar-zaglushka-sm">
        {(image && image === null) || 'undefined' ? `${name.slice(0, 1)}` : <Image src={image} width="50" height="50" alt="user-image" />}
      </div>
    </div>
  );
}
