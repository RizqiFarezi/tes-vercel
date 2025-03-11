import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import SearchBar from '../components/Table/SearchBar';
import Pagination from "./Table/Pagination";
import { API_Inv_Header_Admin } from '../api/api';

interface Invoice {
  inv_no: string;
  receipt_number: string | null;
  receipt_path: string | null;
  bp_code: string | null;
  inv_date: string | null;
  plan_date: string | null;
  actual_date: string | null;
  inv_faktur: string | null;
  inv_faktur_date: string | null;
  inv_supplier: string | null;
  total_dpp: number | null;
  ppn_id: number | null;
  tax_base_amount: number | null;
  tax_amount: number | null;
  pph_id: number | null;
  pph_base_amount: number | null;
  pph_amount: number | null;
  created_by: string | null;
  updated_by: string | null;
  total_amount: number | null;
  status: string | null;
  reason: string | null;
  created_at: string;
  updated_at: string;
  // Additional fields used in ListProgress
  process_status?: "In Process" | "Rejected" | "Paid" | "Ready to Payment" | "New";
}

const ListProgress: React.FC = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchSupplier, setSearchSupplier] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<Invoice[]>([]);
  const [filteredData, setFilteredData] = useState<Invoice[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const rowsPerPage = 5;

  // Fetch invoice header data
  const fetchInvoiceData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(API_Inv_Header_Admin(), {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch invoice data');
      }

      const result = await response.json();
      console.log('Raw Invoice Data Response:', result);

      if (result && typeof result === 'object') {
        let invoiceList = [];

        if (Array.isArray(result.data)) {
          invoiceList = result.data;
        } else if (result.data && typeof result.data === 'object') {
          invoiceList = Object.values(result.data);
        } else if (Array.isArray(result)) {
          invoiceList = result;
        }

        // Map status to process_status if needed
        const mappedInvoices = invoiceList.map((invoice: any) => ({
          ...invoice,
          process_status: invoice.process_status || invoice.status || "New",
          po_number: invoice.po_number || "N/A"
        }));

        if (mappedInvoices.length > 0) {
          setData(mappedInvoices);
          setFilteredData(mappedInvoices);
        } else {
          toast.warn('No invoice data found');
        }
      } else {
        throw new Error('Invalid response structure from API');
      }
    } catch (error) {
      console.error('Error fetching invoice data:', error);
      if (error instanceof Error) {
        toast.error(`Error fetching invoice data: ${error.message}`);
      } else {
        toast.error('Error fetching invoice data');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchInvoiceData();
  }, []);

  // Filter data based on search and date inputs
  useEffect(() => {
    let filtered = [...data];

    if (fromDate && toDate) {
      filtered = filtered.filter(
        (item) => {
          const docDate = item.inv_date || "";
          return docDate >= fromDate && docDate <= toDate;
        }
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [fromDate, toDate, searchSupplier, searchQuery, data]);

  const handleRefresh = () => {
    setFromDate("");
    setToDate("");
    setSearchSupplier("");
    setSearchQuery("");
    fetchInvoiceData();
    setCurrentPage(1);
  };

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-black mb-4">List Progress</h2>
  
      {/* Filter & Search Section */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex items-end gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 w-48"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded-lg px-3 py-2 mt-1 w-48"
            />
          </div>
          <button
            onClick={handleRefresh}
            className="bg-purple-900 text-sm text-white px-6 py-2 rounded hover:bg-purple-800 "
          >
            Refresh
          </button>
        </div>
  
        <div className="flex items-end gap-4 mt-6 w-80">
          <SearchBar
            placeholder="Search Supplier Code/Name..."
            onSearchChange={setSearchSupplier}
          />
        </div>
      </div>
  
      {/* Table Section */}
      <div className="overflow-x-auto shadow-md rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200 text-center mx-auto">
          <thead className="bg-gray-100 uppercase">
            <tr>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 border">Invoice Number</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 border">Supplier ID</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 border">Doc Date</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 border">Total Amount</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 border">Process Status</th>
              <th className="px-6 py-3 text-sm font-semibold text-gray-600 border">Payment Plan Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((invoice) => (
                <tr key={invoice.inv_no} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.inv_no}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.bp_code || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.inv_date || "-"}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{(invoice.total_amount || 0).toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-white text-xs font-medium ${
                        (invoice.process_status === "In Process" || invoice.status === "In Process")
                        ? "bg-yellow-200"
                        : (invoice.process_status === "Rejected" || invoice.status === "Rejected")
                        ? "bg-red-500"
                        : (invoice.process_status === "Paid" || invoice.status === "Paid")
                        ? "bg-blue-900"
                        : (invoice.process_status === "Ready to Payment" || invoice.status === "Ready to Payment")
                        ? "bg-green-400"
                        : "bg-blue-400"
                      }`}
                    >
                      {invoice.process_status || invoice.status || "New"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-800">{invoice.plan_date || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalRows={filteredData.length}
        rowsPerPage={rowsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default ListProgress;