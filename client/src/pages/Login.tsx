import InputField from '../components/shared/InputField';

export default function Login() {
  return (
    <article>
      <h1 className="text-lg font-bold">Welcome Back</h1>
      <p className="mt-1 text-[15px] font-medium">Sign in to your account</p>
      <form className="mt-6 flex flex-col gap-4">
        <div className="relative z-10 text-center">
          <hr className="border-muted-foreground absolute left-0 right-0 top-1/2 -z-10" />
          <p className="text-muted-foreground inline-block bg-white px-4 text-sm uppercase">
            Or Login With Email
          </p>
        </div>
        <InputField
          label="Email"
          name="email"
          type="email"
          placeholder="test@mail.com"
          className="text-slate-600"
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          placeholder="Password123@"
          className="text-slate-600"
        />
      </form>
    </article>
  );
}
