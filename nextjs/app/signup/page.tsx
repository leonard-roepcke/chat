import { supabase } from "@/lib/supabaseCllient";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
export default function SignUpPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    const { error } = await supabase.auth.signUp({ email, password: password || undefined });
    if (error) {
      setError(error.message);
    } else {
      setError(null);
      console.log("Account created successfully");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] p-5">
      <div className="bg-[rgba(30,30,50,0.9)] border-2 border-[#4a4a6a] rounded-2xl p-10 w-full max-w-lg shadow-lg backdrop-blur-md">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-white text-2xl font-light mb-2">Create Account</h1>
          <p className="text-[#b0b0c0] text-sm">Join us today and get started</p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-[#e0e0e0] mb-2 text-sm font-medium">
              Email Address
            </label>
            <input
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
              Password (Optional)
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a password or leave blank"
              minLength={8}
              className="w-full p-4 border-2 border-[#5a4a7a] rounded-lg bg-[rgba(40,40,60,0.8)] text-white text-base transition focus:outline-none focus:border-[#7a6aa0] focus:bg-[rgba(50,50,70,0.9)] focus:shadow-[0_0_10px_rgba(122,106,160,0.3)] placeholder-[#9a9ab0]"
            />
            <p className="text-[#9a9ab0] text-xs mt-2">
              Leave blank to receive a secure login link via email instead
            </p>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-3 p-4 bg-[rgba(40,40,60,0.5)] border border-[#5a4a7a] rounded-lg focus-within:border-[#7a6aa0] focus-within:shadow-[0_0_5px_rgba(122,106,160,0.3)]">
            <input type="checkbox" id="terms" required className="accent-[#7a6aa0] mt-1" />
            <label htmlFor="terms" className="text-[#c0c0d0] text-xs leading-relaxed">
              I agree to the{" "}
              <a href="#" className="text-[#7a6aa0] hover:text-[#9a8ac0] hover:underline transition">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#7a6aa0] hover:text-[#9a8ac0] hover:underline transition">
                Privacy Policy
              </a>. I understand that by creating an account, I'm accepting these terms and conditions.
            </label>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full p-4 bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf] border-2 border-[#5a4a7a] rounded-lg text-white text-base font-semibold transition hover:from-[#7a6add] hover:to-[#6a5fdf] hover:border-[#7a6aa0] hover:-translate-y-0.5 hover:shadow-[0_5px_15px_rgba(122,106,160,0.4)] active:translate-y-0"
          >
            Create Account
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6 text-[#7a7a8a] text-sm">
          <div className="flex-1 h-px bg-[#5a4a7a]" />
          <span className="px-4">or</span>
          <div className="flex-1 h-px bg-[#5a4a7a]" />
        </div>

        {/* Login link */}
        <div className="text-center text-[#b0b0c0] text-sm">
          Already have an account?{" "}
          
            <Link
                href="/login"
                className="text-[#7a6aa0] font-medium hover:text-[#9a8ac0] hover:underline transition"
            >
                login in here
            </Link>
        </div>
      </div>
    </div>
  );
}
