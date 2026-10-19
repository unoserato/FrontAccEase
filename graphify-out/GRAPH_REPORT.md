# Graph Report - react  (2026-10-20)

## Corpus Check
- 347 files · ~165,354 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1889 nodes · 4375 edges · 163 communities (97 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 33 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `72868934`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- parseShortcutKeys
- SignUpPage.tsx
- useTiptapEditor
- use-list.ts
- DeleteArchiveDialog.tsx
- Permissions.tsx
- list-dropdown-menu.tsx
- use-text-align.ts
- QuizEditor.tsx
- sidebar.tsx
- link-popover.tsx
- tiptap-utils.ts
- use-mark.ts
- search-and-replace.tsx
- ClassroomEmpty.tsx
- use-element-rect.ts
- materialsCRUDAPI.ts
- simple-editor.tsx
- compilerOptions
- components.json
- use-image-upload.ts
- ui/card.tsx
- image-upload-node.tsx
- authAPI.ts
- use-search-and-replace.ts
- use-blockquote.ts
- compilerOptions
- buttonVariants
- isNodeTypeSelected
- materials.ts
- ModulesInstructor.tsx
- moduleProps.ts
- AnalyzerResults.tsx
- CoreModulesView.tsx
- shadcn/ui
- ProtectedLayout.tsx
- ModuleEditor.tsx
- auth.ts
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
- learnerRoute.tsx
- publicRoute.tsx
- Component Composition
- Styling & Customization
- useIsMobile
- item.tsx
- Commands
- Tools
- PublicNavbar.tsx
- use-color-highlight.ts
- analyzerProps.ts
- Button
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
- NewClassroomDialog.tsx
- toast.tsx
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

## Communities (163 total, 66 thin omitted)

### Community 0 - "parseShortcutKeys"
Cohesion: 0.06
Nodes (40): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+32 more)

### Community 1 - "SignUpPage.tsx"
Cohesion: 0.09
Nodes (22): LoginPage(), DateTimePickerProps, Field(), FieldDescription(), FieldError(), FieldGroup(), FieldLabel(), fieldVariants (+14 more)

### Community 2 - "useTiptapEditor"
Cohesion: 0.09
Nodes (29): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+21 more)

### Community 3 - "use-list.ts"
Cohesion: 0.11
Nodes (28): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, ListButton, ListButtonProps (+20 more)

### Community 4 - "DeleteArchiveDialog.tsx"
Cohesion: 0.47
Nodes (6): Props, ClassroomContentProps, ClassroomProps, ClassroomViewProps, ModuleProps, QuizSubmissionProps

### Community 5 - "Permissions.tsx"
Cohesion: 0.08
Nodes (39): HeaderTemplate(), HeaderTemplateProps, SearchInputProps, SearchTemplate(), Avatar(), AvatarFallback(), AvatarImage(), CardAction() (+31 more)

### Community 6 - "list-dropdown-menu.tsx"
Cohesion: 0.19
Nodes (9): ChevronDownIcon, SvgProps, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, ListDropdownMenu, ListDropdownMenuImpl(), DropdownMenu() (+1 more)

### Community 7 - "use-text-align.ts"
Cohesion: 0.15
Nodes (17): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+9 more)

### Community 8 - "QuizEditor.tsx"
Cohesion: 0.15
Nodes (30): QuestionElement, QuestionType, QuizAnswerKey, QuizJson, QuizPage, QuizSubmissionAnswerKey, AnswerKey, QUESTION_TYPE_OPTIONS (+22 more)

### Community 9 - "sidebar.tsx"
Cohesion: 0.10
Nodes (20): UserProfileProps, UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+12 more)

### Community 10 - "link-popover.tsx"
Cohesion: 0.08
Nodes (27): BanIcon, SvgProps, CornerDownLeftIcon, SvgProps, SvgProps, TrashIcon, HighlightColor, pickHighlightColorsByValue() (+19 more)

### Community 11 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (14): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+6 more)

### Community 12 - "use-mark.ts"
Cohesion: 0.10
Nodes (22): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+14 more)

### Community 13 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (20): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronUpIcon, SvgProps, ExternalLinkIcon, SvgProps (+12 more)

### Community 14 - "ClassroomEmpty.tsx"
Cohesion: 0.19
Nodes (14): EmptyStateProps, Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle() (+6 more)

### Community 15 - "use-element-rect.ts"
Cohesion: 0.15
Nodes (18): SimpleEditor(), CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect() (+10 more)

### Community 16 - "materialsCRUDAPI.ts"
Cohesion: 0.18
Nodes (12): DeleteArchiveDialog(), LearnerQuizView(), answerCoreInteractiveActivityAPI(), AnswerCoreInteractivePayload, arhiveModuleAPI(), createSubmissionTicket(), submitCoreAssessmentActivityAPI(), SubmitCoreAssessmentPayload (+4 more)

### Community 17 - "simple-editor.tsx"
Cohesion: 0.09
Nodes (16): ArrowLeftIcon, SvgProps, HorizontalRule, Commands, ImageUploadNode, ImageUploadNodeOptions, @tiptap/react, UploadFunction (+8 more)

### Community 18 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 19 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 20 - "use-image-upload.ts"
Cohesion: 0.27
Nodes (10): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), LinkMain() (+2 more)

### Community 21 - "ui/card.tsx"
Cohesion: 0.17
Nodes (19): EditorDropdown(), ModuleCardTemplateProps, getInitials(), getRoleConfig(), RoleConfig, UserProfile(), ActionType, HeroInterfacePreview() (+11 more)

### Community 22 - "image-upload-node.tsx"
Cohesion: 0.14
Nodes (10): CloseIcon, SvgProps, FileItem, generateUUID(), ImageUploadDragAreaProps, ImageUploadNode(), ImageUploadPreviewProps, UploadOptions (+2 more)

### Community 23 - "authAPI.ts"
Cohesion: 0.28
Nodes (8): getAnalyzerLogsSummaryByLearnerAPI(), getCoreModulesAPI(), getClassroomAPI(), getAllInstructorsAPI(), api, staleTime, useLearnerDashboardData(), useInstructors()

### Community 24 - "use-search-and-replace.ts"
Cohesion: 0.15
Nodes (18): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+10 more)

### Community 25 - "use-blockquote.ts"
Cohesion: 0.23
Nodes (19): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+11 more)

### Community 26 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 27 - "buttonVariants"
Cohesion: 0.12
Nodes (21): QuizSubmissionsCardTemplateProps, PricingBlock(), PricingBlockProps, SectionHeader(), SectionHeaderProps, Accordion(), AccordionContent(), AccordionItem() (+13 more)

### Community 28 - "isNodeTypeSelected"
Cohesion: 0.15
Nodes (17): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+9 more)

### Community 29 - "materials.ts"
Cohesion: 0.09
Nodes (35): TextAlign, AnalyzerResultItem, WcagEvaluationProps, CoreModuleActivityResponse, QuizAnswer, QuizEditor(), ModuleReadOnly(), Analyzer() (+27 more)

### Community 30 - "ModulesInstructor.tsx"
Cohesion: 0.22
Nodes (10): EmptyState(), GridListButtonGroupTemplate(), TooltipButtonTemplate(), ModulesInstructor(), ModulesInstructor(), QuizzesInstructor(), getInstructorQuizzesAPI(), getModulesAPI() (+2 more)

### Community 31 - "moduleProps.ts"
Cohesion: 0.09
Nodes (20): coreModules, ActivityLockedResponse, CoreLessonsProps, CoreModuleActivityContent, CoreModuleLessonDetail, CoreModuleProgressProps, CoreModuleScenario, CoreModuleScenarioChoice (+12 more)

### Community 32 - "AnalyzerResults.tsx"
Cohesion: 0.09
Nodes (26): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, RichText(), RichTextProps (+18 more)

### Community 33 - "CoreModulesView.tsx"
Cohesion: 0.20
Nodes (12): ErrorOne(), ErrorOneProps, NotFound(), CoreModulesView(), EarnedBagdes(), getActivityDescription(), getActivityIcon(), getActivityKindLabel() (+4 more)

### Community 34 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 35 - "ProtectedLayout.tsx"
Cohesion: 0.26
Nodes (8): instructorNav, learnerNav, publicNav, schoolAdminNav, InstructorMaterialsCountProps, User, UserRole, linksByRole

### Community 36 - "ModuleEditor.tsx"
Cohesion: 0.39
Nodes (5): Checkbox(), ModuleEditor(), UsePromptProps, useUnmount(), createModuleAPI()

### Community 37 - "auth.ts"
Cohesion: 0.18
Nodes (11): PublicFooter(), PublicNavbar(), PageSkeleton(), UserSkeleton(), AuthLayout(), ProtectedLayoutNoSidebar(), PublicLayout(), Forbidden() (+3 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.15
Nodes (13): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef() (+5 more)

### Community 39 - "Analyzer.tsx"
Cohesion: 0.14
Nodes (17): ScanHistory, Result, copyText(), CopyTextParams, AnalyzerPDFExportOptions, CopyButton(), ClassroomInstructorView(), steps (+9 more)

### Community 41 - "Chat.tsx"
Cohesion: 0.26
Nodes (9): Props, ToolTipTemplateProps, Tooltip(), TooltipContent(), TooltipTrigger(), ChatMessage, Chat(), STARTER_PROMPTS (+1 more)

### Community 42 - "instructorRoute.tsx"
Cohesion: 0.14
Nodes (13): suspense(), AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView, DashboardInstructor, ModuleEditor, ModuleReadOnly (+5 more)

### Community 43 - "cn"
Cohesion: 0.10
Nodes (23): CheckIcon, SvgProps, DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+15 more)

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

### Community 49 - "learnerRoute.tsx"
Cohesion: 0.13
Nodes (16): DetailSkeleton(), GridSkeleton(), TableSkeleton(), Skeleton(), Analyzer, AnalyzerExtension, AnalyzerResults, Chat (+8 more)

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
Cohesion: 0.21
Nodes (12): react, react, CalendarDayButton(), DateTimePicker(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot() (+4 more)

### Community 54 - "item.tsx"
Cohesion: 0.13
Nodes (7): ButtonGroup(), buttonGroupVariants, Item(), ItemMedia(), itemMediaVariants, itemVariants, Separator()

### Community 56 - "Commands"
Cohesion: 0.12
Nodes (17): `add` — Add components, `apply` — Apply a preset to an existing project, `build` — Build a custom registry, Commands, Contents, `diff` — Check for updates, `docs` — Get component documentation URLs, Dry-Run Mode (+9 more)

### Community 57 - "Tools"
Cohesion: 0.17
Nodes (11): Configuring Registries, Setup, `shadcn:get_add_command_for_items`, `shadcn:get_audit_checklist`, `shadcn:get_item_examples_from_registries`, `shadcn:get_project_registries`, `shadcn:list_items_in_registries`, shadcn MCP Server (+3 more)

### Community 58 - "PublicNavbar.tsx"
Cohesion: 0.17
Nodes (9): Logo(), LogoProps, UserHeader(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle() (+1 more)

### Community 59 - "use-color-highlight.ts"
Cohesion: 0.26
Nodes (12): HighlighterIcon, SvgProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive(), removeHighlight() (+4 more)

### Community 60 - "analyzerProps.ts"
Cohesion: 0.09
Nodes (25): jspdf, jspdf, AnalyzerResultsProps, AnalyzerSummaryProps, Content, Criterion, PourGroups, PourSummary (+17 more)

### Community 61 - "Button"
Cohesion: 0.09
Nodes (18): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), Button, ButtonSize, ButtonStyle (+10 more)

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
Nodes (28): ClassroomCardTemplate(), LearnerQuizCardTemplate(), ModuleCardTemplate(), QuizCardTemplate(), QuizCardTemplateProps, QuizSubmissionsCardTemplate(), Tabs(), TabsContent() (+20 more)

### Community 68 - "Instruments.tsx"
Cohesion: 0.17
Nodes (14): wcagCriteria, WCAGCriterion, WCAGGuideline, wcagGuidelines, WCAGLevel, WCAGPrinciple, WCAGTechnique, instrumentsData (+6 more)

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
Cohesion: 0.18
Nodes (13): ModeToggle(), disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider() (+5 more)

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

### Community 84 - "NewClassroomDialog.tsx"
Cohesion: 0.14
Nodes (12): LearnerQuizHistoryCardTemplate(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+4 more)

### Community 87 - "toast.tsx"
Cohesion: 0.06
Nodes (14): App(), client, ModeToggleProps, DropdownMenu(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuTrigger(), SelectContent() (+6 more)

### Community 90 - "use-link-popover.ts"
Cohesion: 0.24
Nodes (11): LinkIcon, SvgProps, LinkContent(), canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler() (+3 more)

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
Nodes (13): class-variance-authority, input-otp, dependencies, class-variance-authority, input-otp, @radix-ui/react-dropdown-menu, react-markdown, rehype-highlight (+5 more)

### Community 104 - "ui/button.tsx"
Cohesion: 0.14
Nodes (19): ViewMode, ViewToggleProps, Button(), CoreModuleAssessmentActivity, CoreModuleInteractiveActivity, CoreModuleLessonActivity, CoreModuleAssessmentView(), CoreModuleAssessmentViewProps (+11 more)

## Knowledge Gaps
- **570 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+565 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@shadcn/react`, `survey-core`, `survey-creator-react`, `@radix-ui/react-popover`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `recharts`, `@tiptap/extension-typography`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `axios`, `@base-ui/react`, `survey-react-ui`, `useIsMobile`, `analyzerProps.ts`, `clsx`, `@tiptap/extensions`, `package.json`, `remark-gfm`, `@tiptap/extension-image`, `@fontsource-variable/roboto`, `cmdk`, `cn`, `date-fns`, `@tiptap/extension-list`, `shadcn`, `react-day-picker`, `lodash.throttle`, `lucide-react`, `@mlc-ai/web-llm`, `@tiptap/extension-subscript`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `@tiptap/extension-superscript`, `@tiptap/extension-text-align`, `@floating-ui/react`, `jspdf-autotable`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `Permissions.tsx`, `dependencies`, `sidebar.tsx`, `theme-provider.tsx`, `ClassroomEmpty.tsx`, `chart.tsx`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `InputOTPSlot()` connect `ClassroomEmpty.tsx` to `useIsMobile`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _570 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parseShortcutKeys` be split into smaller, more focused modules?**
  _Cohesion score 0.05660377358490566 - nodes in this community are weakly interconnected._
- **Should `SignUpPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09041835357624832 - nodes in this community are weakly interconnected._
- **Should `useTiptapEditor` be split into smaller, more focused modules?**
  _Cohesion score 0.09268292682926829 - nodes in this community are weakly interconnected._