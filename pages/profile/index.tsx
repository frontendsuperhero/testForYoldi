import useMyProfile from '../api/profile';

export default function Profile() {
  const { profile } = useMyProfile();

  console.log(profile);
  return 'some';
}
