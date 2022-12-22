import Link from "next/link";
import { useRouter } from "next/router";
import { DiscordLogo, Plus } from "phosphor-react";
import { useCallback, useState } from "react";

import type { RouterOutputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";
import { Modal } from "./Modal";
import { NewServerModal } from "./NewServerModal";

const ServerLink = ({
  children,
  href,
  title,
}: {
  children: React.ReactNode;
  href: string;
  title?: string;
}) => (
  <Link
    href={href}
    title={title}
    className="flex h-12 min-h-[48px] w-12 items-center justify-center rounded-full bg-zinc-500 font-semibold text-zinc-100 transition-all hover:bg-indigo-600"
  >
    {children}
  </Link>
);

const ServerButton = ({
  children,
  onClick,
  title,
}: {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title?: string;
}) => (
  <button
    title={title}
    onClick={onClick}
    className="flex h-12 min-h-[48px] w-12 items-center justify-center rounded-full bg-zinc-500 text-2xl font-semibold text-green-600 transition-all hover:bg-green-600 hover:text-zinc-100"
  >
    {children}
  </button>
);

type Server = RouterOutputs["server"]["create"];

const Servers: React.FC = () => {
  const [isNewServerOpen, setIsNewServerOpen] = useState(false);

  const servers = trpc.server.getAll.useQuery();

  const router = useRouter();

  const handleNewServer = useCallback(() => {
    setIsNewServerOpen(true);
  }, []);

  const onNewServerSuccess = useCallback(
    (newServer: Server) => {
      servers.refetch();
      router.push(`/server/${newServer.id}`);
    },
    [router, servers]
  );

  return (
    <>
      <div className="flex h-full min-w-[72px] max-w-[72px]  flex-col items-center gap-4 overflow-y-auto bg-zinc-900 py-4 scrollbar-hide">
        <ServerLink href="/">
          <DiscordLogo size={24} />
        </ServerLink>

        <hr className="w-8 border-0 border-b-2 border-zinc-500" />

        {servers.data?.map((server) => (
          <ServerLink
            key={server.id}
            href={`/server/${server.id}`}
            title={server.name}
          >
            NS
          </ServerLink>
        ))}

        <ServerButton onClick={handleNewServer}>
          <Plus />
        </ServerButton>

        <NewServerModal
          isOpen={isNewServerOpen}
          onClose={() => setIsNewServerOpen(false)}
          onSuccess={onNewServerSuccess}
        />
      </div>
    </>
  );
};

export default Servers;
