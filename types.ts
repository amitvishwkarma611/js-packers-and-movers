
export enum BookingStep {
  LOCATION = 'LOCATION',
  INVENTORY = 'INVENTORY',
  SERVICE_TYPE = 'SERVICE_TYPE',
  DATE_TIME = 'DATE_TIME',
  REVIEW = 'REVIEW'
}

export interface MoveItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  weightClass: 'Light' | 'Medium' | 'Heavy';
}

export interface BookingDetails {
  pickupAddress: string;
  dropAddress: string;
  moveDate: string;
  floorPickup: number;
  floorDrop: number;
  hasLiftPickup: boolean;
  hasLiftDrop: boolean;
  inventory: MoveItem[];
  serviceType: 'Standard' | 'Premium';
  moveSlot?: string;
  selectedServices?: any[];
  userMobile?: string;
}

export interface PriceEstimate {
  basePrice: number;
  packingCharges: number;
  laborCharges: number;
  transportation: number;
  extraItemsPrice: number;
  total: number;
}

export interface ConfirmedBooking {
  id: string;
  details: BookingDetails;
  estimate: PriceEstimate;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'Pending' | 'Accepted' | 'Rejected';
  createdAt: any;
  userUID?: string;
  userName?: string;
  userEmail?: string;
  userMobile?: string;
}
