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
}

export const COMMON_ITEMS: CatalogItem[] = [
  // --- LIVING ROOM ---
  { name: 'Mandir', category: 'Living Room - Religious', weightClass: 'Medium' },
  { name: 'TV Upto 28 inch', category: 'Living Room - Electronics', weightClass: 'Light' },
  { name: 'TV 29 to 43 inch', category: 'Living Room - Electronics', weightClass: 'Medium' },
  { name: 'TV 49 to 55 inch', category: 'Living Room - Electronics', weightClass: 'Medium' },
  { name: 'TV Above 55 inch', category: 'Living Room - Electronics', weightClass: 'Heavy' },
  { name: 'TV Home Theater', category: 'Living Room - Electronics', weightClass: 'Medium' },
  { name: 'TV Stand/Trolley', category: 'Living Room - Furniture', weightClass: 'Medium' },
  { name: 'AC (Split)', category: 'Living Room - Appliances', weightClass: 'Heavy' },
  { name: 'AC (Window)', category: 'Living Room - Appliances', weightClass: 'Heavy' },
  { name: 'Sofa Single', category: 'Living Room - Seating', weightClass: 'Medium' },
  { name: 'Sofa Double', category: 'Living Room - Seating', weightClass: 'Heavy' },
  { name: 'Sofa 3 Seater', category: 'Living Room - Seating', weightClass: 'Heavy' },
  { name: 'Sofa 4 Seater', category: 'Living Room - Seating', weightClass: 'Heavy' },
  { name: 'Sofa 5 Seater', category: 'Living Room - Seating', weightClass: 'Heavy' },
  { name: 'Sofa 6 Seater', category: 'Living Room - Seating', weightClass: 'Heavy' },
  { name: 'Sofa Recliner', category: 'Living Room - Seating', weightClass: 'Heavy' },
  { name: 'Dining Table', category: 'Living Room - Dining', weightClass: 'Heavy' },
  { name: 'Dining Table Chairs', category: 'Living Room - Dining', weightClass: 'Medium' },
  { name: 'Bean bag / Baby Chair', category: 'Living Room - Seating', weightClass: 'Light' },
  { name: 'Rocking Chair', category: 'Living Room - Seating', weightClass: 'Medium' },
  { name: 'Plastic/Folding Chair', category: 'Living Room - Seating', weightClass: 'Light' },
  { name: 'Office Chair', category: 'Living Room - Seating', weightClass: 'Medium' },
  { name: 'Center Table', category: 'Living Room - Furniture', weightClass: 'Medium' },
  { name: 'Teapoy', category: 'Living Room - Furniture', weightClass: 'Light' },
  { name: 'Tables Foosball', category: 'Living Room - Games', weightClass: 'Heavy' },
  { name: 'Bar Unit', category: 'Living Room - Furniture', weightClass: 'Heavy' },
  { name: 'Book Shelf', category: 'Living Room - Furniture', weightClass: 'Medium' },
  { name: 'Pool/Snooker', category: 'Living Room - Games', weightClass: 'Heavy' },
  { name: 'Shoe Rack', category: 'Living Room - Storage', weightClass: 'Light' },
  { name: 'Treadmill/Exercise Cycle', category: 'Living Room - Fitness', weightClass: 'Heavy' },

  // --- KITCHEN ---
  { name: 'Mini Fridge', category: 'Kitchen - Appliances', weightClass: 'Medium' },
  { name: 'Fridge- Upto 80 Ltrs', category: 'Kitchen - Appliances', weightClass: 'Medium' },
  { name: 'Fridge 80 - 300 Ltrs', category: 'Kitchen - Appliances', weightClass: 'Heavy' },
  { name: 'Fridge 300 - 450 Ltrs', category: 'Kitchen - Appliances', weightClass: 'Heavy' },
  { name: 'Fridge Above 450 Ltrs', category: 'Kitchen - Appliances', weightClass: 'Heavy' },
  { name: 'Washing Machine', category: 'Kitchen - Appliances', weightClass: 'Heavy' },
  { name: 'Dish Washer', category: 'Kitchen - Appliances', weightClass: 'Heavy' },
  { name: 'Gas Stove', category: 'Kitchen - Cooking', weightClass: 'Medium' },
  { name: 'Gas Cylinder', category: 'Kitchen - Cooking', weightClass: 'Medium' },
  { name: 'Chimney', category: 'Kitchen - Cooking', weightClass: 'Medium' },
  { name: 'Microwave / OTG', category: 'Kitchen - Appliances', weightClass: 'Medium' },
  { name: 'Water purifier', category: 'Kitchen - Appliances', weightClass: 'Light' },
  { name: 'Utensil Rack', category: 'Kitchen - Storage', weightClass: 'Medium' },
  { name: 'Inverter/UPS', category: 'Kitchen - Appliances', weightClass: 'Heavy' },

  // --- BEDROOM ---
  { name: 'Single Bed', category: 'Bedroom - Furniture', weightClass: 'Medium' },
  { name: 'Double Bed', category: 'Bedroom - Furniture', weightClass: 'Heavy' },
  { name: 'Single Mattress', category: 'Bedroom - Furniture', weightClass: 'Medium' },
  { name: 'Double Mattress', category: 'Bedroom - Furniture', weightClass: 'Heavy' },
  { name: 'Bed Side Table', category: 'Bedroom - Furniture', weightClass: 'Light' },
  { name: 'Bunk Bed', category: 'Bedroom - Furniture', weightClass: 'Heavy' },
  { name: 'Folding Cot', category: 'Bedroom - Furniture', weightClass: 'Medium' },
  { name: 'Dressing Table', category: 'Bedroom - Furniture', weightClass: 'Heavy' },
  { name: 'Study/Computer Table', category: 'Bedroom - Furniture', weightClass: 'Medium' },
  { name: 'Desktop Computer', category: 'Bedroom - Electronics', weightClass: 'Medium' },
  { name: 'Chest of Drawers', category: 'Bedroom - Furniture', weightClass: 'Heavy' },
  { name: 'Almirah - 2 Door', category: 'Bedroom - Storage', weightClass: 'Heavy' },
  { name: 'Almirah - 3 Door', category: 'Bedroom - Storage', weightClass: 'Heavy' },
  { name: 'Almirah/Wardrobe (0-3 feet)', category: 'Bedroom - Storage', weightClass: 'Medium' },
  { name: 'Almirah/Wardrobe (3-6 feet)', category: 'Bedroom - Storage', weightClass: 'Heavy' },
  { name: 'Almirah/Wardrobe (6-9 feet)', category: 'Bedroom - Storage', weightClass: 'Heavy' },
  { name: 'Iron Trunk/Chest', category: 'Bedroom - Storage', weightClass: 'Heavy' },

  // --- BATHROOM ---
  { name: 'Mirror', category: 'Bathroom - Fixtures', weightClass: 'Light' },
  { name: 'Geyser', category: 'Bathroom - Fixtures', weightClass: 'Medium' },
  { name: 'Bath Tub', category: 'Bathroom - Fixtures', weightClass: 'Heavy' },
  { name: 'Water Drum', category: 'Bathroom - Storage', weightClass: 'Medium' },
  { name: 'Buckets and Tubs', category: 'Bathroom - Storage', weightClass: 'Light' },

  // --- GARAGE ---
  { name: 'Bike', category: 'Garage - Vehicle', weightClass: 'Heavy' },
  { name: 'Scooter', category: 'Garage - Vehicle', weightClass: 'Heavy' },
  { name: 'Bicycle', category: 'Garage - Vehicle', weightClass: 'Medium' },

  // --- OTHERS ---
  { name: 'Cooler', category: 'Others - Appliances', weightClass: 'Medium' },
  { name: 'Ceiling Fan', category: 'Others - Fixtures', weightClass: 'Light' },
  { name: 'Table Fan', category: 'Others - Appliances', weightClass: 'Light' },
  { name: 'Sewing Machine', category: 'Others - Appliances', weightClass: 'Medium' },
  { name: 'Lamp', category: 'Others - Fixtures', weightClass: 'Light' },
  { name: 'Iron Board', category: 'Others - General', weightClass: 'Light' },
  { name: 'Dish Antenna', category: 'Others - Electronics', weightClass: 'Medium' },
  { name: 'Decorative Item', category: 'Others - General', weightClass: 'Light' },
  { name: 'Ladder', category: 'Others - General', weightClass: 'Medium' },
  { name: 'Piano/Guitar', category: 'Others - Musical', weightClass: 'Heavy' },
  { name: 'Exhaust Fan', category: 'Others - Fixtures', weightClass: 'Light' },
  { name: 'Vacuum Cleaner', category: 'Others - Appliances', weightClass: 'Light' },
  { name: 'Small Pot (Upto 2 FT)', category: 'Others - Garden', weightClass: 'Light' },
  { name: 'Medium Pot (2 - 3 FT)', category: 'Others - Garden', weightClass: 'Medium' },
  { name: 'Large Pot (3 - 4 FT)', category: 'Others - Garden', weightClass: 'Medium' },
  { name: 'Small Trees (4 - 8 FT)', category: 'Others - Garden', weightClass: 'Heavy' },
  { name: 'Large Trees (Above 8 FT)', category: 'Others - Garden', weightClass: 'Heavy' },

  // --- BOX & PACKING ---
  { name: 'Porter Carton Box', category: 'Packing - Materials', weightClass: 'Light' },
  { name: 'Customer side Carton Box', category: 'Packing - Materials', weightClass: 'Light' },
  { name: 'Gunny Bags', category: 'Packing - Materials', weightClass: 'Light' },
  { name: 'Customer side Gunny Bag', category: 'Packing - Materials', weightClass: 'Light' },
  { name: 'Small Trolley Bag', category: 'Packing - Luggage', weightClass: 'Light' },
  { name: 'Medium Trolley Bag', category: 'Packing - Luggage', weightClass: 'Medium' },
  { name: 'Large Trolley Bag', category: 'Packing - Luggage', weightClass: 'Medium' }
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
    <img src="/logo.svg?v=2" alt="Logo" {...props} />
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
