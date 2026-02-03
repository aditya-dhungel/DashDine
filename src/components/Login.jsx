import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //Prevent page scroll only on Login page
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setErrorMsg("");
      setLoading(true);

      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);

      navigate("/");
    } catch (err) {
      console.error("Google login error:", err);
      setErrorMsg("Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    try {
      setErrorMsg("");
      setLoading(true);

      if (isSignup) {
        await auth.createUserWithEmailAndPassword(email, password);
      } else {
        await auth.signInWithEmailAndPassword(email, password);
      }

      navigate("/");
    } catch (err) {
      console.error("Email auth error:", err);

      if (err.code === "auth/invalid-email") {
        setErrorMsg("Invalid email address.");
      } else if (err.code === "auth/user-not-found") {
        setErrorMsg("No account found. Please sign up first.");
      } else if (err.code === "auth/wrong-password") {
        setErrorMsg("Wrong password. Try again.");
      } else if (err.code === "auth/email-already-in-use") {
        setErrorMsg("Email already in use. Please login instead.");
      } else if (err.code === "auth/weak-password") {
        setErrorMsg("Password should be at least 6 characters.");
      } else {
        setErrorMsg("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 p-8">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="absolute left-5 top-5 w-10 h-10 rounded-xl border border-gray-200 bg-white shadow-sm
            hover:bg-gray-50 hover:shadow-md transition active:scale-95 flex items-center justify-center"
            title="Go Home"
          >
            <span className="text-xl text-gray-800">←</span>
          </button>

          {/* Brand */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Dash<span className="text-orange-500">Dine</span>
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {isSignup
                ? "Create your account to start ordering."
                : "Login to add items to cart and place orders."}
            </p>
          </div>

          {/* Error */}
          {errorMsg && (
            <div className="mt-5 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium">
              {errorMsg}
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="mt-2 w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition disabled:opacity-60"
            >
              {loading
                ? "Please wait..."
                : isSignup
                ? "Create Account"
                : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-gray-200 flex-1"></div>
            <span className="text-xs text-gray-500 font-semibold">OR</span>
            <div className="h-px bg-gray-200 flex-1"></div>
          </div>

          {/* Google Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition disabled:opacity-60"
          >
            Continue with Google
          </button>

          {/* Toggle */}
          <p className="mt-6 text-center text-sm text-gray-600">
            {isSignup ? "Already have an account?" : "New to DashDine?"}{" "}
            <button
              type="button"
              className="font-semibold text-orange-600 hover:text-orange-700"
              onClick={() => {
                setErrorMsg("");
                setIsSignup((prev) => !prev);
              }}
            >
              {isSignup ? "Login" : "Create account"}
            </button>
          </p>
        </div>

        {/* Footer note */}
        <p className="mt-5 text-center text-xs text-gray-500">
          By continuing, you agree to DashDine’s Terms & Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
