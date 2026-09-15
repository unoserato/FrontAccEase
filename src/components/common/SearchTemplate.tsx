// SearchInput.tsx
import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

interface SearchInputProps {
  title: string
  value: string
  onChange: (value: string) => void
}

export default function SearchTemplate({
  title,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <InputGroup>
      <InputGroupInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Search ${title.toLowerCase()}...`}
      />
      <InputGroupAddon align={"inline-start"}>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  )
}
