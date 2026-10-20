# Graph Report - react  (2026-09-24)

## Corpus Check
- 258 files · ~111,593 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1319 nodes · 3097 edges · 111 communities (65 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9bec17f2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- list-dropdown-menu.tsx
- use-search-and-replace.ts
- cn
- use-list.ts
- use-color-highlight.ts
- search-and-replace.tsx
- isNodeTypeSelected
- useTiptapEditor
- button/button.tsx
- compilerOptions
- tiptap-utils.ts
- AnalyzerResults.tsx
- sidebar.tsx
- command.tsx
- attachment.tsx
- components.json
- simple-editor.tsx
- compilerOptions
- error-1.tsx
- Permissions.tsx
- UserSidebar.tsx
- image-upload-node.tsx
- use-link-popover.ts
- use-text-align.ts
- QuizEditor.tsx
- Analyzer.tsx
- link-popover.tsx
- use-heading.ts
- use-element-rect.ts
- ui/button.tsx
- react
- ClassroomInstructorView.tsx
- CoreModulesView.tsx
- router.tsx
- ModuleCardTemplate.tsx
- Users.tsx
- toolbar.tsx
- QuizzesInstructorView.tsx
- use-image-upload.ts
- materialsProps.ts
- color-highlight-popover.tsx
- rules/graphify.md
- Button
- workflows/graphify.md
- useIsMobile
- dropdown-menu/dropdown-menu.tsx
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- ProtectedLayout.tsx
- GridListButtonGroupTemplate.tsx
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
- DashboardSchoolAdmin.tsx
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
- @base-ui/react
- bubble.tsx

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

## Communities (111 total, 46 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (27): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+19 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "list-dropdown-menu.tsx"
Cohesion: 0.13
Nodes (15): ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps, HeadingButton, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig (+7 more)

### Community 3 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 4 - "cn"
Cohesion: 0.19
Nodes (12): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+4 more)

### Community 5 - "use-list.ts"
Cohesion: 0.12
Nodes (26): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, ListButton, ListButtonProps (+18 more)

### Community 6 - "use-color-highlight.ts"
Cohesion: 0.22
Nodes (14): ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), canColorHighlight(), COLOR_HIGHLIGHT_SHORTCUT_KEY, getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode (+6 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.09
Nodes (19): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, WholeWordIcon (+11 more)

### Community 8 - "isNodeTypeSelected"
Cohesion: 0.23
Nodes (20): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+12 more)

### Community 9 - "useTiptapEditor"
Cohesion: 0.14
Nodes (19): Redo2Icon, SvgProps, SvgProps, Undo2Icon, ListDropdownMenuImpl(), HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps (+11 more)

### Community 10 - "button/button.tsx"
Cohesion: 0.14
Nodes (13): ButtonProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps, TooltipContext (+5 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "AnalyzerResults.tsx"
Cohesion: 0.23
Nodes (8): ModeToggle(), ModeToggleProps, useTheme(), SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue()

### Community 14 - "sidebar.tsx"
Cohesion: 0.09
Nodes (10): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger(), SidebarContext, SidebarContextProps (+2 more)

### Community 15 - "command.tsx"
Cohesion: 0.13
Nodes (6): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.12
Nodes (13): ArrowLeftIcon, SvgProps, HighlighterIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor() (+5 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "error-1.tsx"
Cohesion: 0.22
Nodes (4): defaultErrorOneAction, ErrorOne(), ErrorOneAction, ErrorOneProps

### Community 21 - "Permissions.tsx"
Cohesion: 0.13
Nodes (21): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage() (+13 more)

### Community 22 - "UserSidebar.tsx"
Cohesion: 0.20
Nodes (11): Logo(), LogoProps, UserSidebarProps, Sidebar(), SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarHeader() (+3 more)

### Community 23 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 24 - "use-link-popover.ts"
Cohesion: 0.24
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

### Community 25 - "use-text-align.ts"
Cohesion: 0.10
Nodes (25): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+17 more)

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.17
Nodes (21): Checkbox(), Switch(), QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage() (+13 more)

### Community 27 - "Analyzer.tsx"
Cohesion: 0.23
Nodes (10): DatePicker(), DatePickerProps, Popover(), PopoverContent(), PopoverHeader(), PopoverTitle(), PopoverTrigger(), Analyzer() (+2 more)

### Community 28 - "link-popover.tsx"
Cohesion: 0.19
Nodes (10): CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, LinkMainProps, LinkPopoverProps, UseLinkPopoverConfig, Popover() (+2 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.11
Nodes (22): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+14 more)

### Community 30 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 31 - "ui/button.tsx"
Cohesion: 0.12
Nodes (22): ClassroomCardTemplate(), GridListButtonGroupTemplate(), LearnerQuizCardTemplate(), HeaderTemplate(), HeaderTemplateProps, TooltipButtonTemplate(), ToolTipTemplateProps, ViewMode (+14 more)

### Community 32 - "react"
Cohesion: 0.33
Nodes (6): react, react, CalendarDayButton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider()

### Community 33 - "ClassroomInstructorView.tsx"
Cohesion: 0.12
Nodes (16): ClassworkCardTemplate(), CardAction(), Item(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia(), itemMediaVariants (+8 more)

### Community 34 - "CoreModulesView.tsx"
Cohesion: 0.28
Nodes (11): Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle(), DialogTrigger() (+3 more)

### Community 35 - "router.tsx"
Cohesion: 0.11
Nodes (20): coreModules, CoreModulesProps, ModuleEditor(), PublicLayout(), RootLayout(), AnalyzerResults(), ErrorBoundary(), DashboardInstructor() (+12 more)

### Community 36 - "ModuleCardTemplate.tsx"
Cohesion: 0.11
Nodes (19): ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Badge(), badgeVariants, Card() (+11 more)

### Community 37 - "Users.tsx"
Cohesion: 0.23
Nodes (13): SearchInputProps, SearchTemplate(), Table(), TableBody(), TableCell(), TableHead(), TableHeader(), TableRow() (+5 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.19
Nodes (10): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), MenuNavigationOptions (+2 more)

### Community 39 - "QuizzesInstructorView.tsx"
Cohesion: 0.16
Nodes (16): QuizCardTemplate(), QuizSubmissionsCardTemplate(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), toast (+8 more)

### Community 40 - "use-image-upload.ts"
Cohesion: 0.27
Nodes (10): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), LinkMain() (+2 more)

### Community 41 - "materialsProps.ts"
Cohesion: 0.12
Nodes (20): LearnerQuizCardTemplateProps, Props, AnalyzerResultItem, ClassroomProps, CoreLessonsProps, CoreTopicsProps, ModuleProps, QuestionElement (+12 more)

### Community 42 - "color-highlight-popover.tsx"
Cohesion: 0.15
Nodes (14): BanIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopover(), ColorHighlightPopoverButton, ColorHighlightPopoverContentProps, ColorHighlightPopoverProps (+6 more)

### Community 44 - "Button"
Cohesion: 0.28
Nodes (6): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), Button

### Community 46 - "useIsMobile"
Cohesion: 0.21
Nodes (12): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, getServerSnapshot(), getSnapshot() (+4 more)

### Community 47 - "dropdown-menu/dropdown-menu.tsx"
Cohesion: 0.15
Nodes (9): CheckIcon, SvgProps, DropdownMenuCheckboxItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+1 more)

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): class-variance-authority, clsx, cmdk, lodash.throttle, dependencies, class-variance-authority, clsx, cmdk (+3 more)

### Community 51 - "ProtectedLayout.tsx"
Cohesion: 0.17
Nodes (13): UserHeader(), UserSidebar(), SidebarRail(), SidebarTrigger(), useSidebar(), Role, instructorNav, learnerNav (+5 more)

### Community 52 - "GridListButtonGroupTemplate.tsx"
Cohesion: 0.27
Nodes (6): Props, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

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
Nodes (28): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+20 more)

### Community 61 - "Instruments.tsx"
Cohesion: 0.22
Nodes (9): ItemActions(), Textarea(), wcagCriteria, WCAGCriterion, WCAGGuideline, wcagGuidelines, WCAGLevel, WCAGPrinciple (+1 more)

### Community 62 - "Dashboard.tsx"
Cohesion: 0.24
Nodes (7): Progress(), ProgressLabel(), ProgressValue(), EarnedBagdes(), Dashboard(), progress, ContinueLearningCard()

### Community 68 - "DashboardSchoolAdmin.tsx"
Cohesion: 0.06
Nodes (30): App(), client, disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES (+22 more)

### Community 97 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

## Knowledge Gaps
- **303 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+298 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `react`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `cn`, `@radix-ui/react-popover`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `recharts`, `@tiptap/extension-typography`, `survey-core`, `lucide-react`, `@base-ui/react`?**
  _High betweenness centrality (0.165) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `DashboardSchoolAdmin.tsx`, `AnalyzerResults.tsx`, `useIsMobile`, `dependencies`, `ProtectedLayout.tsx`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `AnalyzerResults.tsx`, `sidebar.tsx`, `command.tsx`, `attachment.tsx`, `error-1.tsx`, `Permissions.tsx`, `UserSidebar.tsx`, `QuizEditor.tsx`, `Analyzer.tsx`, `ClassroomInstructorView.tsx`, `CoreModulesView.tsx`, `ModuleCardTemplate.tsx`, `Users.tsx`, `QuizzesInstructorView.tsx`, `useIsMobile`, `GridListButtonGroupTemplate.tsx`, `Instruments.tsx`, `DashboardSchoolAdmin.tsx`, `message-scroller.tsx`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _303 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `list-dropdown-menu.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._