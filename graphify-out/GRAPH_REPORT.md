# Graph Report - react  (2026-09-24)

## Corpus Check
- 255 files · ~104,700 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1281 nodes · 2898 edges · 112 communities (67 shown, 45 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `337e9cae`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- use-image-upload.ts
- use-search-and-replace.ts
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
- ClassroomInstructorView.tsx
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
- Instruments.tsx
- button/button.tsx
- ui/button.tsx
- UserSidebar.tsx
- use-heading.ts
- ui/card.tsx
- use-element-rect.ts
- image-upload-node.tsx
- command.tsx
- AnalyzerResults.tsx
- QuizSubmissionsCardTemplate.tsx
- QuizzesInstructorView.tsx
- Dashboard.tsx
- use-color-highlight.ts
- button-group/button-group.tsx
- list-dropdown-menu.tsx
- use-link-popover.ts
- buttonVariants
- rules/graphify.md
- theme-toggle.tsx
- workflows/graphify.md
- @tiptap/extension-typography
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- useIsMobile
- GridListButtonGroupTemplate.tsx
- theme-provider.tsx
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- useTiptapEditor
- marker.tsx
- clsx
- field.tsx
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
- toolbar.tsx
- color-highlight-popover.tsx
- text-align-button.tsx
- lucide-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset
- image-upload-button.tsx
- SimpleEditor
- image-upload-node-extension.ts
- bubble.tsx

## God Nodes (most connected - your core abstractions)
1. `useTiptapEditor()` - 43 edges
2. `Button()` - 40 edges
3. `cn()` - 37 edges
4. `buttonVariants` - 25 edges
5. `parseShortcutKeys()` - 22 edges
6. `Button` - 19 edges
7. `useIsMobile()` - 19 edges
8. `isNodeTypeSelected()` - 19 edges
9. `compilerOptions` - 19 edges
10. `HeaderTemplate()` - 18 edges

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

## Communities (112 total, 45 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "use-image-upload.ts"
Cohesion: 0.27
Nodes (10): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), LinkMain() (+2 more)

### Community 3 - "use-search-and-replace.ts"
Cohesion: 0.14
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 4 - "cn"
Cohesion: 0.13
Nodes (18): DropdownMenuCheckboxItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent(), DropdownMenuSubTrigger(), InputGroup() (+10 more)

### Community 5 - "use-list.ts"
Cohesion: 0.14
Nodes (25): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+17 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.15
Nodes (17): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+9 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.09
Nodes (18): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, SvgProps, WholeWordIcon, Switch(), REGEX_REPLACE_EXAMPLES (+10 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.24
Nodes (16): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+8 more)

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
Nodes (10): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger(), SidebarContext, SidebarContextProps (+2 more)

### Community 14 - "ClassroomInstructorView.tsx"
Cohesion: 0.13
Nodes (13): classrooms, initialChatMessages, learners, user, UserProps, ChatMessage, copyText(), CopyTextParams (+5 more)

### Community 15 - "materialsProps.ts"
Cohesion: 0.12
Nodes (19): LearnerQuizCardTemplateProps, Props, AnalyzerResultItem, ClassroomProps, CoreLessonsProps, CoreTopicsProps, QuestionElement, QuizPage (+11 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.14
Nodes (8): ArrowLeftIcon, SvgProps, HorizontalRule, SEARCH_AND_REPLACE_SCROLL_OPTIONS, HeadingDropdownMenu, ListDropdownMenu, Spacer(), SpacerOrientation

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "ProtectedLayout.tsx"
Cohesion: 0.11
Nodes (18): UserSidebar(), defaultErrorOneAction, ErrorOne(), ErrorOneAction, ErrorOneProps, UserSkeleton(), instructorNav, learnerNav (+10 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.15
Nodes (23): Checkbox(), DatePicker(), SelectGroup(), Switch(), QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor() (+15 more)

### Community 22 - "ModuleCardTemplate.tsx"
Cohesion: 0.12
Nodes (10): ClassroomCardTemplate(), ModuleCardTemplateProps, ActionType, DeleteArchiveDialog(), CardTitle(), DropdownMenu(), DropdownMenuContent(), DropdownMenuItem() (+2 more)

### Community 23 - "router.tsx"
Cohesion: 0.11
Nodes (15): PublicLayout(), RootLayout(), AnalyzerResults(), ErrorBoundary(), AnalyzerLogsInstructor(), DashboardInstructor(), AnalyzerExtension(), Classroom() (+7 more)

### Community 24 - "CoreModulesView.tsx"
Cohesion: 0.26
Nodes (12): Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle(), DialogTrigger() (+4 more)

### Community 25 - "Instruments.tsx"
Cohesion: 0.12
Nodes (16): Item(), ItemActions(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia(), itemMediaVariants, ItemTitle() (+8 more)

### Community 26 - "button/button.tsx"
Cohesion: 0.13
Nodes (14): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps (+6 more)

### Community 27 - "ui/button.tsx"
Cohesion: 0.11
Nodes (23): HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, SearchTemplate() (+15 more)

### Community 28 - "UserSidebar.tsx"
Cohesion: 0.19
Nodes (15): Logo(), LogoProps, UserHeader(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarFooter(), SidebarGroup() (+7 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.09
Nodes (30): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+22 more)

### Community 30 - "ui/card.tsx"
Cohesion: 0.25
Nodes (10): CardAction(), CardDescription(), CardFooter(), CardHeader(), coreModules, CoreModulesProps, CoreModuleCardTemplate(), MOCK_MODULE_PROGRESS (+2 more)

### Community 31 - "use-element-rect.ts"
Cohesion: 0.23
Nodes (11): ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect(), useRefRect(), defaultOptions (+3 more)

### Community 32 - "image-upload-node.tsx"
Cohesion: 0.15
Nodes (9): CloseIcon, SvgProps, FileItem, ImageUploadDragAreaProps, ImageUploadNode(), ImageUploadPreviewProps, UploadOptions, useFileUpload() (+1 more)

### Community 33 - "command.tsx"
Cohesion: 0.12
Nodes (8): SearchInputProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Textarea()

### Community 34 - "AnalyzerResults.tsx"
Cohesion: 0.24
Nodes (8): ModeToggleProps, Badge(), badgeVariants, Card(), SelectContent(), SelectItem(), SelectTrigger(), SelectValue()

### Community 35 - "QuizSubmissionsCardTemplate.tsx"
Cohesion: 0.21
Nodes (11): ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+3 more)

### Community 36 - "QuizzesInstructorView.tsx"
Cohesion: 0.15
Nodes (17): QuizCardTemplate(), QuizCardTemplateProps, QuizSubmissionsCardTemplate(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger() (+9 more)

### Community 37 - "Dashboard.tsx"
Cohesion: 0.23
Nodes (8): LearnerQuizCardTemplate(), HeaderTemplate(), Progress(), ProgressLabel(), ProgressValue(), classroomModules, classroomQuizzes, progress

### Community 38 - "use-color-highlight.ts"
Cohesion: 0.23
Nodes (13): ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), canColorHighlight(), COLOR_HIGHLIGHT_SHORTCUT_KEY, getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode (+5 more)

### Community 39 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 40 - "list-dropdown-menu.tsx"
Cohesion: 0.21
Nodes (11): ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps, Button, ButtonProps, DropdownMenu(), DropdownMenuContent() (+3 more)

### Community 41 - "use-link-popover.ts"
Cohesion: 0.24
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

### Community 42 - "buttonVariants"
Cohesion: 0.17
Nodes (12): GridListButtonGroupTemplate(), ModuleCardTemplate(), TooltipButtonTemplate(), buttonVariants, modules, ModuleEditor(), ModuleReadOnly(), getDateString() (+4 more)

### Community 44 - "theme-toggle.tsx"
Cohesion: 0.32
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, class-variance-authority, dependencies, @base-ui/react, class-variance-authority, @radix-ui/react-dropdown-menu, react-icons, survey-core (+3 more)

### Community 51 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, CalendarDayButton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot(), getSnapshot() (+3 more)

### Community 52 - "GridListButtonGroupTemplate.tsx"
Cohesion: 0.22
Nodes (8): Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Separator(), Tooltip(), TooltipContent(), TooltipTrigger()

### Community 53 - "theme-provider.tsx"
Cohesion: 0.13
Nodes (17): App(), client, ModeToggle(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme (+9 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 59 - "useTiptapEditor"
Cohesion: 0.09
Nodes (24): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+16 more)

### Community 62 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 94 - "toolbar.tsx"
Cohesion: 0.19
Nodes (10): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), MenuNavigationOptions (+2 more)

### Community 95 - "color-highlight-popover.tsx"
Cohesion: 0.19
Nodes (10): BanIcon, SvgProps, HighlighterIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopover(), ColorHighlightPopoverButton (+2 more)

### Community 96 - "text-align-button.tsx"
Cohesion: 0.20
Nodes (9): IconComponent, IconProps, TextAlignButton, TextAlignButtonProps, TextAlignShortcutBadge(), TEXT_ALIGN_SHORTCUT_KEYS, TextAlign, UseTextAlignConfig (+1 more)

### Community 107 - "image-upload-button.tsx"
Cohesion: 0.25
Nodes (7): IconComponent, IconProps, ImageShortcutBadge(), ImageUploadButton, ImageUploadButtonProps, IMAGE_UPLOAD_SHORTCUT_KEY, UseImageUploadConfig

### Community 108 - "SimpleEditor"
Cohesion: 0.36
Nodes (6): SimpleEditor(), CursorVisibilityOptions, useCursorVisibility(), useWindowSize(), WindowSizeState, handleImageUpload()

### Community 109 - "image-upload-node-extension.ts"
Cohesion: 0.29
Nodes (5): Commands, ImageUploadNode, ImageUploadNodeOptions, @tiptap/react, UploadFunction

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

## Knowledge Gaps
- **288 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+283 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **45 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `@tiptap/extension-typography`, `@tiptap/extension-image`, `@tiptap/extension-list`, `useIsMobile`, `@tiptap/extension-subscript`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `cmdk`, `cn`, `@radix-ui/react-popover`, `lodash.throttle`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-router-dom`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `lucide-react`?**
  _High betweenness centrality (0.169) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `dependencies`, `UserSidebar.tsx`, `theme-provider.tsx`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `useIsMobile` to `QuizzesInstructorView.tsx`, `Dashboard.tsx`, `sidebar.tsx`, `ProtectedLayout.tsx`, `Instruments.tsx`, `ui/button.tsx`, `UserSidebar.tsx`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _288 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `use-search-and-replace.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._