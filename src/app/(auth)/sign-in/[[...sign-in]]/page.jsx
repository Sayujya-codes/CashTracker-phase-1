import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md px-4 py-8">
        <SignIn />
      </div>
    </section>
  );
}
