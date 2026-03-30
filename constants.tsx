import React from 'react';

export const COLORS = {
  primary: '#1e40af', // Blue-700
  secondary: '#003366', // Darker blue from logo
  accent: '#f97316', // Orange from logo
};

export interface CatalogItem {
  name: string;
  category: string;
  weightClass: 'Light' | 'Medium' | 'Heavy';
  price: number;
}

export const COMMON_ITEMS: CatalogItem[] = [
  // Small Items (Cartons)
  { name: 'Clothes Carton', category: 'Small Items (Cartons)', weightClass: 'Light', price: 70 },
  { name: 'Books Carton', category: 'Small Items (Cartons)', weightClass: 'Light', price: 70 },
  { name: 'Kitchen Carton', category: 'Small Items (Cartons)', weightClass: 'Light', price: 80 },
  { name: 'Fragile Kitchen Carton', category: 'Small Items (Cartons)', weightClass: 'Light', price: 120 },
  { name: 'Toiletries Carton', category: 'Small Items (Cartons)', weightClass: 'Light', price: 60 },
  { name: 'Decor Carton', category: 'Small Items (Cartons)', weightClass: 'Light', price: 80 },
  { name: 'Mixed Household Carton', category: 'Small Items (Cartons)', weightClass: 'Light', price: 70 },

  // Medium Items
  { name: 'Microwave', category: 'Medium Items', weightClass: 'Medium', price: 200 },
  { name: 'Mixer Grinder', category: 'Medium Items', weightClass: 'Medium', price: 150 },
  { name: 'Induction', category: 'Medium Items', weightClass: 'Medium', price: 120 },
  { name: 'Electric Kettle', category: 'Medium Items', weightClass: 'Medium', price: 100 },
  { name: 'Iron', category: 'Medium Items', weightClass: 'Medium', price: 80 },
  { name: 'Small TV', category: 'Medium Items', weightClass: 'Medium', price: 300 },
  { name: 'Desktop', category: 'Medium Items', weightClass: 'Medium', price: 300 },
  { name: 'Printer', category: 'Medium Items', weightClass: 'Medium', price: 150 },
  { name: 'Speaker', category: 'Medium Items', weightClass: 'Medium', price: 150 },
  { name: 'WiFi Router', category: 'Medium Items', weightClass: 'Medium', price: 50 },
  { name: 'Plastic Chair', category: 'Medium Items', weightClass: 'Medium', price: 100 },
  { name: 'Wooden Chair', category: 'Medium Items', weightClass: 'Medium', price: 150 },
  { name: 'Folding Table', category: 'Medium Items', weightClass: 'Medium', price: 200 },
  { name: 'Small Table', category: 'Medium Items', weightClass: 'Medium', price: 250 },
  { name: 'Study Table Light', category: 'Medium Items', weightClass: 'Medium', price: 300 },
  { name: 'Shoe Rack', category: 'Medium Items', weightClass: 'Medium', price: 200 },
  { name: 'Baby Chair', category: 'Medium Items', weightClass: 'Medium', price: 150 },
  { name: 'Suitcase', category: 'Medium Items', weightClass: 'Medium', price: 150 },
  { name: 'Travel Bag', category: 'Medium Items', weightClass: 'Medium', price: 120 },
  { name: 'Laundry Basket', category: 'Medium Items', weightClass: 'Medium', price: 80 },
  { name: 'Water Purifier', category: 'Medium Items', weightClass: 'Medium', price: 300 },
  { name: 'Gas Stove', category: 'Medium Items', weightClass: 'Medium', price: 150 },
  { name: 'Fan Table', category: 'Medium Items', weightClass: 'Medium', price: 150 },
  { name: 'Fan Pedestal', category: 'Medium Items', weightClass: 'Medium', price: 200 },

  // Large Items
  { name: 'Single Bed', category: 'Large Items', weightClass: 'Heavy', price: 500 },
  { name: 'Double Bed', category: 'Large Items', weightClass: 'Heavy', price: 800 },
  { name: 'Mattress Single', category: 'Large Items', weightClass: 'Heavy', price: 200 },
  { name: 'Mattress Double', category: 'Large Items', weightClass: 'Heavy', price: 300 },
  { name: 'Wardrobe Small', category: 'Large Items', weightClass: 'Heavy', price: 700 },
  { name: 'Wardrobe Large', category: 'Large Items', weightClass: 'Heavy', price: 1200 },
  { name: 'Dressing Table', category: 'Large Items', weightClass: 'Heavy', price: 500 },
  { name: 'Sofa Single', category: 'Large Items', weightClass: 'Heavy', price: 300 },
  { name: 'Sofa 3 Seater', category: 'Large Items', weightClass: 'Heavy', price: 800 },
  { name: 'Sofa Set', category: 'Large Items', weightClass: 'Heavy', price: 1200 },
  { name: 'Center Table', category: 'Large Items', weightClass: 'Heavy', price: 300 },
  { name: 'TV Unit', category: 'Large Items', weightClass: 'Heavy', price: 500 },
  { name: 'Large TV', category: 'Large Items', weightClass: 'Heavy', price: 600 },
  { name: 'Dining Table 4', category: 'Large Items', weightClass: 'Heavy', price: 700 },
  { name: 'Dining Table 6', category: 'Large Items', weightClass: 'Heavy', price: 1000 },
  { name: 'Dining Chair', category: 'Large Items', weightClass: 'Heavy', price: 150 },
  { name: 'Fridge Single Door', category: 'Large Items', weightClass: 'Heavy', price: 600 },
  { name: 'Fridge Double Door', category: 'Large Items', weightClass: 'Heavy', price: 800 },
  { name: 'Washing Machine Top', category: 'Large Items', weightClass: 'Heavy', price: 500 },
  { name: 'Washing Machine Front', category: 'Large Items', weightClass: 'Heavy', price: 700 },
  { name: 'AC Split', category: 'Large Items', weightClass: 'Heavy', price: 1500 },
  { name: 'AC Window', category: 'Large Items', weightClass: 'Heavy', price: 1000 },
  { name: 'Geyser', category: 'Large Items', weightClass: 'Heavy', price: 400 },
  { name: 'Iron Almirah', category: 'Large Items', weightClass: 'Heavy', price: 1000 },
  { name: 'Bookshelf', category: 'Large Items', weightClass: 'Heavy', price: 500 },
  { name: 'Storage Rack', category: 'Large Items', weightClass: 'Heavy', price: 400 }
];

export const ICONS = {
  Truck: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-4.446-3.542-7.875-7.875-7.875H9.75M16.5 4.5v14.25m0 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-4.446-3.542-7.875-7.875-7.875H9.75M16.5 4.5h-2.25m1.5 0v2.25m-5.121 0h5.25m-5.25 4.5h3m4.5 0a9 9 0 0 1-18 0m18 0a9 9 0 0 0-18 0" />
    </svg>
  ),
  Package: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  ),
  Location: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  ),
  Calendar: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
    </svg>
  ),
  Sparkles: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09-3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 22.25l-.394-1.683a2.25 2.25 0 0 0-1.713-1.713L12.75 18.5l1.643-.394a2.25 2.25 0 0 0 1.713-1.713L16.5 14.75l.394 1.643a2.25 2.25 0 0 0 1.713 1.713L20.25 18.5l-1.643.394a2.25 2.25 0 0 0-1.713 1.713Z" />
    </svg>
  ),
  WhatsApp: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .004 5.408.001 12.045a11.811 11.811 0 001.592 5.96L0 24l6.117-1.604a11.816 11.816 0 005.932 1.595h.005c6.637 0 12.046-5.409 12.05-12.046a11.823 11.823 0 00-3.535-8.495z"/>
    </svg>
  ),
  Logo: (props: any) => (
    <img src="/logo.png" alt="Logo" {...props} />
  ),
  Clock: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  Check: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  ),
  Search: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
    </svg>
  ),
  CheckCircle: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  ),
  Phone: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  ),
  Info: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
  ),
  X: (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  )
};
