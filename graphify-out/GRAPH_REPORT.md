# Graph Report - react  (2026-09-23)

## Corpus Check
- 246 files · ~96,536 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1209 nodes · 2686 edges · 101 communities (56 shown, 45 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a6e3c265`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- button/button.tsx
- ModuleCardTemplate.tsx
- cn
- use-list-dropdown-menu.ts
- use-text-align.ts
- search-and-replace.tsx
- use-list.ts
- isNodeTypeSelected
- link-popover.tsx
- compilerOptions
- tiptap-utils.ts
- sidebar.tsx
- LearnerQuizCardTemplate.tsx
- useTiptapEditor
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
- color-highlight-popover.tsx
- button-group/button-group.tsx
- ui/button-group.tsx
- ui/button.tsx
- cmdk
- rules/graphify.md
- theme-provider.tsx
- workflows/graphify.md
- spacer.tsx
- @tiptap/extension-typography
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- useIsMobile
- materialsProps.ts
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- toolbar.tsx
- clsx
- image-upload-button.tsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- Button
- @radix-ui/react-dropdown-menu
- @radix-ui/react-popover
- getQuizJson
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
- ModulesInstructor.tsx
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
3. `Button()` - 34 edges
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

## Communities (101 total, 45 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (27): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+19 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "button/button.tsx"
Cohesion: 0.12
Nodes (15): CheckIcon, SvgProps, ButtonProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent (+7 more)

### Community 3 - "ModuleCardTemplate.tsx"
Cohesion: 0.10
Nodes (23): ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Badge(), badgeVariants, Card() (+15 more)

### Community 4 - "cn"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 5 - "use-list-dropdown-menu.ts"
Cohesion: 0.13
Nodes (19): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, isListActive(), listIcons (+11 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.10
Nodes (24): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+16 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.09
Nodes (20): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+12 more)

### Community 8 - "use-list.ts"
Cohesion: 0.21
Nodes (22): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+14 more)

### Community 9 - "isNodeTypeSelected"
Cohesion: 0.16
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction(), executeUndoRedoAction() (+8 more)

### Community 10 - "link-popover.tsx"
Cohesion: 0.12
Nodes (16): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkMainProps (+8 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.09
Nodes (9): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SidebarContext, SidebarContextProps, SidebarMenuButton() (+1 more)

### Community 14 - "LearnerQuizCardTemplate.tsx"
Cohesion: 0.27
Nodes (6): LearnerQuizCardTemplate(), modules, quizzes, user, Classroom(), Quizzes()

### Community 16 - "useTiptapEditor"
Cohesion: 0.17
Nodes (12): HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, ListButton, ListButtonProps, LIST_SHORTCUT_KEYS, UseListConfig, ListDropdownMenuImpl() (+4 more)

### Community 17 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.14
Nodes (15): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), ColorHighlightPopoverContent(), LinkMain() (+7 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "ProtectedLayout.tsx"
Cohesion: 0.16
Nodes (15): UserHeader(), UserSidebar(), UserSkeleton(), SidebarRail(), SidebarTrigger(), useSidebar(), instructorNav, learnerNav (+7 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.22
Nodes (19): QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON (+11 more)

### Community 23 - "router.tsx"
Cohesion: 0.08
Nodes (22): ClassroomCardTemplate(), TextAlign, CoreModuleReadOnly(), NewClassroomDialog(), ModuleReadOnly(), PublicLayout(), RootLayout(), AnalyzerResults() (+14 more)

### Community 24 - "ModuleEditor.tsx"
Cohesion: 0.24
Nodes (11): Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+3 more)

### Community 25 - "data.ts"
Cohesion: 0.15
Nodes (17): ClassworkCardTemplate(), QuizSubmissionsCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar() (+9 more)

### Community 26 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 27 - "parseShortcutKeys"
Cohesion: 0.11
Nodes (18): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+10 more)

### Community 28 - "UserSidebar.tsx"
Cohesion: 0.23
Nodes (11): Logo(), LogoProps, UserSidebarProps, Sidebar(), SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarHeader() (+3 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.10
Nodes (27): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+19 more)

### Community 30 - "ClassroomInstructorView.tsx"
Cohesion: 0.11
Nodes (19): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia(), itemMediaVariants, ItemTitle() (+11 more)

### Community 31 - "use-element-rect.ts"
Cohesion: 0.20
Nodes (12): ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect(), useRefRect(), defaultOptions (+4 more)

### Community 32 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 33 - "command.tsx"
Cohesion: 0.11
Nodes (9): SearchInputProps, SearchTemplate(), InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput() (+1 more)

### Community 34 - "AnalyzerResults.tsx"
Cohesion: 0.27
Nodes (6): ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue()

### Community 36 - "use-color-highlight.ts"
Cohesion: 0.10
Nodes (27): HighlighterIcon, SvgProps, LinkIcon, SvgProps, ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), canColorHighlight() (+19 more)

### Community 37 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 38 - "color-highlight-popover.tsx"
Cohesion: 0.17
Nodes (11): BanIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopover(), ColorHighlightPopoverButton, ColorHighlightPopoverContentProps, ColorHighlightPopoverProps (+3 more)

### Community 39 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 40 - "ui/button-group.tsx"
Cohesion: 0.38
Nodes (3): ButtonGroup(), buttonGroupVariants, Separator()

### Community 41 - "ui/button.tsx"
Cohesion: 0.09
Nodes (30): HeaderTemplate(), HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode (+22 more)

### Community 44 - "theme-provider.tsx"
Cohesion: 0.21
Nodes (12): ModeToggle(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider() (+4 more)

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, cn, lodash.throttle, dependencies, @base-ui/react, cn, lodash.throttle, react-day-picker (+3 more)

### Community 51 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, QuizCardTemplate(), CalendarDayButton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot() (+3 more)

### Community 52 - "materialsProps.ts"
Cohesion: 0.12
Nodes (20): LearnerQuizCardTemplateProps, Props, AnalyzerResultItem, ClassroomProps, CoreLessonsProps, CoreTopicsProps, ModuleProps, QuestionElement (+12 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 60 - "toolbar.tsx"
Cohesion: 0.17
Nodes (12): BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef(), useComposedRef() (+4 more)

### Community 62 - "image-upload-button.tsx"
Cohesion: 0.18
Nodes (14): ImagePlusIcon, SvgProps, IconComponent, IconProps, ImageShortcutBadge(), ImageUploadButton, ImageUploadButtonProps, canInsertImage() (+6 more)

### Community 68 - "Button"
Cohesion: 0.28
Nodes (6): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), Button

### Community 71 - "getQuizJson"
Cohesion: 0.53
Nodes (6): getQuizJson(), getQuizTotalPoints(), getQuizTotalQuestions(), DashboardTab(), LearnerQuizView(), mockStartAttemptServerRequest()

### Community 96 - "ModulesInstructor.tsx"
Cohesion: 0.18
Nodes (12): App(), client, GridListButtonGroupTemplate(), Props, TooltipButtonTemplate(), ToolTipTemplateProps, Toaster(), Tooltip() (+4 more)

## Knowledge Gaps
- **282 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+277 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **45 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `useIsMobile` to `dependencies`, `theme-provider.tsx`, `ProtectedLayout.tsx`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `class-variance-authority`, `cmdk`, `@tiptap/extension-typography`, `@tiptap/extension-image`, `@tiptap/extension-list`, `useIsMobile`, `@tiptap/extension-subscript`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `shadcn`, `survey-core`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `lucide-react`?**
  _High betweenness centrality (0.171) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `useIsMobile` to `ModuleCardTemplate.tsx`, `ui/button.tsx`, `sidebar.tsx`, `ProtectedLayout.tsx`, `UserSidebar.tsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _282 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `button/button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11904761904761904 - nodes in this community are weakly interconnected._