"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { useToggleTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { LogOut, Moon, Paintbrush, Settings, Shield, Sun } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";

function DarkModeToggle() {
  const { theme } = useTheme();

  if (theme == "dark") {
    return (
      <>
        <Sun className="mr-2 size-4" />
        <span>Light Mode</span>
      </>
    );
  } else {
    return (
      <>
        <Moon className="mr-2 size-4" />
        <span>Dark Mode</span>
      </>
    );
  }
}

export default function SidebarProfileOptions() {
  const toggleTheme = useToggleTheme();
  const { data: session } = useSession();
  if (!session) return redirect("/");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="border-new-gray-200 aspect-square rounded-full border-4 bg-black p-0 text-white"
          variant="ghost"
        >
          {session.user.name?.charAt(0) ?? "U"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-2 min-w-64 p-2">
        <div className="flex gap-2">
          <div className="border-new-gray-200 flex aspect-square size-11 items-center justify-center rounded-full border-4 bg-black p-0 text-white">
            {session.user.name?.charAt(0) ?? "U"}
          </div>
          <div className="flex flex-col">
            <p>{session.user.name}</p>
            <p className="text-sm text-gray-400">{session.user.email}</p>
          </div>
        </div>
        <Separator className="my-2" />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <Settings className="mr-2 size-4" />
            User Settings
          </Link>
        </DropdownMenuItem>
        {session.user.role == "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/dashboard/admin">
              <Shield className="mr-2 size-4" />
              Admin Settings
            </Link>
          </DropdownMenuItem>
        )}
        <Separator className="my-2" />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/cleanups">
            <Paintbrush className="mr-2 size-4" />
            Cleanups
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={toggleTheme}>
          <DarkModeToggle />
        </DropdownMenuItem>
        <Separator className="my-2" />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut className="mr-2 size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}