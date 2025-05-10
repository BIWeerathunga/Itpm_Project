import Transaction from "../models/TransactionModel.js";
import User from "../models/UserSchema.js";
import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import { convertCurrency } from './currencyController.js';

export const generateReport = async (req, res) => {
    try {
        const { userId, startDate, endDate, format, currency } = req.body;
        
        const transactions = await Transaction.find({
            user: userId,
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ date: 1 });

        if (format === 'excel') {
            return await generateExcelReport(res, transactions, currency);
        } else if (format === 'pdf') {
            return await generatePdfReport(res, transactions, currency);
        } else {
            const summary = await generateSummary(transactions, currency);
            return res.status(200).json({
                success: true,
                report: transactions,
                summary
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

async function generateSummary(transactions, targetCurrency) {
    const summary = {
        totalIncome: 0,
        totalExpense: 0,
        byCategory: {},
        currency: targetCurrency || 'USD'
    };

    for (const t of transactions) {
        let amount = t.amount;
        
        // Convert to target currency if needed
        if (targetCurrency && t.currency !== targetCurrency) {
            amount = await convertCurrency(t.amount, t.currency, targetCurrency);
        }

        if (t.transactionType === 'income') {
            summary.totalIncome += amount;
        } else {
            summary.totalExpense += amount;
            summary.byCategory[t.category] = (summary.byCategory[t.category] || 0) + amount;
        }
    }

    summary.net = summary.totalIncome - summary.totalExpense;
    return summary;
}

async function generateExcelReport(res, transactions, targetCurrency) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    // Add headers
    worksheet.columns = [
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Title', key: 'title', width: 25 },
        { header: 'Amount', key: 'amount', width: 15 },
        { header: 'Original Currency', key: 'originalCurrency', width: 15 },
        { header: 'Converted Amount', key: 'convertedAmount', width: 20 },
        { header: 'Category', key: 'category', width: 20 },
        { header: 'Type', key: 'type', width: 15 },
        { header: 'Description', key: 'description', width: 40 }
    ];

    // Add data
    for (const t of transactions) {
        let convertedAmount = t.amount;
        if (targetCurrency && t.currency !== targetCurrency) {
            convertedAmount = await convertCurrency(t.amount, t.currency, targetCurrency);
        }

        worksheet.addRow({
            date: t.date.toISOString().split('T')[0],
            title: t.title,
            amount: t.amount,
            originalCurrency: t.currency,
            convertedAmount: convertedAmount.toFixed(2),
            category: t.category,
            type: t.transactionType,
            description: t.description
        });
    }

    // Add summary
    const summary = await generateSummary(transactions, targetCurrency);
    const summarySheet = workbook.addWorksheet('Summary');
    
    summarySheet.addRow(['Report Summary']);
    summarySheet.addRow(['Currency', summary.currency]);
    summarySheet.addRow(['Total Income', summary.totalIncome.toFixed(2)]);
    summarySheet.addRow(['Total Expense', summary.totalExpense.toFixed(2)]);
    summarySheet.addRow(['Net Balance', summary.net.toFixed(2)]);
    summarySheet.addRow([]);
    summarySheet.addRow(['Expenses by Category']);
    
    Object.entries(summary.byCategory).forEach(([category, amount]) => {
        summarySheet.addRow([category, amount.toFixed(2)]);
    });

    // Add some styling
    worksheet.getRow(1).font = { bold: true };
    summarySheet.getRow(1).font = { bold: true, size: 14 };
    summarySheet.getRow(7).font = { bold: true };

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
        'Content-Disposition',
        'attachment; filename=financial_report.xlsx'
    );

    await workbook.xlsx.write(res);
    res.end();
}

async function generatePdfReport(res, transactions, targetCurrency) {
    const doc = new PDFDocument();
    const filename = 'financial_report.pdf';
    
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    doc.pipe(res);

    // Title
    doc.fontSize(20).text('Financial Report', { align: 'center' });
    doc.moveDown();

    // Summary
    const summary = await generateSummary(transactions, targetCurrency);
    
    doc.fontSize(14).text('Summary:', { underline: true });
    doc.text(`Currency: ${summary.currency}`);
    doc.text(`Total Income: ${summary.currency} ${summary.totalIncome.toFixed(2)}`);
    doc.text(`Total Expense: ${summary.currency} ${summary.totalExpense.toFixed(2)}`);
    doc.text(`Net Balance: ${summary.currency} ${summary.net.toFixed(2)}`);
    doc.moveDown();

    // Expenses by Category
    doc.fontSize(14).text('Expenses by Category:', { underline: true });
    Object.entries(summary.byCategory).forEach(([category, amount]) => {
        doc.text(`${category}: ${summary.currency} ${amount.toFixed(2)}`);
    });
    doc.moveDown();

    // Transaction Details
    doc.fontSize(14).text('Transaction Details:', { underline: true });
    doc.moveDown();

    // Table header
    doc.font('Helvetica-Bold');
    doc.text('Date', 50, doc.y);
    doc.text('Description', 150, doc.y);
    doc.text('Amount', 400, doc.y, { width: 100, align: 'right' });
    doc.moveDown();
    doc.font('Helvetica');

    // Table rows
    for (const t of transactions) {
        let amount = t.amount;
        if (targetCurrency && t.currency !== targetCurrency) {
            amount = await convertCurrency(t.amount, t.currency, targetCurrency);
        }

        doc.text(t.date.toISOString().split('T')[0], 50, doc.y);
        doc.text(`${t.title} (${t.category})`, 150, doc.y);
        doc.text(`${summary.currency} ${amount.toFixed(2)}`, 400, doc.y, { width: 100, align: 'right' });
        doc.moveDown();
        
        // Add page break if needed
        if (doc.y > 700) {
            doc.addPage();
            doc.text('Date', 50, doc.y);
            doc.text('Description', 150, doc.y);
            doc.text('Amount', 400, doc.y, { width: 100, align: 'right' });
            doc.moveDown();
        }
    }

    doc.end();
}

export const getReportFormats = (req, res) => {
    return res.status(200).json({
        success: true,
        formats: ['json', 'pdf', 'excel']
    });
};