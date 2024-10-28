import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Prisma } from "@prisma/client";
import Image from "next/image";

interface ITableUsersProps {
  users: Prisma.UserGetPayload<{
    include: {
      student: true;
      gymAdmin: true;
    };
  }>[];
}
const TableUsers = ({ users }: ITableUsersProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Imagem</TableHead>
          <TableHead>Usuario</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell className=" relative font-medium w-[80px] h-[100px]  p-2">
                <div className="relative w-[80px] h-[100px]  rounded-lg">
                  <Image
                    src={user.image!}
                    alt="user image"
                    fill
                    className="absolute object-cover p-2"
                    sizes="(width: 80px)"
                    priority
                  />
                </div>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TableUsers;
