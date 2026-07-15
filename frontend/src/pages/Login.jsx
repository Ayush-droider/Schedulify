import { useState } from "react";
import axios from "axios";
import { Eye, EyeOff, CalendarDays, Loader2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(error.response.data.message || "Login failed");
      } else {
        alert("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white/20 p-4 rounded-full">
            <CalendarDays size={40} />
          </div>

          <h1 className="text-4xl font-bold mt-4">
            Schedulify
          </h1>

          <p className="text-gray-200 mt-2 text-center">
            Smart Timetable Generator
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-300"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-300 hover:text-white font-semibold transition"
          >
            Sign Up
          </Link>
        </div>

        <div className="mt-8 text-center text-sm text-gray-300">
          Built by <span className="font-semibold">Ayush Pandey</span>
        </div>
      </div>
    </div>
  );
}