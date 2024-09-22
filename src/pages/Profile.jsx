import ProfileNavBar from "../components/ProfileNavBar.jsx";

function Profile() {
  return (
    <>
      <div className="bg-black text-white h-[100%] w-full flex flex-row">
        <div className="w-1/3 p-5">
          <img
            src="https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg"
            alt="none"
            className="h-44 w-44 rounded-full"
          />
        </div>
        <div className="text-4xl font-bold w-full p-10">
          <h1>Mohd. Atif Ansari</h1>
        </div>
      </div>
      <ProfileNavBar />
    </>
  );
}

export default Profile;
