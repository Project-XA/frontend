export interface CreateSessionRequest {
  organizationId: number;
  createdBy: string;
  sessionName: string;
  connectionType: string;
  longitude: number;
  latitude: number;
  allowedRadius: number;
  networkSSID: string;
  networkBSSID: string;
  startAt: string;
  endAt: string;
  hallId: number;
}

export interface UpdateSessionRequest {
  sessionName: string;
  connectionType: string;
  longitude: number;
  latitude: number;
  allowedRadius: number;
  networkSSID: string;
  networkBSSID: string;
  startAt: string;
  endAt: string;
  hallId: number;
}

export interface Session {
  sessionId: number;
  organizationId: number;
  createdBy: string;
  sessionName: string;
  createdAt: string;
  connectionType: string;
  longitude: number;
  latitude: number;
  allowedRadius: number;
  networkSSID: string;
  networkBSSID: string;
  startAt: string;
  endAt: string;
  hallId: number;
}
