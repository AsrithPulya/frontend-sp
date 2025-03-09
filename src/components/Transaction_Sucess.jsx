import React from "react";
import { CheckCircle } from "lucide-react";
import { jsPDF } from "jspdf";

const TransactionSuccess = () => {
  const transactionData = {
    amount: "1,500.00",
    to: "Alex Johnson",
    id: "alex@sabpe",
    date: "25 May 2024",
    time: "12:45 PM",
    paymentMethod: "SabPe Wallet",
    transactionId: "SABPE43219876",
    receiptNumber: "SABPE43219876",
  };

  const handleDownload = () => {
    const doc = new jsPDF();

    // SabPe title
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 255);
    doc.text("SabPe", doc.internal.pageSize.width / 2, 15, { align: "center" });

    doc.setTextColor(0, 0, 0);

    // Transaction Successful title
    doc.setFontSize(16);
    doc.text("Transaction Successful", doc.internal.pageSize.width / 2, 25, {
      align: "center",
    });

    // Dashed line
    doc.setLineWidth(0.5);
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 30, doc.internal.pageSize.width - 10, 30, "D");

    // Transaction details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    let yPosition = 40;

    const details = [
      `Amount: ₹ ${transactionData.amount}`,
      `To: ${transactionData.to}`,
      `ID: ${transactionData.id}`,
      `Date: ${transactionData.date}`,
      `Time: ${transactionData.time}`,
      `Payment Method: ${transactionData.paymentMethod}`,
      `Transaction ID: ${transactionData.transactionId}`,
      `Receipt Number: ${transactionData.receiptNumber}`,
    ];

    details.forEach((detail, index) => {
      doc.text(detail, 20, yPosition + index * 10);
    });

    // Add another dashed line
    doc.line(
      10,
      yPosition + details.length * 10 + 5,
      doc.internal.pageSize.width - 10,
      yPosition + details.length * 10 + 5,
      "D"
    );

    // Security message
    doc.setFontSize(10);
    doc.text(
      "All payments are secured and encrypted",
      doc.internal.pageSize.width / 2,
      yPosition + details.length * 10 + 15,
      { align: "center" }
    );

    doc.save(`Transaction_${transactionData.transactionId}.pdf`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Transaction Successful
          </h2>
          <div className="space-y-2">
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Amount:</span>
              <span className="text-gray-800">₹ {transactionData.amount}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">To:</span>
              <span className="text-gray-800">{transactionData.to}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">ID:</span>
              <span className="text-gray-800">{transactionData.id}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Date:</span>
              <span className="text-gray-800">{transactionData.date}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Time:</span>
              <span className="text-gray-800">{transactionData.time}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Payment Method:</span>
              <span className="text-gray-800">{transactionData.paymentMethod}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold text-gray-600">Transaction ID:</span>
              <span className="text-gray-800">{transactionData.transactionId}</span>
            </p>
          </div>
          <p className="text-sm text-gray-500 text-center">
            All payments are secured and encrypted
          </p>
          <p className="flex justify-between">
            <span className="font-semibold text-gray-600">Receipt Number:</span>
            <span className="text-gray-800">{transactionData.receiptNumber}</span>
          </p>

          <div className="flex justify-between gap-2">
            <button className="flex-1 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600 transition duration-200">
              Share
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Download
            </button>
          </div>
          <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSuccess;