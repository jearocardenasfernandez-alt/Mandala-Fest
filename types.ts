
export interface Guest {
  id: string;
  name: string;
  dni: string;
  timestamp: number;
  checkedIn: boolean;
}

export interface Ticket {
  id: string;
  name: string;
  dni: string;
  phoneNumber: string;
  timestamp: number;
  checkedIn: boolean;
  paymentMethod: 'Yape' | 'Plin';
}

export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: {
        reviewSnippets?: {
            uri: string;
            title: string;
        }[]
    }[]
  };
}
