import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LoadingScreen = ({ message }: { message: string }) => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-r bg-transparent text-white">
    <div className="flex flex-col items-center">
      <AiOutlineLoading3Quarters className="animate-spin text-5xl" />
      <span className="animate-pulse text-lg mt-2">{message}</span>
    </div>
  </div>
);

export default LoadingScreen;
