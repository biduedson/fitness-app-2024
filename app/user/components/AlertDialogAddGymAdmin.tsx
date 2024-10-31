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

interface IAlertDialogAddGymAdminProps {
  userId: string;
  user: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>;
  setUserData: React.Dispatch<
    React.SetStateAction<IAlertDialogAddGymAdminProps["user"] | null>
  >;
  isConfirmGymAdminDialogOpen: boolean;
  setIsConfirmGymAdminDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emptyErrorMessage?: string;
}

const AlertDialogAddGymAdmin = ({
  isConfirmGymAdminDialogOpen,
  setIsConfirmGymAdminDialogOpen,
  emptyErrorMessage,
  userId,
  setUserData,
  user,
}: IAlertDialogAddGymAdminProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);

  const addGynAdmin = async (userId: string) => {
    setIsSubmitLoading(true);
    try {
      const response = await fetch("/api/addgymadmin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const newGymAdmin: Prisma.GymAdminGetPayload<{}> =
          await response.json();

        const newUserWhitGymAdmin = {
          ...user,
          gymAdmin: newGymAdmin,
        };
        setUserData(newUserWhitGymAdmin); // Atualiza o estado no componente pai
        toast("Usuario adicionado como Administrador.");
      } else {
        console.error("Erro ao adicionar Administrador:", response);
      }
    } catch (error) {
      console.error("Erro ao adicionar Administrador:", error);
    } finally {
      setIsSubmitLoading(false);
      setIsConfirmGymAdminDialogOpen(false);
    }
  };

  return (
    <AlertDialog open={isConfirmGymAdminDialogOpen}>
      <AlertDialogContent className="bg-black_texture">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-accent sm:text-center">
            Deseja Adicionar este usuário como administrador
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] text-white sm:text-center">
            Ao finalizar, o usuario sera cadastrado como administrador.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-accent"
            onClick={() => setIsConfirmGymAdminDialogOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-accent"
            onClick={() => addGynAdmin(userId)}
            disabled={isSubmitLoading}
          >
            {isSubmitLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
            )}
            Adicionar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogAddGymAdmin;
