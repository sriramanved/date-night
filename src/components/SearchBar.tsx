"use client";

import { Prisma, Subreddit, Post } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import debounce from "lodash.debounce";
import { usePathname, useRouter } from "next/navigation";
import { FC, useCallback, useEffect, useRef, useState } from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/Command";
import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import { BookCopyIcon, Users } from "lucide-react";
import { ExtendedPost } from "@/types/db";

interface SearchBarProps {}

const SearchBar: FC<SearchBarProps> = ({}) => {
  const [input, setInput] = useState<string>("");
  const pathname = usePathname();
  const commandRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(commandRef, () => {
    setInput("");
  });

  const request = debounce(async () => {
    refetch();
  }, 300);

  const debounceRequest = useCallback(() => {
    request();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isFetching,
    data: { communities, posts } = { communities: [], posts: [] },
    refetch,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      if (!input) return { communities: [], posts: [] };
      const { data } = await axios.get(`/api/search?q=${input}`);
      return data as {
        communities: (Subreddit & {
          _count: Prisma.SubredditCountOutputType;
        })[];
        posts: ExtendedPost[];
      };
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  useEffect(() => {
    setInput("");
  }, [pathname]);

  return (
    <Command
      ref={commandRef}
      className="relative rounded-lg border max-w-lg z-50 overflow-visible"
    >
      <CommandInput
        onValueChange={(text) => {
          setInput(text);
          debounceRequest();
        }}
        value={input}
        className="custom-input outline-none border-none focus:border-none focus:outline-none ring-0"
        placeholder="Search communities and posts..."
      />

      {input.length > 0 && (
        <CommandList className="absolute bg-white top-full inset-x-0 shadow rounded-b-md">
          {isFetched && communities.length === 0 && posts.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {communities && communities.length > 0 && (
            <CommandGroup heading="Communities">
              {communities.map((subreddit) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/r/${e}`);
                    router.refresh();
                  }}
                  key={subreddit.id}
                  value={subreddit.name}
                >
                  <Users className="mr-2 h-4 w-4" />
                  <a href={`/r/${subreddit.name}`}>r/{subreddit.name}</a>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {posts && posts.length > 0 && (
            <CommandGroup heading="Posts">
              {posts.map((post) => (
                <CommandItem
                  onSelect={(e) => {
                    router.push(`/r/${post.subreddit.name}/post/${e}`);
                    router.refresh();
                  }}
                  key={post.id}
                  value={post.title}
                >
                  <BookCopyIcon className="mr-2 h-4 w-4" />
                  <a href={`/r/${post.subreddit.name}/post/${post.id}`}>
                    {post.title}
                  </a>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  );
};

export default SearchBar;
