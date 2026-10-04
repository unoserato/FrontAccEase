# Graph Report - react  (2026-09-29)

## Corpus Check
- 299 files · ~130,265 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1571 nodes · 3556 edges · 146 communities (85 shown, 61 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 11 edges (avg confidence: 0.69)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0ae9896e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- chart.tsx
- use-search-and-replace.ts
- input-group/input-group.tsx
- use-list.ts
- use-color-highlight.ts
- search-and-replace.tsx
- use-blockquote.ts
- isNodeTypeSelected
- tooltip/tooltip.tsx
- compilerOptions
- tiptap-utils.ts
- Button
- sidebar.tsx
- SearchTemplate.tsx
- attachment.tsx
- components.json
- simple-editor.tsx
- compilerOptions
- error-1.tsx
- data.ts
- cn
- image-upload-node.tsx
- use-link-popover.ts
- use-text-align.ts
- QuizEditor.tsx
- date-picker.tsx
- shadcn/ui
- useTiptapEditor
- use-element-rect.ts
- PublicNavbar.tsx
- Customization & Theming
- CoreModulesView.tsx
- ModuleEditor.tsx
- schoolAdminRoute.tsx
- ui/card.tsx
- AnalyzerLogsSchoolAdmin.tsx
- toolbar.tsx
- QuizzesInstructorView.tsx
- use-image-upload.ts
- materialsProps.ts
- link-popover.tsx
- rules/graphify.md
- Design Critique: FrontAccEase Landing Page
- workflows/graphify.md
- toast.tsx
- ui/button.tsx
- @tiptap/extension-image
- dependencies
- @tiptap/extension-list
- ProtectedLayout.tsx
- TooltipButtonTemplate.tsx
- field.tsx
- use-scrolling.ts
- tsconfig.json
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- @tiptap/extension-subscript
- vercel.json
- parseShortcutKeys
- marker.tsx
- Instruments.tsx
- learnerRoute.tsx
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
- Component Composition
- Styling & Customization
- bubble.tsx
- clsx
- useIsMobile
- Commands
- Tools
- Registry Authoring and Addresses
- Base vs Radix
- Chat & Messaging
- 2026-09-26T12-28-39Z__src-pages-learner-dashboard-tsx.md
- Impeccable Critique: `src/pages/learner/Classroom.tsx`
- Forms & Inputs
- scripts
- use-menu-navigation.ts
- shadcn CLI Reference
- Icons
- package.json
- spacer.tsx
- @eslint/js
- eslint-plugin-react-hooks
- globals
- prettier
- prettier-plugin-tailwindcss
- sass-embedded
- @shadcn/lint
- @types/node
- @types/react
- @types/react-dom
- typescript
- typescript-eslint
- @typescript-eslint/parser
- vite

## God Nodes (most connected - your core abstractions)
1. `Button()` - 48 edges
2. `buttonVariants` - 44 edges
3. `useTiptapEditor()` - 43 edges
4. `Badge()` - 38 edges
5. `cn()` - 37 edges
6. `Card()` - 32 edges
7. `HeaderTemplate()` - 25 edges
8. `CardContent()` - 22 edges
9. `parseShortcutKeys()` - 22 edges
10. `CardHeader()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `ChartContainer()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Communities (146 total, 61 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.10
Nodes (22): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+14 more)

### Community 1 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react-refresh, @tanstack/eslint-plugin-query, @types/lodash.throttle, @vitejs/plugin-react (+3 more)

### Community 2 - "chart.tsx"
Cohesion: 0.20
Nodes (12): react, react, ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload(), INITIAL_DIMENSION (+4 more)

### Community 3 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 4 - "input-group/input-group.tsx"
Cohesion: 0.16
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 5 - "use-list.ts"
Cohesion: 0.10
Nodes (30): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, ListButton, ListButtonProps (+22 more)

### Community 6 - "use-color-highlight.ts"
Cohesion: 0.24
Nodes (13): HighlighterIcon, SvgProps, ColorHighlightButtonProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive() (+5 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (21): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+13 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.23
Nodes (19): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+11 more)

### Community 9 - "isNodeTypeSelected"
Cohesion: 0.15
Nodes (17): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+9 more)

### Community 10 - "tooltip/tooltip.tsx"
Cohesion: 0.18
Nodes (9): Tooltip(), TooltipContent, TooltipContentProps, TooltipContext, TooltipContextValue, TooltipProviderProps, TooltipTrigger, TooltipTriggerProps (+1 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "Button"
Cohesion: 0.08
Nodes (16): EditorDropdown(), ViewMode, ViewToggleProps, ModeToggle(), ModeToggleProps, useTheme(), Button(), DropdownMenu() (+8 more)

### Community 14 - "sidebar.tsx"
Cohesion: 0.10
Nodes (21): Logo(), LogoProps, UserHeader(), UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarContext (+13 more)

### Community 15 - "SearchTemplate.tsx"
Cohesion: 0.27
Nodes (7): SearchInputProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "simple-editor.tsx"
Cohesion: 0.18
Nodes (11): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), CursorVisibilityOptions, useCursorVisibility() (+3 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "error-1.tsx"
Cohesion: 0.22
Nodes (4): defaultErrorOneAction, ErrorOne(), ErrorOneAction, ErrorOneProps

### Community 21 - "data.ts"
Cohesion: 0.11
Nodes (29): ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+21 more)

### Community 22 - "cn"
Cohesion: 0.13
Nodes (18): CheckIcon, SvgProps, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent() (+10 more)

### Community 23 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 24 - "use-link-popover.ts"
Cohesion: 0.24
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

### Community 25 - "use-text-align.ts"
Cohesion: 0.13
Nodes (18): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+10 more)

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.21
Nodes (19): Switch(), QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON, deleteChoice() (+11 more)

### Community 27 - "date-picker.tsx"
Cohesion: 0.21
Nodes (9): Calendar(), CalendarDayButton(), DatePicker(), DatePickerProps, Popover(), PopoverContent(), PopoverHeader(), PopoverTitle() (+1 more)

### Community 28 - "shadcn/ui"
Cohesion: 0.11
Nodes (19): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Docs, Examples, and Usage, Component Selection, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Current Project Context, Detailed References (+11 more)

### Community 29 - "useTiptapEditor"
Cohesion: 0.09
Nodes (29): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+21 more)

### Community 30 - "use-element-rect.ts"
Cohesion: 0.23
Nodes (11): ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect(), useRefRect(), defaultOptions (+3 more)

### Community 31 - "PublicNavbar.tsx"
Cohesion: 0.16
Nodes (10): PublicFooter(), PublicNavbar(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger() (+2 more)

### Community 32 - "Customization & Theming"
Cohesion: 0.14
Nodes (14): 1. Built-in variants, 2. Tailwind classes via `className`, 3. Add a new variant, 4. Wrapper components, Adding Custom Colors, Border Radius, Changing the Theme, Checking for Updates (+6 more)

### Community 33 - "CoreModulesView.tsx"
Cohesion: 0.16
Nodes (10): Item(), ItemActions(), ItemContent(), ItemMedia(), itemMediaVariants, ItemTitle(), itemVariants, CoreTopicsProps (+2 more)

### Community 34 - "ModuleEditor.tsx"
Cohesion: 0.11
Nodes (15): ActionType, Props, Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter() (+7 more)

### Community 35 - "schoolAdminRoute.tsx"
Cohesion: 0.09
Nodes (26): ModuleCardTemplate(), QuizCardTemplate(), QuizCardTemplateProps, QuizSubmissionsCardTemplate(), quizSubmissions, user, ModuleEditor(), getQuizTotalPoints() (+18 more)

### Community 36 - "ui/card.tsx"
Cohesion: 0.20
Nodes (16): LearnerQuizCardTemplate(), LearnerQuizCardTemplateProps, ModuleCardTemplateProps, DeleteArchiveDialog(), Card(), CardAction(), CardContent(), CardDescription() (+8 more)

### Community 37 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.17
Nodes (17): ChartConfig, ChartContainer(), Table(), TableBody(), TableCell(), TableHead(), TableHeader(), TableRow() (+9 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.24
Nodes (8): BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, updateRef(), useComposedRef(), UserRef

### Community 39 - "QuizzesInstructorView.tsx"
Cohesion: 0.16
Nodes (12): ClassroomCardTemplate(), HeaderTemplate(), HeaderTemplateProps, SearchTemplate(), TooltipButtonTemplate(), Tabs(), TabsContent(), TabsList() (+4 more)

### Community 40 - "use-image-upload.ts"
Cohesion: 0.29
Nodes (10): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), BreakpointMode (+2 more)

### Community 41 - "materialsProps.ts"
Cohesion: 0.14
Nodes (16): AnalyzerResultItem, CoreLessonsProps, QuestionElement, QuestionType, QuizJson, QuizPage, QuizProps, QuizSubmissionProps (+8 more)

### Community 42 - "link-popover.tsx"
Cohesion: 0.08
Nodes (27): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, HighlightColor, pickHighlightColorsByValue() (+19 more)

### Community 44 - "Design Critique: FrontAccEase Landing Page"
Cohesion: 0.14
Nodes (13): Design Critique: FrontAccEase Landing Page, Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] Missing WAI-ARIA Tab Semantics in Interactive Tab Lists, [P2] Mobile Visibility Gap for Instructor Preview Tab, [P3] Non-Functional Mockup Action Buttons (+5 more)

### Community 46 - "toast.tsx"
Cohesion: 0.09
Nodes (7): client, Toaster(), instructorRoute, learnerRoute, publicRoute, router, schoolAdminRoute

### Community 47 - "ui/button.tsx"
Cohesion: 0.15
Nodes (21): LearnerQuizHistoryCardTemplate(), LearnerQuizHistoryCardTemplateProps, HeroInterfacePreview(), PourExplorer(), PourPrincipleData, pourPrinciples, SectionHeader(), SectionHeaderProps (+13 more)

### Community 49 - "dependencies"
Cohesion: 0.18
Nodes (11): @base-ui/react, class-variance-authority, cmdk, lodash.throttle, dependencies, @base-ui/react, class-variance-authority, cmdk (+3 more)

### Community 51 - "ProtectedLayout.tsx"
Cohesion: 0.43
Nodes (5): Role, instructorNav, learnerNav, schoolAdminNav, linksByRole

### Community 52 - "TooltipButtonTemplate.tsx"
Cohesion: 0.20
Nodes (8): Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Separator(), Tooltip(), TooltipContent(), TooltipTrigger()

### Community 53 - "field.tsx"
Cohesion: 0.13
Nodes (8): LoginPage(), Field(), FieldError(), FieldGroup(), FieldLabel(), fieldVariants, Spinner(), loginAPI()

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 56 - "Critique Snapshot: `src/pages/learner/Classroom.tsx`"
Cohesion: 0.14
Nodes (13): Critique Snapshot: `src/pages/learner/Classroom.tsx`, Design Health Score, Design Specificity Verdict, Minor Observations & Questions, Overall Impression, [P0] Unshielded Destructive "Leave Classroom" Action, [P1] Absence of Student Progress & Score Badging, [P1] Module-Scope Static Data & Missing Classroom Switcher / Join Flow (+5 more)

### Community 59 - "parseShortcutKeys"
Cohesion: 0.05
Nodes (47): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge() (+39 more)

### Community 61 - "Instruments.tsx"
Cohesion: 0.19
Nodes (11): DialogTrigger(), Input(), Label(), Textarea(), wcagCriteria, WCAGCriterion, WCAGGuideline, wcagGuidelines (+3 more)

### Community 62 - "learnerRoute.tsx"
Cohesion: 0.10
Nodes (17): coreModules, initialChatMessages, ChatMessage, CoreModulesProps, ProtectedLayout(), AnalyzerResults(), Analyzer(), models (+9 more)

### Community 68 - "theme-provider.tsx"
Cohesion: 0.17
Nodes (14): App(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider() (+6 more)

### Community 97 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 108 - "Component Composition"
Cohesion: 0.15
Nodes (13): Avatar always needs AvatarFallback, Button has no isPending or isLoading prop, Callouts use Alert, Card structure, Choosing between overlay components, Component Composition, Contents, Dialog, Sheet, and Drawer always need a Title (+5 more)

### Community 109 - "Styling & Customization"
Cohesion: 0.15
Nodes (13): Built-in variants first, className for layout only, Contents, No manual dark: color overrides, No manual z-index on overlay components, No raw color values for status/state indicators, No space-x-* / space-y-*, Prefer size-* over w-* h-* when equal (+5 more)

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

### Community 113 - "useIsMobile"
Cohesion: 0.23
Nodes (11): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, getServerSnapshot(), getSnapshot() (+3 more)

### Community 114 - "Commands"
Cohesion: 0.17
Nodes (12): `add` — Add components, `apply` — Apply a preset to an existing project, `build` — Build a custom registry, Commands, `diff` — Check for updates, `docs` — Get component documentation URLs, Dry-Run Mode, `info` — Project information (+4 more)

### Community 115 - "Tools"
Cohesion: 0.17
Nodes (11): Configuring Registries, Setup, `shadcn:get_add_command_for_items`, `shadcn:get_audit_checklist`, `shadcn:get_item_examples_from_registries`, `shadcn:get_project_registries`, `shadcn:list_items_in_registries`, shadcn MCP Server (+3 more)

### Community 117 - "Registry Authoring and Addresses"
Cohesion: 0.22
Nodes (9): Address Schemes, Build and Verify, GitHub Registries, Include, Item Definitions, Mental Model, Registry Authoring and Addresses, Registry Dependencies (+1 more)

### Community 118 - "Base vs Radix"
Cohesion: 0.22
Nodes (9): Accordion, Base vs Radix, Button / trigger as non-button element (base only), Composition: asChild (radix) vs render (base), Contents, Select, Select — multiple selection and object values (base only), Slider (+1 more)

### Community 119 - "Chat & Messaging"
Cohesion: 0.22
Nodes (9): Attachments use Attachment, Chat & Messaging, Contents, Escape hatch: the scroller hooks, Message rows use Message, Message surfaces use Bubble, Scrollable threads use MessageScroller, Streaming, anchoring, and jump-to-latest are built in (+1 more)

### Community 120 - "2026-09-26T12-28-39Z__src-pages-learner-dashboard-tsx.md"
Cohesion: 0.22
Nodes (8): Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider, What's Working

### Community 121 - "Impeccable Critique: `src/pages/learner/Classroom.tsx`"
Cohesion: 0.22
Nodes (8): Design Health Score, Design Specificity Verdict, Impeccable Critique: `src/pages/learner/Classroom.tsx`, Minor Observations & Questions to Consider, Overall Impression, Persona Red Flags, Priority Issues, What's Working

### Community 122 - "Forms & Inputs"
Cohesion: 0.25
Nodes (8): Buttons inside inputs use InputGroup + InputGroupAddon, Contents, Field validation and disabled states, FieldSet + FieldLegend for grouping related fields, Forms & Inputs, Forms use FieldGroup + Field, InputGroup requires InputGroupInput/InputGroupTextarea, Option sets (2–7 choices) use ToggleGroup

### Community 123 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, format, lint, preview, typecheck

### Community 124 - "use-menu-navigation.ts"
Cohesion: 0.33
Nodes (5): ColorHighlightPopoverContent(), useToolbarNavigation(), MenuNavigationOptions, Orientation, useMenuNavigation()

### Community 126 - "shadcn CLI Reference"
Cohesion: 0.40
Nodes (5): Contents, Presets, shadcn CLI Reference, Switching Presets, Templates

### Community 127 - "Icons"
Cohesion: 0.40
Nodes (4): Icons, Icons in Button use data-icon attribute, No sizing classes on icons inside components, Pass icons as component objects, not string keys

### Community 128 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

## Knowledge Gaps
- **484 isolated node(s):** `Current Project Context`, `Principles`, `Styling & Tailwind → [styling.md](./rules/styling.md)`, `Forms & Inputs → [forms.md](./rules/forms.md)`, `Component Structure → [composition.md](./rules/composition.md)` (+479 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **61 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`, `chart.tsx`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `cn`, `@radix-ui/react-popover`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `recharts`, `@tiptap/extension-typography`, `survey-core`, `lucide-react`, `clsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `react` connect `chart.tsx` to `theme-provider.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `Button`, `sidebar.tsx`, `dependencies`, `useIsMobile`, `date-picker.tsx`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `Button()` connect `Button` to `sidebar.tsx`, `SearchTemplate.tsx`, `attachment.tsx`, `error-1.tsx`, `data.ts`, `QuizEditor.tsx`, `date-picker.tsx`, `PublicNavbar.tsx`, `CoreModulesView.tsx`, `ModuleEditor.tsx`, `schoolAdminRoute.tsx`, `ui/card.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `QuizzesInstructorView.tsx`, `toast.tsx`, `ui/button.tsx`, `TooltipButtonTemplate.tsx`, `field.tsx`, `Instruments.tsx`, `learnerRoute.tsx`, `message-scroller.tsx`, `useIsMobile`?**
  _High betweenness centrality (0.062) - this node is a cross-community bridge._
- **What connects `Current Project Context`, `Principles`, `Styling & Tailwind → [styling.md](./rules/styling.md)` to the rest of the system?**
  _484 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10114942528735632 - nodes in this community are weakly interconnected._
- **Should `use-search-and-replace.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1341991341991342 - nodes in this community are weakly interconnected._
- **Should `use-list.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1039136302294197 - nodes in this community are weakly interconnected._