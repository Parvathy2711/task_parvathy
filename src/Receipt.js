import React, { useRef } from 'react';
import { Box, Typography, Paper, Button, Divider } from '@mui/material';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useNavigate } from 'react-router-dom';

const receiptData = {
  tripId: 'CABZI12345',
  dateTime: '20 July 2025, 10:35 AM',
  pickup: 'Gandhipuram Bus Stop',
  drop: 'Peelamedu',
  driver: 'Arun M.',
  vehicle: 'TN 37 AH 4562',
  distance: '8.6 km',
  baseFare: '₹40',
  perKmFare: '₹86',
  totalFare: '₹126',
};

export default function Receipt() {
  const printRef = useRef();
  const navigate = useNavigate();

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('trip_receipt.pdf');
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <Paper ref={printRef} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant='h4' fontWeight={600}>
          Trip Receipt
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {Object.entries(receiptData).map(([label, value]) => (
          <Box
            key={label}
            sx={{ display: 'flex', justifyContent: 'space-between', my: 1 }}
          >
            <Typography fontWeight={500}>{formatLabel(label)}</Typography>
            <Typography>{value}</Typography>
          </Box>
        ))}
      </Paper>
      <Box
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        mb={2}
      >
        <Button variant='contained' sx={{ mt: 3 }} onClick={handleDownloadPDF}>
          Download PDF
        </Button>
        <Button
          variant='contained'
          sx={{ mt: 3 }}
          onClick={() => navigate('/')}
        >
          Back
        </Button>
      </Box>
    </Box>
  );
}

function formatLabel(label) {
  return (
    {
      tripId: 'Trip ID',
      dateTime: 'Date & Time',
      pickup: 'Pickup Location',
      drop: 'Drop Location',
      driver: 'Driver Name',
      vehicle: 'Vehicle No.',
      distance: 'Distance',
      baseFare: 'Base Fare',
      perKmFare: 'Per KM Fare',
      totalFare: 'Total Fare',
    }[label] || label
  );
}
