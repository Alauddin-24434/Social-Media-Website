import ProfileComponent from "../../components/ProfileComponent/ProfileComponent";
import QrCodeComponent from "../../components/QrCodeComponent/QrCodeComponent";

import ProfileLayout from "../../layouts/ProfileLayout";



const ProfileLanding = () => {
  return (
    <ProfileLayout>
      <div className="h-auto">
        <div className="py-4">
          <ProfileComponent />
        </div>
        <hr />
        <div className="flex justify-center items-center p-24">
          <QrCodeComponent />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileLanding;