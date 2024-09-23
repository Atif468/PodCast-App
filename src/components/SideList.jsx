import SearchBar from "./SearchBar";

function SideList() {
  const data = [
    {
      songName: "Lost in the Rhythm",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1200,
    },
    {
      songName: "Echoes of the Night",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 850,
    },
    {
      songName: "Sunset Serenade",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 500,
    },
    {
      songName: "Waves of Silence",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1420,
    },
    {
      songName: "Moonlit Horizon",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 920,
    },
    {
      songName: "Starlight Symphony",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1100,
    },
    {
      songName: "Dream Chaser",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1300,
    },
    {
      songName: "Electric Pulse",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 700,
    },
    {
      songName: "Golden Vibes",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1350,
    },
    {
      songName: "Ocean Breeze",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 950,
    },
    {
      songName: "Midnight Drive",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1450,
    },
    {
      songName: "City Lights",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1150,
    },
    {
      songName: "Skyline Melody",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 890,
    },
    {
      songName: "Aurora Dreams",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1100,
    },
    {
      songName: "Crimson Skies",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1280,
    },
    {
      songName: "Mystic River",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1000,
    },
    {
      songName: "Eclipse",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 860,
    },
    {
      songName: "Neon Nightfall",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1320,
    },
    {
      songName: "Whispers in the Wind",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 1140,
    },
    {
      songName: "Solstice Dreams",
      image: "https://img.freepik.com/premium-photo/3d-avatar-boy-character_914455-603.jpg",
      likes: 980,
    },
  ];
  
  return (
    <>
      <div className="sidebar  h-[100%] w-1/4  text-white  overflow-auto touch-auto fixed scroll-m-0">
        <div className="bg-black text-white">
          <div className="flex justify-center h-9 sticky top-2 backdrop:backdrop-blur-sm">
            <SearchBar />
          </div>
          <div className=" text-white">
            {data.map((d) => (
              <div className="flex items-center my-2 p-2 w-[95%] rounded-3xl">
                <img src={d.image} alt={d.songName} className="w-12 h-12 object-cover rounded-full border" />
                <div className="ml-4">
                  <p className="text-lg font-semibold">{d.songName}</p>
                  <p className="text-sm text-gray-400">{d.likes} likes</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default SideList;
