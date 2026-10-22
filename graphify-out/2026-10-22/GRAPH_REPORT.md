# Graph Report - react  (2026-10-22)

## Corpus Check
- 353 files · ~173,137 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1962 nodes · 4558 edges · 165 communities (99 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `37b73c06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- parseShortcutKeys
- ModuleEditor.tsx
- use-heading.ts
- useTiptapEditor
- materialsAPI.ts
- AnalyzerLogsSchoolAdmin.tsx
- heading-dropdown-menu.tsx
- use-text-align.ts
- QuizEditor.tsx
- sidebar.tsx
- link-popover.tsx
- Permissions.tsx
- use-mark.ts
- search-and-replace.tsx
- ClassroomEmpty.tsx
- use-element-rect.ts
- materialsCRUDAPI.ts
- simple-editor.tsx
- compilerOptions
- components.json
- toast.tsx
- parallelQueries.ts
- image-upload-node.tsx
- userProps.ts
- use-search-and-replace.ts
- tiptap-utils.ts
- compilerOptions
- buttonVariants
- use-undo-redo.ts
- materials.ts
- HeaderTemplate
- moduleProps.ts
- AnalyzerResults.tsx
- CoreModulesView.tsx
- shadcn/ui
- ProtectedLayoutNoSidebar.tsx
- modeToggle.tsx
- ProtectedLayout.tsx
- toolbar.tsx
- Analyzer.tsx
- @base-ui/react
- Chat.tsx
- instructorRoute.tsx
- cn
- rootRouter.tsx
- Customization & Theming
- Design Critique: FrontAccEase Landing Page
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- ui/input-group.tsx
- learnerRoute.tsx
- publicRoute.tsx
- Component Composition
- Styling & Customization
- useIsMobile
- item.tsx
- AnalyzerLogsClassroomView.tsx
- Commands
- Tools
- EditorShortcutGuide.tsx
- button-group/button-group.tsx
- analyzerProps.ts
- button/button.tsx
- attachment.tsx
- devDependencies
- schoolAdminRoute.tsx
- ui/card.tsx
- clsx
- globals
- QuizzesInstructorView.tsx
- SKILL.md
- Registry Authoring and Addresses
- Base vs Radix
- Chat & Messaging
- 2026-09-26T12-28-39Z__src-pages-learner-dashboard-tsx.md
- Impeccable Critique: `src/pages/learner/Classroom.tsx`
- quizProps.ts
- theme-provider.tsx
- Forms & Inputs
- @tiptap/extensions
- Critical Rules
- chart.tsx
- package.json
- scripts
- bubble.tsx
- DeleteArchiveDialog.tsx
- ui/dropdown-menu.tsx
- UserHeader.tsx
- remark-gfm
- class-variance-authority
- Q: Add elapsed time in webLLM.ts
- Q: Fix production build errors caused by stale const/data imports
- @tiptap/extension-image
- marker.tsx
- use-scrolling.ts
- tsconfig.json
- vercel.json
- rules/graphify.md
- workflows/graphify.md
- @fontsource-variable/roboto
- eslint
- cmdk
- dependencies
- ui/button.tsx
- cn
- date-fns
- @tiptap/extension-list
- shadcn
- react-day-picker
- lodash.throttle
- lucide-react
- @mlc-ai/web-llm
- eslint-plugin-react-hooks
- @tiptap/extension-subscript
- prettier
- react-dom
- react-hotkeys-hook
- react-icons
- react-router-dom
- @tiptap/extension-superscript
- @tiptap/extension-text-align
- @floating-ui/react
- jspdf-autotable
- @shadcn/react
- survey-core
- survey-creator-react
- @radix-ui/react-popover
- tailwindcss
- @tailwindcss/vite
- @tanstack/react-query
- @tiptap/core
- @tiptap/extension-find-and-replace
- @tiptap/extension-highlight
- recharts
- @tiptap/extension-typography
- @tiptap/pm
- @tiptap/react
- @tiptap/starter-kit
- tw-animate-css
- prettier-plugin-tailwindcss
- @tanstack/eslint-plugin-query
- @types/lodash.throttle
- @types/node
- @types/react
- @types/react-dom
- typescript-eslint
- @typescript-eslint/parser
- vite
- @vitejs/plugin-react
- scss.d.ts
- React Application HTML Entrypoint
- Application Logo Asset
- Vite Logo Asset
- FrontAccEase React Frontend
- React Logo Asset
- survey-react-ui

## God Nodes (most connected - your core abstractions)
1. `Button()` - 58 edges
2. `buttonVariants` - 52 edges
3. `Badge()` - 43 edges
4. `useTiptapEditor()` - 42 edges
5. `cn()` - 39 edges
6. `Card()` - 36 edges
7. `HeaderTemplate()` - 27 edges
8. `getDateString()` - 26 edges
9. `parseShortcutKeys()` - 24 edges
10. `CardContent()` - 23 edges

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

## Communities (165 total, 66 thin omitted)

### Community 0 - "parseShortcutKeys"
Cohesion: 0.06
Nodes (43): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge() (+35 more)

### Community 1 - "ModuleEditor.tsx"
Cohesion: 0.13
Nodes (15): Checkbox(), Field(), FieldDescription(), FieldError(), FieldLabel(), fieldVariants, Switch(), toast (+7 more)

### Community 2 - "use-heading.ts"
Cohesion: 0.10
Nodes (23): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+15 more)

### Community 3 - "useTiptapEditor"
Cohesion: 0.13
Nodes (21): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, isListActive(), listIcons (+13 more)

### Community 4 - "materialsAPI.ts"
Cohesion: 0.33
Nodes (8): Props, ClassroomContentProps, ClassroomProps, ClassroomViewProps, InstructorMaterialsCountProps, ModuleProps, QuizSubmissionProps, User

### Community 5 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.20
Nodes (13): SearchInputProps, SearchTemplate(), Table(), TableBody(), TableCell(), TableHead(), TableHeader(), TableRow() (+5 more)

### Community 6 - "heading-dropdown-menu.tsx"
Cohesion: 0.16
Nodes (10): ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps, HeadingButton, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig (+2 more)

### Community 7 - "use-text-align.ts"
Cohesion: 0.11
Nodes (24): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+16 more)

### Community 8 - "QuizEditor.tsx"
Cohesion: 0.15
Nodes (29): QuestionElement, QuestionType, QuizPage, AnswerKey, QUESTION_TYPE_OPTIONS, QuizEditorContent(), stitchCorrectAnswer(), stripCorrectAnswers() (+21 more)

### Community 9 - "sidebar.tsx"
Cohesion: 0.11
Nodes (17): UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup() (+9 more)

### Community 10 - "link-popover.tsx"
Cohesion: 0.06
Nodes (44): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, HighlighterIcon, SvgProps, SvgProps, TrashIcon (+36 more)

### Community 11 - "Permissions.tsx"
Cohesion: 0.09
Nodes (26): QuizSubmissionsCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback() (+18 more)

### Community 12 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 13 - "search-and-replace.tsx"
Cohesion: 0.10
Nodes (17): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, WholeWordIcon (+9 more)

### Community 14 - "ClassroomEmpty.tsx"
Cohesion: 0.19
Nodes (14): EmptyStateProps, Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle() (+6 more)

### Community 15 - "use-element-rect.ts"
Cohesion: 0.10
Nodes (26): PourContent(), buttonTypes, LessonButton, LessonButtonAttributes, buttonNode(), normalizeLessonContent(), normalizeNode(), normalizeText() (+18 more)

### Community 16 - "materialsCRUDAPI.ts"
Cohesion: 0.10
Nodes (18): instrumentsData, ChatMessage, InstrumentProps, LearnerQuizView(), ParsedInstrument, answerCoreInteractiveActivityAPI(), AnswerCoreInteractivePayload, arhiveModuleAPI() (+10 more)

### Community 17 - "simple-editor.tsx"
Cohesion: 0.10
Nodes (20): ArrowLeftIcon, SvgProps, LinkIcon, SvgProps, HorizontalRule, SEARCH_AND_REPLACE_SCROLL_OPTIONS, LinkButton, LinkContent() (+12 more)

### Community 18 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 19 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 20 - "toast.tsx"
Cohesion: 0.14
Nodes (3): client, Toaster(), RootRouter()

### Community 21 - "parallelQueries.ts"
Cohesion: 0.43
Nodes (6): Modules(), getAnalyzerLogsSummaryByLearnerAPI(), getCoreModulesAPI(), getClassroomAPI(), useCoreModuleProgress(), useLearnerDashboardData()

### Community 22 - "image-upload-node.tsx"
Cohesion: 0.10
Nodes (15): CloseIcon, SvgProps, Commands, ImageUploadNode, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem (+7 more)

### Community 23 - "userProps.ts"
Cohesion: 0.31
Nodes (7): UserProps, uploadProfileImage, getAllInstructorsAPI(), api, staleTime, useInstructors(), useUploadProfileImage()

### Community 24 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 25 - "tiptap-utils.ts"
Cohesion: 0.10
Nodes (40): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps (+32 more)

### Community 26 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 27 - "buttonVariants"
Cohesion: 0.13
Nodes (20): HeroInterfacePreview(), PourExplorer(), PourPrincipleData, pourPrinciples, PricingBlock(), PricingBlockProps, SectionHeader(), SectionHeaderProps (+12 more)

### Community 28 - "use-undo-redo.ts"
Cohesion: 0.15
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+8 more)

### Community 29 - "materials.ts"
Cohesion: 0.08
Nodes (33): AnalyzerSummaryProps, CurriculumPrinciple, QuizEditor(), CoreModuleReadOnly(), AnalyzerLogsInstructorWithQuery(), LearningMaterials(), completeCoreActivityAPI(), createAnalyzerCommentById() (+25 more)

### Community 30 - "HeaderTemplate"
Cohesion: 0.12
Nodes (16): EmptyState(), GridListButtonGroupTemplate(), HeaderTemplate(), TooltipButtonTemplate(), ToolTipTemplateProps, Dashboard(), DashboardInstructor(), ModulesInstructor() (+8 more)

### Community 31 - "moduleProps.ts"
Cohesion: 0.08
Nodes (27): coreModules, ActivityLockedResponse, CoreLessonsProps, CoreModuleActivityContent, CoreModuleActivityItemProps, CoreModuleActivityResponse, CoreModuleCompletionItemProps, CoreModuleLessonDetail (+19 more)

### Community 32 - "AnalyzerResults.tsx"
Cohesion: 0.12
Nodes (19): PopoverDescription(), AnalyzerResultsProps, Content, WcagEvaluationProps, AnalyzerResults(), capitalize(), convertWcagEvaluationToResult(), CopyButton() (+11 more)

### Community 33 - "CoreModulesView.tsx"
Cohesion: 0.13
Nodes (13): Progress(), ProgressLabel(), ProgressValue(), NotFound(), CoreModuleActivityItem, CoreModuleCompletionItem, CoreModulesView(), EarnedBagdes (+5 more)

### Community 34 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 35 - "ProtectedLayoutNoSidebar.tsx"
Cohesion: 0.31
Nodes (5): ErrorOne(), ErrorOneProps, UserRole, Forbidden(), Unauthorized()

### Community 36 - "modeToggle.tsx"
Cohesion: 0.22
Nodes (8): ModeToggle(), ModeToggleProps, useTheme(), SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue()

### Community 37 - "ProtectedLayout.tsx"
Cohesion: 0.18
Nodes (13): PublicFooter(), PublicNavbar(), PageSkeleton(), UserSkeleton(), instructorNav, learnerNav, schoolAdminNav, AuthLayout() (+5 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.17
Nodes (12): BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef(), useComposedRef() (+4 more)

### Community 39 - "Analyzer.tsx"
Cohesion: 0.10
Nodes (26): ScanHistory, PopoverHeader(), PopoverTitle(), AnalyzerResultItem, PrincipleItem, Result, AnalyzerPDFExportOptions, Analyzer() (+18 more)

### Community 41 - "Chat.tsx"
Cohesion: 0.26
Nodes (9): Props, RichText(), RichTextProps, Tooltip(), TooltipContent(), TooltipTrigger(), Chat(), STARTER_PROMPTS (+1 more)

### Community 42 - "instructorRoute.tsx"
Cohesion: 0.14
Nodes (13): AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView, DashboardInstructor, ModuleEditor, ModuleReadOnly, ModulesArchivedInstructor (+5 more)

### Community 43 - "cn"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 44 - "rootRouter.tsx"
Cohesion: 0.21
Nodes (8): NavigationProgressBar(), RootLayout(), ErrorBoundary(), instructorRoute, learnerRoute, publicRoute, router, schoolAdminRoute

### Community 45 - "Customization & Theming"
Cohesion: 0.14
Nodes (14): 1. Built-in variants, 2. Tailwind classes via `className`, 3. Add a new variant, 4. Wrapper components, Adding Custom Colors, Border Radius, Changing the Theme, Checking for Updates (+6 more)

### Community 46 - "Design Critique: FrontAccEase Landing Page"
Cohesion: 0.14
Nodes (13): Design Critique: FrontAccEase Landing Page, Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] Missing WAI-ARIA Tab Semantics in Interactive Tab Lists, [P2] Mobile Visibility Gap for Instructor Preview Tab, [P3] Non-Functional Mockup Action Buttons (+5 more)

### Community 47 - "Critique Snapshot: `src/pages/learner/Classroom.tsx`"
Cohesion: 0.14
Nodes (13): Critique Snapshot: `src/pages/learner/Classroom.tsx`, Design Health Score, Design Specificity Verdict, Minor Observations & Questions, Overall Impression, [P0] Unshielded Destructive "Leave Classroom" Action, [P1] Absence of Student Progress & Score Badging, [P1] Module-Scope Static Data & Missing Classroom Switcher / Join Flow (+5 more)

### Community 48 - "ui/input-group.tsx"
Cohesion: 0.21
Nodes (8): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Input(), Textarea()

### Community 49 - "learnerRoute.tsx"
Cohesion: 0.13
Nodes (17): DetailSkeleton(), GridSkeleton(), TableSkeleton(), Skeleton(), Analyzer, AnalyzerExtension, AnalyzerResults, Chat (+9 more)

### Community 50 - "publicRoute.tsx"
Cohesion: 0.15
Nodes (12): AboutPage, AccessibilityPage, AccessibilityStatementPage, ContactPage, FeaturesPage, HowItWorksPage, LandingPage, LoginPage (+4 more)

### Community 51 - "Component Composition"
Cohesion: 0.15
Nodes (13): Avatar always needs AvatarFallback, Button has no isPending or isLoading prop, Callouts use Alert, Card structure, Choosing between overlay components, Component Composition, Contents, Dialog, Sheet, and Drawer always need a Title (+5 more)

### Community 52 - "Styling & Customization"
Cohesion: 0.15
Nodes (13): Built-in variants first, className for layout only, Contents, No manual dark: color overrides, No manual z-index on overlay components, No raw color values for status/state indicators, No space-x-* / space-y-*, Prefer size-* over w-* h-* when equal (+5 more)

### Community 53 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, CalendarDayButton(), DateTimePicker(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot() (+3 more)

### Community 54 - "item.tsx"
Cohesion: 0.13
Nodes (7): ButtonGroup(), buttonGroupVariants, Item(), ItemMedia(), itemMediaVariants, itemVariants, Separator()

### Community 55 - "AnalyzerLogsClassroomView.tsx"
Cohesion: 0.27
Nodes (10): mockClassroomAnalyzerLogsDetail, ClassroomAnalyzerLogsDetailResponse, AnalyzerLogsClassroomView(), AnalyzerLogsClassroomViewProps, buildFallbackScanResult(), ClassroomInstructor(), Classroom(), useAnalyzerResultById() (+2 more)

### Community 56 - "Commands"
Cohesion: 0.12
Nodes (17): `add` — Add components, `apply` — Apply a preset to an existing project, `build` — Build a custom registry, Commands, Contents, `diff` — Check for updates, `docs` — Get component documentation URLs, Dry-Run Mode (+9 more)

### Community 57 - "Tools"
Cohesion: 0.17
Nodes (11): Configuring Registries, Setup, `shadcn:get_add_command_for_items`, `shadcn:get_audit_checklist`, `shadcn:get_item_examples_from_registries`, `shadcn:get_project_registries`, `shadcn:list_items_in_registries`, shadcn MCP Server (+3 more)

### Community 58 - "EditorShortcutGuide.tsx"
Cohesion: 0.15
Nodes (14): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger(), publicNav, CATEGORIES (+6 more)

### Community 59 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 60 - "analyzerProps.ts"
Cohesion: 0.08
Nodes (27): jspdf, jspdf, AnalyzerUsageDay, ClassroomAnalyzerLogsResponse, ClassroomScanDetailItem, ClassroomScanItem, Criterion, IssuesPerPrinciple (+19 more)

### Community 61 - "button/button.tsx"
Cohesion: 0.13
Nodes (14): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps (+6 more)

### Community 62 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 63 - "devDependencies"
Cohesion: 0.18
Nodes (11): @eslint/js, eslint-plugin-react-refresh, devDependencies, @eslint/js, eslint-plugin-react-refresh, sass-embedded, @shadcn/lint, typescript (+3 more)

### Community 64 - "schoolAdminRoute.tsx"
Cohesion: 0.12
Nodes (15): suspense(), AnalyzerLogsClassroomView, AnalyzerLogsSchoolAdmin, ClassroomInstructorView, DashboardSchoolAdmin, InstructorMaterials, InstructorMaterialsView, Instruments (+7 more)

### Community 65 - "ui/card.tsx"
Cohesion: 0.13
Nodes (25): ClassroomCardTemplate(), EditorDropdown(), LearnerQuizCardTemplate(), ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplate(), QuizCardTemplateProps, ActionType (+17 more)

### Community 68 - "QuizzesInstructorView.tsx"
Cohesion: 0.09
Nodes (30): ChartConfig, ChartContainer(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), wcagCriteria (+22 more)

### Community 69 - "SKILL.md"
Cohesion: 0.21
Nodes (4): Icons, Icons in Button use data-icon attribute, No sizing classes on icons inside components, Pass icons as component objects, not string keys

### Community 70 - "Registry Authoring and Addresses"
Cohesion: 0.22
Nodes (9): Address Schemes, Build and Verify, GitHub Registries, Include, Item Definitions, Mental Model, Registry Authoring and Addresses, Registry Dependencies (+1 more)

### Community 71 - "Base vs Radix"
Cohesion: 0.22
Nodes (9): Accordion, Base vs Radix, Button / trigger as non-button element (base only), Composition: asChild (radix) vs render (base), Contents, Select, Select — multiple selection and object values (base only), Slider (+1 more)

### Community 72 - "Chat & Messaging"
Cohesion: 0.22
Nodes (9): Attachments use Attachment, Chat & Messaging, Contents, Escape hatch: the scroller hooks, Message rows use Message, Message surfaces use Bubble, Scrollable threads use MessageScroller, Streaming, anchoring, and jump-to-latest are built in (+1 more)

### Community 73 - "2026-09-26T12-28-39Z__src-pages-learner-dashboard-tsx.md"
Cohesion: 0.22
Nodes (8): Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, Persona Red Flags, Priority Issues, Questions to Consider, What's Working

### Community 74 - "Impeccable Critique: `src/pages/learner/Classroom.tsx`"
Cohesion: 0.22
Nodes (8): Design Health Score, Design Specificity Verdict, Impeccable Critique: `src/pages/learner/Classroom.tsx`, Minor Observations & Questions to Consider, Overall Impression, Persona Red Flags, Priority Issues, What's Working

### Community 75 - "quizProps.ts"
Cohesion: 0.10
Nodes (28): LearnerQuizCardTemplateProps, LearnerQuizHistoryCardTemplateProps, CoreModuleAssessmentActivity, InstructorQuizClassroom, InstructorQuizLearner, QuizAnswer, QuizAnswerKey, QuizClassroom (+20 more)

### Community 76 - "theme-provider.tsx"
Cohesion: 0.20
Nodes (12): App(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider() (+4 more)

### Community 77 - "Forms & Inputs"
Cohesion: 0.25
Nodes (8): Buttons inside inputs use InputGroup + InputGroupAddon, Contents, Field validation and disabled states, FieldSet + FieldLegend for grouping related fields, Forms & Inputs, Forms use FieldGroup + Field, InputGroup requires InputGroupInput/InputGroupTextarea, Option sets (2–7 choices) use ToggleGroup

### Community 79 - "Critical Rules"
Cohesion: 0.25
Nodes (8): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Forms & Inputs → [forms.md](./rules/forms.md), Icons → [icons.md](./rules/icons.md), Styling & Tailwind → [styling.md](./rules/styling.md), Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

### Community 80 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload(), INITIAL_DIMENSION, THEMES, TooltipNameType (+1 more)

### Community 81 - "package.json"
Cohesion: 0.29
Nodes (6): allowScripts, @parcel/watcher@2.6.0, name, private, type, version

### Community 82 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, format, lint, preview, typecheck

### Community 83 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

### Community 84 - "DeleteArchiveDialog.tsx"
Cohesion: 0.16
Nodes (11): LearnerQuizHistoryCardTemplate(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+3 more)

### Community 87 - "ui/dropdown-menu.tsx"
Cohesion: 0.15
Nodes (4): DropdownMenu(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuTrigger()

### Community 88 - "UserHeader.tsx"
Cohesion: 0.50
Nodes (3): Logo(), LogoProps, UserHeader()

### Community 91 - "Q: Add elapsed time in webLLM.ts"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Add elapsed time in webLLM.ts, Source Nodes

### Community 92 - "Q: Fix production build errors caused by stale const/data imports"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Fix production build errors caused by stale const/data imports, Source Nodes

### Community 95 - "use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 96 - "tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

### Community 103 - "dependencies"
Cohesion: 0.15
Nodes (13): axios, input-otp, dependencies, axios, input-otp, @radix-ui/react-dropdown-menu, react-markdown, rehype-highlight (+5 more)

### Community 104 - "ui/button.tsx"
Cohesion: 0.09
Nodes (25): HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, ViewMode (+17 more)

## Knowledge Gaps
- **591 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+586 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@shadcn/react`, `survey-core`, `survey-creator-react`, `@radix-ui/react-popover`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `recharts`, `@tiptap/extension-typography`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `@base-ui/react`, `survey-react-ui`, `useIsMobile`, `analyzerProps.ts`, `clsx`, `@tiptap/extensions`, `package.json`, `remark-gfm`, `class-variance-authority`, `@tiptap/extension-image`, `@fontsource-variable/roboto`, `cmdk`, `cn`, `date-fns`, `@tiptap/extension-list`, `shadcn`, `react-day-picker`, `lodash.throttle`, `lucide-react`, `@mlc-ai/web-llm`, `@tiptap/extension-subscript`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `@tiptap/extension-superscript`, `@tiptap/extension-text-align`, `@floating-ui/react`, `jspdf-autotable`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `QuizzesInstructorView.tsx`, `modeToggle.tsx`, `dependencies`, `sidebar.tsx`, `theme-provider.tsx`, `ClassroomEmpty.tsx`, `chart.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `ModuleEditor.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `QuizEditor.tsx`, `sidebar.tsx`, `Permissions.tsx`, `ClassroomEmpty.tsx`, `toast.tsx`, `buttonVariants`, `HeaderTemplate`, `AnalyzerResults.tsx`, `CoreModulesView.tsx`, `modeToggle.tsx`, `Analyzer.tsx`, `Chat.tsx`, `ui/input-group.tsx`, `AnalyzerLogsClassroomView.tsx`, `EditorShortcutGuide.tsx`, `attachment.tsx`, `ui/card.tsx`, `QuizzesInstructorView.tsx`, `quizProps.ts`, `DeleteArchiveDialog.tsx`, `message-scroller.tsx`, `ui/dropdown-menu.tsx`, `UserHeader.tsx`?**
  _High betweenness centrality (0.065) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _591 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parseShortcutKeys` be split into smaller, more focused modules?**
  _Cohesion score 0.05786090005844535 - nodes in this community are weakly interconnected._
- **Should `ModuleEditor.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13 - nodes in this community are weakly interconnected._
- **Should `use-heading.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10416666666666667 - nodes in this community are weakly interconnected._