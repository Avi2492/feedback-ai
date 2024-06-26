"use client";

import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounceCallback } from "usehooks-ts";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios, { AxiosError } from "axios";
import { RiLoader2Line, RiLoginCircleLine } from "@remixicon/react";
import { useRouter } from "next/navigation";
import { signUpSchema } from "@/schemas/signUpSchema";
import Logo from "@/app/components/Logo";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const deboucedUsername = useDebounceCallback(setUsername, 300);

  const router = useRouter();
  const { toast } = useToast();

  // zod implementation
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");

        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${username}`
          );

          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error in checking Username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);

      setIsSubmitting(false);
    } catch (error: any) {
      console.error(error);

      const axiosError = error as AxiosError<ApiResponse>;

      let errorMessage = axiosError.response?.data.message;

      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive",
      });

      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <Logo />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-orange-500 transition-all duration-200 hover:underline hover:text-orange-600"
            >
              Sign In
            </Link>
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Username"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          deboucedUsername(e.target.value);
                        }}
                      />
                    </FormControl>
                    {isCheckingUsername && (
                      <RiLoader2Line className="animate-spin" />
                    )}
                    {!isCheckingUsername && usernameMessage && (
                      <p
                        className={`text-sm ${
                          usernameMessage === "Username is unique"
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {usernameMessage}
                      </p>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input placeholder="Enter your Email" {...field} />
                    <p className="text-black text-sm">
                      We will send you a verification code
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      placeholder="Enter your Password"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Loading
                  </>
                ) : (
                  <>
                    <RiLoginCircleLine className="mr-2" /> Sign Up
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
