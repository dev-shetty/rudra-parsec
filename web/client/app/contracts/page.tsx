"use client";

import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { financialContract } from "@/lib/contract";
import jsPDF from "jspdf";
import { FormEvent, useState } from "react";

function ContractPage() {
  const [contractDetails, setContractDetails] = useState({
    receiverName: "",
    amount: "",
    companyName: "Finvest",
    date: `${new Date().getDate()} - ${
      new Date().getMonth() + 1
    } - ${new Date().getFullYear()}`,
  });

  function submitContract(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(contractDetails);
    const contract = document.getElementById("contract")?.innerText;
    if (!contract) return;
    const pdfDoc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    pdfDoc.setFontSize(12);
    pdfDoc.setFont("helvetica");

    const maxWidth = 180;
    const textLines = pdfDoc.splitTextToSize(contract, maxWidth);
    pdfDoc.text(textLines, 10, 10);
    pdfDoc.save("output.pdf");
  }

  return (
    <main className="flex justify-center items-center">
      <Navbar />
      <div className="md:grid md:grid-cols-2 max-w-7xl mt-20 flex flex-col-reverse">
        <aside className="justify-center items-center flex">
          <ScrollArea className="h-[80vh] m-5 p-8 overflow-auto bg-gray-100 rounded-md dark:bg-gray-800">
            <h1 className="text-2xl font-bold mb-4 text-black">
              FINANCIAL CONSULTING CONTRACT
            </h1>
            <p
              className="text-base text-gray-600 dark:text-gray-300 overflow-auto text-justify"
              id="contract"
            >
              {financialContract(
                contractDetails.receiverName,
                contractDetails.date,
                contractDetails.amount,
                contractDetails.companyName
              )}
            </p>
          </ScrollArea>
        </aside>
        <section className="p-8 flex justify-center items-center flex-col">
          <h2 className="text-2xl font-bold mb-6">Create a contract.</h2>
          <form className="space-y-6" onSubmit={submitContract}>
            <div className="space-y-2">
              <Label htmlFor="receiver-name">Receiver Name</Label>
              <Input
                id="receiver-name"
                placeholder="Enter receiver's name"
                defaultValue={contractDetails.receiverName}
                onChange={(e) => {
                  setContractDetails({
                    ...contractDetails,
                    receiverName: e.target.value,
                  });
                }}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input
                id="company-name"
                value={contractDetails.companyName}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                defaultValue={contractDetails.amount}
                onChange={(e) => {
                  setContractDetails({
                    ...contractDetails,
                    amount: e.target.value,
                  });
                }}
                placeholder="Amount"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                required
                type="text"
                value={contractDetails.date}
              />
            </div>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </section>
      </div>
    </main>
  );
}

export default ContractPage;
