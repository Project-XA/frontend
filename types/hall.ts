export interface CreateHallRequest {
  hallName: string;
  capacity: number;
  hallArea: number;
  organizationId: number;
}

export interface UpdateHallRequest {
  hallName: string;
  capacity: number;
  hallArea: number;
}

export interface Hall {
  id: number;
  hallName: string;
  capacity: number;
  hallArea: number;
  organizationId: number;
}
