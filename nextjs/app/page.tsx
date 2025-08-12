import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] p-5 font-sans">
      <div
        className="bg-[rgba(30,30,50,0.9)] border-2 border-[#5a4a7a] rounded-2xl p-10 max-w-md w-full
                   shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-sm
                   text-center"
      >
        <header className="mb-10">
          <h1 className="text-white text-4xl font-light mb-4">Welcome</h1>
          <p className="text-[#b0b0c0] text-base mb-2">Get started with your account</p>
          <p className="text-[#9a9ab0] text-sm">Choose how you'd like to continue</p>
        </header>

        <div className="flex flex-col gap-5 mb-10">
          <a
            href="/login"
            className="relative overflow-hidden rounded-lg border-2 border-[#5a4a7a]
                       bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf]
                       px-6 py-4 text-white text-lg font-semibold
                       transition-transform duration-300
                       hover:translate-y-[-2px] hover:border-[#7a6aa0] hover:shadow-[0_5px_15px_rgba(122,106,160,0.4)]"
          >
            Sign In
          </a>

          <a
            href="/signup"
            className="relative overflow-hidden rounded-lg border-2 border-[#5a4a7a]
                       bg-[rgba(40,40,60,0.8)]
                       px-6 py-4 text-white text-lg font-semibold
                       transition-transform duration-300
                       hover:translate-y-[-2px] hover:border-[#7a6aa0] hover:shadow-[0_5px_15px_rgba(122,106,160,0.3)]"
          >
            Create Account
          </a>
        </div>

        <footer className="text-[#9a9ab0] text-xs leading-snug">
          By continuing, you agree to our{" "}
          <Link href="/login" className="text-[#7a6aa0] hover:text-[#9a8ac0] hover:underline">
            Login
          </Link>{" "}
          and{" "}
          <Link href="/signup" className="text-[#7a6aa0] hover:text-[#9a8ac0] hover:underline">
            Sign Up
          </Link>
        </footer>

      </div>
    </main>
  );
}
