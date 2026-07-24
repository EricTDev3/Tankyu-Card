"use client";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Card name is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .oneOf([yup.ref("password")], "Passwords do not match")
      .matches(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character",
      )
      .required("Password is required"),
  })
  .required();

export default function SignUp() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const watchPassword = watch("password");
  const watchConfirmPassword = watch("confirmPassword");

  const router = useRouter();

  const handleSignupSubmit = async (data) => {
    try {
      const newUser = await axios.post("/api/auth/signUp", {
        email: data.email,
        password: data.password,
      });
      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center font-hiro px-6 py-12 lg:px-8 bg-[url('/images/loginSignup.png')] bg-cover bg-center bg-no-repeat h-full">
      <div className="w-full max-w-sm">
        <div>
          <Image
            src="/images/cards.png"
            alt="logo"
            width={200}
            height={180}
            className="mx-auto"
          />
          <h1 className="mt-10 text-center text-2xl font-bold tracking-tight text-purple-900">
            Tankyu Card カード クエスト
          </h1>
          <h2 className="mt-10 text-center text-xl font-bold tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <form
          onSubmit={handleSubmit(handleSignupSubmit)}
          action="#"
          method="POST"
          className="mt-10 space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black-900 dark:text-black-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                {...register("email", { required: true })}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black-900 dark:text-black-900"
              >
                Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                {...register("password", { required: true })}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>

            <div className="flex items-center mt-6 justify-between">
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-black-900 dark:text-black-900"
              >
                Confirm Password
              </label>
              <div className="text-sm"></div>
            </div>
            <div className="mt-2">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register("confirmPassword", { required: true })}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-600 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
              />
            </div>
            {watchConfirmPassword && watchConfirmPassword !== watchPassword ? (
              <h4 className="text-red-500">Passwords do not match</h4>
            ) : null}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center cursor-pointer rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
            <p className="mt-10 text-center text-sm/6 text-black-900">
              Already a member?{" "}
              <a
                href="/login"
                className="font-semibold text-indigo-400 hover:text-indigo-300"
              >
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
