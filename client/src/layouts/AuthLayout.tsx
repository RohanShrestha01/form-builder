import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex h-[100dvh] flex-col">
      <header className="mx-auto flex h-14 w-full max-w-[1440px] items-center text-lg font-bold">
        Form Builder
      </header>
      <main className="mx-auto flex w-full max-w-[1440px] flex-grow">
        <section className="flex-grow"></section>
        <section className="w-96 self-center">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
