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
  isConfirmDialogDeleteOpen: boolean;
  setIsConfirmDialogDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  emptyErrorMessage?: string;
}

const AlertDeleteStudent = ({
  isConfirmDialogDeleteOpen,
  setIsConfirmDialogDeleteOpen,
  emptyErrorMessage,
  userId,
  setUserData,
  user,
}: AlertDialogProductProps) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
  const [newUserStudent, SetNewUserStudent] =
    useState<AlertDialogProductProps["user"]>(user);

  const deleteStudent = async (userId: string) => {
    setIsSubmitLoading(true);
    try {
      const response = await fetch("/api/deletestudent", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      if (response.ok) {
        const newUseWhitStudentDeleted = await response.json();
        setUserData(newUseWhitStudentDeleted);

        toast("Aluno removido com sucesso.");
      } else {
        console.error("Erro ao excluir aluno:", response);
      }
    } catch (error) {
      console.error("Erro ao excluir aluno:", error);
    } finally {
      setIsSubmitLoading(false);
      setIsConfirmDialogDeleteOpen(false);
    }
  };
  return (
    <AlertDialog open={isConfirmDialogDeleteOpen}>
      <AlertDialogContent className="bg-black_texture">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-accent sm:text-center">
            Deseja remover este aluno
          </AlertDialogTitle>
          <AlertDialogDescription className="text-[16px] text-white sm:text-center">
            Ao finalizar, o usuario sera removido dos alunos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-accent"
            onClick={() => setIsConfirmDialogDeleteOpen(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-accent"
            onClick={() => deleteStudent(userId)}
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

export default AlertDeleteStudent;
