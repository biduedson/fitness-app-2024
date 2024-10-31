import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Loader2, User } from "lucide-react";
import { Prisma } from "@prisma/client";

interface AlertDialogProductProps {
  userId: string;
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
  setUserData: React.Dispatch<
    React.SetStateAction<AlertDialogProductProps["user"] | null>
  >;
  isConfirmDialogGymAdminDeletOpen: boolean;
  setIsConfirmDialogGymAdminDeletOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  emptyErrorMessage?: string;
}

const AlertGymAdminDelete = ({
  isConfirmDialogGymAdminDeletOpen,
  setIsConfirmDialogGymAdminDeletOpen,
  emptyErrorMessage,
  userId,
  setUserData,
  user,
}: AlertDialogProductProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const deleteGymAdmin = async (userId: string) => {
    setIsSubmitLoading(true);
    try {
      const response = await fetch("/api/deletegymadmin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const newUseWhitGymAdminDeleted = await response.json();
        setUserData(newUseWhitGymAdminDeleted);

        toast("Administrador removido com sucesso.");
      } else {
        console.error("Erro ao excluir Administrador:", response);
      }
    } catch (error) {
      console.error("Erro ao excluir Administrador:", error);
    } finally {
      setIsSubmitLoading(false);
      setIsConfirmDialogGymAdminDeletOpen(false);
    }
  };
  return (
    <AlertDialog open={isConfirmDialogGymAdminDeletOpen}>
      <AlertDialogContent className="bg-black_texture">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-accent sm:text-center">
            Deseja remover este administrador
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] text-white sm:text-center">
            Ao finalizar, o administrador sera removido .
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-accent"
            onClick={() => setIsConfirmDialogGymAdminDeletOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-accent"
            onClick={() => deleteGymAdmin(userId)}
            disabled={isSubmitLoading}
          >
            {isSubmitLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
            )}
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertGymAdminDelete;
