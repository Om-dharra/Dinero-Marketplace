import { Sheet,SheetContent,SheetHeader,SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface NavbarItem{
  href: string;
  children: React.ReactNode;
}

interface Props{
  item : NavbarItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session?: {
    user: {
      id: string;
      email: string;
      username: string;
    };
  } | undefined;
}

export const NavbarSidebar = ({ item, open, onOpenChange, session }: Props) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle className="text-2xl font-semibold">
            Menu
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {item.map((navItem:NavbarItem) => (
            <a
              key={navItem.href}
              href={navItem.href}
              onClick={() => onOpenChange(false)}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium"
            >
              {navItem.children}
            </a>
          ))}
          
          <div className="border-t">
            {session?.user ? (
              <Link prefetch href="/dashboard"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium">
                Dashboard
              </Link>
            ) : (
              <>
                <Link prefetch href="/sign-in"
                className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium">
                    Log In
                  </Link>
                  <Link prefetch href="/sign-up"
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium">

                Start Selling
              </Link>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
    
  );
}