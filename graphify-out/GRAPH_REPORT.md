# Graph Report - react  (2026-09-23)

## Corpus Check
- 251 files · ~98,843 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1252 nodes · 2740 edges · 114 communities (68 shown, 46 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `80cac9f9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- button/button.tsx
- ModuleCardTemplate.tsx
- input-group/input-group.tsx
- useTiptapEditor
- use-text-align.ts
- search-and-replace.tsx
- use-blockquote.ts
- use-undo-redo.ts
- link-popover.tsx
- compilerOptions
- tiptap-utils.ts
- sidebar.tsx
- data.ts
- attachment.tsx
- components.json
- simple-editor.tsx
- compilerOptions
- ProtectedLayout.tsx
- QuizEditor.tsx
- router.tsx
- ModuleEditor.tsx
- ClassroomInstructorView.tsx
- image-upload-node.tsx
- code-block-button.tsx
- UserSidebar.tsx
- use-heading.ts
- QuizzesInstructorView.tsx
- use-element-rect.ts
- use-search-and-replace.ts
- command.tsx
- AnalyzerExtension.tsx
- button/index.tsx
- use-color-highlight.ts
- field.tsx
- color-highlight-popover.tsx
- button-group/button-group.tsx
- cn
- ui/button.tsx
- cmdk
- rules/graphify.md
- theme-provider.tsx
- workflows/graphify.md
- isNodeTypeSelected
- @tiptap/extension-typography
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- react
- materialsProps.ts
- use-scrolling.ts
- tsconfig.json
- @tiptap/extension-subscript
- vercel.json
- parseShortcutKeys
- marker.tsx
- clsx
- use-image-upload.ts
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- use-composed-ref.ts
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
- image-upload-button.tsx
- text-align-button.tsx
- GridListButtonGroupTemplate.tsx
- useSidebar
- lucide-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset
- modeToggle.tsx
- blockquote-button.tsx
- Button
- bubble.tsx
- chevron-down-icon.tsx
- ui/button-group.tsx

## God Nodes (most connected - your core abstractions)
1. `useTiptapEditor()` - 43 edges
2. `Button()` - 37 edges
3. `cn()` - 37 edges
4. `buttonVariants` - 28 edges
5. `parseShortcutKeys()` - 22 edges
6. `Button` - 19 edges
7. `isNodeTypeSelected()` - 19 edges
8. `compilerOptions` - 19 edges
9. `QuizEditor()` - 18 edges
10. `useIsMobile()` - 17 edges

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

## Communities (114 total, 46 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "button/button.tsx"
Cohesion: 0.15
Nodes (12): ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps, TooltipContext, TooltipContextValue (+4 more)

### Community 3 - "ModuleCardTemplate.tsx"
Cohesion: 0.15
Nodes (20): ClassroomCardTemplate(), ModuleCardTemplateProps, ActionType, DeleteArchiveDialog(), TextAlign, Badge(), badgeVariants, Card() (+12 more)

### Community 4 - "input-group/input-group.tsx"
Cohesion: 0.16
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 5 - "useTiptapEditor"
Cohesion: 0.13
Nodes (26): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+18 more)

### Community 6 - "use-text-align.ts"
Cohesion: 0.15
Nodes (17): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+9 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (21): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, SvgProps, WholeWordIcon, Card, CardBody (+13 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.23
Nodes (19): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+11 more)

### Community 9 - "use-undo-redo.ts"
Cohesion: 0.15
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+8 more)

### Community 10 - "link-popover.tsx"
Cohesion: 0.12
Nodes (15): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, LinkIcon, SvgProps, SvgProps, TrashIcon (+7 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.11
Nodes (16): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+8 more)

### Community 13 - "sidebar.tsx"
Cohesion: 0.09
Nodes (8): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SidebarContext, SidebarContextProps, sidebarMenuButtonVariants

### Community 14 - "data.ts"
Cohesion: 0.16
Nodes (15): LearnerQuizCardTemplate(), ModuleCardTemplate(), HeaderTemplate(), SearchInputProps, SearchTemplate(), TooltipButtonTemplate(), ToolTipTemplateProps, classrooms (+7 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.09
Nodes (20): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), ColorHighlightPopoverContent(), ListDropdownMenu (+12 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "ProtectedLayout.tsx"
Cohesion: 0.19
Nodes (12): UserSidebar(), UserSkeleton(), user, instructorNav, learnerNav, publicNav, schoolAdminNav, linksByRole (+4 more)

### Community 21 - "QuizEditor.tsx"
Cohesion: 0.22
Nodes (19): QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON (+11 more)

### Community 23 - "router.tsx"
Cohesion: 0.08
Nodes (24): buttonVariants, ModuleEditor(), PublicLayout(), RootLayout(), AnalyzerResults(), ErrorBoundary(), Unauthorized(), ClassroomInstructor() (+16 more)

### Community 24 - "ModuleEditor.tsx"
Cohesion: 0.24
Nodes (11): Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+3 more)

### Community 25 - "ClassroomInstructorView.tsx"
Cohesion: 0.09
Nodes (28): ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+20 more)

### Community 26 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 27 - "code-block-button.tsx"
Cohesion: 0.22
Nodes (7): CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge(), CODE_BLOCK_SHORTCUT_KEY, UseCodeBlockConfig, Badge, BadgeProps

### Community 28 - "UserSidebar.tsx"
Cohesion: 0.26
Nodes (10): UserSidebarProps, Sidebar(), SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarHeader(), SidebarMenu(), SidebarMenuButton() (+2 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.11
Nodes (22): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+14 more)

### Community 30 - "QuizzesInstructorView.tsx"
Cohesion: 0.12
Nodes (22): LearnerQuizCardTemplateProps, QuizCardTemplate(), QuizCardTemplateProps, QuizSubmissionsCardTemplate(), Tabs(), TabsContent(), TabsList(), tabsListVariants (+14 more)

### Community 31 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 32 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 33 - "command.tsx"
Cohesion: 0.12
Nodes (7): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Textarea()

### Community 34 - "AnalyzerExtension.tsx"
Cohesion: 0.21
Nodes (7): SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue(), toast, AnalyzerExtension()

### Community 35 - "button/index.tsx"
Cohesion: 0.28
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 36 - "use-color-highlight.ts"
Cohesion: 0.25
Nodes (12): ColorHighlightButton, ColorHighlightButtonProps, canColorHighlight(), COLOR_HIGHLIGHT_SHORTCUT_KEY, getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive() (+4 more)

### Community 37 - "field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 38 - "color-highlight-popover.tsx"
Cohesion: 0.15
Nodes (13): BanIcon, SvgProps, HighlighterIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopover(), ColorHighlightPopoverButton (+5 more)

### Community 39 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 40 - "cn"
Cohesion: 0.13
Nodes (18): CheckIcon, SvgProps, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent() (+10 more)

### Community 41 - "ui/button.tsx"
Cohesion: 0.08
Nodes (27): HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, ViewMode (+19 more)

### Community 44 - "theme-provider.tsx"
Cohesion: 0.25
Nodes (10): disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext (+2 more)

### Community 46 - "isNodeTypeSelected"
Cohesion: 0.44
Nodes (8): canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler(), useLinkPopover(), useLinkState(), isNodeTypeSelected()

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, class-variance-authority, dependencies, @base-ui/react, class-variance-authority, @radix-ui/react-dropdown-menu, react-icons, survey-core (+3 more)

### Community 51 - "react"
Cohesion: 0.40
Nodes (5): react, react, getSidebarState(), SidebarMenuSkeleton(), SidebarProvider()

### Community 52 - "materialsProps.ts"
Cohesion: 0.14
Nodes (14): Props, AnalyzerResultItem, ClassroomProps, Classwork, CoreLessonsProps, CoreTopicsProps, ModuleProps, QuestionElement (+6 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 59 - "parseShortcutKeys"
Cohesion: 0.24
Nodes (9): ColorHighlightShortcutBadge(), HeadingButton, HeadingButtonProps, HeadingShortcutBadge(), HEADING_SHORTCUT_KEYS, UseHeadingConfig, formatShortcutKey(), isMac() (+1 more)

### Community 62 - "use-image-upload.ts"
Cohesion: 0.30
Nodes (9): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), BreakpointMode (+1 more)

### Community 68 - "use-composed-ref.ts"
Cohesion: 0.67
Nodes (3): updateRef(), useComposedRef(), UserRef

### Community 94 - "image-upload-button.tsx"
Cohesion: 0.25
Nodes (7): IconComponent, IconProps, ImageShortcutBadge(), ImageUploadButton, ImageUploadButtonProps, IMAGE_UPLOAD_SHORTCUT_KEY, UseImageUploadConfig

### Community 95 - "text-align-button.tsx"
Cohesion: 0.25
Nodes (7): IconComponent, IconProps, TextAlignButton, TextAlignButtonProps, TextAlignShortcutBadge(), TEXT_ALIGN_SHORTCUT_KEYS, UseTextAlignConfig

### Community 96 - "GridListButtonGroupTemplate.tsx"
Cohesion: 0.20
Nodes (10): App(), client, GridListButtonGroupTemplate(), Props, Toaster(), Tooltip(), TooltipContent(), TooltipProvider() (+2 more)

### Community 97 - "useSidebar"
Cohesion: 0.32
Nodes (6): Logo(), LogoProps, UserHeader(), SidebarRail(), SidebarTrigger(), useSidebar()

### Community 107 - "modeToggle.tsx"
Cohesion: 0.29
Nodes (7): ModeToggle(), ModeToggleProps, useTheme(), DropdownMenu(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuTrigger()

### Community 108 - "blockquote-button.tsx"
Cohesion: 0.29
Nodes (6): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, ButtonProps

### Community 109 - "Button"
Cohesion: 0.33
Nodes (6): ListButton, ListButtonProps, ListShortcutBadge(), LIST_SHORTCUT_KEYS, UseListConfig, Button

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

### Community 112 - "chevron-down-icon.tsx"
Cohesion: 0.40
Nodes (4): ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps

## Knowledge Gaps
- **283 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+278 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **46 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`, `cmdk`, `@tiptap/extension-typography`, `@tiptap/extension-image`, `@tiptap/extension-list`, `react`, `@tiptap/extension-subscript`, `clsx`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `cn`, `@radix-ui/react-popover`, `lodash.throttle`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-router-dom`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `lucide-react`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `useSidebar`, `ui/button.tsx`, `modeToggle.tsx`, `theme-provider.tsx`, `dependencies`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `GridListButtonGroupTemplate.tsx`, `useSidebar`, `command.tsx`, `ModuleCardTemplate.tsx`, `AnalyzerExtension.tsx`, `modeToggle.tsx`, `sidebar.tsx`, `data.ts`, `attachment.tsx`, `toast.tsx`, `QuizEditor.tsx`, `router.tsx`, `ModuleEditor.tsx`, `ClassroomInstructorView.tsx`, `UserSidebar.tsx`, `QuizzesInstructorView.tsx`?**
  _High betweenness centrality (0.100) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _283 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `button/button.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14705882352941177 - nodes in this community are weakly interconnected._