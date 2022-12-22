import { useState, useCallback } from "react";

import { Button } from "./Button";
import { Modal } from "./Modal";

import type { RouterOutputs } from "../utils/trpc";
import { trpc } from "../utils/trpc";

interface InputProps {
  label: string;
}

const Input: React.FC<
  InputProps & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, ...props }) => (
  <div>
    <label
      htmlFor="email"
      className="block text-sm font-medium uppercase text-gray-700"
    >
      {label}
    </label>

    <div className="mt-1">
      <input
        className="block w-full rounded-sm bg-neutral-200 px-3 py-3 text-zinc-800 focus:outline-none"
        aria-describedby="email-description"
        {...props}
      />
    </div>

    <p className="mt-2 text-xs text-gray-500" id="email-description">
      Ao criar um servidor, você concorda com as{" "}
      <a
        className="text-blue-500 hover:underline"
        href="https://discord.com/guidelines"
        target="_blank"
        rel="noopener noreferrer"
      >
        diretrizes da comunidade
      </a>{" "}
      do Discord.
    </p>
  </div>
);

type Server = RouterOutputs["server"]["create"];

interface NewServerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (newServer: Server) => void | Promise<void>;
}

export const NewServerModal: React.FC<NewServerModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [serverName, setServerName] = useState("");

  const server = trpc.server.create.useMutation();

  const handleAddServer = useCallback(async () => {
    console.log(serverName);
    if (!serverName) return;

    try {
      const newServer = await server.mutateAsync({ name: serverName });

      onClose();

      if (onSuccess) onSuccess(newServer);
    } catch (err) {
      console.log(err);
    }
  }, [onClose, onSuccess, server, serverName]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Personalize seu servidor">
      <div className="flex flex-col gap-4">
        <p className="w-full text-center text-base">
          Deixe seu novo servidor com a sua cara dando um nome e um ícone a ele.
          Se quiser, é possível mudar depois.
        </p>

        <Input
          label="Nome do servidor"
          value={serverName}
          onChange={(e) => setServerName(e.target.value)}
        />
      </div>

      <div className="mt-4 pt-3 sm:flex sm:flex-row-reverse">
        <Button onClick={handleAddServer}>Criar servidor</Button>

        <Button variant="secondary">Cancelar</Button>
      </div>
    </Modal>
  );
};
