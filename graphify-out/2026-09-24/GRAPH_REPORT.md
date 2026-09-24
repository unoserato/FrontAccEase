# Graph Report - react  (2026-09-24)

## Corpus Check
- 258 files · ~110,421 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1316 nodes · 3076 edges · 102 communities (56 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9bec17f2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- cn
- use-search-and-replace.ts
- input-group/input-group.tsx
- useTiptapEditor
- use-color-highlight.ts
- search-and-replace.tsx
- use-list.ts
- isNodeTypeSelected
- button/index.tsx
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
- theme-provider.tsx
- main.tsx
- ClassroomInstructorView.tsx
- Instruments.tsx
- router.tsx
- ModuleCardTemplate.tsx
- ui/button.tsx
- toolbar.tsx
- chevron-down-icon.tsx
- image-upload-button.tsx
- rules/graphify.md
- Button
- workflows/graphify.md
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- useIsMobile
- GridListButtonGroupTemplate.tsx
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- parseShortcutKeys
- marker.tsx
- clsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- chart.tsx
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
- lucide-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset
- bubble.tsx

## God Nodes (most connected - your core abstractions)
1. `Button()` - 44 edges
2. `useTiptapEditor()` - 43 edges
3. `cn()` - 37 edges
4. `buttonVariants` - 24 edges
5. `HeaderTemplate()` - 22 edges
6. `Card()` - 22 edges
7. `parseShortcutKeys()` - 22 edges
8. `Badge()` - 20 edges
9. `Button` - 19 edges
10. `useIsMobile()` - 19 edges

## Surprising Connections (you probably didn't know these)
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `SidebarProvider()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Communities (102 total, 46 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (27): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+19 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "cn"
Cohesion: 0.15
Nodes (16): HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem() (+8 more)

### Community 3 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 4 - "input-group/input-group.tsx"
Cohesion: 0.16
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 5 - "useTiptapEditor"
Cohesion: 0.11
Nodes (26): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, ListButton, ListButtonProps (+18 more)

### Community 6 - "use-color-highlight.ts"
Cohesion: 0.14
Nodes (18): HighlighterIcon, SvgProps, ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), canColorHighlight(), COLOR_HIGHLIGHT_SHORTCUT_KEY, getHighlightColorValue() (+10 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.09
Nodes (19): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, WholeWordIcon (+11 more)

### Community 8 - "use-list.ts"
Cohesion: 0.20
Nodes (23): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+15 more)

### Community 9 - "isNodeTypeSelected"
Cohesion: 0.15
Nodes (17): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+9 more)

### Community 10 - "button/index.tsx"
Cohesion: 0.12
Nodes (14): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps (+6 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "AnalyzerResults.tsx"
Cohesion: 0.27
Nodes (6): ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue()

### Community 14 - "sidebar.tsx"
Cohesion: 0.09
Nodes (9): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger(), SidebarContext, SidebarContextProps (+1 more)

### Community 15 - "command.tsx"
Cohesion: 0.07
Nodes (8): ViewMode, ViewToggleProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.11
Nodes (14): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), ColorHighlightPopover(), ColorHighlightPopoverButton (+6 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "error-1.tsx"
Cohesion: 0.22
Nodes (4): defaultErrorOneAction, ErrorOne(), ErrorOneAction, ErrorOneProps

### Community 21 - "Permissions.tsx"
Cohesion: 0.12
Nodes (21): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage() (+13 more)

### Community 22 - "UserSidebar.tsx"
Cohesion: 0.15
Nodes (18): Logo(), LogoProps, UserHeader(), UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarFooter() (+10 more)

### Community 23 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 24 - "use-link-popover.ts"
Cohesion: 0.24
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

### Community 25 - "use-text-align.ts"
Cohesion: 0.09
Nodes (26): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+18 more)

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.07
Nodes (42): LearnerQuizCardTemplateProps, toast, AnalyzerResultItem, CoreLessonsProps, CoreTopicsProps, QuestionElement, QuestionType, QuizJson (+34 more)

### Community 27 - "Analyzer.tsx"
Cohesion: 0.07
Nodes (23): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, Calendar(), CalendarDayButton() (+15 more)

### Community 28 - "link-popover.tsx"
Cohesion: 0.09
Nodes (27): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, HighlightColor, pickHighlightColorsByValue() (+19 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.11
Nodes (22): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+14 more)

### Community 30 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 31 - "theme-provider.tsx"
Cohesion: 0.21
Nodes (12): ModeToggle(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider() (+4 more)

### Community 32 - "main.tsx"
Cohesion: 0.25
Nodes (7): App(), client, getSidebarState(), SidebarProvider(), Toaster(), TooltipProvider(), router

### Community 33 - "ClassroomInstructorView.tsx"
Cohesion: 0.09
Nodes (25): QuizCardTemplate(), ClassworkCardTemplate(), QuizSubmissionsCardTemplate(), CardAction(), Item(), ItemDescription(), ItemGroup(), ItemMedia() (+17 more)

### Community 34 - "Instruments.tsx"
Cohesion: 0.13
Nodes (25): Props, Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+17 more)

### Community 35 - "router.tsx"
Cohesion: 0.06
Nodes (35): LearnerQuizCardTemplate(), buttonVariants, Progress(), ProgressLabel(), ProgressValue(), modules, publicNav, ModuleEditor() (+27 more)

### Community 36 - "ModuleCardTemplate.tsx"
Cohesion: 0.10
Nodes (23): ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Badge(), badgeVariants, Card() (+15 more)

### Community 37 - "ui/button.tsx"
Cohesion: 0.16
Nodes (21): ClassroomCardTemplate(), HeaderTemplate(), HeaderTemplateProps, SearchInputProps, SearchTemplate(), TooltipButtonTemplate(), ToolTipTemplateProps, Button() (+13 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.15
Nodes (13): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef() (+5 more)

### Community 39 - "chevron-down-icon.tsx"
Cohesion: 0.40
Nodes (4): ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps

### Community 40 - "image-upload-button.tsx"
Cohesion: 0.17
Nodes (16): ImagePlusIcon, SvgProps, IconComponent, IconProps, ImageUploadButton, ImageUploadButtonProps, canInsertImage(), IMAGE_UPLOAD_SHORTCUT_KEY (+8 more)

### Community 44 - "Button"
Cohesion: 0.28
Nodes (6): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), Button

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, class-variance-authority, cmdk, lodash.throttle, dependencies, @base-ui/react, class-variance-authority, cmdk (+3 more)

### Community 51 - "useIsMobile"
Cohesion: 0.21
Nodes (12): Role, instructorNav, learnerNav, schoolAdminNav, getServerSnapshot(), getSnapshot(), subscribe(), useIsMobile() (+4 more)

### Community 52 - "GridListButtonGroupTemplate.tsx"
Cohesion: 0.24
Nodes (7): GridListButtonGroupTemplate(), Props, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 59 - "parseShortcutKeys"
Cohesion: 0.10
Nodes (21): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+13 more)

### Community 68 - "chart.tsx"
Cohesion: 0.17
Nodes (14): react, react, ChartConfig, ChartContainer(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent() (+6 more)

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

## Knowledge Gaps
- **300 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+295 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `chart.tsx`, `cn`, `@radix-ui/react-popover`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `recharts`, `@tiptap/extension-typography`, `survey-core`, `lucide-react`?**
  _High betweenness centrality (0.166) - this node is a cross-community bridge._
- **Why does `react` connect `chart.tsx` to `main.tsx`, `dependencies`, `useIsMobile`, `UserSidebar.tsx`, `Analyzer.tsx`, `theme-provider.tsx`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `ClassroomInstructorView.tsx`, `Instruments.tsx`, `router.tsx`, `ModuleCardTemplate.tsx`, `AnalyzerResults.tsx`, `sidebar.tsx`, `command.tsx`, `attachment.tsx`, `GridListButtonGroupTemplate.tsx`, `error-1.tsx`, `UserSidebar.tsx`, `Permissions.tsx`, `QuizEditor.tsx`, `Analyzer.tsx`?**
  _High betweenness centrality (0.102) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _300 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `use-search-and-replace.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._