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
}

const AlertAction = ({
  isDialogOpen,
  setIsDialogOpen,
  userId,
  setUserData,
  user,
  actionType,
}: AlertDialogActionProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const actionUrl =
    actionType === "addStudent" ? "/api/addstudent" : "/api/deletestudent";
  const actionMethod = actionType === "addStudent" ? "POST" : "DELETE";
  const actionMessage = actionType === "addStudent" ? "adicionado" : "removido";

  const handleAction = async () => {
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
        toast(`Usuário ${actionMessage} com sucesso.`);
      } else {
        toast.error(`Erro ao ${actionMessage} usuário.`);
        console.error(`Erro ao ${actionMessage} usuário:`, response);
      }
    } catch (error) {
      toast.error(`Erro ao ${actionMessage} usuário.`);
      console.error(`Erro ao ${actionMessage} usuário:`, error);
    } finally {
      setIsSubmitLoading(false);
      setIsDialogOpen(false);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent className="bg-black_texture">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-accent sm:text-center">
            Deseja {actionType === "addStudent" ? "Adicionar" : "Remover"} este
            usuário?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] text-white sm:text-center">
            Ao finalizar, o usuário será {actionMessage}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-accent"
            onClick={() => setIsDialogOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-accent"
            onClick={handleAction}
            disabled={isSubmitLoading}
          >
            {isSubmitLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin text-white" />
            )}
            {actionType === "addStudent" ? "Adicionar" : "Remover"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertAction;
