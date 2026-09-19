// SearchInput.tsx
import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group"

interface SearchInputProps {
  title: string
  search: string
  setSearch: (value: string) => void
}

export default function SearchTemplate({
  title,
  search,
  setSearch,
}: SearchInputProps) {
  return (
    <InputGroup className="max-w-lg">
      <InputGroupInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={`Search ${title.toLowerCase()}...`}
        className="text-xs sm:text-sm md:text-base"
      />
      <InputGroupAddon align={"inline-start"}>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  )
}
