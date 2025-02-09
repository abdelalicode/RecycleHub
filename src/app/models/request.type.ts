export interface Request {
  userId: string;
  wasteType: string[];
  weight: number;
  address: string;
  city: string;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
}