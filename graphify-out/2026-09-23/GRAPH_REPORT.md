# Graph Report - react  (2026-09-23)

## Corpus Check
- 251 files · ~100,088 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1256 nodes · 2778 edges · 104 communities (59 shown, 45 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `80cac9f9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- ui/button.tsx
- ModuleCardTemplate.tsx
- input-group/input-group.tsx
- useTiptapEditor
- use-text-align.ts
- search-and-replace.tsx
- use-list.ts
- use-undo-redo.ts
- link-popover.tsx
- compilerOptions
- tiptap-utils.ts
- sidebar.tsx
- HeaderTemplate
- attachment.tsx
- components.json
- simple-editor.tsx
- compilerOptions
- ProtectedLayout.tsx
- QuizEditor.tsx
- sheet.tsx
- router.tsx
- ModuleEditor.tsx
- Chat.tsx
- image-upload-node.tsx
- list-button.tsx
- UserSidebar.tsx
- use-heading.ts
- ClassroomInstructorView.tsx
- use-element-rect.ts
- use-search-and-replace.ts
- command.tsx
- AnalyzerResults.tsx
- button/index.tsx
- use-color-highlight.ts
- field.tsx
- color-highlight-popover.tsx
- button-group/button-group.tsx
- cn
- PageTemplate.tsx
- cmdk
- rules/graphify.md
- toast.tsx
- workflows/graphify.md
- use-link-popover.ts
- @tiptap/extension-typography
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- useIsMobile
- data.ts
- QuizProps
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- Modules.tsx
- marker.tsx
- clsx
- image-upload-button.tsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- use-composed-ref.ts
- cn
- @radix-ui/react-popover
- lodash.throttle
- react-dom
- react-hotkeys-hook
- react-day-picker
- react-router-dom
- shadcn
- @shadcn/react
- survey-creator-react
- survey-react-ui
- tailwindcss
- @tailwindcss/vite
- @tanstack/react-query
- @tiptap/core
- @tiptap/extension-find-and-replace
- @tiptap/extension-highlight
- @tiptap/extension-horizontal-rule
- @tiptap/extension-superscript
- @tiptap/pm
- @tiptap/react
- @tiptap/starter-kit
- tw-animate-css
- GridListButtonGroupTemplate.tsx
- lucide-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset

## God Nodes (most connected - your core abstractions)
1. `useTiptapEditor()` - 43 edges
2. `Button()` - 38 edges
3. `cn()` - 37 edges
4. `buttonVariants` - 28 edges
5. `parseShortcutKeys()` - 22 edges
6. `Button` - 19 edges
7. `isNodeTypeSelected()` - 19 edges
8. `compilerOptions` - 19 edges
9. `QuizEditor()` - 18 edges
10. `useIsMobile()` - 17 edges

## Surprising Connections (you probably didn't know these)
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json

## Import Cycles
- None detected.

## Communities (104 total, 45 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (27): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+19 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "ui/button.tsx"
Cohesion: 0.19
Nodes (11): LearnerQuizCardTemplate(), ViewMode, ViewToggleProps, Button(), buttonVariants, Calendar(), CalendarDayButton(), DatePicker() (+3 more)

### Community 3 - "ModuleCardTemplate.tsx"
Cohesion: 0.12
Nodes (17): ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Badge(), badgeVariants, Card(), CardContent() (+9 more)

### Community 4 - "input-group/input-group.tsx"
Cohesion: 0.16
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 5 - "useTiptapEditor"
Cohesion: 0.12
Nodes (22): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, isListActive(), listIcons (+14 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.09
Nodes (26): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+18 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.09
Nodes (20): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+12 more)

### Community 8 - "use-list.ts"
Cohesion: 0.20
Nodes (24): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+16 more)

### Community 9 - "use-undo-redo.ts"
Cohesion: 0.16
Nodes (15): Redo2Icon, SvgProps, SvgProps, Undo2Icon, UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction(), executeUndoRedoAction() (+7 more)

### Community 10 - "link-popover.tsx"
Cohesion: 0.10
Nodes (19): CornerDownLeftIcon, SvgProps, LinkIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkContent() (+11 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.10
Nodes (19): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, CodeBlockShortcutBadge(), HistoryShortcutBadge(), findNodeAtPosition(), formatShortcutKey() (+11 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.13
Nodes (8): Sidebar(), SidebarContext, SidebarContextProps, SidebarMenuButton(), sidebarMenuButtonVariants, SidebarRail(), SidebarTrigger(), useSidebar()

### Community 14 - "HeaderTemplate"
Cohesion: 0.16
Nodes (14): ClassroomCardTemplate(), ModuleCardTemplate(), HeaderTemplate(), SearchInputProps, SearchTemplate(), TooltipButtonTemplate(), ToolTipTemplateProps, classrooms (+6 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.08
Nodes (22): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), ColorHighlightPopover(), ColorHighlightPopoverContent() (+14 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "ProtectedLayout.tsx"
Cohesion: 0.21
Nodes (11): UserSidebar(), user, instructorNav, learnerNav, publicNav, schoolAdminNav, linksByRole, ProtectedLayout() (+3 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.20
Nodes (20): SelectGroup(), QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion() (+12 more)

### Community 22 - "sheet.tsx"
Cohesion: 0.18
Nodes (5): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle()

### Community 23 - "router.tsx"
Cohesion: 0.09
Nodes (17): ModuleEditor(), PublicLayout(), RootLayout(), AnalyzerResults(), ErrorBoundary(), AnalyzerLogsInstructor(), DashboardInstructor(), Analyzer() (+9 more)

### Community 24 - "ModuleEditor.tsx"
Cohesion: 0.22
Nodes (12): Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+4 more)

### Community 25 - "Chat.tsx"
Cohesion: 0.06
Nodes (38): ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+30 more)

### Community 26 - "image-upload-node.tsx"
Cohesion: 0.06
Nodes (28): CheckIcon, SvgProps, CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction (+20 more)

### Community 27 - "list-button.tsx"
Cohesion: 0.11
Nodes (17): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CODE_BLOCK_SHORTCUT_KEY (+9 more)

### Community 28 - "UserSidebar.tsx"
Cohesion: 0.19
Nodes (12): Logo(), LogoProps, UserHeader(), UserSidebarProps, UserSkeleton(), SidebarContent(), SidebarFooter(), SidebarGroup() (+4 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.08
Nodes (32): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+24 more)

### Community 30 - "ClassroomInstructorView.tsx"
Cohesion: 0.12
Nodes (21): QuizCardTemplate(), QuizSubmissionsCardTemplate(), Separator(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger() (+13 more)

### Community 31 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 32 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 33 - "command.tsx"
Cohesion: 0.12
Nodes (7): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Textarea()

### Community 34 - "AnalyzerResults.tsx"
Cohesion: 0.25
Nodes (7): ModeToggleProps, SelectContent(), SelectItem(), SelectTrigger(), SelectValue(), toast, analyzerResults

### Community 35 - "button/index.tsx"
Cohesion: 0.28
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 36 - "use-color-highlight.ts"
Cohesion: 0.22
Nodes (14): ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), canColorHighlight(), COLOR_HIGHLIGHT_SHORTCUT_KEY, getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode (+6 more)

### Community 37 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 38 - "color-highlight-popover.tsx"
Cohesion: 0.17
Nodes (12): BanIcon, SvgProps, HighlighterIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopoverButton, ColorHighlightPopoverContentProps (+4 more)

### Community 39 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 40 - "cn"
Cohesion: 0.18
Nodes (12): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+4 more)

### Community 41 - "PageTemplate.tsx"
Cohesion: 0.18
Nodes (14): HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, Popover() (+6 more)

### Community 44 - "toast.tsx"
Cohesion: 0.09
Nodes (15): App(), client, disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES (+7 more)

### Community 46 - "use-link-popover.ts"
Cohesion: 0.44
Nodes (8): canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler(), useLinkPopover(), useLinkState(), sanitizeUrl()

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, class-variance-authority, dependencies, @base-ui/react, class-variance-authority, @radix-ui/react-dropdown-menu, react-icons, survey-core (+3 more)

### Community 51 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, ModeToggle(), useTheme(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot() (+3 more)

### Community 52 - "data.ts"
Cohesion: 0.11
Nodes (23): Props, chatPromptSuggestions, classworks, initialChatMessages, initialChatThreads, UserProps, AnalyzerResultItem, ChatMessage (+15 more)

### Community 53 - "QuizProps"
Cohesion: 0.36
Nodes (7): LearnerQuizCardTemplateProps, QuizProps, clearQuizProgress(), getQuizStorageKey(), QuizForm(), QuizFormProps, SURVEY_THEMES_MAP

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 59 - "Modules.tsx"
Cohesion: 0.27
Nodes (6): CardAction(), CardDescription(), coreModules, CoreModulesProps, MOCK_MODULE_PROGRESS, Modules()

### Community 62 - "image-upload-button.tsx"
Cohesion: 0.16
Nodes (16): ImagePlusIcon, SvgProps, IconComponent, IconProps, ImageShortcutBadge(), ImageUploadButton, ImageUploadButtonProps, canInsertImage() (+8 more)

### Community 68 - "use-composed-ref.ts"
Cohesion: 0.67
Nodes (3): updateRef(), useComposedRef(), UserRef

### Community 96 - "GridListButtonGroupTemplate.tsx"
Cohesion: 0.24
Nodes (7): GridListButtonGroupTemplate(), Props, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

## Knowledge Gaps
- **284 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+279 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **45 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `cmdk`, `@tiptap/extension-typography`, `@tiptap/extension-image`, `@tiptap/extension-list`, `useIsMobile`, `@tiptap/extension-subscript`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `cn`, `@radix-ui/react-popover`, `lodash.throttle`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-router-dom`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `lucide-react`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `dependencies`, `ui/button.tsx`, `toast.tsx`, `sidebar.tsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `GridListButtonGroupTemplate.tsx`, `command.tsx`, `AnalyzerResults.tsx`, `ModuleCardTemplate.tsx`, `PageTemplate.tsx`, `toast.tsx`, `sidebar.tsx`, `HeaderTemplate`, `attachment.tsx`, `QuizEditor.tsx`, `sheet.tsx`, `router.tsx`, `ModuleEditor.tsx`, `Chat.tsx`, `Modules.tsx`, `UserSidebar.tsx`, `ClassroomInstructorView.tsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _284 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `ModuleCardTemplate.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12162162162162163 - nodes in this community are weakly interconnected._