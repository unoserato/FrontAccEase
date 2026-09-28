# Graph Report - react  (2026-09-24)

## Corpus Check
- 258 files · ~111,520 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1319 nodes · 3053 edges · 113 communities (66 shown, 47 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `54cb4c9f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- DashboardSchoolAdmin.tsx
- use-search-and-replace.ts
- cn
- use-list-dropdown-menu.ts
- use-color-highlight.ts
- search-and-replace.tsx
- use-list.ts
- useTiptapEditor
- button/button.tsx
- compilerOptions
- tiptap-utils.ts
- Card
- sidebar.tsx
- SearchTemplate.tsx
- attachment.tsx
- components.json
- simple-editor.tsx
- compilerOptions
- error-1.tsx
- Permissions.tsx
- useSidebar
- image-upload-node.tsx
- use-link-popover.ts
- use-text-align.ts
- QuizEditor.tsx
- ui/button.tsx
- LearnerQuizView.tsx
- use-heading.ts
- use-element-rect.ts
- buttonVariants
- react
- ClassroomInstructorView.tsx
- CoreModulesView.tsx
- router.tsx
- ModuleCardTemplate.tsx
- AnalyzerLogsSchoolAdmin.tsx
- toolbar.tsx
- QuizzesInstructorView.tsx
- image-upload-button.tsx
- data.ts
- link-popover.tsx
- rules/graphify.md
- Button
- workflows/graphify.md
- toast.tsx
- ui/badge.tsx
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- useIsMobile
- ModulesInstructor.tsx
- field.tsx
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- parseShortcutKeys
- marker.tsx
- Instruments.tsx
- Dashboard.tsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- theme-provider.tsx
- cn
- @radix-ui/react-popover
- @radix-ui/react-dropdown-menu
- react-dom
- react-hotkeys-hook
- react-day-picker
- react-icons
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
- recharts
- @tiptap/extension-typography
- survey-core
- button-group/button-group.tsx
- lucide-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset
- ClassroomInstructor.tsx
- use-composed-ref.ts
- bubble.tsx
- clsx

## God Nodes (most connected - your core abstractions)
1. `Button()` - 45 edges
2. `useTiptapEditor()` - 43 edges
3. `cn()` - 37 edges
4. `buttonVariants` - 24 edges
5. `HeaderTemplate()` - 23 edges
6. `Card()` - 23 edges
7. `parseShortcutKeys()` - 22 edges
8. `Badge()` - 21 edges
9. `Button` - 19 edges
10. `useIsMobile()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ChartContainer()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `ChartTooltipContent()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json

## Import Cycles
- None detected.

## Communities (113 total, 47 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (27): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+19 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "DashboardSchoolAdmin.tsx"
Cohesion: 0.16
Nodes (15): ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload(), INITIAL_DIMENSION (+7 more)

### Community 3 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 4 - "cn"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 5 - "use-list-dropdown-menu.ts"
Cohesion: 0.11
Nodes (22): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, isListActive(), listIcons (+14 more)

### Community 6 - "use-color-highlight.ts"
Cohesion: 0.22
Nodes (14): ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), canColorHighlight(), COLOR_HIGHLIGHT_SHORTCUT_KEY, getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode (+6 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (23): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+15 more)

### Community 8 - "use-list.ts"
Cohesion: 0.21
Nodes (23): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+15 more)

### Community 9 - "useTiptapEditor"
Cohesion: 0.14
Nodes (18): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+10 more)

### Community 10 - "button/button.tsx"
Cohesion: 0.12
Nodes (15): CheckIcon, SvgProps, ButtonProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent (+7 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "Card"
Cohesion: 0.16
Nodes (11): ModeToggle(), ModeToggleProps, useTheme(), Card(), DropdownMenu(), SelectContent(), SelectGroup(), SelectItem() (+3 more)

### Community 14 - "sidebar.tsx"
Cohesion: 0.12
Nodes (13): UserSidebarProps, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarHeader() (+5 more)

### Community 15 - "SearchTemplate.tsx"
Cohesion: 0.13
Nodes (7): SearchInputProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.11
Nodes (13): ArrowLeftIcon, SvgProps, HighlighterIcon, SvgProps, LinkIcon, SvgProps, HorizontalRule, ImageUploadNode (+5 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "error-1.tsx"
Cohesion: 0.19
Nodes (5): defaultErrorOneAction, ErrorOne(), ErrorOneAction, ErrorOneProps, NotFound()

### Community 21 - "Permissions.tsx"
Cohesion: 0.21
Nodes (12): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage() (+4 more)

### Community 22 - "useSidebar"
Cohesion: 0.24
Nodes (8): Logo(), LogoProps, UserHeader(), UserSidebar(), SidebarRail(), SidebarTrigger(), useSidebar(), useInvalidateKeys()

### Community 23 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 24 - "use-link-popover.ts"
Cohesion: 0.33
Nodes (9): LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler(), useLinkPopover(), useLinkState() (+1 more)

### Community 25 - "use-text-align.ts"
Cohesion: 0.10
Nodes (25): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+17 more)

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.22
Nodes (19): QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON (+11 more)

### Community 27 - "ui/button.tsx"
Cohesion: 0.11
Nodes (21): HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, ViewMode (+13 more)

### Community 28 - "LearnerQuizView.tsx"
Cohesion: 0.22
Nodes (13): QuizCardTemplate(), QuizSubmissionsCardTemplate(), getQuizJson(), getQuizTotalPoints(), getQuizTotalQuestions(), clearQuizProgress(), getQuizStorageKey(), QuizForm() (+5 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.09
Nodes (27): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+19 more)

### Community 30 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 31 - "buttonVariants"
Cohesion: 0.14
Nodes (10): LearnerQuizCardTemplate(), LearnerQuizCardTemplateProps, buttonVariants, classrooms, modules, quizzes, QuizProps, ModuleEditor() (+2 more)

### Community 32 - "react"
Cohesion: 0.33
Nodes (6): react, react, CalendarDayButton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider()

### Community 33 - "ClassroomInstructorView.tsx"
Cohesion: 0.14
Nodes (12): CardAction(), Item(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia(), itemMediaVariants, ItemTitle() (+4 more)

### Community 34 - "CoreModulesView.tsx"
Cohesion: 0.21
Nodes (13): Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+5 more)

### Community 35 - "router.tsx"
Cohesion: 0.14
Nodes (5): ClassroomInstructorView(), AnalyzerLogsSchoolAdmin(), InstructorMaterials(), InstructorMaterialsView(), Permissions()

### Community 36 - "ModuleCardTemplate.tsx"
Cohesion: 0.13
Nodes (12): ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), CardContent(), CardDescription(), CardFooter(), CardHeader() (+4 more)

### Community 37 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.25
Nodes (12): HeaderTemplate(), Table(), TableBody(), TableCell(), TableHead(), TableHeader(), TableRow(), instructors (+4 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.19
Nodes (10): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), MenuNavigationOptions (+2 more)

### Community 39 - "QuizzesInstructorView.tsx"
Cohesion: 0.19
Nodes (11): Separator(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), quizSubmissions, user (+3 more)

### Community 40 - "image-upload-button.tsx"
Cohesion: 0.17
Nodes (15): ImagePlusIcon, SvgProps, IconComponent, IconProps, ImageUploadButton, ImageUploadButtonProps, canInsertImage(), IMAGE_UPLOAD_SHORTCUT_KEY (+7 more)

### Community 41 - "data.ts"
Cohesion: 0.13
Nodes (18): Props, classworks, initialChatMessages, UserProps, AnalyzerResultItem, ChatMessage, ClassroomProps, Classwork (+10 more)

### Community 42 - "link-popover.tsx"
Cohesion: 0.09
Nodes (25): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, HighlightColor, pickHighlightColorsByValue() (+17 more)

### Community 44 - "Button"
Cohesion: 0.28
Nodes (6): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), Button

### Community 47 - "ui/badge.tsx"
Cohesion: 0.36
Nodes (5): ModuleCardTemplate(), Badge(), badgeVariants, ModuleReadOnly(), getDateString()

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, class-variance-authority, cmdk, lodash.throttle, dependencies, @base-ui/react, class-variance-authority, cmdk (+3 more)

### Community 51 - "useIsMobile"
Cohesion: 0.19
Nodes (13): Role, instructorNav, learnerNav, publicNav, schoolAdminNav, getServerSnapshot(), getSnapshot(), subscribe() (+5 more)

### Community 52 - "ModulesInstructor.tsx"
Cohesion: 0.20
Nodes (10): GridListButtonGroupTemplate(), Props, TooltipButtonTemplate(), ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent() (+2 more)

### Community 53 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 59 - "parseShortcutKeys"
Cohesion: 0.08
Nodes (27): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+19 more)

### Community 61 - "Instruments.tsx"
Cohesion: 0.13
Nodes (14): ItemActions(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger(), wcagCriteria (+6 more)

### Community 62 - "Dashboard.tsx"
Cohesion: 0.14
Nodes (11): Progress(), ProgressLabel(), ProgressValue(), coreModules, CoreModulesProps, classroomQuizzes, EarnedBagdes(), progress (+3 more)

### Community 68 - "theme-provider.tsx"
Cohesion: 0.15
Nodes (15): App(), client, disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES (+7 more)

### Community 97 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 108 - "ClassroomInstructor.tsx"
Cohesion: 0.40
Nodes (3): ClassroomCardTemplate(), SearchTemplate(), NewClassroomDialog()

### Community 109 - "use-composed-ref.ts"
Cohesion: 0.67
Nodes (3): updateRef(), useComposedRef(), UserRef

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

## Knowledge Gaps
- **303 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+298 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **47 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `react`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `cn`, `@radix-ui/react-popover`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `recharts`, `@tiptap/extension-typography`, `survey-core`, `lucide-react`, `clsx`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `DashboardSchoolAdmin.tsx`, `theme-provider.tsx`, `Card`, `dependencies`, `useIsMobile`, `useSidebar`?**
  _High betweenness centrality (0.144) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `DashboardSchoolAdmin.tsx`, `Card`, `sidebar.tsx`, `SearchTemplate.tsx`, `attachment.tsx`, `error-1.tsx`, `Permissions.tsx`, `useSidebar`, `QuizEditor.tsx`, `LearnerQuizView.tsx`, `buttonVariants`, `ClassroomInstructorView.tsx`, `CoreModulesView.tsx`, `ModuleCardTemplate.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `QuizzesInstructorView.tsx`, `toast.tsx`, `ui/badge.tsx`, `ModulesInstructor.tsx`, `Instruments.tsx`, `message-scroller.tsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _303 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `use-search-and-replace.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._