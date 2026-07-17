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

export default function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          username,
          password,
        }
      );

      alert("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Registration failed"
        );
      } else {
        alert(
          "Unable to connect to the server."
        );
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

                  Build Better

                  <br />

                  Timetables Faster

                </h1>

                <p className="mt-6 max-w-lg text-lg leading-8 text-blue-100">

                  Create your Schedulify account and start generating optimized,
                  conflict-free academic timetables using Timefold Solver.

                </p>

              </div>

              <div className="space-y-5">

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">

                  <div className="rounded-xl bg-white/20 p-3">

                    🚀

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      Smart Scheduling

                    </h3>

                    <p className="mt-1 text-sm text-blue-100">

                      Automatically generate optimized and conflict-free timetables.

                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">

                  <div className="rounded-xl bg-white/20 p-3">

                    👨‍🏫

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      Faculty Optimization

                    </h3>

                    <p className="mt-1 text-sm text-blue-100">

                      Respect teacher preferences, availability and workload.

                    </p>

                  </div>

                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">

                  <div className="rounded-xl bg-white/20 p-3">

                    🏫

                  </div>

                  <div>

                    <h3 className="font-semibold">

                      Intelligent Resource Allocation

                    </h3>

                    <p className="mt-1 text-sm text-blue-100">

                      Efficiently assign classrooms, subjects and time slots.

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Signup Card */}

          <div className="flex items-center justify-center bg-slate-50 px-6 py-10">

            <div className="w-full max-w-md">

              <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-xl">

                <div className="mb-8 text-center">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">

                    <CalendarDays size={34} />

                  </div>

                  <h2 className="mt-6 text-3xl font-bold text-slate-900">

                    Create Account

                  </h2>

                  <p className="mt-2 text-slate-500">

                    Join Schedulify and start building optimized timetables.

                  </p>

                </div>

                <form
                  onSubmit={handleSignup}
                  className="space-y-5"
                >

                  <div>

                    <label className="mb-2 block text-sm font-medium text-slate-700">

                      Username

                    </label>

                    <input
                      type="text"
                      value={username}
                      onChange={(e) =>
                        setUsername(e.target.value)
                      }
                      placeholder="Choose a username"
                      required
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
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
                                  onChange={(e) =>
                                    setPassword(e.target.value)
                                  }
                                  placeholder="Create a secure password"
                                  required
                                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />

                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowPassword(!showPassword)
                                  }
                                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-slate-700"
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
                                  Creating Account...
                                </>
                              ) : (
                                <>
                                  <Sparkles size={18} />
                                  Create Account
                                </>
                              )}
                            </button>

                          </form>

                          <div className="mt-8 border-t border-slate-200 pt-6 text-center">

                            <p className="text-sm text-slate-500">

                              Already have an account?{" "}

                              <Link
                                to="/login"
                                className="font-semibold text-blue-600 transition hover:text-blue-700"
                              >
                                Login
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