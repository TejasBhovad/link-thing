"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

const DangerZone = () => {
  // hook to setState of delete account
  const [deleteAccount, setDeleteAccount] = React.useState(false);

  // handle delete account
  const handleDeleteAccount = () => {
    setDeleteAccount(!deleteAccount);
    deleteUser();
  };

  // function to delete account from the database
  const deleteUser = () => {
    // delete user
    console.log("delete user");
    setDeleteAccount(false);
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-20 text-3xl font-semibold flex items-center justify-start px-8">
        Danger Zone
      </div>
      <div className="flex-grow h-full w-full px-8">
        <div className="h-full w-4/5 flex flex-col gap-3">
          <div className="w-full h-24 rounded-md flex flex justify-start items-center">
            <Button
              className="w-45 text-lg outline"
              variant="outline"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DangerZone;
