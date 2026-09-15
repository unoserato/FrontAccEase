import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { useIsMobile } from "@/hooks/use-mobile"
import { ChevronLeft, FileText, Menu, Send } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

const MODULES_PATH = "/instructor/modules"

export default function TextEditor() {
  const isMobile = useIsMobile()

  const [title, setTitle] = useState("Untitled")
  const [content, setContent] = useState("")

  function handleSaveDraft() {
    console.log({
      title,
      content,
      status: "draft",
    })
  }

  function handlePublish() {
    console.log({
      title,
      content,
      status: "published",
    })
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-clip">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="flex h-15 items-center gap-2 px-2 sm:px-4">
          {/* Back button */}
          <Link
            to={MODULES_PATH}
            className={buttonVariants({
              variant: "ghost",
              size: "icon",
            })}
            aria-label="Back to modules"
          >
            <ChevronLeft />
          </Link>

          {/* Title */}
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Untitled"
            aria-label="Module title"
            className="h-9 max-w-md border-none bg-transparent px-2 text-base font-medium shadow-none focus-visible:ring-0"
          />

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            {/* Desktop actions */}
            {!isMobile && (
              <>
                <Button type="button" variant="ghost" onClick={handleSaveDraft}>
                  <FileText />
                  Save Draft
                </Button>

                <Button type="button" onClick={handlePublish}>
                  <Send />
                  Publish
                </Button>
              </>
            )}

            {/* Mobile actions */}
            {isMobile && (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Open editor actions"
                    />
                  }
                >
                  <Menu />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuGroup>
                    <DropdownMenuItem render={<Link to={MODULES_PATH} />}>
                      <ChevronLeft />
                      Back to Modules
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleSaveDraft}>
                      <FileText />
                      Save Draft
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handlePublish}>
                      <Send />
                      Publish
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <SimpleEditor onChange={setContent} />
      </main>
    </div>
  )
}
