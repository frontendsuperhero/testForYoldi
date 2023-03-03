export default function AvatarZaglushka({ name }: { name: string }) {
  return <div className="avatar-zaglushka-sm">{name?.slice(0, 1)}</div>;
}
