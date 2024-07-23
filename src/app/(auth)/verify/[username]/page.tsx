"use client";

import Logo from "@/app/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import { RiLoader2Line, RiLoginCircleLine } from "@remixicon/react";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post<ApiResponse>(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "Success",
        description: response.data.message,
      });

      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Verification Failed",
        description:
          axiosError.response?.data.message ??
          "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(true);
    }
  };
  return (
    <>
      <section>
        <div className="flex items-center justify-center px-4 py-16 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <div className="mb-2 flex justify-center">
              <Logo />
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight text-black">
              Sign up to create account
            </h2>
            <p className="mt-2 text-center text-base text-gray-600">
              Enter the Verification code sent to your email{" "}
            </p>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
              >
                <FormField
                  name="code"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your OTP</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your OTP" {...field} />
                      </FormControl>

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
                      Verifying...
                    </>
                  ) : (
                    <>
                      <RiLoginCircleLine className="mr-2" /> Verify Your Otp
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerifyAccount;
