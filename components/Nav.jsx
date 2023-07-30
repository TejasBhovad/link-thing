"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Provider } from "@/components/Provider";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const { data: session } = useSession();
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  useEffect(() => {
    const setProvidersList = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setProvidersList();
  }, []);

  return (
    <nav className="h-16 w-full text-3xl py-2 px-5 flex justify-between">
      <div className="flex items-center">
        <Link href="/" className="flex items-center justify-start">
          <span className="font-bold">Link</span>
          <span className="font-extralight">Thing</span>
        </Link>
      </div>
      {/* Desktop */}
      <div className="md:flex items-center hidden">
        {session?.user ? (
          <div className="gap-3 flex md:gap-5 items-center justify-center">
            <Link href="/admin" className="text-xl font-semibold">
              <Button
                type="button"
                onClick={() => {}}
                variant="ghost"
                className="text-lg font-semibold rounded-xl border-black border-2"
              >
                Dashboard
              </Button>
            </Link>
            <Link href="/" className="text-xl font-semibold">
              <Button
                type="button"
                onClick={() => {
                  signOut({ callbackUrl: "/" });
                }}
                variant="secondary"
                className="text-lg font-semibold rounded-xl border-black border-2"
              >
                Sign Out
              </Button>
            </Link>
            <Link href="/profile" className="text-xl font-semibold">
              <Image
                src={session?.user?.image}
                width={40}
                height={40}
                alt="profile picture"
                className="object-contain rounded-full"
              />
            </Link>
          </div>
        ) : (
          <div className="">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold">Sign in</span>
                  </div>
                </Button>
              ))}
          </div>
        )}
      </div>
      {/* Mobile */}
      <div className="md:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user?.image}
              height={37}
              width={37}
              alt="profile picture"
              className="object-contain rounded-full pfp"
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="absolute right-0 top-full mt-3 w-full gap-0.5  rounded-lg bg-gray-300 min-w-[200px] flex flex-col gap-0.5 justify-end items-end">
                <div className="bg-gray-100 flex rounded-t-lg w-full text-center p-2.5  items-center justify-center">
                  <Link
                    href="/profile"
                    className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Profile
                  </Link>
                </div>

                <div className="bg-gray-100 flex w-full text-center p-2.5  items-center justify-center">
                  <Link
                    href="/admin"
                    className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                    onClick={() => setToggleDropdown(false)}
                  >
                    Links
                  </Link>
                </div>
                <div className="bg-gray-100 flex w-full text-center p-2.5  items-center justify-center rounded-b-lg">
                  <Link
                    href="/"
                    className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut({ callbackUrl: "/" });
                    }}
                  >
                    <Button className="pd-0.5" type="button">
                      Sign out
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="">
            {providers &&
              Object.values(providers).map((provider) => (
                <Button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg font-semibold">Sign in</span>
                  </div>
                </Button>
              ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
