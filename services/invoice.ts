import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { COMMON_ITEMS } from '../constants';
import { ConfirmedBooking } from '../types';

export const generateInvoicePDF = (booking: ConfirmedBooking) => {
  const { details, estimate, id, createdAt } = booking;
  const doc = new jsPDF();

  const primaryColor: [number, number, number] = [37, 99, 235];
  const secondaryColor = [15, 23, 42];
  const grayColor = [100, 116, 139];

  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('JAISWAL PACKERS & MOVERS', 15, 25);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Reliable Home & Office Relocation Services', 15, 32);

  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('INVOICE', 15, 55);

  doc.setFontSize(10);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.text(`Invoice ID: #${id.slice(-6).toUpperCase()}`, 15, 62);
  doc.text(`Booking Date: ${new Date(createdAt).toLocaleDateString()}`, 15, 67);
  doc.text(`Status: ${booking.status.toUpperCase()}`, 15, 72);

  // Customer Details
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.text('CUSTOMER DETAILS', 110, 62);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`Name: ${booking.userName || 'N/A'}`, 110, 67);
  doc.text(`Mobile: ${booking.userMobile || details.userMobile || 'N/A'}`, 110, 72);
  doc.text(`Email: ${booking.userEmail || 'N/A'}`, 110, 77);

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('MOVE DETAILS', 15, 85);

  doc.setDrawColor(226, 232, 240);
  doc.line(15, 87, 195, 87);

  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(10);
  
  doc.setFont('helvetica', 'bold');
  doc.text('FROM (Pickup Address)', 15, 95);
  doc.setFont('helvetica', 'normal');
  const pickupLines = doc.splitTextToSize(details.pickupAddress, 80);
  doc.text(pickupLines, 15, 101);
  doc.text(`Floor: ${details.floorPickup} | Lift: ${details.hasLiftPickup ? 'Yes' : 'No'}`, 15, 101 + (pickupLines.length * 5));

  doc.setFont('helvetica', 'bold');
  doc.text('TO (Drop-off Address)', 110, 95);
  doc.setFont('helvetica', 'normal');
  const dropLines = doc.splitTextToSize(details.dropAddress, 80);
  doc.text(dropLines, 110, 101);
  doc.text(`Floor: ${details.floorDrop} | Lift: ${details.hasLiftDrop ? 'Yes' : 'No'}`, 110, 101 + (dropLines.length * 5));

  doc.setFont('helvetica', 'bold');
  doc.text(`Service Level: ${details.serviceType}`, 15, 120);
  doc.text(`Scheduled For: ${details.moveDate}`, 110, 120);
  doc.text(`Time Slot: ${details.moveSlot || 'Morning (7 AM - 10 AM)'}`, 110, 125);

  // Selected Packages Section
  let currentY = 135;
  if (details.selectedServices && details.selectedServices.length > 0) {
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setFontSize(12);
    doc.text('SELECTED PACKAGES', 15, currentY);
    currentY += 5;
    
    autoTable(doc, {
      startY: currentY,
      head: [['Package Title', 'Category', 'Quantity']],
      body: details.selectedServices.map(s => [s.title, s.category || 'Moving Service', s.quantity.toString()]),
      headStyles: { fillColor: [147, 51, 234], textColor: 255, fontStyle: 'bold' }, // Purple theme for packages
      margin: { left: 15, right: 15 }
    });
    currentY = (doc as any).lastAutoTable.finalY + 10;
  }

  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(12);
  doc.text('INVENTORY LIST', 15, currentY);

  const inventoryBody = [
    ...details.inventory.map(item => [
      item.name,
      item.category,
      item.weightClass,
      item.quantity.toString()
    ]),
    ...(details.selectedServices || []).flatMap((s: any) => 
      Object.entries(s.extraInventory || {}).map(([name, qty]) => {
        const item = COMMON_ITEMS.find(i => i.name === name);
        return [
          `${name} (Extra)`,
          item?.category || 'Extra Item',
          item?.weightClass || 'N/A',
          qty.toString()
        ];
      })
    )
  ];

  autoTable(doc, {
    startY: currentY + 5,
    head: [['Item Name', 'Category', 'Weight Class', 'Qty']],
    body: inventoryBody,
    headStyles: { fillColor: primaryColor, textColor: 255, fontStyle: 'bold' },
    alternateRowStyles: { fillColor: [248, 250, 252] },
    margin: { left: 15, right: 15 }
  });

  const finalY = (doc as any).lastAutoTable.finalY + 15;
  
  doc.setFillColor(248, 250, 252);
  doc.rect(120, finalY, 75, 69, 'F');
  
  const summaryX = 125;
  let breakdownY = finalY + 10;
  
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFontSize(9);
  doc.text('Base Shifting Price:', summaryX, breakdownY);
  doc.text(`INR ${estimate.basePrice.toLocaleString()}`, 190, breakdownY, { align: 'right' });
  
  breakdownY += 7;
  doc.text('Packing Charges:', summaryX, breakdownY);
  doc.text(`INR ${estimate.packingCharges.toLocaleString()}`, 190, breakdownY, { align: 'right' });
  
  breakdownY += 7;
  doc.text('Labor & Handling:', summaryX, breakdownY);
  doc.text(`INR ${estimate.laborCharges.toLocaleString()}`, 190, breakdownY, { align: 'right' });
  
  breakdownY += 7;
  doc.text('Floor Charge:', summaryX, breakdownY);
  doc.text(`INR ${estimate.floorCharges.toLocaleString()}`, 190, breakdownY, { align: 'right' });
  
  breakdownY += 7;
  doc.text('Extra Items Price:', summaryX, breakdownY);
  doc.text(`INR ${estimate.extraItemsPrice.toLocaleString()}`, 190, breakdownY, { align: 'right' });
  
  breakdownY += 7;
  doc.text('Extra Distance Cost:', summaryX, breakdownY);
  doc.text(`INR ${estimate.transportation.toLocaleString()}`, 190, breakdownY, { align: 'right' });

  breakdownY += 10;
  doc.setDrawColor(226, 232, 240);
  doc.line(summaryX, breakdownY - 5, 190, breakdownY - 5);
  
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL AMOUNT:', summaryX, breakdownY);
  doc.text(`INR ${estimate.total.toLocaleString()}`, 190, breakdownY, { align: 'right' });

  const pageHeight = doc.internal.pageSize.height;
  doc.setFontSize(8);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  doc.setFont('helvetica', 'normal');
  doc.text('Thank you for choosing Jaiswal Packers & Movers. This is a computer-generated invoice.', 105, pageHeight - 20, { align: 'center' });
  doc.text('Support: 1800-MOVE-JAISWAL | Email: support@jaiswalpackers.com | Website: www.jaiswalpackers.com', 105, pageHeight - 15, { align: 'center' });

  return doc;
};
