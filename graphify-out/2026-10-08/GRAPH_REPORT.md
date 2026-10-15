# Graph Report - react  (2026-10-07)

## Corpus Check
- 318 files · ~141,989 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1707 nodes · 3769 edges · 160 communities (93 shown, 67 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7e67c652`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- SearchTemplate.tsx
- rootRouter.tsx
- simple-editor.tsx
- use-list-dropdown-menu.ts
- use-color-highlight.ts
- search-and-replace.tsx
- useTiptapEditor
- use-undo-redo.ts
- tooltip/tooltip.tsx
- compilerOptions
- tiptap-utils.ts
- chart.tsx
- sidebar.tsx
- Instruments.tsx
- attachment.tsx
- components.json
- Chat.tsx
- compilerOptions
- error-1.tsx
- ClassroomInstructorView.tsx
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
- ClassroomEmpty.tsx
- CoreModulesView.tsx
- materials.ts
- ui/card.tsx
- AnalyzerLogsSchoolAdmin.tsx
- toolbar.tsx
- button-group/button-group.tsx
- use-search-and-replace.ts
- materialsProps.ts
- link-popover.tsx
- rules/graphify.md
- Design Critique: FrontAccEase Landing Page
- workflows/graphify.md
- toast.tsx
- ui/badge.tsx
- @tiptap/extension-image
- publicRoute.tsx
- @tiptap/extension-list
- ProtectedLayout.tsx
- TooltipButtonTemplate.tsx
- SignUpPage.tsx
- use-scrolling.ts
- tsconfig.json
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- schoolAdminRoute.tsx
- vercel.json
- DeleteArchiveDialog.tsx
- marker.tsx
- modeToggle.tsx
- theme-provider.tsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- ui/button.tsx
- dependencies
- @radix-ui/react-popover
- @radix-ui/react-dropdown-menu
- react-dom
- react-hotkeys-hook
- react-day-picker
- react-icons
- shadcn
- PageSkeleton.tsx
- skeleton.tsx
- axios.ts
- tailwindcss
- @tailwindcss/vite
- @tanstack/react-query
- @tiptap/core
- QuizForm.tsx
- @tiptap/extension-highlight
- @tiptap/extension-horizontal-rule
- @tiptap/extension-superscript
- @tiptap/pm
- cn
- @tiptap/starter-kit
- lucide-react
- recharts
- @tiptap/extension-typography
- Permissions.tsx
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
- learnerRoute.tsx
- react-markdown
- parseShortcutKeys
- package.json
- image-upload-node-extension.ts
- @eslint/js
- eslint-plugin-react-hooks
- globals
- prettier
- prettier-plugin-tailwindcss
- @base-ui/react
- input-otp
- @types/node
- @types/react
- @types/react-dom
- @shadcn/react
- typescript-eslint
- @typescript-eslint/parser
- vite
- survey-core
- @tiptap/react
- getQuizJson
- spacer.tsx
- class-variance-authority
- cmdk
- lodash.throttle
- react-router-dom
- @tanstack/eslint-plugin-query
- @types/lodash.throttle
- rehype-highlight
- remark-gfm
- tw-animate-css
- @vitejs/plugin-react

## God Nodes (most connected - your core abstractions)
1. `buttonVariants` - 50 edges
2. `Button()` - 49 edges
3. `useTiptapEditor()` - 43 edges
4. `Badge()` - 39 edges
5. `cn()` - 37 edges
6. `Card()` - 33 edges
7. `CardContent()` - 22 edges
8. `parseShortcutKeys()` - 22 edges
9. `CardHeader()` - 21 edges
10. `CardTitle()` - 20 edges

## Surprising Connections (you probably didn't know these)
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ChartContainer()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `InputOTPSlot()` --references--> `react`  [EXTRACTED]
  src/components/ui/input-otp.tsx → package.json

## Import Cycles
- None detected.

## Communities (160 total, 67 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.10
Nodes (23): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+15 more)

### Community 1 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react-refresh, sass-embedded, @shadcn/lint, typescript (+3 more)

### Community 2 - "SearchTemplate.tsx"
Cohesion: 0.12
Nodes (7): SearchInputProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 3 - "rootRouter.tsx"
Cohesion: 0.20
Nodes (5): instructorRoute, learnerRoute, publicRoute, router, schoolAdminRoute

### Community 4 - "simple-editor.tsx"
Cohesion: 0.17
Nodes (11): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), CursorVisibilityOptions, useCursorVisibility() (+3 more)

### Community 5 - "use-list-dropdown-menu.ts"
Cohesion: 0.10
Nodes (26): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, ListButton, ListButtonProps (+18 more)

### Community 6 - "use-color-highlight.ts"
Cohesion: 0.15
Nodes (22): HighlighterIcon, SvgProps, ImagePlusIcon, SvgProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode (+14 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (23): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+15 more)

### Community 8 - "useTiptapEditor"
Cohesion: 0.21
Nodes (13): CodeBlockIcon, SvgProps, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge(), canToggle(), CODE_BLOCK_SHORTCUT_KEY, shouldShowButton() (+5 more)

### Community 9 - "use-undo-redo.ts"
Cohesion: 0.15
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+8 more)

### Community 10 - "tooltip/tooltip.tsx"
Cohesion: 0.18
Nodes (9): Tooltip(), TooltipContent, TooltipContentProps, TooltipContext, TooltipContextValue, TooltipProviderProps, TooltipTrigger, TooltipTriggerProps (+1 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "chart.tsx"
Cohesion: 0.18
Nodes (13): react, react, CalendarDayButton(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload() (+5 more)

### Community 14 - "sidebar.tsx"
Cohesion: 0.10
Nodes (18): UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup() (+10 more)

### Community 15 - "Instruments.tsx"
Cohesion: 0.11
Nodes (15): Item(), ItemActions(), ItemContent(), ItemMedia(), itemMediaVariants, ItemTitle(), itemVariants, Separator() (+7 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "Chat.tsx"
Cohesion: 0.32
Nodes (6): RichText(), RichTextProps, ChatMessage, Chat(), STARTER_PROMPTS, chatAPI()

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 21 - "ClassroomInstructorView.tsx"
Cohesion: 0.14
Nodes (15): QuizCardTemplate(), QuizCardTemplateProps, CardAction(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger() (+7 more)

### Community 22 - "cn"
Cohesion: 0.08
Nodes (28): CheckIcon, SvgProps, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuContent() (+20 more)

### Community 23 - "use-element-rect.ts"
Cohesion: 0.23
Nodes (11): ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect(), useRefRect(), defaultOptions (+3 more)

### Community 24 - "use-link-popover.ts"
Cohesion: 0.27
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

### Community 25 - "use-text-align.ts"
Cohesion: 0.09
Nodes (25): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+17 more)

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.24
Nodes (17): Checkbox(), QuizProps, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON (+9 more)

### Community 27 - "Analyzer.tsx"
Cohesion: 0.12
Nodes (20): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, DatePicker(), DatePickerProps (+12 more)

### Community 28 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.09
Nodes (40): BlockquoteIcon, SvgProps, HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps (+32 more)

### Community 30 - "Critical Rules"
Cohesion: 0.25
Nodes (8): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Forms & Inputs → [forms.md](./rules/forms.md), Icons → [icons.md](./rules/icons.md), Styling & Tailwind → [styling.md](./rules/styling.md), Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

### Community 31 - "PublicNavbar.tsx"
Cohesion: 0.17
Nodes (9): Logo(), LogoProps, UserHeader(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle() (+1 more)

### Community 32 - "Customization & Theming"
Cohesion: 0.14
Nodes (14): 1. Built-in variants, 2. Tailwind classes via `className`, 3. Add a new variant, 4. Wrapper components, Adding Custom Colors, Border Radius, Changing the Theme, Checking for Updates (+6 more)

### Community 33 - "ClassroomEmpty.tsx"
Cohesion: 0.23
Nodes (10): Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle(), InputOTP() (+2 more)

### Community 34 - "CoreModulesView.tsx"
Cohesion: 0.20
Nodes (14): Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle(), DialogTrigger() (+6 more)

### Community 35 - "materials.ts"
Cohesion: 0.13
Nodes (20): ClassroomCardTemplate(), ModuleCardTemplate(), ModuleEditor(), ModuleReadOnly(), getDateString(), UsePromptProps, useUnmount(), ClassroomInstructor() (+12 more)

### Community 36 - "ui/card.tsx"
Cohesion: 0.20
Nodes (14): HeroInterfacePreview(), Card(), CardContent(), CardDescription(), CardFooter(), CardHeader(), CardTitle(), coreModules (+6 more)

### Community 37 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.11
Nodes (24): HeaderTemplate(), HeaderTemplateProps, ActionType, ChartConfig, ChartContainer(), DropdownMenu(), DropdownMenuContent(), DropdownMenuItem() (+16 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.15
Nodes (13): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef() (+5 more)

### Community 39 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 40 - "use-search-and-replace.ts"
Cohesion: 0.15
Nodes (17): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+9 more)

### Community 41 - "materialsProps.ts"
Cohesion: 0.09
Nodes (25): analyzerResults, Classwork, CoreLessonsProps, CoreTopicsProps, ModuleProps, PrincipleData, PrincipleIssue, PrincipleItem (+17 more)

### Community 42 - "link-popover.tsx"
Cohesion: 0.09
Nodes (25): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, HighlightColor, ColorHighlightPopoverButton (+17 more)

### Community 44 - "Design Critique: FrontAccEase Landing Page"
Cohesion: 0.14
Nodes (13): Design Critique: FrontAccEase Landing Page, Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] Missing WAI-ARIA Tab Semantics in Interactive Tab Lists, [P2] Mobile Visibility Gap for Instructor Preview Tab, [P3] Non-Functional Mockup Action Buttons (+5 more)

### Community 46 - "toast.tsx"
Cohesion: 0.12
Nodes (5): App(), client, Toaster(), TooltipProvider(), RootRouter()

### Community 47 - "ui/badge.tsx"
Cohesion: 0.15
Nodes (10): PourExplorer(), PourPrincipleData, pourPrinciples, SectionHeader(), SectionHeaderProps, Badge(), badgeVariants, A11yDefectScenario (+2 more)

### Community 49 - "publicRoute.tsx"
Cohesion: 0.14
Nodes (13): PublicLayout(), AboutPage, AccessibilityPage, AccessibilityStatementPage, ContactPage, FeaturesPage, HowItWorksPage, LandingPage (+5 more)

### Community 51 - "ProtectedLayout.tsx"
Cohesion: 0.33
Nodes (6): instructorNav, learnerNav, publicNav, schoolAdminNav, UserRole, linksByRole

### Community 52 - "TooltipButtonTemplate.tsx"
Cohesion: 0.21
Nodes (7): Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

### Community 53 - "SignUpPage.tsx"
Cohesion: 0.12
Nodes (17): LoginPage(), Field(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), fieldVariants, Label() (+9 more)

### Community 54 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 55 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 56 - "Critique Snapshot: `src/pages/learner/Classroom.tsx`"
Cohesion: 0.14
Nodes (13): Critique Snapshot: `src/pages/learner/Classroom.tsx`, Design Health Score, Design Specificity Verdict, Minor Observations & Questions, Overall Impression, [P0] Unshielded Destructive "Leave Classroom" Action, [P1] Absence of Student Progress & Score Badging, [P1] Module-Scope Static Data & Missing Classroom Switcher / Join Flow (+5 more)

### Community 57 - "schoolAdminRoute.tsx"
Cohesion: 0.14
Nodes (13): AnalyzerLogsClassroomView, AnalyzerLogsSchoolAdmin, ClassroomInstructorView, CoreModulesView, DashboardSchoolAdmin, InstructorMaterials, InstructorMaterialsView, Instruments (+5 more)

### Community 59 - "DeleteArchiveDialog.tsx"
Cohesion: 0.33
Nodes (9): ModuleCardTemplateProps, DeleteArchiveDialog(), Props, ClassroomProps, ModuleProps, NewClassroomDialog(), arhiveModuleAPI(), createClassroomAPI() (+1 more)

### Community 61 - "modeToggle.tsx"
Cohesion: 0.23
Nodes (6): ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue()

### Community 62 - "theme-provider.tsx"
Cohesion: 0.21
Nodes (12): ModeToggle(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider() (+4 more)

### Community 68 - "ui/button.tsx"
Cohesion: 0.09
Nodes (21): LearnerQuizCardTemplate(), LearnerQuizCardTemplateProps, LearnerQuizHistoryCardTemplate(), LearnerQuizHistoryCardTemplateProps, ViewMode, ViewToggleProps, PricingBlock(), PricingBlockProps (+13 more)

### Community 69 - "dependencies"
Cohesion: 0.15
Nodes (13): axios, dependencies, axios, survey-creator-react, survey-react-ui, @tiptap/extension-find-and-replace, @tiptap/extension-subscript, @tiptap/extensions (+5 more)

### Community 77 - "PageSkeleton.tsx"
Cohesion: 0.29
Nodes (5): PublicNavbar(), PageSkeleton(), AuthLayout(), ProtectedLayout(), useCheckToken()

### Community 79 - "axios.ts"
Cohesion: 0.52
Nodes (4): getAllInstructorsAPI(), api, staleTime, useInstructors()

### Community 84 - "QuizForm.tsx"
Cohesion: 0.47
Nodes (5): clearQuizProgress(), getQuizStorageKey(), QuizForm(), QuizFormProps, SURVEY_THEMES_MAP

### Community 96 - "Permissions.tsx"
Cohesion: 0.10
Nodes (27): QuizSubmissionsCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+19 more)

### Community 97 - "image-upload-node.tsx"
Cohesion: 0.15
Nodes (9): CloseIcon, SvgProps, FileItem, ImageUploadDragAreaProps, ImageUploadNode(), ImageUploadPreviewProps, UploadOptions, useFileUpload() (+1 more)

### Community 98 - "useIsMobile"
Cohesion: 0.36
Nodes (7): getSidebarState(), SidebarProvider(), getServerSnapshot(), getSnapshot(), subscribe(), useIsMobile(), Instruments()

### Community 108 - "Component Composition"
Cohesion: 0.15
Nodes (13): Avatar always needs AvatarFallback, Button has no isPending or isLoading prop, Callouts use Alert, Card structure, Choosing between overlay components, Component Composition, Contents, Dialog, Sheet, and Drawer always need a Title (+5 more)

### Community 109 - "Styling & Customization"
Cohesion: 0.15
Nodes (13): Built-in variants first, className for layout only, Contents, No manual dark: color overrides, No manual z-index on overlay components, No raw color values for status/state indicators, No space-x-* / space-y-*, Prefer size-* over w-* h-* when equal (+5 more)

### Community 110 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

### Community 113 - "instructorRoute.tsx"
Cohesion: 0.14
Nodes (13): suspense(), TableSkeleton(), AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView, DashboardInstructor, ModuleEditor (+5 more)

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

### Community 124 - "learnerRoute.tsx"
Cohesion: 0.14
Nodes (13): DetailSkeleton(), Analyzer, AnalyzerExtension, AnalyzerResults, Chat, Classroom, CoreModuleReadOnly, CoreModulesView (+5 more)

### Community 127 - "parseShortcutKeys"
Cohesion: 0.06
Nodes (42): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge() (+34 more)

### Community 128 - "package.json"
Cohesion: 0.29
Nodes (6): allowScripts, @parcel/watcher@2.6.0, name, private, type, version

### Community 129 - "image-upload-node-extension.ts"
Cohesion: 0.33
Nodes (4): Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction

### Community 148 - "getQuizJson"
Cohesion: 0.53
Nodes (6): getQuizJson(), getQuizTotalPoints(), getQuizTotalQuestions(), DashboardTab(), LearnerQuizView(), mockStartAttemptServerRequest()

## Knowledge Gaps
- **545 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+540 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **67 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`, `@base-ui/react`, `input-otp`, `@shadcn/react`, `chart.tsx`, `survey-core`, `@tiptap/react`, `class-variance-authority`, `cmdk`, `lodash.throttle`, `react-router-dom`, `rehype-highlight`, `remark-gfm`, `tw-animate-css`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@radix-ui/react-popover`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `cn`, `@tiptap/starter-kit`, `lucide-react`, `recharts`, `@tiptap/extension-typography`, `clsx`, `react-markdown`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `react` connect `chart.tsx` to `ClassroomEmpty.tsx`, `useIsMobile`, `AnalyzerLogsSchoolAdmin.tsx`, `dependencies`, `sidebar.tsx`, `theme-provider.tsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `SearchTemplate.tsx`, `sidebar.tsx`, `Instruments.tsx`, `attachment.tsx`, `Chat.tsx`, `ClassroomInstructorView.tsx`, `QuizEditor.tsx`, `Analyzer.tsx`, `PublicNavbar.tsx`, `ClassroomEmpty.tsx`, `CoreModulesView.tsx`, `materials.ts`, `ui/card.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `materialsProps.ts`, `toast.tsx`, `ui/badge.tsx`, `TooltipButtonTemplate.tsx`, `SignUpPage.tsx`, `DeleteArchiveDialog.tsx`, `modeToggle.tsx`, `Permissions.tsx`, `message-scroller.tsx`?**
  _High betweenness centrality (0.086) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _545 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1010752688172043 - nodes in this community are weakly interconnected._
- **Should `SearchTemplate.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12121212121212122 - nodes in this community are weakly interconnected._
- **Should `use-list-dropdown-menu.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.0962566844919786 - nodes in this community are weakly interconnected._