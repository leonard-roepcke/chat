import { supabase } from "@/lib/supabaseCllient";
import Link from "next/link";
import { useRef, useState } from "react";

export default function LoginPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else console.log("loged in"); // evtl. Redirect oder UI Update
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] p-5">
      <div className="bg-[rgba(30,30,50,0.9)] border-2 border-[#4a4a6a] rounded-2xl p-10 w-full max-w-md shadow-lg backdrop-blur-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-light mb-2">Welcome Back</h1>
          <p className="text-[#b0b0c0] text-sm">Please sign in to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[#e0e0e0] mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
            ref={emailRef}
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              className="w-full p-4 border-2 border-[#5a4a7a] rounded-lg bg-[rgba(40,40,60,0.8)] text-white text-base transition focus:outline-none focus:border-[#7a6aa0] focus:bg-[rgba(50,50,70,0.9)] focus:shadow-[0_0_10px_rgba(122,106,160,0.3)] placeholder-[#9a9ab0]"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-[#e0e0e0] mb-2 text-sm font-medium">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              className="w-full p-4 border-2 border-[#5a4a7a] rounded-lg bg-[rgba(40,40,60,0.8)] text-white text-base transition focus:outline-none focus:border-[#7a6aa0] focus:bg-[rgba(50,50,70,0.9)] focus:shadow-[0_0_10px_rgba(122,106,160,0.3)] placeholder-[#9a9ab0]"
            />
          </div>

          {/* Remember + Forgot */}
          <div className="flex flex-wrap justify-between items-center gap-3">
            <label className="flex items-center gap-2 text-[#c0c0d0] text-sm">
              <input type="checkbox" className="accent-[#7a6aa0]" />
              Remember me
            </label>
            <a
              href="#"
              className="text-[#7a6aa0] text-sm hover:text-[#9a8ac0] hover:underline transition"
            >
              Forgot Password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf] border-2 border-[#5a4a7a] rounded-lg text-white text-base font-semibold transition hover:from-[#7a6add] hover:to-[#6a5fdf] hover:border-[#7a6aa0] hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(122,106,160,0.4)] active:translate-y-0"
          >
            Sign In
          </button>
        </form>

        {/* Signup */}
        <div className="text-center text-[#b0b0c0] text-sm mt-5">
          Don't have an account?{" "}
          <Link
                href="/signup"
                className="text-[#7a6aa0] font-medium hover:text-[#9a8ac0] hover:underline transition"
            >
                Signup in here
            </Link>
        </div>
      </div>
    </div>
  );
}
