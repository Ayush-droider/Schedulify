import { useState } from "react";
import axios from "axios";
import {
  Eye,
  EyeOff,
  CalendarDays,
  Loader2,
  GraduationCap,
  Sparkles,
} from "lucide-react";
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

      const role = response.data.role;

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", role);

      switch (role) {
        case "ROLE_ADMIN":
          navigate("/admin/dashboard");
          break;

        case "ROLE_TEACHER":
          navigate("/teacher/dashboard");
          break;

        case "ROLE_STUDENT":
          navigate("/student/dashboard");
          break;

        default:
          navigate("/login");
      }
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
      <div className="min-h-screen bg-slate-50">

        <div className="grid min-h-screen lg:grid-cols-2">

          {/* Left Branding Section */}

          <div className="relative hidden overflow-hidden bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 lg:flex">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_40%)]" />

            <div className="relative z-10 flex w-full flex-col justify-between p-14 text-white">

              <div>

                <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-2 backdrop-blur">

                  <GraduationCap size={22} />

                  <span className="font-semibold">

                    Schedulify

                  </span>

                </div>

                <h1 className="mt-10 text-5xl font-bold leading-tight">

                  Smart Timetable

                  <br />

                  Generation Platform

                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">

                  Generate optimized academic timetables using Timefold Solver while
                  considering faculty availability, classroom allocation, subject
                  mapping and scheduling constraints.

                </p>

              </div>

              <div className="space-y-5">

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">

                  <div className="rounded-xl bg-white/20 p-3">

                    🤖

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      Timefold optimizing engine

                    </h3>

                    <p className="mt-1 text-sm text-blue-100">

                      Generate conflict-free timetables with intelligent optimization.

                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">

                  <div className="rounded-xl bg-white/20 p-3">

                    ⚡

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      Fast & Reliable

                    </h3>

                    <p className="mt-1 text-sm text-blue-100">

                      Produce optimized schedules within seconds using Timefold Solver.

                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">

                  <div className="rounded-xl bg-white/20 p-3">

                    📅

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      Smart Resource Allocation

                    </h3>

                    <p className="mt-1 text-sm text-blue-100">

                      Automatically allocate teachers, rooms and time slots efficiently.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Login Section */}

          <div className="flex items-center justify-center bg-slate-50 px-6 py-10">

            <div className="w-full max-w-md">

              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

                <div className="mb-8 text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">

                    <CalendarDays size={34} />

                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-slate-900">

                    Welcome Back

                  </h2>

                  <p className="mt-2 text-slate-500">

                    Sign in to continue to Schedulify.

                  </p>

                </div>

                <form onSubmit={handleLogin} className="space-y-5">

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Username

                    </label>

                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                      required
                    />

                  </div>

                              <div>

                                <label className="mb-2 block text-sm font-medium text-slate-700">

                                  Password

                                </label>

                                <div className="relative">

                                  <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                    required
                                  />

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setShowPassword(!showPassword)
                                    }
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-800"
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
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                {loading ? (
                                  <>
                                    <Loader2
                                      size={20}
                                      className="animate-spin"
                                    />
                                    Logging In...
                                  </>
                                ) : (
                                  <>
                                    <Sparkles size={18} />
                                    Login to Schedulify
                                  </>
                                )}
                              </button>

                            </form>

                            <div className="mt-8 border-t border-slate-200 pt-6 text-center">

                              <p className="text-sm text-slate-500">

                                Don't have an account?{" "}

                                <Link
                                  to="/signup"
                                  className="font-semibold text-blue-600 transition hover:text-blue-700"
                                >
                                  Create Account
                                </Link>

                              </p>

                            </div>

                            <div className="mt-8 rounded-2xl bg-slate-50 p-4 text-center">

                              <p className="text-sm text-slate-500">

                                Built using{" "}

                                <span className="font-semibold text-slate-700">

                                  Spring Boot • React • Timefold Solver

                                </span>

                              </p>

                              <p className="mt-2 text-sm font-medium text-slate-700">

                                Built by Ayush Pandey

                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                    );
                  }