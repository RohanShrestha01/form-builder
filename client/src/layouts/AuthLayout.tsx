import { Link, Outlet, useLocation } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export default function AuthLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex h-[100dvh] flex-col">
      <header className="border-b">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between">
          <Link to="/">
            <h1 className="text-xl font-bold">Form Builder</h1>
          </Link>
          <div className="flex gap-6">
            <Button
              className="border-primary text-primary hover:text-primary"
              variant="outline"
              size="lg"
              asChild
            >
              <Link to="/demo">Demo</Link>
            </Button>
            <Button size="lg" asChild>
              <Link to={pathname === '/signup' ? '/login' : '/signup'}>
                {pathname === '/signup' ? 'Log In' : 'Sign Up'}
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-[1440px] flex-grow">
        <section className="flex-grow"></section>
        <section className="w-[424px] self-center">
          <Outlet />
        </section>
      </main>
    </div>
  );
}
