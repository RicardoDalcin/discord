import Link from "next/link";
import { DiscordLogo } from "phosphor-react";

import { trpc } from "../utils/trpc";

const Servers: React.FC = () => {
  const servers = trpc.server.getAll.useQuery();

  return (
    <div className="flex h-full min-w-[72px] max-w-[72px]  flex-col items-center gap-4 overflow-y-auto bg-zinc-900 py-4 scrollbar-hide">
      <Link
        className="flex min-h-[48px] w-12 items-center justify-center rounded-full bg-zinc-500 text-3xl font-semibold text-zinc-100 transition-all hover:bg-indigo-600"
        href="/"
      >
        <DiscordLogo />
      </Link>

      <hr className="w-8 border-0 border-b-2 border-zinc-500" />

      {servers.data?.map((server) => (
        <>
          <Link
            key={server.id}
            className="flex h-12 min-h-[48px] w-12 items-center justify-center rounded-full bg-zinc-500 font-semibold text-zinc-100 transition-all hover:bg-indigo-600"
            href={`/server/${server.id}`}
            title={server.name}
          >
            NS
          </Link>
        </>
      ))}
    </div>
  );
};

export default Servers;
