# Graph Report - react  (2026-09-22)

## Corpus Check
- 245 files · ~95,505 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1207 nodes · 2670 edges · 108 communities (60 shown, 48 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a6e3c265`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- ViewToggle.tsx
- QuizCardTemplate.tsx
- cn
- useTiptapEditor
- use-text-align.ts
- search-and-replace.tsx
- use-blockquote.ts
- isNodeTypeSelected
- link-popover.tsx
- compilerOptions
- tiptap-utils.ts
- sidebar.tsx
- ModuleCardTemplate.tsx
- item.tsx
- components.json
- simple-editor.tsx
- compilerOptions
- ProtectedLayout.tsx
- QuizEditor.tsx
- toast.tsx
- router.tsx
- ModuleEditor.tsx
- data.ts
- image-upload-node.tsx
- parseShortcutKeys
- UserSidebar.tsx
- use-heading.ts
- ClassroomInstructorView.tsx
- use-element-rect.ts
- use-search-and-replace.ts
- command.tsx
- AnalyzerResults.tsx
- class-variance-authority
- use-color-highlight.ts
- field.tsx
- ModulesInstructor.tsx
- ui/card.tsx
- use-link-popover.ts
- ui/button.tsx
- cmdk
- rules/graphify.md
- theme-provider.tsx
- workflows/graphify.md
- use-composed-ref.ts
- @tiptap/extension-typography
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- useIsMobile
- materialsProps.ts
- Analyzer.tsx
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- chevron-down-icon.tsx
- toolbar.tsx
- clsx
- use-image-upload.ts
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- theme-toggle.tsx
- @radix-ui/react-dropdown-menu
- @radix-ui/react-popover
- LearnerQuizCardTemplate.tsx
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
- PageWithTitleTemplate.tsx
- @tiptap/pm
- @tiptap/react
- @tiptap/starter-kit
- tw-animate-css
- arrow-right-icon.tsx
- case-sensitive-icon.tsx
- TooltipButtonTemplate.tsx
- external-link-icon.tsx
- lucide-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset
- search-icon.tsx

## God Nodes (most connected - your core abstractions)
1. `useTiptapEditor()` - 43 edges
2. `cn()` - 37 edges
3. `Button()` - 33 edges
4. `buttonVariants` - 28 edges
5. `parseShortcutKeys()` - 22 edges
6. `Button` - 19 edges
7. `isNodeTypeSelected()` - 19 edges
8. `compilerOptions` - 19 edges
9. `QuizEditor()` - 18 edges
10. `useIsMobile()` - 17 edges

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

## Communities (108 total, 48 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 3 - "QuizCardTemplate.tsx"
Cohesion: 0.14
Nodes (7): QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), DropdownMenu(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuTrigger()

### Community 4 - "cn"
Cohesion: 0.05
Nodes (41): CheckIcon, SvgProps, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, ButtonProps, ButtonSize, ButtonStyle (+33 more)

### Community 5 - "useTiptapEditor"
Cohesion: 0.11
Nodes (30): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, ListButton, ListButtonProps (+22 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.10
Nodes (23): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+15 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.12
Nodes (13): SvgProps, WholeWordIcon, CardFooter, CardHeader, Switch(), REGEX_REPLACE_EXAMPLES, REGEX_SEARCH_EXAMPLES, SearchAndReplace (+5 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.23
Nodes (19): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+11 more)

### Community 9 - "isNodeTypeSelected"
Cohesion: 0.15
Nodes (17): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+9 more)

### Community 10 - "link-popover.tsx"
Cohesion: 0.09
Nodes (27): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, HighlightColor, ColorHighlightPopoverContentProps (+19 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.08
Nodes (13): UserHeader(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SidebarContext, SidebarContextProps (+5 more)

### Community 14 - "ModuleCardTemplate.tsx"
Cohesion: 0.19
Nodes (12): ModuleCardTemplate(), ModuleCardTemplateProps, TextAlign, Badge(), badgeVariants, CardFooter(), classrooms, modules (+4 more)

### Community 16 - "item.tsx"
Cohesion: 0.18
Nodes (9): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia(), itemMediaVariants, ItemTitle() (+1 more)

### Community 17 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.11
Nodes (12): ArrowLeftIcon, SvgProps, HighlighterIcon, SvgProps, HorizontalRule, SEARCH_AND_REPLACE_SCROLL_OPTIONS, ColorHighlightPopover(), ColorHighlightPopoverButton (+4 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "ProtectedLayout.tsx"
Cohesion: 0.19
Nodes (12): UserSidebar(), UserSkeleton(), user, instructorNav, learnerNav, publicNav, schoolAdminNav, linksByRole (+4 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.22
Nodes (19): QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON (+11 more)

### Community 22 - "toast.tsx"
Cohesion: 0.12
Nodes (6): App(), client, toast, Toaster(), TooltipProvider(), router

### Community 23 - "router.tsx"
Cohesion: 0.11
Nodes (13): PublicLayout(), RootLayout(), ErrorBoundary(), DashboardInstructor(), Analyzer(), Chat(), AnalyzerLogsSchoolAdmin(), DashboardSchoolAdmin() (+5 more)

### Community 24 - "ModuleEditor.tsx"
Cohesion: 0.24
Nodes (12): Button(), Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+4 more)

### Community 25 - "data.ts"
Cohesion: 0.15
Nodes (17): ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+9 more)

### Community 26 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 27 - "parseShortcutKeys"
Cohesion: 0.07
Nodes (29): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+21 more)

### Community 28 - "UserSidebar.tsx"
Cohesion: 0.23
Nodes (11): Logo(), LogoProps, UserSidebarProps, Sidebar(), SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarHeader() (+3 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.11
Nodes (22): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+14 more)

### Community 30 - "ClassroomInstructorView.tsx"
Cohesion: 0.15
Nodes (13): QuizSubmissionsCardTemplate(), Separator(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), quizSubmissions (+5 more)

### Community 31 - "use-element-rect.ts"
Cohesion: 0.15
Nodes (18): ImageUploadNode, SimpleEditor(), CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState (+10 more)

### Community 32 - "use-search-and-replace.ts"
Cohesion: 0.16
Nodes (17): DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult(), NavigateSearchResultOptions, NEXT_RESULT_SHORTCUT_KEY (+9 more)

### Community 33 - "command.tsx"
Cohesion: 0.12
Nodes (7): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Textarea()

### Community 34 - "AnalyzerResults.tsx"
Cohesion: 0.20
Nodes (9): ModeToggle(), ModeToggleProps, useTheme(), SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue() (+1 more)

### Community 36 - "use-color-highlight.ts"
Cohesion: 0.21
Nodes (14): ColorHighlightButton, ColorHighlightButtonProps, canColorHighlight(), COLOR_HIGHLIGHT_SHORTCUT_KEY, getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive() (+6 more)

### Community 37 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 38 - "ModulesInstructor.tsx"
Cohesion: 0.16
Nodes (12): ClassroomCardTemplate(), HeaderTemplate(), SearchInputProps, SearchTemplate(), TooltipButtonTemplate(), quizzes, NewClassroomDialog(), AnalyzerLogsInstructor() (+4 more)

### Community 39 - "ui/card.tsx"
Cohesion: 0.23
Nodes (11): Card(), CardAction(), CardContent(), CardDescription(), CardHeader(), CardTitle(), coreModules, CoreModulesProps (+3 more)

### Community 40 - "use-link-popover.ts"
Cohesion: 0.24
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

### Community 41 - "ui/button.tsx"
Cohesion: 0.23
Nodes (9): buttonVariants, Calendar(), DatePicker(), DatePickerProps, ModuleEditor(), Unauthorized(), QuizzesInstructorView(), Modules() (+1 more)

### Community 44 - "theme-provider.tsx"
Cohesion: 0.25
Nodes (10): disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext (+2 more)

### Community 46 - "use-composed-ref.ts"
Cohesion: 0.67
Nodes (3): updateRef(), useComposedRef(), UserRef

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, cn, lodash.throttle, dependencies, @base-ui/react, cn, lodash.throttle, react-day-picker (+3 more)

### Community 51 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, QuizCardTemplate(), CalendarDayButton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot() (+3 more)

### Community 52 - "materialsProps.ts"
Cohesion: 0.18
Nodes (11): Props, ClassroomProps, CoreLessonsProps, CoreTopicsProps, ModuleProps, QuestionElement, QuizPage, Result (+3 more)

### Community 53 - "Analyzer.tsx"
Cohesion: 0.26
Nodes (9): HeaderTemplateProps, Popover(), PopoverContent(), PopoverHeader(), PopoverTitle(), PopoverTrigger(), analyzerResults, models (+1 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 59 - "chevron-down-icon.tsx"
Cohesion: 0.40
Nodes (4): ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps

### Community 60 - "toolbar.tsx"
Cohesion: 0.19
Nodes (10): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), MenuNavigationOptions (+2 more)

### Community 62 - "use-image-upload.ts"
Cohesion: 0.29
Nodes (10): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), BreakpointMode (+2 more)

### Community 68 - "theme-toggle.tsx"
Cohesion: 0.32
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 71 - "LearnerQuizCardTemplate.tsx"
Cohesion: 0.20
Nodes (12): LearnerQuizCardTemplate(), LearnerQuizCardTemplateProps, QuizProps, getQuizJson(), getQuizTotalPoints(), getQuizTotalQuestions(), clearQuizProgress(), getQuizStorageKey() (+4 more)

### Community 87 - "PageWithTitleTemplate.tsx"
Cohesion: 0.33
Nodes (6): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode

### Community 96 - "TooltipButtonTemplate.tsx"
Cohesion: 0.23
Nodes (8): GridListButtonGroupTemplate(), Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

## Knowledge Gaps
- **282 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+277 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **48 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `useIsMobile` to `dependencies`, `AnalyzerResults.tsx`, `theme-provider.tsx`, `sidebar.tsx`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `class-variance-authority`, `cmdk`, `@tiptap/extension-typography`, `@tiptap/extension-image`, `@tiptap/extension-list`, `useIsMobile`, `@tiptap/extension-subscript`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `shadcn`, `survey-core`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `lucide-react`?**
  _High betweenness centrality (0.173) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `useIsMobile` to `QuizCardTemplate.tsx`, `ModulesInstructor.tsx`, `sidebar.tsx`, `ProtectedLayout.tsx`, `Analyzer.tsx`, `PageWithTitleTemplate.tsx`, `UserSidebar.tsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _282 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `QuizCardTemplate.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._