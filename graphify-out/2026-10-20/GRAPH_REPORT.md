# Graph Report - react  (2026-10-20)

## Corpus Check
- 345 files · ~159,850 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1882 nodes · 4387 edges · 170 communities (104 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 32 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `72868934`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-tiptap-editor.ts
- field.tsx
- use-heading.ts
- use-list.ts
- materialsCRUDAPI.ts
- Permissions.tsx
- Analyzer
- use-text-align.ts
- QuizEditor.tsx
- sidebar.tsx
- color-highlight-popover.tsx
- tiptap-utils.ts
- use-mark.ts
- search-and-replace.tsx
- ClassroomEmpty.tsx
- use-element-rect.ts
- SearchTemplate.tsx
- simple-editor.tsx
- compilerOptions
- components.json
- AnalyzerLogsSchoolAdmin.tsx
- ui/card.tsx
- image-upload-node.tsx
- auth.ts
- use-search-and-replace.ts
- use-blockquote.ts
- compilerOptions
- ui/button.tsx
- isNodeTypeSelected
- materials.ts
- PageTemplate.tsx
- moduleProps.ts
- AnalyzerResults.tsx
- CoreModulesView.tsx
- shadcn/ui
- class-variance-authority
- button-group/button-group.tsx
- ProtectedLayout.tsx
- toolbar.tsx
- webLLM.ts
- link-popover.tsx
- Chat.tsx
- instructorRoute.tsx
- cn
- rootRouter.tsx
- Customization & Theming
- Design Critique: FrontAccEase Landing Page
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- Analyzer.tsx
- learnerRoute.tsx
- publicRoute.tsx
- Component Composition
- Styling & Customization
- useIsMobile
- item.tsx
- pdfExport.ts
- Commands
- Tools
- PublicNavbar.tsx
- useTiptapEditor
- analyzerProps.ts
- button/button.tsx
- attachment.tsx
- devDependencies
- schoolAdminRoute.tsx
- QuizzesInstructorView.tsx
- clsx
- globals
- Instruments.tsx
- SKILL.md
- Registry Authoring and Addresses
- Base vs Radix
- Chat & Messaging
- 2026-09-26T12-28-39Z__src-pages-learner-dashboard-tsx.md
- Impeccable Critique: `src/pages/learner/Classroom.tsx`
- QuizProps
- theme-provider.tsx
- Forms & Inputs
- @tiptap/extensions
- Critical Rules
- chart.tsx
- package.json
- scripts
- bubble.tsx
- ModuleEditor.tsx
- modeToggle.tsx
- remark-gfm
- use-link-popover.ts
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
- ui/button-group.tsx
- cmdk
- dependencies
- Button
- cn
- date-fns
- toast.tsx
- parallelQueries.ts
- @tiptap/extension-list
- shadcn
- theme-toggle.tsx
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
- image-upload-node-extension.ts
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
- axios
- survey-react-ui
- @eslint/js

## God Nodes (most connected - your core abstractions)
1. `Button()` - 57 edges
2. `buttonVariants` - 52 edges
3. `Badge()` - 44 edges
4. `useTiptapEditor()` - 43 edges
5. `cn()` - 37 edges
6. `Card()` - 35 edges
7. `HeaderTemplate()` - 26 edges
8. `CardContent()` - 23 edges
9. `QuizEditorContent()` - 23 edges
10. `CardHeader()` - 22 edges

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

## Communities (170 total, 66 thin omitted)

### Community 0 - "use-tiptap-editor.ts"
Cohesion: 0.09
Nodes (27): BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), COLOR_HIGHLIGHT_SHORTCUT_KEY, UseColorHighlightConfig (+19 more)

### Community 1 - "field.tsx"
Cohesion: 0.16
Nodes (9): LoginPage(), Field(), FieldDescription(), FieldError(), FieldGroup(), fieldVariants, Input(), Spinner() (+1 more)

### Community 2 - "use-heading.ts"
Cohesion: 0.09
Nodes (28): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+20 more)

### Community 3 - "use-list.ts"
Cohesion: 0.12
Nodes (26): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+18 more)

### Community 4 - "materialsCRUDAPI.ts"
Cohesion: 0.19
Nodes (13): DeleteArchiveDialog(), Props, ClassroomContentProps, ClassroomProps, ClassroomViewProps, ModuleProps, QuizSubmissionProps, AnswerCoreInteractivePayload (+5 more)

### Community 5 - "Permissions.tsx"
Cohesion: 0.12
Nodes (22): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage() (+14 more)

### Community 6 - "Analyzer"
Cohesion: 0.33
Nodes (7): Analyzer(), AnalyzerExtension(), createExtensionScanAPI(), getExtensionScanAPI(), useAnalyzerLogsByLearner(), useCreateExtensionScan(), useExtensionScan()

### Community 7 - "use-text-align.ts"
Cohesion: 0.11
Nodes (22): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+14 more)

### Community 8 - "QuizEditor.tsx"
Cohesion: 0.13
Nodes (32): QuestionElement, QuestionType, QuizAnswerKey, QuizJson, QuizPage, QuizSubmissionAnswerKey, AnswerKey, QUESTION_TYPE_OPTIONS (+24 more)

### Community 9 - "sidebar.tsx"
Cohesion: 0.11
Nodes (17): UserSidebar(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarHeader() (+9 more)

### Community 10 - "color-highlight-popover.tsx"
Cohesion: 0.15
Nodes (13): BanIcon, SvgProps, ColorHighlightButton, HighlightColor, ColorHighlightPopoverButton, ColorHighlightPopoverContentProps, ColorHighlightPopoverProps, Card (+5 more)

### Community 11 - "tiptap-utils.ts"
Cohesion: 0.09
Nodes (22): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, CodeBlockButtonProps, CodeBlockShortcutBadge(), CODE_BLOCK_SHORTCUT_KEY, UseCodeBlockConfig (+14 more)

### Community 12 - "use-mark.ts"
Cohesion: 0.09
Nodes (24): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+16 more)

### Community 13 - "search-and-replace.tsx"
Cohesion: 0.10
Nodes (17): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+9 more)

### Community 14 - "ClassroomEmpty.tsx"
Cohesion: 0.22
Nodes (13): EmptyStateProps, Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle() (+5 more)

### Community 15 - "use-element-rect.ts"
Cohesion: 0.17
Nodes (16): SimpleEditor(), CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect() (+8 more)

### Community 16 - "SearchTemplate.tsx"
Cohesion: 0.13
Nodes (7): SearchInputProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput()

### Community 17 - "simple-editor.tsx"
Cohesion: 0.09
Nodes (16): ArrowLeftIcon, SvgProps, HorizontalRule, SEARCH_AND_REPLACE_SCROLL_OPTIONS, BlockquoteButton, CodeBlockButton, ImageUploadButton, MarkButton (+8 more)

### Community 18 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 19 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 20 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.16
Nodes (17): SearchTemplate(), ChartConfig, ChartContainer(), Table(), TableBody(), TableCell(), TableHead(), TableHeader() (+9 more)

### Community 21 - "ui/card.tsx"
Cohesion: 0.15
Nodes (22): getInitials(), getRoleConfig(), RoleConfig, UserProfile(), HeroInterfacePreview(), PourExplorer(), PourPrincipleData, pourPrinciples (+14 more)

### Community 22 - "image-upload-node.tsx"
Cohesion: 0.14
Nodes (10): CloseIcon, SvgProps, FileItem, generateUUID(), ImageUploadDragAreaProps, ImageUploadNode(), ImageUploadPreviewProps, UploadOptions (+2 more)

### Community 23 - "auth.ts"
Cohesion: 0.16
Nodes (13): UserProfileProps, UserSidebarProps, InstructorMaterialsCountProps, User, UserProps, UserRole, SignUpPage(), meAPI() (+5 more)

### Community 24 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 25 - "use-blockquote.ts"
Cohesion: 0.25
Nodes (16): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+8 more)

### Community 26 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 27 - "ui/button.tsx"
Cohesion: 0.14
Nodes (16): PricingBlock(), PricingBlockProps, SectionHeader(), SectionHeaderProps, Badge(), badgeVariants, buttonVariants, ErrorBoundary() (+8 more)

### Community 28 - "isNodeTypeSelected"
Cohesion: 0.16
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButtonProps, canExecuteUndoRedoAction(), executeUndoRedoAction() (+8 more)

### Community 29 - "materials.ts"
Cohesion: 0.09
Nodes (34): AnalyzerResultItem, AnalyzerSummaryProps, QuizAnswer, QuizEditor(), InstructorMaterials(), InstructorMaterialsView(), answerCoreInteractiveActivityAPI(), submitCoreAssessmentActivityAPI() (+26 more)

### Community 30 - "PageTemplate.tsx"
Cohesion: 0.17
Nodes (13): EmptyState(), GridListButtonGroupTemplate(), HeaderTemplate(), HeaderTemplateProps, TooltipButtonTemplate(), ModuleEditor(), NewClassroomDialog(), ClassroomInstructor() (+5 more)

### Community 31 - "moduleProps.ts"
Cohesion: 0.09
Nodes (21): coreModules, ActivityLockedResponse, CoreLessonsProps, CoreModuleActivityContent, CoreModuleActivityResponse, CoreModuleLessonDetail, CoreModuleProgressProps, CoreModuleScenario (+13 more)

### Community 32 - "AnalyzerResults.tsx"
Cohesion: 0.13
Nodes (18): PopoverDescription(), copyText(), CopyTextParams, AnalyzerResults(), capitalize(), convertWcagEvaluationToResult(), CopyButton(), FindingCard() (+10 more)

### Community 33 - "CoreModulesView.tsx"
Cohesion: 0.16
Nodes (15): ErrorOne(), ErrorOneProps, CoreModuleReadOnly(), NotFound(), CoreModulesView(), EarnedBagdes(), getActivityDescription(), getActivityIcon() (+7 more)

### Community 34 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 36 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 37 - "ProtectedLayout.tsx"
Cohesion: 0.19
Nodes (12): PublicNavbar(), UserSkeleton(), instructorNav, learnerNav, publicNav, schoolAdminNav, linksByRole, ProtectedLayout() (+4 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.15
Nodes (13): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef() (+5 more)

### Community 39 - "webLLM.ts"
Cohesion: 0.18
Nodes (12): PrincipleItem, Result, AnalyzerPDFExportOptions, compileWebLLMResults(), ExtensionScanSession, normalizedPrinciple(), parseWebLLMResponse(), WEBLLM_MODELS (+4 more)

### Community 40 - "link-popover.tsx"
Cohesion: 0.13
Nodes (15): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkContent() (+7 more)

### Community 41 - "Chat.tsx"
Cohesion: 0.22
Nodes (10): Props, ToolTipTemplateProps, RichText(), RichTextProps, Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger() (+2 more)

### Community 42 - "instructorRoute.tsx"
Cohesion: 0.14
Nodes (13): suspense(), AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView, DashboardInstructor, ModuleEditor, ModuleReadOnly (+5 more)

### Community 43 - "cn"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 44 - "rootRouter.tsx"
Cohesion: 0.24
Nodes (7): NavigationProgressBar(), RootLayout(), instructorRoute, learnerRoute, publicRoute, router, schoolAdminRoute

### Community 45 - "Customization & Theming"
Cohesion: 0.14
Nodes (14): 1. Built-in variants, 2. Tailwind classes via `className`, 3. Add a new variant, 4. Wrapper components, Adding Custom Colors, Border Radius, Changing the Theme, Checking for Updates (+6 more)

### Community 46 - "Design Critique: FrontAccEase Landing Page"
Cohesion: 0.14
Nodes (13): Design Critique: FrontAccEase Landing Page, Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] Missing WAI-ARIA Tab Semantics in Interactive Tab Lists, [P2] Mobile Visibility Gap for Instructor Preview Tab, [P3] Non-Functional Mockup Action Buttons (+5 more)

### Community 47 - "Critique Snapshot: `src/pages/learner/Classroom.tsx`"
Cohesion: 0.14
Nodes (13): Critique Snapshot: `src/pages/learner/Classroom.tsx`, Design Health Score, Design Specificity Verdict, Minor Observations & Questions, Overall Impression, [P0] Unshielded Destructive "Leave Classroom" Action, [P1] Absence of Student Progress & Score Badging, [P1] Module-Scope Static Data & Missing Classroom Switcher / Join Flow (+5 more)

### Community 48 - "Analyzer.tsx"
Cohesion: 0.14
Nodes (16): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, ScanHistory, Calendar() (+8 more)

### Community 49 - "learnerRoute.tsx"
Cohesion: 0.13
Nodes (16): DetailSkeleton(), GridSkeleton(), TableSkeleton(), Skeleton(), Analyzer, AnalyzerExtension, AnalyzerResults, Chat (+8 more)

### Community 50 - "publicRoute.tsx"
Cohesion: 0.13
Nodes (16): PublicFooter(), PageSkeleton(), AuthLayout(), PublicLayout(), AboutPage, AccessibilityPage, AccessibilityStatementPage, ContactPage (+8 more)

### Community 51 - "Component Composition"
Cohesion: 0.15
Nodes (13): Avatar always needs AvatarFallback, Button has no isPending or isLoading prop, Callouts use Alert, Card structure, Choosing between overlay components, Component Composition, Contents, Dialog, Sheet, and Drawer always need a Title (+5 more)

### Community 52 - "Styling & Customization"
Cohesion: 0.15
Nodes (13): Built-in variants first, className for layout only, Contents, No manual dark: color overrides, No manual z-index on overlay components, No raw color values for status/state indicators, No space-x-* / space-y-*, Prefer size-* over w-* h-* when equal (+5 more)

### Community 53 - "useIsMobile"
Cohesion: 0.21
Nodes (12): react, react, CalendarDayButton(), DateTimePicker(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot() (+4 more)

### Community 54 - "item.tsx"
Cohesion: 0.18
Nodes (6): Item(), ItemActions(), ItemContent(), ItemMedia(), itemMediaVariants, itemVariants

### Community 55 - "pdfExport.ts"
Cohesion: 0.25
Nodes (10): jspdf, jspdf, PrincipleIssue, PrinciplePassed, applyPageNumbersAndFooters(), exportAnalyzerReportToPDF(), exportTableToPDF(), GenericPDFExportOptions (+2 more)

### Community 56 - "Commands"
Cohesion: 0.12
Nodes (17): `add` — Add components, `apply` — Apply a preset to an existing project, `build` — Build a custom registry, Commands, Contents, `diff` — Check for updates, `docs` — Get component documentation URLs, Dry-Run Mode (+9 more)

### Community 57 - "Tools"
Cohesion: 0.17
Nodes (11): Configuring Registries, Setup, `shadcn:get_add_command_for_items`, `shadcn:get_audit_checklist`, `shadcn:get_item_examples_from_registries`, `shadcn:get_project_registries`, `shadcn:list_items_in_registries`, shadcn MCP Server (+3 more)

### Community 58 - "PublicNavbar.tsx"
Cohesion: 0.17
Nodes (9): Logo(), LogoProps, UserHeader(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle() (+1 more)

### Community 59 - "useTiptapEditor"
Cohesion: 0.11
Nodes (30): HighlighterIcon, SvgProps, ImagePlusIcon, SvgProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode (+22 more)

### Community 60 - "analyzerProps.ts"
Cohesion: 0.13
Nodes (14): AnalyzerResultsProps, Content, Criterion, PourGroups, PourSummary, PrincipleData, PrincipleScoreItem, PrincipleSummaryCount (+6 more)

### Community 61 - "button/button.tsx"
Cohesion: 0.13
Nodes (14): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps (+6 more)

### Community 62 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 63 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react-refresh, sass-embedded, @shadcn/lint, typescript (+3 more)

### Community 64 - "schoolAdminRoute.tsx"
Cohesion: 0.14
Nodes (13): AnalyzerLogsClassroomView, AnalyzerLogsSchoolAdmin, ClassroomInstructorView, CoreModulesView, DashboardSchoolAdmin, InstructorMaterials, InstructorMaterialsView, Instruments (+5 more)

### Community 65 - "QuizzesInstructorView.tsx"
Cohesion: 0.10
Nodes (30): ClassroomCardTemplate(), EditorDropdown(), LearnerQuizCardTemplate(), ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplate(), QuizCardTemplateProps, ActionType (+22 more)

### Community 68 - "Instruments.tsx"
Cohesion: 0.24
Nodes (8): Textarea(), wcagCriteria, WCAGCriterion, WCAGGuideline, wcagGuidelines, WCAGLevel, WCAGPrinciple, WCAGTechnique

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

### Community 75 - "QuizProps"
Cohesion: 0.19
Nodes (15): LearnerQuizCardTemplateProps, LearnerQuizHistoryCardTemplateProps, QuizProps, QuizForm(), QuizFormProps, clearQuizProgress(), clearQuizProgressByKey(), getQuizProgressKey() (+7 more)

### Community 76 - "theme-provider.tsx"
Cohesion: 0.21
Nodes (12): ModeToggle(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider() (+4 more)

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

### Community 84 - "ModuleEditor.tsx"
Cohesion: 0.29
Nodes (11): LearnerQuizHistoryCardTemplate(), Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+3 more)

### Community 87 - "modeToggle.tsx"
Cohesion: 0.10
Nodes (10): ModeToggleProps, DropdownMenu(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuTrigger(), SelectContent(), SelectGroup(), SelectItem() (+2 more)

### Community 90 - "use-link-popover.ts"
Cohesion: 0.27
Nodes (10): LinkIcon, SvgProps, canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler(), useLinkPopover() (+2 more)

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

### Community 101 - "ui/button-group.tsx"
Cohesion: 0.38
Nodes (3): ButtonGroup(), buttonGroupVariants, Separator()

### Community 103 - "dependencies"
Cohesion: 0.15
Nodes (13): @base-ui/react, input-otp, dependencies, @base-ui/react, input-otp, @radix-ui/react-dropdown-menu, react-markdown, rehype-highlight (+5 more)

### Community 104 - "Button"
Cohesion: 0.14
Nodes (17): ViewMode, ViewToggleProps, TextAlign, Button(), toast, CoreModuleAssessmentActivity, CoreModuleInteractiveActivity, CoreModuleLessonActivity (+9 more)

### Community 107 - "toast.tsx"
Cohesion: 0.13
Nodes (4): App(), client, Toaster(), RootRouter()

### Community 108 - "parallelQueries.ts"
Cohesion: 0.70
Nodes (4): getAnalyzerLogsSummaryByLearnerAPI(), getCoreModulesAPI(), getClassroomAPI(), useLearnerDashboardData()

### Community 111 - "theme-toggle.tsx"
Cohesion: 0.32
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 144 - "image-upload-node-extension.ts"
Cohesion: 0.29
Nodes (5): Commands, ImageUploadNode, ImageUploadNodeOptions, @tiptap/react, UploadFunction

## Knowledge Gaps
- **567 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+562 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@shadcn/react`, `survey-core`, `survey-creator-react`, `@radix-ui/react-popover`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `recharts`, `@tiptap/extension-typography`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `class-variance-authority`, `axios`, `survey-react-ui`, `useIsMobile`, `pdfExport.ts`, `clsx`, `@tiptap/extensions`, `package.json`, `remark-gfm`, `@tiptap/extension-image`, `@fontsource-variable/roboto`, `cmdk`, `cn`, `date-fns`, `@tiptap/extension-list`, `shadcn`, `react-day-picker`, `lodash.throttle`, `lucide-react`, `@mlc-ai/web-llm`, `@tiptap/extension-subscript`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `@tiptap/extension-superscript`, `@tiptap/extension-text-align`, `@floating-ui/react`, `jspdf-autotable`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `dependencies`, `sidebar.tsx`, `theme-provider.tsx`, `ClassroomEmpty.tsx`, `chart.tsx`, `AnalyzerLogsSchoolAdmin.tsx`?**
  _High betweenness centrality (0.136) - this node is a cross-community bridge._
- **Why does `InputOTPSlot()` connect `ClassroomEmpty.tsx` to `useIsMobile`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _567 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-tiptap-editor.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08780487804878048 - nodes in this community are weakly interconnected._
- **Should `use-heading.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09176788124156546 - nodes in this community are weakly interconnected._
- **Should `use-list.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12096774193548387 - nodes in this community are weakly interconnected._