# Graph Report - react  (2026-10-16)

## Corpus Check
- 331 files · ~149,168 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1782 nodes · 4090 edges · 155 communities (89 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `2a2ec4d4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- AnalyzerResults.tsx
- Chat.tsx
- simple-editor.tsx
- use-list-dropdown-menu.ts
- Permissions.tsx
- search-and-replace.tsx
- use-list.ts
- isNodeTypeSelected
- button/button.tsx
- compilerOptions
- tiptap-utils.ts
- chart.tsx
- sidebar.tsx
- Instruments.tsx
- attachment.tsx
- components.json
- use-search-and-replace.ts
- compilerOptions
- useCheckToken
- PageTemplate.tsx
- cn
- image-upload-node.tsx
- Button
- use-text-align.ts
- QuizEditor.tsx
- Analyzer.tsx
- shadcn/ui
- use-heading.ts
- TooltipButtonTemplate.tsx
- PublicNavbar.tsx
- Customization & Theming
- ClassroomEmpty.tsx
- QuizzesInstructorView.tsx
- materials.ts
- useClassrooms
- ui/card.tsx
- instructorRoute.tsx
- use-color-highlight.ts
- QuizProps
- AnalyzerLogsSchoolAdmin.tsx
- color-highlight-popover.tsx
- rules/graphify.md
- Design Critique: FrontAccEase Landing Page
- workflows/graphify.md
- toast.tsx
- ui/button.tsx
- @tiptap/extension-image
- publicRoute.tsx
- @tiptap/extension-list
- ProtectedLayout.tsx
- theme-provider.tsx
- field.tsx
- use-scrolling.ts
- tsconfig.json
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- schoolAdminRoute.tsx
- vercel.json
- modeToggle.tsx
- marker.tsx
- item.tsx
- @types/react
- @tiptap/extension-text-align
- date-fns
- useIsMobile
- @fontsource-variable/roboto
- Q: Add elapsed time in webLLM.ts
- dependencies
- ViewToggle.tsx
- @radix-ui/react-dropdown-menu
- react-dom
- react-hotkeys-hook
- react-day-picker
- react-icons
- shadcn
- Critical Rules
- link-popover.tsx
- axios
- tailwindcss
- @tailwindcss/vite
- @tanstack/react-query
- @tiptap/core
- prettier
- @tiptap/extension-highlight
- @tiptap/extension-horizontal-rule
- @tiptap/extension-superscript
- @tiptap/pm
- cn
- @tiptap/starter-kit
- lucide-react
- @tiptap/extension-typography
- date-time-picker.tsx
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
- eslint-plugin-react-hooks
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
- useTiptapEditor
- package.json
- materialProps.ts
- @base-ui/react
- globals
- prettier-plugin-tailwindcss
- @eslint/js
- input-otp
- @types/node
- @types/react-dom
- @shadcn/react
- typescript-eslint
- @typescript-eslint/parser
- vite
- survey-core
- @tiptap/react
- @mlc-ai/web-llm
- survey-creator-react
- cmdk
- lodash.throttle
- react-router-dom
- @tanstack/eslint-plugin-query
- @types/lodash.throttle
- @tiptap/extension-find-and-replace
- remark-gfm
- tw-animate-css
- @vitejs/plugin-react
- @tiptap/extension-subscript
- @tiptap/extensions

## God Nodes (most connected - your core abstractions)
1. `Button()` - 52 edges
2. `buttonVariants` - 50 edges
3. `useTiptapEditor()` - 43 edges
4. `Badge()` - 41 edges
5. `cn()` - 37 edges
6. `Card()` - 34 edges
7. `HeaderTemplate()` - 25 edges
8. `CardContent()` - 23 edges
9. `CardHeader()` - 22 edges
10. `QuizEditorContent()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `ChartContainer()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `ChartTooltipContent()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json

## Import Cycles
- None detected.

## Communities (155 total, 66 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react-refresh, sass-embedded, @shadcn/lint, typescript (+3 more)

### Community 2 - "AnalyzerResults.tsx"
Cohesion: 0.15
Nodes (13): PrincipleIssue, PrinciplePassed, AnalyzerResults(), capitalize(), FindingCard(), FindingItem, FindingType, formatDate() (+5 more)

### Community 3 - "Chat.tsx"
Cohesion: 0.15
Nodes (13): LearnerQuizHistoryCardTemplateProps, RichText(), RichTextProps, ChatMessage, ClassroomProps, Classwork, QuizSubmissionProps, Submission (+5 more)

### Community 4 - "simple-editor.tsx"
Cohesion: 0.09
Nodes (20): ArrowLeftIcon, SvgProps, HorizontalRule, SEARCH_AND_REPLACE_SCROLL_OPTIONS, ColorHighlightPopover(), ColorHighlightPopoverContent(), Spacer(), SpacerOrientation (+12 more)

### Community 5 - "use-list-dropdown-menu.ts"
Cohesion: 0.11
Nodes (22): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, isListActive(), listIcons (+14 more)

### Community 6 - "Permissions.tsx"
Cohesion: 0.18
Nodes (13): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage() (+5 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.09
Nodes (20): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+12 more)

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

### Community 13 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload(), INITIAL_DIMENSION, THEMES, TooltipNameType (+1 more)

### Community 14 - "sidebar.tsx"
Cohesion: 0.10
Nodes (18): UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup() (+10 more)

### Community 15 - "Instruments.tsx"
Cohesion: 0.11
Nodes (30): Button(), CardFooter(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+22 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "useCheckToken"
Cohesion: 0.27
Nodes (8): PublicFooter(), PublicNavbar(), PageSkeleton(), AuthLayout(), ProtectedLayout(), ProtectedLayoutNoSidebar(), meAPI(), useCheckToken()

### Community 21 - "PageTemplate.tsx"
Cohesion: 0.23
Nodes (7): HeaderTemplate(), HeaderTemplateProps, coreModules, CoreModulesProps, ContinueLearningCard(), CoreModuleCardTemplate(), MOCK_MODULE_PROGRESS

### Community 22 - "cn"
Cohesion: 0.09
Nodes (27): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem() (+19 more)

### Community 23 - "image-upload-node.tsx"
Cohesion: 0.06
Nodes (31): CloseIcon, SvgProps, Commands, ImageUploadNode, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem (+23 more)

### Community 24 - "Button"
Cohesion: 0.15
Nodes (11): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge() (+3 more)

### Community 25 - "use-text-align.ts"
Cohesion: 0.09
Nodes (25): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+17 more)

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.15
Nodes (28): QuestionElement, QuestionType, QuizJson, QuizPage, AnswerKey, QUESTION_TYPE_OPTIONS, QuizEditorContent(), stitchCorrectAnswer() (+20 more)

### Community 27 - "Analyzer.tsx"
Cohesion: 0.13
Nodes (18): ScanHistory, AnalyzerResultItem, PrincipleItem, Result, models, steps, LearnerQuizView(), createExtensionScanAPI() (+10 more)

### Community 28 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.09
Nodes (28): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+20 more)

### Community 30 - "TooltipButtonTemplate.tsx"
Cohesion: 0.26
Nodes (7): Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

### Community 31 - "PublicNavbar.tsx"
Cohesion: 0.17
Nodes (9): Logo(), LogoProps, UserHeader(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle() (+1 more)

### Community 32 - "Customization & Theming"
Cohesion: 0.14
Nodes (14): 1. Built-in variants, 2. Tailwind classes via `className`, 3. Add a new variant, 4. Wrapper components, Adding Custom Colors, Border Radius, Changing the Theme, Checking for Updates (+6 more)

### Community 33 - "ClassroomEmpty.tsx"
Cohesion: 0.22
Nodes (12): EmptyState(), EmptyStateProps, Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants (+4 more)

### Community 34 - "QuizzesInstructorView.tsx"
Cohesion: 0.10
Nodes (27): ClassroomCardTemplate(), EditorDropdown(), LearnerQuizCardTemplate(), ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplate(), QuizCardTemplateProps, ActionType (+19 more)

### Community 35 - "materials.ts"
Cohesion: 0.12
Nodes (27): QuizEditor(), InstructorMaterials(), InstructorMaterialsView(), getExtensionScanAPI(), getInstructorMaterialsAPI(), getInstructorMaterialsModulesAPI(), getInstructorQuizzesAPI(), getModuleByIdAPI() (+19 more)

### Community 36 - "useClassrooms"
Cohesion: 0.11
Nodes (22): GridListButtonGroupTemplate(), TooltipButtonTemplate(), ModuleEditor(), NewClassroomDialog(), ClassroomInstructor(), ClassroomInstructorView(), Dashboard(), DashboardInstructor() (+14 more)

### Community 37 - "ui/card.tsx"
Cohesion: 0.19
Nodes (18): getInitials(), getRoleConfig(), RoleConfig, UserProfile(), HeroInterfacePreview(), PourExplorer(), PourPrincipleData, pourPrinciples (+10 more)

### Community 38 - "instructorRoute.tsx"
Cohesion: 0.14
Nodes (15): DetailSkeleton(), GridSkeleton(), TableSkeleton(), Skeleton(), AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView (+7 more)

### Community 39 - "use-color-highlight.ts"
Cohesion: 0.12
Nodes (25): ImagePlusIcon, SvgProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive(), removeHighlight() (+17 more)

### Community 40 - "QuizProps"
Cohesion: 0.20
Nodes (15): LearnerQuizCardTemplateProps, QuizProps, QuizForm(), QuizFormProps, clearQuizProgress(), clearQuizProgressByKey(), getQuizProgressKey(), QuizTaker() (+7 more)

### Community 41 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.14
Nodes (20): SearchInputProps, SearchTemplate(), ChartConfig, ChartContainer(), Checkbox(), Table(), TableBody(), TableCell() (+12 more)

### Community 42 - "color-highlight-popover.tsx"
Cohesion: 0.13
Nodes (15): BanIcon, SvgProps, HighlighterIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopoverButton, ColorHighlightPopoverContentProps (+7 more)

### Community 44 - "Design Critique: FrontAccEase Landing Page"
Cohesion: 0.14
Nodes (13): Design Critique: FrontAccEase Landing Page, Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] Missing WAI-ARIA Tab Semantics in Interactive Tab Lists, [P2] Mobile Visibility Gap for Instructor Preview Tab, [P3] Non-Functional Mockup Action Buttons (+5 more)

### Community 46 - "toast.tsx"
Cohesion: 0.12
Nodes (5): App(), client, Toaster(), TooltipProvider(), RootRouter()

### Community 47 - "ui/button.tsx"
Cohesion: 0.14
Nodes (16): LearnerQuizHistoryCardTemplate(), PricingBlock(), PricingBlockProps, SectionHeader(), SectionHeaderProps, Badge(), badgeVariants, buttonVariants (+8 more)

### Community 49 - "publicRoute.tsx"
Cohesion: 0.09
Nodes (20): PublicLayout(), RootLayout(), ErrorBoundary(), instructorRoute, learnerRoute, AboutPage, AccessibilityPage, AccessibilityStatementPage (+12 more)

### Community 51 - "ProtectedLayout.tsx"
Cohesion: 0.17
Nodes (11): ErrorOne(), ErrorOneProps, UserSkeleton(), instructorNav, learnerNav, publicNav, schoolAdminNav, UserRole (+3 more)

### Community 52 - "theme-provider.tsx"
Cohesion: 0.21
Nodes (12): ModeToggle(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider() (+4 more)

### Community 53 - "field.tsx"
Cohesion: 0.11
Nodes (16): UserProfileProps, LoginPage(), Field(), FieldDescription(), FieldError(), FieldGroup(), fieldVariants, Spinner() (+8 more)

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

### Community 59 - "modeToggle.tsx"
Cohesion: 0.20
Nodes (10): ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue(), Analyzer(), AnalyzerExtension() (+2 more)

### Community 61 - "item.tsx"
Cohesion: 0.19
Nodes (6): Item(), ItemMedia(), itemMediaVariants, ItemTitle(), itemVariants, Separator()

### Community 65 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, DateTimePicker(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot(), getSnapshot() (+3 more)

### Community 68 - "Q: Add elapsed time in webLLM.ts"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Add elapsed time in webLLM.ts, Source Nodes

### Community 69 - "dependencies"
Cohesion: 0.15
Nodes (13): class-variance-authority, @floating-ui/react, dependencies, class-variance-authority, @floating-ui/react, @radix-ui/react-popover, recharts, rehype-highlight (+5 more)

### Community 77 - "Critical Rules"
Cohesion: 0.25
Nodes (8): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Forms & Inputs → [forms.md](./rules/forms.md), Icons → [icons.md](./rules/icons.md), Styling & Tailwind → [styling.md](./rules/styling.md), Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

### Community 78 - "link-popover.tsx"
Cohesion: 0.09
Nodes (26): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, LinkIcon, SvgProps, SvgProps, TrashIcon (+18 more)

### Community 98 - "date-time-picker.tsx"
Cohesion: 0.07
Nodes (21): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, Calendar(), CalendarDayButton() (+13 more)

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

### Community 124 - "learnerRoute.tsx"
Cohesion: 0.14
Nodes (13): suspense(), Analyzer, AnalyzerExtension, AnalyzerResults, Chat, Classroom, CoreModuleReadOnly, CoreModulesView (+5 more)

### Community 127 - "useTiptapEditor"
Cohesion: 0.10
Nodes (19): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+11 more)

### Community 128 - "package.json"
Cohesion: 0.29
Nodes (6): allowScripts, @parcel/watcher@2.6.0, name, private, type, version

### Community 130 - "materialProps.ts"
Cohesion: 0.20
Nodes (11): ClassroomViewProps, CoreLessonsProps, CoreTopicsProps, InstructorMaterialsProps, PrincipleData, PrincipleScoreItem, PrincipleSummaryCount, ResultSummaryItem (+3 more)

## Knowledge Gaps
- **537 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+532 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`, `@base-ui/react`, `input-otp`, `@shadcn/react`, `survey-core`, `@tiptap/react`, `@mlc-ai/web-llm`, `survey-creator-react`, `cmdk`, `lodash.throttle`, `react-router-dom`, `@tiptap/extension-find-and-replace`, `remark-gfm`, `tw-animate-css`, `@tiptap/extension-subscript`, `@tiptap/extensions`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-text-align`, `date-fns`, `useIsMobile`, `@fontsource-variable/roboto`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `axios`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `cn`, `@tiptap/starter-kit`, `lucide-react`, `@tiptap/extension-typography`, `clsx`, `react-markdown`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `ClassroomEmpty.tsx`, `date-time-picker.tsx`, `dependencies`, `AnalyzerLogsSchoolAdmin.tsx`, `chart.tsx`, `sidebar.tsx`, `theme-provider.tsx`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `useIsMobile` to `date-time-picker.tsx`, `QuizzesInstructorView.tsx`, `sidebar.tsx`, `Instruments.tsx`, `ProtectedLayout.tsx`, `useCheckToken`, `PageTemplate.tsx`?**
  _High betweenness centrality (0.060) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _537 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `simple-editor.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0896551724137931 - nodes in this community are weakly interconnected._
- **Should `use-list-dropdown-menu.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11083743842364532 - nodes in this community are weakly interconnected._