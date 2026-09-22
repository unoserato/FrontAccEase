# Graph Report - react  (2026-09-22)

## Corpus Check
- 244 files · ~92,824 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1202 nodes · 2648 edges · 99 communities (55 shown, 44 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e61d9c46`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- data.ts
- ModuleCardTemplate.tsx
- cn
- use-list.ts
- use-text-align.ts
- search-and-replace.tsx
- use-blockquote.ts
- use-undo-redo.ts
- color-highlight-popover.tsx
- compilerOptions
- tiptap-utils.ts
- sidebar.tsx
- link-popover.tsx
- ClassroomInstructorView.tsx
- components.json
- simple-editor.tsx
- compilerOptions
- ProtectedLayout.tsx
- QuizEditor.tsx
- toast.tsx
- router.tsx
- ModuleEditor.tsx
- spacer.tsx
- image-upload-node.tsx
- useTiptapEditor
- UserSidebar.tsx
- use-heading.ts
- QuizzesInstructorView.tsx
- use-element-rect.ts
- use-search-and-replace.ts
- command.tsx
- Analyzer.tsx
- class-variance-authority
- use-color-highlight.ts
- field.tsx
- tooltip/tooltip.tsx
- ui/card.tsx
- useIsMobile
- use-image-upload.ts
- @tiptap/extension-typography
- rules/graphify.md
- theme-provider.tsx
- workflows/graphify.md
- use-composed-ref.ts
- @base-ui/react
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- materialsProps.ts
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- list-dropdown-menu.tsx
- clsx
- button-group/button-group.tsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- theme-toggle.tsx
- @radix-ui/react-dropdown-menu
- @radix-ui/react-popover
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
- TooltipButtonTemplate.tsx
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
4. `buttonVariants` - 28 edges
5. `parseShortcutKeys()` - 22 edges
6. `Button` - 19 edges
7. `useIsMobile()` - 19 edges
8. `isNodeTypeSelected()` - 19 edges
9. `compilerOptions` - 19 edges
10. `QuizEditor()` - 18 edges

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

## Communities (99 total, 44 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.06
Nodes (39): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, LinkIcon, SvgProps (+31 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "data.ts"
Cohesion: 0.16
Nodes (16): ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+8 more)

### Community 3 - "ModuleCardTemplate.tsx"
Cohesion: 0.11
Nodes (18): ClassroomCardTemplate(), ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Badge(), badgeVariants (+10 more)

### Community 4 - "cn"
Cohesion: 0.11
Nodes (20): CheckIcon, SvgProps, DropdownMenuCheckboxItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent() (+12 more)

### Community 5 - "use-list.ts"
Cohesion: 0.13
Nodes (24): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+16 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.09
Nodes (25): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+17 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (20): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+12 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.23
Nodes (19): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+11 more)

### Community 9 - "use-undo-redo.ts"
Cohesion: 0.18
Nodes (12): Redo2Icon, SvgProps, SvgProps, Undo2Icon, canExecuteUndoRedoAction(), executeUndoRedoAction(), historyActionLabels, historyIcons (+4 more)

### Community 10 - "color-highlight-popover.tsx"
Cohesion: 0.17
Nodes (11): BanIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopover(), ColorHighlightPopoverButton, ColorHighlightPopoverContentProps, ColorHighlightPopoverProps (+3 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.09
Nodes (10): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SidebarContext, SidebarContextProps, SidebarMenuButton() (+2 more)

### Community 14 - "link-popover.tsx"
Cohesion: 0.11
Nodes (18): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkMain() (+10 more)

### Community 16 - "ClassroomInstructorView.tsx"
Cohesion: 0.13
Nodes (14): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia(), itemMediaVariants, ItemTitle() (+6 more)

### Community 17 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.12
Nodes (17): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), ColorHighlightPopoverContent(), BaseProps (+9 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "ProtectedLayout.tsx"
Cohesion: 0.22
Nodes (10): UserSkeleton(), user, instructorNav, learnerNav, publicNav, schoolAdminNav, linksByRole, ProtectedLayout() (+2 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.22
Nodes (19): QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON (+11 more)

### Community 22 - "toast.tsx"
Cohesion: 0.12
Nodes (6): App(), client, toast, Toaster(), TooltipProvider(), router

### Community 23 - "router.tsx"
Cohesion: 0.05
Nodes (47): LearnerQuizCardTemplate(), HeaderTemplate(), HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue (+39 more)

### Community 24 - "ModuleEditor.tsx"
Cohesion: 0.22
Nodes (13): Button(), Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+5 more)

### Community 26 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 27 - "useTiptapEditor"
Cohesion: 0.07
Nodes (36): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+28 more)

### Community 28 - "UserSidebar.tsx"
Cohesion: 0.18
Nodes (16): Logo(), LogoProps, UserHeader(), UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarFooter() (+8 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.10
Nodes (26): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+18 more)

### Community 30 - "QuizzesInstructorView.tsx"
Cohesion: 0.20
Nodes (13): QuizSubmissionsCardTemplate(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), getQuizJson(), getQuizTotalPoints() (+5 more)

### Community 31 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 32 - "use-search-and-replace.ts"
Cohesion: 0.15
Nodes (18): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+10 more)

### Community 33 - "command.tsx"
Cohesion: 0.12
Nodes (8): SearchInputProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Textarea()

### Community 34 - "Analyzer.tsx"
Cohesion: 0.20
Nodes (11): ModeToggle(), ModeToggleProps, useTheme(), SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectTrigger() (+3 more)

### Community 36 - "use-color-highlight.ts"
Cohesion: 0.29
Nodes (11): HighlighterIcon, SvgProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive(), removeHighlight() (+3 more)

### Community 37 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 38 - "tooltip/tooltip.tsx"
Cohesion: 0.18
Nodes (9): Tooltip(), TooltipContent, TooltipContentProps, TooltipContext, TooltipContextValue, TooltipProviderProps, TooltipTrigger, TooltipTriggerProps (+1 more)

### Community 39 - "ui/card.tsx"
Cohesion: 0.29
Nodes (7): CardAction(), CardDescription(), CardHeader(), CardTitle(), coreModules, CoreModulesProps, MOCK_MODULE_PROGRESS

### Community 40 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, QuizCardTemplate(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot(), getSnapshot() (+3 more)

### Community 41 - "use-image-upload.ts"
Cohesion: 0.30
Nodes (9): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), BreakpointMode (+1 more)

### Community 44 - "theme-provider.tsx"
Cohesion: 0.25
Nodes (10): disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext (+2 more)

### Community 46 - "use-composed-ref.ts"
Cohesion: 0.67
Nodes (3): updateRef(), useComposedRef(), UserRef

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): cmdk, cn, lodash.throttle, dependencies, cmdk, cn, lodash.throttle, react-day-picker (+3 more)

### Community 52 - "materialsProps.ts"
Cohesion: 0.13
Nodes (17): LearnerQuizCardTemplateProps, Props, CoreLessonsProps, CoreTopicsProps, ModuleProps, QuestionElement, QuizPage, QuizProps (+9 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 59 - "list-dropdown-menu.tsx"
Cohesion: 0.12
Nodes (18): HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, ListButton, ListButtonProps, LIST_SHORTCUT_KEYS, UseListConfig, ListDropdownMenu (+10 more)

### Community 62 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 68 - "theme-toggle.tsx"
Cohesion: 0.32
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 96 - "TooltipButtonTemplate.tsx"
Cohesion: 0.23
Nodes (8): GridListButtonGroupTemplate(), Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

## Knowledge Gaps
- **281 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+276 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **44 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `useIsMobile` to `Analyzer.tsx`, `theme-provider.tsx`, `dependencies`, `router.tsx`, `UserSidebar.tsx`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `devDependencies`, `class-variance-authority`, `useIsMobile`, `@tiptap/extension-typography`, `@base-ui/react`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `@radix-ui/react-dropdown-menu`, `@radix-ui/react-popover`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `shadcn`, `survey-core`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `lucide-react`?**
  _High betweenness centrality (0.172) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `useIsMobile` to `Analyzer.tsx`, `ModuleCardTemplate.tsx`, `sidebar.tsx`, `ProtectedLayout.tsx`, `router.tsx`, `UserSidebar.tsx`?**
  _High betweenness centrality (0.111) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _281 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06259426847662142 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `ModuleCardTemplate.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.10634920634920635 - nodes in this community are weakly interconnected._