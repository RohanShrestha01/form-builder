import { Link, Outlet, NavLink } from 'react-router-dom';
import UserNav from '../components/header/UserNav';

const navItems = [
  {
    label: 'Create Form',
    href: '/',
  },
  {
    label: 'My Forms',
    href: '/my-forms',
  },
  {
    label: 'Settings',
    href: '/settings',
  },
];

export default function BaseLayout() {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between px-6">
          <Link to="/">
            <h1 className="font-cursive text-3xl font-bold text-primary">
              Form Builder
            </h1>
          </Link>
          <nav>
            <ul className="grid h-9 w-96 grid-cols-3 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
              {navItems.map(({ label, href }, i) => (
                <li key={i}>
                  <NavLink
                    to={href}
                    className={({ isActive }) =>
                      `inline-flex w-full items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                        isActive ? 'bg-background text-foreground shadow' : ''
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <UserNav />
        </div>
      </header>
      <main className="mx-auto mt-16 max-w-[1440px] px-6 py-5">
        <Outlet />
      </main>
    </>
  );
}
