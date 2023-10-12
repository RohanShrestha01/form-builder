import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import ErrorSvg from '../assets/error.svg';

export default function Error({ fullScreen = true }: { fullScreen?: boolean }) {
  const error = useRouteError();

  return isRouteErrorResponse(error) && error.status === 404 ? (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[#1A2238]">
      <h1 className="xs:text-8xl text-9xl font-extrabold tracking-widest text-white">
        404
      </h1>
      <div className="absolute rotate-12 rounded bg-[#FF6A3D] px-2 text-sm">
        Page Not Found
      </div>
      <a
        href="/"
        className="group relative mt-5 inline-block text-sm font-medium text-[#FF6A3D] focus:outline-none focus:ring active:text-orange-500"
      >
        <span className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] transition-transform group-hover:translate-x-0 group-hover:translate-y-0"></span>

        <span className="relative block border border-current bg-[#1A2238] px-8 py-3">
          Go Home
        </span>
      </a>
    </div>
  ) : (
    <div
      className={`mx-auto flex flex-col items-center justify-center gap-4 ${
        fullScreen ? 'h-screen pb-32' : 'mt-10'
      }`}
    >
      <img src={ErrorSvg} alt="Error" className="h-80" />
      <span className="font-medium">
        Oops! Something went wrong. Please refresh or try again later!
      </span>
    </div>
  );
}
