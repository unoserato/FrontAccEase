# Graph Report - react  (2026-10-05)

## Corpus Check
- 305 files · ~135,981 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1623 nodes · 3604 edges · 156 communities (93 shown, 63 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 15 edges (avg confidence: 0.72)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b3a56f0d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- chart.tsx
- rootRouter.tsx
- simple-editor.tsx
- use-list-dropdown-menu.ts
- use-color-highlight.ts
- search-and-replace.tsx
- use-list.ts
- isNodeTypeSelected
- button/button.tsx
- compilerOptions
- tiptap-utils.ts
- modeToggle.tsx
- sidebar.tsx
- SearchTemplate.tsx
- attachment.tsx
- components.json
- ModuleEditor
- compilerOptions
- error-1.tsx
- data.ts
- cn
- use-element-rect.ts
- use-link-popover.ts
- use-text-align.ts
- QuizEditor.tsx
- Analyzer.tsx
- shadcn/ui
- use-heading.ts
- Critical Rules
- PublicNavbar.tsx
- Customization & Theming
- Instruments.tsx
- ModuleEditor.tsx
- schoolAdminRoute.tsx
- ui/card.tsx
- AnalyzerLogsSchoolAdmin.tsx
- toolbar.tsx
- LearnerQuizCardTemplate.tsx
- use-search-and-replace.ts
- materialsProps.ts
- link-popover.tsx
- rules/graphify.md
- Design Critique: FrontAccEase Landing Page
- workflows/graphify.md
- ui/button.tsx
- @tiptap/extension-image
- @base-ui/react
- @tiptap/extension-list
- ProtectedLayout.tsx
- TooltipButtonTemplate.tsx
- auth-04.tsx
- use-scrolling.ts
- tsconfig.json
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- @tiptap/extension-subscript
- vercel.json
- useTiptapEditor
- marker.tsx
- AnalyzerResults.tsx
- PageTemplate.tsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- theme-provider.tsx
- dependencies
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
- button/index.tsx
- recharts
- @tiptap/extension-typography
- CoreModulesView.tsx
- image-upload-node.tsx
- useIsMobile
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
- instructorRoute.tsx
- Commands
- Tools
- SKILL.md
- Registry Authoring and Addresses
- Base vs Radix
- Chat & Messaging
- 2026-09-26T12-28-39Z__src-pages-learner-dashboard-tsx.md
- Impeccable Critique: `src/pages/learner/Classroom.tsx`
- Forms & Inputs
- scripts
- theme-toggle.tsx
- package.json
- image-upload-node-extension.ts
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
- QuizForm.tsx
- App.tsx
- getQuizJson
- spacer.tsx
- class-variance-authority
- cmdk
- lodash.throttle
- react-router-dom

## God Nodes (most connected - your core abstractions)
1. `buttonVariants` - 50 edges
2. `Button()` - 48 edges
3. `useTiptapEditor()` - 43 edges
4. `Badge()` - 40 edges
5. `cn()` - 37 edges
6. `Card()` - 34 edges
7. `CardContent()` - 23 edges
8. `HeaderTemplate()` - 22 edges
9. `CardHeader()` - 22 edges
10. `parseShortcutKeys()` - 22 edges

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

## Communities (156 total, 63 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react-refresh, @tanstack/eslint-plugin-query, @types/lodash.throttle, @vitejs/plugin-react (+3 more)

### Community 2 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload(), INITIAL_DIMENSION, THEMES, TooltipNameType (+1 more)

### Community 3 - "rootRouter.tsx"
Cohesion: 0.06
Nodes (34): publicRoute, Analyzer, AnalyzerExtension, AnalyzerLogsClassroomView, AnalyzerLogsInstructor, AnalyzerLogsSchoolAdmin, AnalyzerResults, Chat (+26 more)

### Community 4 - "simple-editor.tsx"
Cohesion: 0.17
Nodes (8): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), handleImageUpload(), MAX_FILE_SIZE

### Community 5 - "use-list-dropdown-menu.ts"
Cohesion: 0.11
Nodes (22): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, isListActive(), listIcons (+14 more)

### Community 6 - "use-color-highlight.ts"
Cohesion: 0.16
Nodes (21): HighlighterIcon, SvgProps, ImagePlusIcon, SvgProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode (+13 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (21): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+13 more)

### Community 8 - "use-list.ts"
Cohesion: 0.21
Nodes (22): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+14 more)

### Community 9 - "isNodeTypeSelected"
Cohesion: 0.15
Nodes (17): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+9 more)

### Community 10 - "button/button.tsx"
Cohesion: 0.12
Nodes (15): CheckIcon, SvgProps, ButtonProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent (+7 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.10
Nodes (21): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, HeadingButtonProps, HeadingShortcutBadge(), HEADING_SHORTCUT_KEYS, UseHeadingConfig (+13 more)

### Community 13 - "modeToggle.tsx"
Cohesion: 0.14
Nodes (6): EditorDropdown(), ModeToggleProps, DropdownMenu(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuTrigger()

### Community 14 - "sidebar.tsx"
Cohesion: 0.09
Nodes (20): Logo(), LogoProps, UserHeader(), UserSidebar(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps (+12 more)

### Community 15 - "SearchTemplate.tsx"
Cohesion: 0.16
Nodes (11): SearchInputProps, SearchTemplate(), TooltipButtonTemplate(), InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants (+3 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "ModuleEditor"
Cohesion: 0.47
Nodes (4): ModuleEditor(), createModuleAPI(), getModulesAPI(), useModules()

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "error-1.tsx"
Cohesion: 0.19
Nodes (5): defaultErrorOneAction, ErrorOne(), ErrorOneAction, ErrorOneProps, PillButton()

### Community 21 - "data.ts"
Cohesion: 0.12
Nodes (25): QuizCardTemplate(), QuizCardTemplateProps, ClassworkCardTemplate(), QuizSubmissionsCardTemplateProps, Avatar(), AvatarFallback(), AvatarImage(), Tabs() (+17 more)

### Community 22 - "cn"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 23 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 24 - "use-link-popover.ts"
Cohesion: 0.27
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

### Community 25 - "use-text-align.ts"
Cohesion: 0.09
Nodes (25): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+17 more)

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.21
Nodes (18): Checkbox(), QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON, deleteChoice() (+10 more)

### Community 27 - "Analyzer.tsx"
Cohesion: 0.14
Nodes (16): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, DatePicker(), DatePickerProps (+8 more)

### Community 28 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.09
Nodes (28): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+20 more)

### Community 30 - "Critical Rules"
Cohesion: 0.25
Nodes (8): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Forms & Inputs → [forms.md](./rules/forms.md), Icons → [icons.md](./rules/icons.md), Styling & Tailwind → [styling.md](./rules/styling.md), Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

### Community 31 - "PublicNavbar.tsx"
Cohesion: 0.16
Nodes (9): PublicFooter(), PublicNavbar(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger() (+1 more)

### Community 32 - "Customization & Theming"
Cohesion: 0.14
Nodes (14): 1. Built-in variants, 2. Tailwind classes via `className`, 3. Add a new variant, 4. Wrapper components, Adding Custom Colors, Border Radius, Changing the Theme, Checking for Updates (+6 more)

### Community 33 - "Instruments.tsx"
Cohesion: 0.12
Nodes (14): Item(), ItemActions(), ItemContent(), ItemMedia(), itemMediaVariants, ItemTitle(), itemVariants, wcagCriteria (+6 more)

### Community 34 - "ModuleEditor.tsx"
Cohesion: 0.18
Nodes (17): DeleteArchiveDialog(), Props, Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+9 more)

### Community 35 - "schoolAdminRoute.tsx"
Cohesion: 0.11
Nodes (19): ClassroomCardTemplate(), ModuleCardTemplate(), ModuleReadOnly(), copyText(), CopyTextParams, getDateString(), AnalyzerLogsClassroomView(), ClassroomInstructorView() (+11 more)

### Community 36 - "ui/card.tsx"
Cohesion: 0.21
Nodes (15): ModuleCardTemplateProps, ActionType, HeroInterfacePreview(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+7 more)

### Community 37 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.16
Nodes (19): ChartConfig, ChartContainer(), Table(), TableBody(), TableCell(), TableHead(), TableHeader(), TableRow() (+11 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.17
Nodes (12): BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef(), useComposedRef() (+4 more)

### Community 39 - "LearnerQuizCardTemplate.tsx"
Cohesion: 0.28
Nodes (3): LearnerQuizCardTemplate(), LearnerQuizCardTemplateProps, getQuizTotalQuestions()

### Community 40 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 41 - "materialsProps.ts"
Cohesion: 0.14
Nodes (13): AnalyzerResultItem, CoreLessonsProps, CoreTopicsProps, ModuleProps, QuestionElement, QuestionType, QuizJson, QuizPage (+5 more)

### Community 42 - "link-popover.tsx"
Cohesion: 0.07
Nodes (33): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, HighlightColor, pickHighlightColorsByValue() (+25 more)

### Community 44 - "Design Critique: FrontAccEase Landing Page"
Cohesion: 0.14
Nodes (13): Design Critique: FrontAccEase Landing Page, Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] Missing WAI-ARIA Tab Semantics in Interactive Tab Lists, [P2] Mobile Visibility Gap for Instructor Preview Tab, [P3] Non-Functional Mockup Action Buttons (+5 more)

### Community 47 - "ui/button.tsx"
Cohesion: 0.10
Nodes (23): LearnerQuizHistoryCardTemplate(), LearnerQuizHistoryCardTemplateProps, ViewMode, ViewToggleProps, PourExplorer(), PourPrincipleData, pourPrinciples, PricingBlock() (+15 more)

### Community 51 - "ProtectedLayout.tsx"
Cohesion: 0.14
Nodes (14): UserSidebarProps, UserSkeleton(), Skeleton(), user, instructorNav, learnerNav, schoolAdminNav, UserProps (+6 more)

### Community 52 - "TooltipButtonTemplate.tsx"
Cohesion: 0.20
Nodes (8): Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Separator(), Tooltip(), TooltipContent(), TooltipTrigger()

### Community 53 - "auth-04.tsx"
Cohesion: 0.16
Nodes (9): LoginPage(), Field(), FieldError(), FieldGroup(), FieldLabel(), fieldVariants, Spinner(), loginAPI() (+1 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 56 - "Critique Snapshot: `src/pages/learner/Classroom.tsx`"
Cohesion: 0.14
Nodes (13): Critique Snapshot: `src/pages/learner/Classroom.tsx`, Design Health Score, Design Specificity Verdict, Minor Observations & Questions, Overall Impression, [P0] Unshielded Destructive "Leave Classroom" Action, [P1] Absence of Student Progress & Score Badging, [P1] Module-Scope Static Data & Missing Classroom Switcher / Join Flow (+5 more)

### Community 59 - "useTiptapEditor"
Cohesion: 0.10
Nodes (19): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+11 more)

### Community 61 - "AnalyzerResults.tsx"
Cohesion: 0.17
Nodes (8): SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue(), initialChatMessages, ChatMessage, models

### Community 62 - "PageTemplate.tsx"
Cohesion: 0.21
Nodes (8): HeaderTemplate(), HeaderTemplateProps, coreModules, CoreModulesProps, QuizzesInstructor(), ContinueLearningCard(), CoreModuleCardTemplate(), MOCK_MODULE_PROGRESS

### Community 68 - "theme-provider.tsx"
Cohesion: 0.17
Nodes (14): App(), ModeToggle(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES (+6 more)

### Community 69 - "dependencies"
Cohesion: 0.18
Nodes (11): axios, cn, lucide-react, dependencies, axios, cn, lucide-react, survey-core (+3 more)

### Community 91 - "button/index.tsx"
Cohesion: 0.13
Nodes (13): ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), COLOR_HIGHLIGHT_SHORTCUT_KEY, UseColorHighlightConfig, IconComponent, IconProps, ImageShortcutBadge() (+5 more)

### Community 96 - "CoreModulesView.tsx"
Cohesion: 0.20
Nodes (12): Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Input(), Switch(), UserProps, EarnedBagdes() (+4 more)

### Community 97 - "image-upload-node.tsx"
Cohesion: 0.15
Nodes (9): CloseIcon, SvgProps, FileItem, ImageUploadDragAreaProps, ImageUploadNode(), ImageUploadPreviewProps, UploadOptions, useFileUpload() (+1 more)

### Community 98 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, CalendarDayButton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot(), getSnapshot() (+3 more)

### Community 108 - "Component Composition"
Cohesion: 0.15
Nodes (13): Avatar always needs AvatarFallback, Button has no isPending or isLoading prop, Callouts use Alert, Card structure, Choosing between overlay components, Component Composition, Contents, Dialog, Sheet, and Drawer always need a Title (+5 more)

### Community 109 - "Styling & Customization"
Cohesion: 0.15
Nodes (13): Built-in variants first, className for layout only, Contents, No manual dark: color overrides, No manual z-index on overlay components, No raw color values for status/state indicators, No space-x-* / space-y-*, Prefer size-* over w-* h-* when equal (+5 more)

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

### Community 114 - "Commands"
Cohesion: 0.12
Nodes (17): `add` — Add components, `apply` — Apply a preset to an existing project, `build` — Build a custom registry, Commands, Contents, `diff` — Check for updates, `docs` — Get component documentation URLs, Dry-Run Mode (+9 more)

### Community 115 - "Tools"
Cohesion: 0.17
Nodes (11): Configuring Registries, Setup, `shadcn:get_add_command_for_items`, `shadcn:get_audit_checklist`, `shadcn:get_item_examples_from_registries`, `shadcn:get_project_registries`, `shadcn:list_items_in_registries`, shadcn MCP Server (+3 more)

### Community 116 - "SKILL.md"
Cohesion: 0.21
Nodes (4): Icons, Icons in Button use data-icon attribute, No sizing classes on icons inside components, Pass icons as component objects, not string keys

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

### Community 127 - "theme-toggle.tsx"
Cohesion: 0.32
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 128 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 129 - "image-upload-node-extension.ts"
Cohesion: 0.33
Nodes (4): Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction

### Community 146 - "QuizForm.tsx"
Cohesion: 0.47
Nodes (5): clearQuizProgress(), getQuizStorageKey(), QuizForm(), QuizFormProps, SURVEY_THEMES_MAP

### Community 147 - "App.tsx"
Cohesion: 0.50
Nodes (3): client, Toaster(), RootRouter()

### Community 148 - "getQuizJson"
Cohesion: 0.67
Nodes (4): QuizSubmissionsCardTemplate(), getQuizJson(), getQuizTotalPoints(), DashboardTab()

## Knowledge Gaps
- **522 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+517 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **63 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`, `class-variance-authority`, `cmdk`, `lodash.throttle`, `react-router-dom`, `@tiptap/extension-image`, `@base-ui/react`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `@radix-ui/react-popover`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `@shadcn/react`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `recharts`, `@tiptap/extension-typography`, `useIsMobile`, `clsx`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `chart.tsx`, `theme-provider.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `dependencies`, `sidebar.tsx`?**
  _High betweenness centrality (0.113) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `modeToggle.tsx`, `sidebar.tsx`, `SearchTemplate.tsx`, `attachment.tsx`, `error-1.tsx`, `data.ts`, `QuizEditor.tsx`, `Analyzer.tsx`, `PublicNavbar.tsx`, `Instruments.tsx`, `ModuleEditor.tsx`, `schoolAdminRoute.tsx`, `ui/card.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `toast.tsx`, `TooltipButtonTemplate.tsx`, `auth-04.tsx`, `AnalyzerResults.tsx`, `PageTemplate.tsx`, `CoreModulesView.tsx`, `message-scroller.tsx`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _522 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `rootRouter.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `use-list-dropdown-menu.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11083743842364532 - nodes in this community are weakly interconnected._