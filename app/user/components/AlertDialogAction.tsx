"use client";
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
import { Loader2 } from "lucide-react";
import { Prisma } from "@prisma/client";
import { ActionType } from "../types/userTypes";

interface AlertDialogActionProps {
  userId: string;
  user: Prisma.UserGetPayload<{
    include: { student: true; gymAdmin: true };
  }>;
  setUserData: React.Dispatch<
    React.SetStateAction<AlertDialogActionProps["user"] | null>
  >;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  actionType: ActionType;
  emptyErrorMessage?: string;
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertAction = ({
  isDialogOpen,
  setIsDialogOpen,
  userId,
  setUserData,
  user,
  actionType,
  setLoadingButton,
}: AlertDialogActionProps) => {
  let actionUrl: string;
  let actionMethod: string;
  let actionMessage: string;
  let dialogTitle: string;
  let dialogDescription: string;
  let nameButtonAction: string;

  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  switch (actionType) {
    case "addStudent":
      actionUrl = "/api/addstudent";
      actionMethod = "POST";
      nameButtonAction = "Liberar";
      actionMessage = "Acesso os exercícios liberado.";
      dialogTitle = "Deseja liberar o acesso aos exercícios ?";
      dialogDescription =
        " Ao finalizar, o usuário terá o acesso ao guia de exercícios liberado";
      break;
    case "deleteStudent":
      actionUrl = "/api/deletestudent";
      actionMethod = "DELETE";
      nameButtonAction = "Bloquear";
      actionMessage = "Acesso os exercícios bloqueado.";
      dialogTitle = "Deseja bloquear o acesso aos exercícios ?";
      dialogDescription =
        " Ao finalizar, o usuário terá o acesso ao guia de exercícios bloqueado";
      break;
    case "addGymAdmin":
      actionUrl = "/api/addgymadmin";
      actionMethod = "POST";
      nameButtonAction = "Adicionar";
      actionMessage = "Administrador adicionado.";
      dialogTitle = "Deseja adicionar como administrador?";
      dialogDescription = " Ao finalizar, o usuário sera administrador.";

      break;
    case "deleteGymAdmin":
      actionUrl = "/api/deletegymadmin";
      actionMethod = "DELETE";
      nameButtonAction = "Remover";
      actionMessage = "Administrador excluido.";
      dialogTitle = "Deseja remover este administrador?";
      dialogDescription =
        " Ao finalizar, o usuário não sera mais  administrador.";

      break;
  }

  const handleAction = async () => {
    setLoadingButton(true);
    setIsSubmitLoading(true);
    try {
      const response = await fetch(actionUrl, {
        method: actionMethod,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUserData(updatedUser);
        toast(actionMessage);
      } else {
        toast.error(`Erro ao ${actionMessage} usuário.`);
        console.error(`Erro ao ${actionMessage} usuário:`, response);
      }
    } catch (error) {
      toast.error(actionMessage);
      console.error(`Erro ao ${actionMessage} usuário:`, error);
    } finally {
      setIsSubmitLoading(false);
      setLoadingButton(false);
      setIsDialogOpen(false);
      console.log(user);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent className="bg-gray-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600 sm:text-center">
            {dialogTitle!}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] text-white sm:text-center">
            {dialogDescription!}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-black  hover:bg-slate-800 hover:text-white"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-blue-500"
            onClick={handleAction}
            disabled={isSubmitLoading}
          >
            {isSubmitLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
            )}
            {nameButtonAction!}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertAction;
