export default function AvatarZaglushkaUserPage({ name }: { name: string }) {
  return <div className="avatar-zaglushka-user-page">{name?.slice(0, 1)}</div>;
}
