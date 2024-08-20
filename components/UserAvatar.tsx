import Image from "next/image";

const UserAvatar = ({ imageUrl, name }: { imageUrl: string; name: string }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className=" relative w-[40px]  h-[40px] ">
        <Image
          src={imageUrl}
          fill
          alt="UserImage"
          className=" object-cover shadow-md rounded-full"
        />
      </div>
      <p className="text-white text-center text-[10px]">{name}</p>
    </div>
  );
};

export default UserAvatar;
