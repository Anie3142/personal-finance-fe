'use client';

import { Download, FileText, Table, FileSpreadsheet, Calendar, Mail, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

// Mock transaction data for export
const mockTransactions = [
  { date: '2025-01-15', merchant: 'Shoprite Lekki', category: 'Food & Dining', amount: -12500, type: 'debit' },
  { date: '2025-01-15', merchant: 'Uber Trip', category: 'Transportation', amount: -3500, type: 'debit' },
  { date: '2025-01-14', merchant: 'Salary Credit', category: 'Income', amount: 650000, type: 'credit' },
  { date: '2025-01-14', merchant: 'Netflix', category: 'Entertainment', amount: -4400, type: 'debit' },
  { date: '2025-01-14', merchant: 'MTN Airtime', category: 'Bills', amount: -5000, type: 'debit' },
  { date: '2025-01-13', merchant: 'DSTV Premium', category: 'Entertainment', amount: -24500, type: 'debit' },
  { date: '2025-01-13', merchant: 'Bolt Ride', category: 'Transportation', amount: -2800, type: 'debit' },
  { date: '2025-01-12', merchant: 'Jumia Order', category: 'Shopping', amount: -35000, type: 'debit' },
  { date: '2025-01-12', merchant: 'POS Withdrawal', category: 'Cash', amount: -50000, type: 'debit' },
  { date: '2025-01-11', merchant: 'Freelance Payment', category: 'Income', amount: 150000, type: 'credit' },
  { date: '2025-01-10', merchant: 'Chicken Republic', category: 'Food & Dining', amount: -4500, type: 'debit' },
  { date: '2025-01-09', merchant: 'AWS Subscription', category: 'Bills', amount: -12000, type: 'debit' },
];

const quickExports = [
  { id: 'csv', title: 'All Transactions (CSV)', icon: Table, format: 'csv' },
  { id: 'pdf', title: 'Monthly Report (PDF)', icon: FileText, format: 'pdf' },
  { id: 'tax', title: 'Tax Summary (CSV)', icon: FileSpreadsheet, format: 'csv' },
];

const accounts = [
  { id: '1', name: 'GTBank Savings' },
  { id: '2', name: 'Access Current' },
  { id: '3', name: 'Cash Wallet' },
];

const categories = [
  'Food & Dining', 'Transportation', 'Bills & Utilities', 'Shopping', 'Entertainment', 'Healthcare'
];

// Utility function to format currency
function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(Math.abs(amount));
}

// Generate CSV from transactions
function generateCSV(transactions: typeof mockTransactions): string {
  const headers = ['Date', 'Merchant', 'Category', 'Type', 'Amount (NGN)'];
  const rows = transactions.map(t => [
    t.date,
    `"${t.merchant}"`,
    t.category,
    t.type,
    t.amount.toString()
  ]);
  
  return [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
}

// Generate Tax Summary CSV
function generateTaxSummaryCSV(transactions: typeof mockTransactions): string {
  const income = transactions.filter(t => t.type === 'credit');
  const expenses = transactions.filter(t => t.type === 'debit');
  
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(expenses.reduce((sum, t) => sum + t.amount, 0));
  const netIncome = totalIncome - totalExpenses;
  
  // Group expenses by category
  const expensesByCategory: Record<string, number> = {};
  expenses.forEach(t => {
    expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + Math.abs(t.amount);
  });
  
  let csv = 'NairaTrack Tax Summary Report\n';
  csv += `Generated: ${format(new Date(), 'PPP')}\n\n`;
  csv += 'INCOME SUMMARY\n';
  csv += 'Source,Amount (NGN)\n';
  income.forEach(t => {
    csv += `"${t.merchant}",${t.amount}\n`;
  });
  csv += `Total Income,${totalIncome}\n\n`;
  
  csv += 'EXPENSE SUMMARY BY CATEGORY\n';
  csv += 'Category,Amount (NGN)\n';
  Object.entries(expensesByCategory).forEach(([cat, amount]) => {
    csv += `${cat},${amount}\n`;
  });
  csv += `Total Expenses,${totalExpenses}\n\n`;
  
  csv += 'NET INCOME\n';
  csv += `Net,${netIncome}\n`;
  
  return csv;
}

// Generate PDF-like HTML for printing/download
function generatePDFContent(transactions: typeof mockTransactions): string {
  const income = transactions.filter(t => t.type === 'credit');
  const expenses = transactions.filter(t => t.type === 'debit');
  
  const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = Math.abs(expenses.reduce((sum, t) => sum + t.amount, 0));
  const netIncome = totalIncome - totalExpenses;
  const savingsRate = totalIncome > 0 ? ((netIncome / totalIncome) * 100).toFixed(1) : '0';
  
  // Group expenses by category
  const expensesByCategory: Record<string, number> = {};
  expenses.forEach(t => {
    expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + Math.abs(t.amount);
  });
  
  return `
<!DOCTYPE html>
<html>
<head>
  <title>NairaTrack Monthly Report</title>
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 40px; border-bottom: 2px solid #10b981; padding-bottom: 20px; }
    .header h1 { color: #10b981; margin: 0; font-size: 28px; }
    .header p { color: #666; margin-top: 10px; }
    .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 40px; }
    .summary-card { background: #f8fafc; padding: 20px; border-radius: 8px; text-align: center; }
    .summary-card .label { color: #666; font-size: 14px; margin-bottom: 5px; }
    .summary-card .value { font-size: 24px; font-weight: bold; }
    .summary-card .income { color: #10b981; }
    .summary-card .expense { color: #ef4444; }
    .summary-card .net { color: #3b82f6; }
    .section { margin-bottom: 30px; }
    .section h2 { color: #1f2937; border-bottom: 1px solid #e5e7eb; padding-bottom: 10px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f8fafc; font-weight: 600; }
    .amount-credit { color: #10b981; }
    .amount-debit { color: #ef4444; }
    .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
    @media print { body { margin: 20px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>💰 NairaTrack</h1>
    <p>Monthly Financial Report</p>
    <p style="font-size: 12px; color: #999;">Generated: ${format(new Date(), 'PPPp')}</p>
  </div>
  
  <div class="summary-grid">
    <div class="summary-card">
      <div class="label">Total Income</div>
      <div class="value income">${formatCurrency(totalIncome)}</div>
    </div>
    <div class="summary-card">
      <div class="label">Total Expenses</div>
      <div class="value expense">${formatCurrency(totalExpenses)}</div>
    </div>
    <div class="summary-card">
      <div class="label">Net Savings (${savingsRate}%)</div>
      <div class="value net">${formatCurrency(netIncome)}</div>
    </div>
  </div>
  
  <div class="section">
    <h2>📊 Spending by Category</h2>
    <table>
      <thead>
        <tr><th>Category</th><th style="text-align:right">Amount</th><th style="text-align:right">% of Total</th></tr>
      </thead>
      <tbody>
        ${Object.entries(expensesByCategory)
          .sort(([,a], [,b]) => b - a)
          .map(([cat, amount]) => `
            <tr>
              <td>${cat}</td>
              <td style="text-align:right">${formatCurrency(amount)}</td>
              <td style="text-align:right">${((amount / totalExpenses) * 100).toFixed(1)}%</td>
            </tr>
          `).join('')}
      </tbody>
    </table>
  </div>
  
  <div class="section">
    <h2>📝 All Transactions</h2>
    <table>
      <thead>
        <tr><th>Date</th><th>Merchant</th><th>Category</th><th style="text-align:right">Amount</th></tr>
      </thead>
      <tbody>
        ${transactions.map(t => `
          <tr>
            <td>${t.date}</td>
            <td>${t.merchant}</td>
            <td>${t.category}</td>
            <td style="text-align:right" class="amount-${t.type}">
              ${t.type === 'debit' ? '-' : '+'}${formatCurrency(t.amount)}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  </div>
  
  <div class="footer">
    <p>Generated by NairaTrack - Your Personal Finance Companion</p>
    <p>© ${new Date().getFullYear()} NairaTrack. All rights reserved.</p>
  </div>
</body>
</html>`;
}

// Download helper function
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Download PDF using print dialog
function downloadPDF(content: string, filename: string) {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    // Give it time to load then print
    setTimeout(() => {
      printWindow.print();
    }, 500);
  } else {
    // Fallback: download as HTML
    downloadFile(content, filename.replace('.pdf', '.html'), 'text/html');
    toast({
      title: 'Downloaded as HTML',
      description: 'Open the file and use Print → Save as PDF',
    });
  }
}

export default function Export() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [monthlyReport, setMonthlyReport] = useState(true);
  const [loading, setLoading] = useState<string | null>(null);
  const [exportedFiles, setExportedFiles] = useState<string[]>([]);
  const [customFormat, setCustomFormat] = useState('csv');

  const handleQuickExport = async (exportType: string) => {
    setLoading(exportType);
    
    // Simulate small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const timestamp = format(new Date(), 'yyyy-MM-dd');
    
    switch (exportType) {
      case 'csv':
        const csv = generateCSV(mockTransactions);
        downloadFile(csv, `nairatrack-transactions-${timestamp}.csv`, 'text/csv');
        toast({ title: 'CSV Downloaded!', description: `${mockTransactions.length} transactions exported` });
        break;
        
      case 'pdf':
        const pdfContent = generatePDFContent(mockTransactions);
        downloadPDF(pdfContent, `nairatrack-report-${timestamp}.pdf`);
        toast({ title: 'Report Generated!', description: 'Use Print dialog to save as PDF' });
        break;
        
      case 'tax':
        const taxCsv = generateTaxSummaryCSV(mockTransactions);
        downloadFile(taxCsv, `nairatrack-tax-summary-${timestamp}.csv`, 'text/csv');
        toast({ title: 'Tax Summary Downloaded!', description: 'Income and expense breakdown exported' });
        break;
    }
    
    setExportedFiles(prev => [...prev, exportType]);
    setLoading(null);
  };

  const handleCustomExport = async () => {
    setLoading('custom');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const timestamp = format(new Date(), 'yyyy-MM-dd');
    
    if (customFormat === 'pdf') {
      const pdfContent = generatePDFContent(mockTransactions);
      downloadPDF(pdfContent, `nairatrack-custom-report-${timestamp}.pdf`);
      toast({ title: 'Custom Report Generated!', description: 'Use Print dialog to save as PDF' });
    } else {
      const csv = generateCSV(mockTransactions);
      downloadFile(csv, `nairatrack-custom-export-${timestamp}.${customFormat}`, 
        customFormat === 'csv' ? 'text/csv' : 'application/vnd.ms-excel');
      toast({ title: 'Export Downloaded!', description: `Custom export saved as ${customFormat.toUpperCase()}` });
    }
    
    setLoading(null);
  };

  return (
    <div className="container py-6 pb-24 lg:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Export Center</h1>
        <p className="text-muted-foreground">Download your financial data in various formats</p>
      </div>

      {/* Quick Exports */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        {quickExports.map((exp) => (
          <Card 
            key={exp.id} 
            className={cn(
              "cursor-pointer hover:border-primary/50 transition-colors",
              exportedFiles.includes(exp.id) && "border-green-500/50 bg-green-50/50"
            )}
            onClick={() => handleQuickExport(exp.id)}
          >
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn(
                "h-10 w-10 rounded-lg flex items-center justify-center",
                exportedFiles.includes(exp.id) ? "bg-green-100" : "bg-primary/10"
              )}>
                {loading === exp.id ? (
                  <Loader2 className="h-5 w-5 text-primary animate-spin" />
                ) : exportedFiles.includes(exp.id) ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <exp.icon className="h-5 w-5 text-primary" />
                )}
              </div>
              <div>
                <span className="font-medium">{exp.title}</span>
                {exportedFiles.includes(exp.id) && (
                  <p className="text-xs text-green-600">Downloaded ✓</p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Custom Export */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Custom Export</CardTitle>
          <CardDescription>Build a custom export with your preferred filters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={startDate} onSelect={setStartDate} initialFocus className="pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={endDate} onSelect={setEndDate} initialFocus className="pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Accounts</Label>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue placeholder="Select accounts" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Accounts</SelectItem>
                  {accounts.map(a => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categories</Label>
              <Select defaultValue="all">
                <SelectTrigger><SelectValue placeholder="Select categories" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Format</Label>
            <Select value={customFormat} onValueChange={setCustomFormat}>
              <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="csv">CSV (Spreadsheet)</SelectItem>
                <SelectItem value="pdf">PDF (Report)</SelectItem>
                <SelectItem value="excel">Excel (.xls)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="gap-2" 
            onClick={handleCustomExport}
            disabled={loading === 'custom'}
          >
            {loading === 'custom' ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Generate Export
          </Button>
        </CardContent>
      </Card>

      {/* Scheduled Exports */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5" /> Scheduled Exports</CardTitle>
          <CardDescription>Automatically receive reports via email (Premium)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
            <div>
              <p className="font-medium">Monthly Report Email</p>
              <p className="text-sm text-muted-foreground">Receive your monthly summary on the 1st of each month</p>
            </div>
            <Switch checked={monthlyReport} onCheckedChange={setMonthlyReport} />
          </div>
        </CardContent>
      </Card>

      {/* Export History */}
      <Card>
        <CardHeader><CardTitle>Recent Downloads</CardTitle></CardHeader>
        <CardContent>
          {exportedFiles.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No exports yet. Click on a quick export above to get started!
            </p>
          ) : (
            <div className="space-y-3">
              {exportedFiles.map((fileType, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">
                        {fileType === 'csv' && 'All Transactions (CSV)'}
                        {fileType === 'pdf' && 'Monthly Report (PDF)'}
                        {fileType === 'tax' && 'Tax Summary (CSV)'}
                      </p>
                      <p className="text-sm text-muted-foreground">Just now</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleQuickExport(fileType)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Re-download
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
