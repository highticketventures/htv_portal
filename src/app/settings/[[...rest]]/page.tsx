import { UserProfile } from '@clerk/nextjs'

const UserProfilePage = () => {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-4rem)] py-10">
      <UserProfile />
    </div>
  );
};

export default UserProfilePage;