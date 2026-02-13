import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/ui/shadcn/table";
import { useLoaderData } from "@tanstack/react-router";
import { ComponentProps } from "react";

export function KycTable({ ...props }: ComponentProps<typeof Table>) {
  const { kycDetails } = useLoaderData({
    from: "/(auth)/(existing-user)/(admin)/manage/",
  });

  return (
    <Table {...props}>
      <TableHeader>
        <TableRow>
          <TableHead className="font-medium">{"Account Holder Name"}</TableHead>
          <TableHead className="font-medium">{"Aadhar No."}</TableHead>
          <TableHead className="font-medium">{"Bank Account"}</TableHead>
          <TableHead className="font-medium">{"Bank Name"}</TableHead>
          <TableHead className="font-medium">{"Branch Name"}</TableHead>
          <TableHead className="font-medium">{"IFSC"}</TableHead>
          <TableHead className="font-medium">{"PAN"}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {kycDetails.map(
          ({
            id,
            aadhar,
            accountHolderName,
            bankAccount,
            bankName,
            branchName,
            ifsc,
            pan,
          }) => (
            <TableRow key={id}>
              <TableCell className="font-medium">{accountHolderName}</TableCell>
              <TableCell className="font-medium">{aadhar}</TableCell>
              <TableCell className="font-medium">{bankAccount}</TableCell>
              <TableCell className="font-medium">{bankName}</TableCell>
              <TableCell className="font-medium">{branchName}</TableCell>
              <TableCell className="font-medium">{ifsc}</TableCell>
              <TableCell className="font-medium">{pan}</TableCell>
            </TableRow>
          ),
        )}
      </TableBody>
    </Table>
  );
}
