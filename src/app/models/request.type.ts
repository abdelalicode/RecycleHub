export interface Request {
  id?: string;
  userId: string;
  wasteType: string[];
  weight: number;
  address: string;
  city: string;
  date: string;
  status: 'Pending' | 'Occupied' | 'InProgress' | 'Validated' |'Cancelled';
  collector: string;
}