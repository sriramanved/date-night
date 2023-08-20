import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { buttonVariants } from "./ui/Button";
import { UserAccountNav } from "./UserAccountNav";
import SearchBar from "./SearchBar";

const Navbar = async () => {
  const session = await getAuthSession();
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link href="/" className="flex gap-2 items-center">
          <img
            src="/new-logo.png"
            alt="Logo"
            className="h-8 w-8 sm:h-6 sm:w-6"
          />
          <p className="hidden text-zinc-700 text-sm font-medium md:block">
            Date Night
          </p>
        </Link>

        {/* search bar */}
        <SearchBar />

        {/* actions and new navigation links */}
        <div className="flex items-center gap-4">
          <div className="flex gap-4 mr-4"> {/* Added margin here */}
            <Link href="/places">
              <p className="text-zinc-700 text-sm font-medium hover:underline cursor-pointer">
                Places
              </p>
            </Link>
            <Link href="/events">
              <p className="text-zinc-700 text-sm font-medium hover:underline cursor-pointer">
                Events
              </p>
            </Link>
          </div>
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link href="/sign-in" className={buttonVariants()}>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
