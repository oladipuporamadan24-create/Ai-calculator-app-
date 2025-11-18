export enum CalculatorMode {
  STANDARD = 'STANDARD',
  AI = 'AI'
}

export interface HistoryItem {
  expression: string;
  result: string;
  timestamp: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
