# Graph Report - react  (2026-09-21)

## Corpus Check
- 241 files · ~69,049 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1188 nodes · 2581 edges · 94 communities (51 shown, 43 thin omitted)
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
- CoreModulesView.tsx
- compilerOptions
- tiptap-utils.ts
- sidebar.tsx
- link-popover.tsx
- Modules.tsx
- ClassroomInstructorView.tsx
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
- useTiptapEditor
- button/button.tsx
- materialsProps.ts
- cn
- buttonVariants
- QuizForm.tsx
- Analyzer.tsx
- cmdk
- field.tsx
- ModulesInstructor.tsx
- QuizzesInstructorView.tsx
- PageTemplate.tsx
- rules/graphify.md
- button-group/button-group.tsx
- workflows/graphify.md
- PageWithTitleTemplate.tsx
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
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
- @radix-ui/react-dropdown-menu
- @radix-ui/react-popover
- @base-ui/react
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
- @tiptap/pm
- @tiptap/react
- @tiptap/starter-kit
- tw-animate-css
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
- `useIsMobile()` --references--> `react`  [EXTRACTED]
  src/hooks/use-mobile.ts → package.json

## Import Cycles
- None detected.

## Communities (94 total, 43 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.10
Nodes (22): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+14 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "command.tsx"
Cohesion: 0.12
Nodes (7): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Textarea()

### Community 3 - "ModuleCardTemplate.tsx"
Cohesion: 0.11
Nodes (17): ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Badge(), badgeVariants, Card() (+9 more)

### Community 4 - "use-heading.ts"
Cohesion: 0.11
Nodes (23): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+15 more)

### Community 5 - "use-list.ts"
Cohesion: 0.14
Nodes (25): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+17 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.07
Nodes (40): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+32 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.07
Nodes (25): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+17 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.24
Nodes (16): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+8 more)

### Community 9 - "use-undo-redo.ts"
Cohesion: 0.15
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+8 more)

### Community 10 - "CoreModulesView.tsx"
Cohesion: 0.22
Nodes (10): ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), AvatarFallback(), AvatarImage() (+2 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.10
Nodes (24): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton() (+16 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.05
Nodes (40): react, react, GridListButtonGroupTemplate(), Props, Logo(), LogoProps, ToolTipTemplateProps, UserHeader() (+32 more)

### Community 14 - "link-popover.tsx"
Cohesion: 0.08
Nodes (28): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, LinkIcon, SvgProps, SvgProps, TrashIcon (+20 more)

### Community 15 - "Modules.tsx"
Cohesion: 0.20
Nodes (10): CardAction(), CardFooter(), CardHeader(), CardTitle(), Progress(), ProgressIndicator(), ProgressLabel(), ProgressValue() (+2 more)

### Community 16 - "ClassroomInstructorView.tsx"
Cohesion: 0.15
Nodes (12): Item(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia(), itemMediaVariants, ItemTitle(), itemVariants (+4 more)

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
Cohesion: 0.20
Nodes (11): UserSkeleton(), user, instructorNav, learnerNav, schoolAdminNav, useIsMobile(), linksByRole, ProtectedLayout() (+3 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.21
Nodes (20): QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON (+12 more)

### Community 22 - "toast.tsx"
Cohesion: 0.08
Nodes (16): App(), client, disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES (+8 more)

### Community 23 - "router.tsx"
Cohesion: 0.10
Nodes (15): PublicLayout(), RootLayout(), CoreModulesView(), ErrorBoundary(), ClassroomInstructorView(), DashboardInstructor(), Chat(), Modules() (+7 more)

### Community 24 - "ModuleEditor.tsx"
Cohesion: 0.22
Nodes (12): Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+4 more)

### Community 25 - "simple-editor.tsx"
Cohesion: 0.05
Nodes (41): ArrowLeftIcon, SvgProps, MoonStarIcon, SvgProps, SunIcon, SvgProps, HorizontalRule, ImageUploadNode (+33 more)

### Community 26 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 27 - "parseShortcutKeys"
Cohesion: 0.07
Nodes (31): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+23 more)

### Community 28 - "useTiptapEditor"
Cohesion: 0.12
Nodes (22): HeadingButton, HeadingButtonProps, HEADING_SHORTCUT_KEYS, UseHeadingConfig, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, ListButton, ListButtonProps (+14 more)

### Community 29 - "button/button.tsx"
Cohesion: 0.13
Nodes (14): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps (+6 more)

### Community 30 - "materialsProps.ts"
Cohesion: 0.13
Nodes (19): Props, classworks, learners, quizSubmissions, quizzes, UserProps, ClassroomProps, Classwork (+11 more)

### Community 31 - "cn"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 32 - "buttonVariants"
Cohesion: 0.24
Nodes (8): buttonVariants, Calendar(), CalendarDayButton(), publicNav, ModuleEditor(), Unauthorized(), QuizzesInstructorView(), LoginPage()

### Community 33 - "QuizForm.tsx"
Cohesion: 0.50
Nodes (4): ModeToggle(), useTheme(), QuizForm(), SURVEY_THEMES_MAP

### Community 34 - "Analyzer.tsx"
Cohesion: 0.23
Nodes (9): ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectTrigger(), SelectValue(), models (+1 more)

### Community 37 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 38 - "ModulesInstructor.tsx"
Cohesion: 0.24
Nodes (9): ClassroomCardTemplate(), HeaderTemplate(), QuizCardTemplate(), SearchInputProps, SearchTemplate(), TooltipButtonTemplate(), ClassroomInstructor(), ModulesInstructor() (+1 more)

### Community 40 - "QuizzesInstructorView.tsx"
Cohesion: 0.21
Nodes (8): QuizSubmissionsCardTemplate(), CardDescription(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), NotFound()

### Community 42 - "PageTemplate.tsx"
Cohesion: 0.26
Nodes (6): HeaderTemplateProps, DatePicker(), DatePickerProps, Popover(), PopoverContent(), PopoverTrigger()

### Community 44 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 46 - "PageWithTitleTemplate.tsx"
Cohesion: 0.31
Nodes (7): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, Quizzes()

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): cn, lodash.throttle, lucide-react, dependencies, cn, lodash.throttle, lucide-react, react-day-picker (+3 more)

### Community 53 - "ui/button.tsx"
Cohesion: 0.27
Nodes (5): ViewMode, ViewToggleProps, Button(), AnalyzerLogsInstructor(), Classroom()

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 62 - "color-highlight-button.tsx"
Cohesion: 0.33
Nodes (5): ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), COLOR_HIGHLIGHT_SHORTCUT_KEY, UseColorHighlightConfig

## Knowledge Gaps
- **280 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+275 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **43 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `sidebar.tsx`, `cmdk`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `@tiptap/extension-typography`, `class-variance-authority`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `@base-ui/react`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `shadcn`, `survey-core`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **Why does `react` connect `sidebar.tsx` to `buttonVariants`, `QuizForm.tsx`, `dependencies`, `ProtectedLayout.tsx`, `toast.tsx`?**
  _High betweenness centrality (0.183) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `ProtectedLayout.tsx` to `Analyzer.tsx`, `ModuleCardTemplate.tsx`, `ModulesInstructor.tsx`, `PageTemplate.tsx`, `sidebar.tsx`, `PageWithTitleTemplate.tsx`?**
  _High betweenness centrality (0.110) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _280 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10114942528735632 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `command.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._