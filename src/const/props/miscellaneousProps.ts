export interface ChatMessage {
  sender: "user" | "assistant"
  text: string
}

export interface InstrumentProps {
  id: number
  principle: "Perceivable" | "Operable" | "Understandable" | "Robust" | string
  title: string
  content: string
}
