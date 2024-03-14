import SignIn from "~/components/auth/signIn";

export default function HomePage() {
  return (
      <main className="w-full h-screen -skew-y-[25deg] bg-sky-500">
        <div className="w-full h-full skew-y-[25deg]">
          <div className="flex gap-4 m-16 text-8xl font-extrabold tracking-tight text-white drop-shadow-xl">
            <div className="p-3 rounded-xl shadow-lg -skew-y-12 bg-sky-500">
              GO
            </div>
            <div className="text-sky-500">Short</div>
          </div>
          <div className="flex flex-col gap-10 justify-center items-center -mt-10 w-full h-2/3">
            <h1 className="text-8xl font-extrabold text-white drop-shadow-xl">
              shorten your links in no time!
            </h1>
            <div className="flex justify-center items-center w-1/2">
              <SignIn label="Get Started" />
            </div>
          </div>
        </div>
      </main>
  );
}
