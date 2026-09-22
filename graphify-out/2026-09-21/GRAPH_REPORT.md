# Graph Report - react  (2026-09-21)

## Corpus Check
- 241 files · ~72,963 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1189 nodes · 2574 edges · 107 communities (64 shown, 43 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.7)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e77c82c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- command.tsx
- ModuleCardTemplate.tsx
- use-heading.ts
- use-list.ts
- use-text-align.ts
- search-and-replace.tsx
- use-blockquote.ts
- use-undo-redo.ts
- ClassroomInstructorView.tsx
- compilerOptions
- tiptap-utils.ts
- sidebar.tsx
- link-popover.tsx
- CoreModulesView.tsx
- components.json
- use-search-and-replace.ts
- compilerOptions
- ProtectedLayout.tsx
- QuizEditor.tsx
- toast.tsx
- router.tsx
- ModuleEditor.tsx
- simple-editor.tsx
- image-upload-node.tsx
- parseShortcutKeys
- button/index.tsx
- button/button.tsx
- materialsProps.ts
- input-group/input-group.tsx
- color-highlight-popover.tsx
- QuizForm.tsx
- Analyzer.tsx
- cmdk
- cn
- field.tsx
- use-list-dropdown-menu.ts
- ModuleReadOnly.tsx
- QuizzesInstructorView.tsx
- isNodeTypeSelected
- date-picker.tsx
- rules/graphify.md
- button-group/button-group.tsx
- workflows/graphify.md
- PageWithTitleTemplate.tsx
- useTiptapEditor
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- use-image-upload.ts
- theme-provider.tsx
- ui/button.tsx
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- @tiptap/extension-typography
- class-variance-authority
- clsx
- color-highlight-button.tsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- Button
- @radix-ui/react-dropdown-menu
- @radix-ui/react-popover
- image-upload-button.tsx
- react-dom
- react-hotkeys-hook
- react-icons
- react-router-dom
- shadcn
- survey-core
- survey-creator-react
- survey-react-ui
- tailwindcss
- @tailwindcss/vite
- @tanstack/react-query
- @tiptap/core
- @tiptap/extension-find-and-replace
- @tiptap/extension-highlight
- @tiptap/extension-horizontal-rule
- text-align-button.tsx
- @tiptap/pm
- @tiptap/react
- @tiptap/starter-kit
- tw-animate-css
- blockquote-button.tsx
- list-button.tsx
- ui/button-group.tsx
- heading-dropdown-menu.tsx
- lucide-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset

## God Nodes (most connected - your core abstractions)
1. `useTiptapEditor()` - 43 edges
2. `cn()` - 37 edges
3. `Button()` - 32 edges
4. `buttonVariants` - 24 edges
5. `parseShortcutKeys()` - 22 edges
6. `Button` - 19 edges
7. `isNodeTypeSelected()` - 19 edges
8. `compilerOptions` - 19 edges
9. `QuizEditor()` - 18 edges
10. `useIsMobile()` - 16 edges

## Surprising Connections (you probably didn't know these)
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Communities (107 total, 43 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "command.tsx"
Cohesion: 0.12
Nodes (7): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Textarea()

### Community 3 - "ModuleCardTemplate.tsx"
Cohesion: 0.11
Nodes (17): ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Card(), CardAction(), CardContent(), CardDescription() (+9 more)

### Community 4 - "use-heading.ts"
Cohesion: 0.11
Nodes (23): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+15 more)

### Community 5 - "use-list.ts"
Cohesion: 0.20
Nodes (12): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), listLabels (+4 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.15
Nodes (17): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+9 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (22): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+14 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.23
Nodes (17): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+9 more)

### Community 9 - "use-undo-redo.ts"
Cohesion: 0.15
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+8 more)

### Community 10 - "ClassroomInstructorView.tsx"
Cohesion: 0.19
Nodes (9): ClassworkCardTemplate(), Avatar(), AvatarFallback(), AvatarImage(), learners, ClassroomProps, copyText(), CopyTextParams (+1 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (14): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS, MAX_FILE_SIZE (+6 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.08
Nodes (24): Logo(), LogoProps, UserHeader(), UserSidebarProps, Sheet(), SheetContent(), SheetDescription(), SheetHeader() (+16 more)

### Community 14 - "link-popover.tsx"
Cohesion: 0.13
Nodes (14): CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkContent(), LinkMain(), LinkMainProps (+6 more)

### Community 16 - "CoreModulesView.tsx"
Cohesion: 0.15
Nodes (16): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Item(), ItemActions(), ItemContent() (+8 more)

### Community 17 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 18 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "ProtectedLayout.tsx"
Cohesion: 0.12
Nodes (20): react, react, QuizCardTemplate(), UserSidebar(), UserSkeleton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider() (+12 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.21
Nodes (20): QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON (+12 more)

### Community 22 - "toast.tsx"
Cohesion: 0.12
Nodes (6): App(), client, toast, Toaster(), TooltipProvider(), router

### Community 23 - "router.tsx"
Cohesion: 0.10
Nodes (15): PublicLayout(), RootLayout(), ErrorBoundary(), AnalyzerLogsInstructor(), ClassroomInstructorView(), DashboardInstructor(), Chat(), Classroom() (+7 more)

### Community 24 - "ModuleEditor.tsx"
Cohesion: 0.24
Nodes (11): Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+3 more)

### Community 25 - "simple-editor.tsx"
Cohesion: 0.07
Nodes (32): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), Spacer(), SpacerOrientation (+24 more)

### Community 26 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 27 - "parseShortcutKeys"
Cohesion: 0.22
Nodes (9): BlockquoteShortcutBadge(), CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge(), CODE_BLOCK_SHORTCUT_KEY, UseCodeBlockConfig, formatShortcutKey(), isMac() (+1 more)

### Community 28 - "button/index.tsx"
Cohesion: 0.33
Nodes (5): HeadingButton, HeadingButtonProps, HeadingShortcutBadge(), HEADING_SHORTCUT_KEYS, UseHeadingConfig

### Community 29 - "button/button.tsx"
Cohesion: 0.15
Nodes (12): ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps, TooltipContext, TooltipContextValue (+4 more)

### Community 30 - "materialsProps.ts"
Cohesion: 0.13
Nodes (17): Props, classrooms, classworks, quizSubmissions, quizzes, UserProps, Classwork, CoreLessonsProps (+9 more)

### Community 31 - "input-group/input-group.tsx"
Cohesion: 0.16
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 32 - "color-highlight-popover.tsx"
Cohesion: 0.11
Nodes (18): BanIcon, SvgProps, HighlighterIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopoverButton, ColorHighlightPopoverContent() (+10 more)

### Community 33 - "QuizForm.tsx"
Cohesion: 0.40
Nodes (5): ModeToggle(), useTheme(), QuizForm(), QuizFormProps, SURVEY_THEMES_MAP

### Community 34 - "Analyzer.tsx"
Cohesion: 0.21
Nodes (10): ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectTrigger(), SelectValue(), Analyzer() (+2 more)

### Community 36 - "cn"
Cohesion: 0.15
Nodes (14): CheckIcon, SvgProps, DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+6 more)

### Community 37 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 38 - "use-list-dropdown-menu.ts"
Cohesion: 0.17
Nodes (17): isListActive(), listIcons, ListType, ListDropdownMenu, ListDropdownMenuImpl(), ListDropdownMenuProps, canToggleAnyList(), getActiveListType() (+9 more)

### Community 39 - "ModuleReadOnly.tsx"
Cohesion: 0.20
Nodes (10): ModuleCardTemplate(), TextAlign, Badge(), badgeVariants, coreModules, modules, CoreModulesProps, CoreModuleReadOnly() (+2 more)

### Community 40 - "QuizzesInstructorView.tsx"
Cohesion: 0.21
Nodes (7): QuizSubmissionsCardTemplate(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), NotFound()

### Community 41 - "isNodeTypeSelected"
Cohesion: 0.28
Nodes (11): LinkIcon, SvgProps, canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler(), useLinkPopover() (+3 more)

### Community 42 - "date-picker.tsx"
Cohesion: 0.21
Nodes (7): Calendar(), CalendarDayButton(), DatePicker(), DatePickerProps, Popover(), PopoverContent(), PopoverTrigger()

### Community 44 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 46 - "PageWithTitleTemplate.tsx"
Cohesion: 0.18
Nodes (12): ClassroomCardTemplate(), BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, SearchInputProps (+4 more)

### Community 47 - "useTiptapEditor"
Cohesion: 0.31
Nodes (11): canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive(), removeHighlight(), shouldShowButton(), useColorHighlight() (+3 more)

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, cn, lodash.throttle, dependencies, @base-ui/react, cn, lodash.throttle, react-day-picker (+3 more)

### Community 51 - "use-image-upload.ts"
Cohesion: 0.30
Nodes (9): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), BreakpointMode (+1 more)

### Community 52 - "theme-provider.tsx"
Cohesion: 0.25
Nodes (10): disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext (+2 more)

### Community 53 - "ui/button.tsx"
Cohesion: 0.15
Nodes (18): GridListButtonGroupTemplate(), Props, HeaderTemplate(), HeaderTemplateProps, TooltipButtonTemplate(), ToolTipTemplateProps, ViewMode, ViewToggleProps (+10 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 62 - "color-highlight-button.tsx"
Cohesion: 0.22
Nodes (7): ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), COLOR_HIGHLIGHT_SHORTCUT_KEY, UseColorHighlightConfig, Badge, BadgeProps

### Community 68 - "Button"
Cohesion: 0.28
Nodes (6): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), Button

### Community 71 - "image-upload-button.tsx"
Cohesion: 0.25
Nodes (7): IconComponent, IconProps, ImageShortcutBadge(), ImageUploadButton, ImageUploadButtonProps, IMAGE_UPLOAD_SHORTCUT_KEY, UseImageUploadConfig

### Community 87 - "text-align-button.tsx"
Cohesion: 0.25
Nodes (7): IconComponent, IconProps, TextAlignButton, TextAlignButtonProps, TextAlignShortcutBadge(), TEXT_ALIGN_SHORTCUT_KEYS, UseTextAlignConfig

### Community 94 - "blockquote-button.tsx"
Cohesion: 0.33
Nodes (5): BlockquoteButton, BlockquoteButtonProps, BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, ButtonProps

### Community 95 - "list-button.tsx"
Cohesion: 0.33
Nodes (5): ListButton, ListButtonProps, ListShortcutBadge(), LIST_SHORTCUT_KEYS, UseListConfig

### Community 96 - "ui/button-group.tsx"
Cohesion: 0.38
Nodes (3): ButtonGroup(), buttonGroupVariants, Separator()

### Community 97 - "heading-dropdown-menu.tsx"
Cohesion: 0.40
Nodes (3): HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig

## Knowledge Gaps
- **281 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+276 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `ProtectedLayout.tsx`, `cmdk`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `@tiptap/extension-typography`, `class-variance-authority`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `shadcn`, `survey-core`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `lucide-react`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `react` connect `ProtectedLayout.tsx` to `QuizForm.tsx`, `date-picker.tsx`, `sidebar.tsx`, `dependencies`, `theme-provider.tsx`?**
  _High betweenness centrality (0.181) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `ProtectedLayout.tsx` to `Analyzer.tsx`, `ModuleCardTemplate.tsx`, `sidebar.tsx`, `PageWithTitleTemplate.tsx`, `ui/button.tsx`?**
  _High betweenness centrality (0.108) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _281 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `command.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._