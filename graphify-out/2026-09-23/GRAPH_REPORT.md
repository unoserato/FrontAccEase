# Graph Report - react  (2026-09-23)

## Corpus Check
- 255 files · ~104,489 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1280 nodes · 2876 edges · 105 communities (60 shown, 45 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `337e9cae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- image-upload-button.tsx
- ui/button.tsx
- cn
- use-list.ts
- use-text-align.ts
- search-and-replace.tsx
- use-blockquote.ts
- isNodeTypeSelected
- link-popover.tsx
- compilerOptions
- tiptap-utils.ts
- sidebar.tsx
- data.ts
- materialsProps.ts
- attachment.tsx
- components.json
- simple-editor.tsx
- compilerOptions
- ProtectedLayout.tsx
- QuizEditor.tsx
- ModuleCardTemplate.tsx
- router.tsx
- CoreModulesView.tsx
- item.tsx
- image-upload-node.tsx
- PageTemplate.tsx
- UserSidebar.tsx
- use-heading.ts
- Dashboard.tsx
- use-element-rect.ts
- use-search-and-replace.ts
- command.tsx
- Instruments.tsx
- QuizSubmissionsCardTemplate.tsx
- QuizzesInstructorView.tsx
- ClassroomInstructorView.tsx
- color-highlight-popover.tsx
- button-group/button-group.tsx
- useTiptapEditor
- use-link-popover.ts
- toast.tsx
- rules/graphify.md
- button/index.tsx
- workflows/graphify.md
- @tiptap/extension-typography
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- useIsMobile
- ModuleEditor.tsx
- theme-provider.tsx
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- parseShortcutKeys
- marker.tsx
- clsx
- useSidebar
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- cmdk
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
- lucide-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset
- bubble.tsx

## God Nodes (most connected - your core abstractions)
1. `useTiptapEditor()` - 43 edges
2. `Button()` - 40 edges
3. `cn()` - 37 edges
4. `buttonVariants` - 25 edges
5. `parseShortcutKeys()` - 22 edges
6. `Button` - 19 edges
7. `isNodeTypeSelected()` - 19 edges
8. `compilerOptions` - 19 edges
9. `HeaderTemplate()` - 18 edges
10. `Card()` - 18 edges

## Surprising Connections (you probably didn't know these)
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Communities (105 total, 45 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "image-upload-button.tsx"
Cohesion: 0.15
Nodes (17): ImagePlusIcon, SvgProps, IconComponent, IconProps, ImageShortcutBadge(), ImageUploadButton, ImageUploadButtonProps, canInsertImage() (+9 more)

### Community 3 - "ui/button.tsx"
Cohesion: 0.18
Nodes (13): LearnerQuizCardTemplate(), SearchTemplate(), TooltipButtonTemplate(), ToolTipTemplateProps, ViewMode, ViewToggleProps, Button(), buttonVariants (+5 more)

### Community 4 - "cn"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 5 - "use-list.ts"
Cohesion: 0.13
Nodes (24): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+16 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.09
Nodes (26): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+18 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (23): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+15 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.25
Nodes (15): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+7 more)

### Community 9 - "isNodeTypeSelected"
Cohesion: 0.16
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction(), executeUndoRedoAction() (+8 more)

### Community 10 - "link-popover.tsx"
Cohesion: 0.10
Nodes (20): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkMainProps (+12 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.09
Nodes (9): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SidebarContext, SidebarContextProps, SidebarMenuButton() (+1 more)

### Community 14 - "data.ts"
Cohesion: 0.13
Nodes (15): ClassroomCardTemplate(), classrooms, initialChatMessages, quizzes, user, UserProps, AnalyzerResultItem, ChatMessage (+7 more)

### Community 15 - "materialsProps.ts"
Cohesion: 0.14
Nodes (16): LearnerQuizCardTemplateProps, Props, ClassroomProps, Classwork, CoreLessonsProps, CoreTopicsProps, ModuleProps, QuestionElement (+8 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.10
Nodes (19): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), ColorHighlightPopoverContent(), Spacer() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "ProtectedLayout.tsx"
Cohesion: 0.14
Nodes (14): defaultErrorOneAction, ErrorOne(), ErrorOneAction, ErrorOneProps, UserSkeleton(), instructorNav, learnerNav, schoolAdminNav (+6 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.20
Nodes (20): DatePicker(), QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion() (+12 more)

### Community 22 - "ModuleCardTemplate.tsx"
Cohesion: 0.10
Nodes (22): ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Badge(), badgeVariants, Card() (+14 more)

### Community 23 - "router.tsx"
Cohesion: 0.12
Nodes (14): ModuleEditor(), PublicLayout(), RootLayout(), AnalyzerResults(), ErrorBoundary(), AnalyzerLogsInstructor(), ClassroomInstructorView(), DashboardInstructor() (+6 more)

### Community 24 - "CoreModulesView.tsx"
Cohesion: 0.23
Nodes (12): Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle(), DialogTrigger() (+4 more)

### Community 25 - "item.tsx"
Cohesion: 0.13
Nodes (12): ButtonGroup(), buttonGroupVariants, Item(), ItemActions(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia() (+4 more)

### Community 26 - "image-upload-node.tsx"
Cohesion: 0.06
Nodes (28): CheckIcon, SvgProps, CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction (+20 more)

### Community 27 - "PageTemplate.tsx"
Cohesion: 0.09
Nodes (21): HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, DatePickerProps (+13 more)

### Community 28 - "UserSidebar.tsx"
Cohesion: 0.17
Nodes (15): GridListButtonGroupTemplate(), Props, UserSidebar(), UserSidebarProps, SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarHeader() (+7 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.09
Nodes (30): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+22 more)

### Community 30 - "Dashboard.tsx"
Cohesion: 0.14
Nodes (14): CardAction(), Progress(), ProgressLabel(), ProgressValue(), coreModules, CoreModulesProps, EarnedBagdes(), Dashboard() (+6 more)

### Community 31 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 32 - "use-search-and-replace.ts"
Cohesion: 0.15
Nodes (18): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+10 more)

### Community 33 - "command.tsx"
Cohesion: 0.13
Nodes (7): SearchInputProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 34 - "Instruments.tsx"
Cohesion: 0.13
Nodes (15): ModeToggle(), ModeToggleProps, useTheme(), SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue() (+7 more)

### Community 35 - "QuizSubmissionsCardTemplate.tsx"
Cohesion: 0.22
Nodes (11): ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+3 more)

### Community 36 - "QuizzesInstructorView.tsx"
Cohesion: 0.19
Nodes (10): QuizSubmissionsCardTemplate(), getQuizJson(), getQuizTotalPoints(), getQuizTotalQuestions(), QuizForm(), NotFound(), DashboardTab(), QuizzesInstructorView() (+2 more)

### Community 37 - "ClassroomInstructorView.tsx"
Cohesion: 0.23
Nodes (10): HeaderTemplate(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), modules, copyText() (+2 more)

### Community 38 - "color-highlight-popover.tsx"
Cohesion: 0.14
Nodes (20): BanIcon, SvgProps, HighlighterIcon, SvgProps, ColorHighlightButtonProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS (+12 more)

### Community 39 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 40 - "useTiptapEditor"
Cohesion: 0.16
Nodes (14): HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, ListButton, ListButtonProps, LIST_SHORTCUT_KEYS, UseListConfig, ListDropdownMenu (+6 more)

### Community 41 - "use-link-popover.ts"
Cohesion: 0.24
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

### Community 42 - "toast.tsx"
Cohesion: 0.12
Nodes (5): App(), client, Toaster(), TooltipProvider(), router

### Community 44 - "button/index.tsx"
Cohesion: 0.28
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, class-variance-authority, dependencies, @base-ui/react, class-variance-authority, @radix-ui/react-dropdown-menu, react-icons, survey-core (+3 more)

### Community 51 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, QuizCardTemplate(), CalendarDayButton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot() (+3 more)

### Community 52 - "ModuleEditor.tsx"
Cohesion: 0.31
Nodes (5): Checkbox(), Input(), Switch(), WCAG_PRINCIPLES_DATA, WCAGPrinciple

### Community 53 - "theme-provider.tsx"
Cohesion: 0.25
Nodes (10): disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext (+2 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 59 - "parseShortcutKeys"
Cohesion: 0.10
Nodes (20): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+12 more)

### Community 62 - "useSidebar"
Cohesion: 0.28
Nodes (7): Logo(), LogoProps, UserHeader(), Sidebar(), SidebarRail(), SidebarTrigger(), useSidebar()

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

## Knowledge Gaps
- **289 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+284 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **45 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@tiptap/extension-typography`, `@tiptap/extension-image`, `@tiptap/extension-list`, `useIsMobile`, `@tiptap/extension-subscript`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `cmdk`, `cn`, `@radix-ui/react-popover`, `lodash.throttle`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-router-dom`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `lucide-react`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `dependencies`, `Instruments.tsx`, `theme-provider.tsx`, `useSidebar`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `command.tsx`, `Instruments.tsx`, `QuizzesInstructorView.tsx`, `ClassroomInstructorView.tsx`, `toast.tsx`, `sidebar.tsx`, `message-scroller.tsx`, `data.ts`, `attachment.tsx`, `ProtectedLayout.tsx`, `ModuleEditor.tsx`, `ModuleCardTemplate.tsx`, `QuizEditor.tsx`, `CoreModulesView.tsx`, `router.tsx`, `PageTemplate.tsx`, `UserSidebar.tsx`, `useSidebar`?**
  _High betweenness centrality (0.101) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _289 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `image-upload-button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1471861471861472 - nodes in this community are weakly interconnected._