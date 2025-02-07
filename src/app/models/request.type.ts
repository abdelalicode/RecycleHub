export interface Request {
    userId: number;
    wasteType: string[];
    weight: number;
    address: string;
    date: string;
    status: 'Pending' | 'Completed' | 'Cancelled';
  }
  