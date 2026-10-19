# Graph Report - react  (2026-10-19)

## Corpus Check
- 344 files · ~157,933 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1865 nodes · 4334 edges · 166 communities (100 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3b45e71b`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- parseShortcutKeys
- field.tsx
- use-heading.ts
- use-list-dropdown-menu.ts
- materials.ts
- Permissions.tsx
- ui/dropdown-menu.tsx
- ui/badge.tsx
- QuizEditor.tsx
- sidebar.tsx
- SearchTemplate.tsx
- tiptap-utils.ts
- use-mark.ts
- search-and-replace.tsx
- ClassroomEmpty.tsx
- use-element-rect.ts
- ModuleEditor.tsx
- useTiptapEditor
- compilerOptions
- components.json
- AnalyzerLogsSchoolAdmin.tsx
- CoreModulesView.tsx
- image-upload-node.tsx
- materialsAPI.ts
- use-text-align.ts
- use-search-and-replace.ts
- compilerOptions
- ui/card.tsx
- isNodeTypeSelected
- modeToggle.tsx
- color-highlight-popover.tsx
- moduleProps.ts
- AnalyzerResults.tsx
- ModulesInstructor.tsx
- shadcn/ui
- class-variance-authority
- ui/button.tsx
- use-list.ts
- simple-editor.tsx
- use-color-highlight.ts
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
- toolbar.tsx
- Commands
- Tools
- PublicNavbar.tsx
- use-image-upload.ts
- analyzerProps.ts
- button/button.tsx
- attachment.tsx
- devDependencies
- schoolAdminRoute.tsx
- QuizzesInstructorView.tsx
- clsx
- globals
- CoreModuleReadOnly.tsx
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
- Instruments.tsx
- button-group/button-group.tsx
- remark-gfm
- cmdk
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
- axios
- eslint
- dependencies
- theme-toggle.tsx
- cn
- date-fns
- toast.tsx
- ProtectedLayout.tsx
- @tiptap/extension-list
- shadcn
- @eslint/js
- react-day-picker
- lodash.throttle
- lucide-react
- @mlc-ai/web-llm
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

## Communities (166 total, 66 thin omitted)

### Community 0 - "parseShortcutKeys"
Cohesion: 0.07
Nodes (38): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+30 more)

### Community 1 - "field.tsx"
Cohesion: 0.20
Nodes (5): Field(), FieldDescription(), FieldError(), FieldGroup(), fieldVariants

### Community 2 - "use-heading.ts"
Cohesion: 0.11
Nodes (23): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+15 more)

### Community 3 - "use-list-dropdown-menu.ts"
Cohesion: 0.13
Nodes (19): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, isListActive(), listIcons (+11 more)

### Community 4 - "materials.ts"
Cohesion: 0.12
Nodes (25): QuizAnswer, QuizEditor(), submitCoreAssessmentActivityAPI(), getAnalyzerLogsByLearner(), getCoreModuleActivitiesAPI(), getCoreModulesAPI(), getExtensionScanAPI(), getInstructorMaterialsAPI() (+17 more)

### Community 5 - "Permissions.tsx"
Cohesion: 0.10
Nodes (27): getInitials(), getRoleConfig(), RoleConfig, UserProfile(), QuizSubmissionsCardTemplate(), QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent() (+19 more)

### Community 6 - "ui/dropdown-menu.tsx"
Cohesion: 0.15
Nodes (4): DropdownMenu(), DropdownMenuContent(), DropdownMenuItem(), DropdownMenuTrigger()

### Community 7 - "ui/badge.tsx"
Cohesion: 0.16
Nodes (10): SectionHeader(), SectionHeaderProps, Badge(), badgeVariants, SubmissionResponse, AccessibilityPage(), A11yDefectScenario, DEFECT_SCENARIOS (+2 more)

### Community 8 - "QuizEditor.tsx"
Cohesion: 0.13
Nodes (32): QuestionElement, QuestionType, QuizAnswerKey, QuizJson, QuizPage, QuizSubmissionAnswerKey, AnswerKey, QUESTION_TYPE_OPTIONS (+24 more)

### Community 9 - "sidebar.tsx"
Cohesion: 0.09
Nodes (21): Logo(), LogoProps, UserHeader(), UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarContext (+13 more)

### Community 10 - "SearchTemplate.tsx"
Cohesion: 0.09
Nodes (11): SearchInputProps, Calendar(), CalendarDayButton(), DateTimePickerProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton() (+3 more)

### Community 11 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 12 - "use-mark.ts"
Cohesion: 0.10
Nodes (22): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+14 more)

### Community 13 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (23): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronUpIcon, SvgProps, SvgProps, WholeWordIcon (+15 more)

### Community 14 - "ClassroomEmpty.tsx"
Cohesion: 0.09
Nodes (27): EmptyState(), EmptyStateProps, UserProfileProps, LoginPage(), Empty(), EmptyContent(), EmptyDescription(), EmptyHeader() (+19 more)

### Community 15 - "use-element-rect.ts"
Cohesion: 0.23
Nodes (11): ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect(), useRefRect(), defaultOptions (+3 more)

### Community 16 - "ModuleEditor.tsx"
Cohesion: 0.18
Nodes (19): LearnerQuizHistoryCardTemplate(), Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+11 more)

### Community 17 - "useTiptapEditor"
Cohesion: 0.14
Nodes (15): ChevronDownIcon, SvgProps, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, ListButton, ListButtonProps, ListShortcutBadge() (+7 more)

### Community 18 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 19 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 20 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.17
Nodes (18): SearchTemplate(), ChartConfig, ChartContainer(), Table(), TableBody(), TableCell(), TableHead(), TableHeader() (+10 more)

### Community 21 - "CoreModulesView.tsx"
Cohesion: 0.15
Nodes (13): ErrorOne(), ErrorOneProps, NotFound(), CoreModulesView(), EarnedBagdes(), getActivityDescription(), getActivityIcon(), getActivityKindLabel() (+5 more)

### Community 22 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 23 - "materialsAPI.ts"
Cohesion: 0.18
Nodes (14): Props, ClassroomContentProps, ClassroomProps, ClassroomViewProps, ModuleProps, QuizSubmissionProps, LearnerQuizView(), AnswerCoreInteractivePayload (+6 more)

### Community 24 - "use-text-align.ts"
Cohesion: 0.10
Nodes (23): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+15 more)

### Community 25 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 26 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 27 - "ui/card.tsx"
Cohesion: 0.19
Nodes (16): HeroInterfacePreview(), PourExplorer(), PourPrincipleData, pourPrinciples, Card(), CardAction(), CardContent(), CardDescription() (+8 more)

### Community 28 - "isNodeTypeSelected"
Cohesion: 0.15
Nodes (17): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+9 more)

### Community 29 - "modeToggle.tsx"
Cohesion: 0.18
Nodes (11): ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue(), Analyzer(), AnalyzerExtension() (+3 more)

### Community 30 - "color-highlight-popover.tsx"
Cohesion: 0.15
Nodes (13): BanIcon, SvgProps, ColorHighlightButtonProps, HighlightColor, pickHighlightColorsByValue(), UseColorHighlightConfig, ColorHighlightPopover(), ColorHighlightPopoverButton (+5 more)

### Community 31 - "moduleProps.ts"
Cohesion: 0.09
Nodes (22): coreModules, ActivityLockedResponse, CoreLessonsProps, CoreModuleActivityContent, CoreModuleActivityResponse, CoreModuleAssessmentActivity, CoreModuleLessonDetail, CoreModuleProgressProps (+14 more)

### Community 32 - "AnalyzerResults.tsx"
Cohesion: 0.16
Nodes (14): AnalyzerResults(), capitalize(), FindingCard(), FindingItem, FindingType, formatDate(), formatElapsedTime(), getFindingConfig() (+6 more)

### Community 33 - "ModulesInstructor.tsx"
Cohesion: 0.18
Nodes (10): GridListButtonGroupTemplate(), Props, TooltipButtonTemplate(), ButtonGroup(), buttonGroupVariants, Separator(), ModulesInstructor(), ModulesInstructor() (+2 more)

### Community 34 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 36 - "ui/button.tsx"
Cohesion: 0.11
Nodes (25): LearnerQuizCardTemplate(), ViewMode, ViewToggleProps, PricingBlock(), PricingBlockProps, Button(), buttonVariants, ModuleReadOnly() (+17 more)

### Community 37 - "use-list.ts"
Cohesion: 0.21
Nodes (22): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+14 more)

### Community 38 - "simple-editor.tsx"
Cohesion: 0.13
Nodes (14): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), ListDropdownMenu, Spacer() (+6 more)

### Community 39 - "use-color-highlight.ts"
Cohesion: 0.29
Nodes (11): HighlighterIcon, SvgProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive(), removeHighlight() (+3 more)

### Community 40 - "link-popover.tsx"
Cohesion: 0.11
Nodes (23): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, LinkIcon, SvgProps, SvgProps, TrashIcon (+15 more)

### Community 41 - "Chat.tsx"
Cohesion: 0.18
Nodes (12): ToolTipTemplateProps, RichText(), RichTextProps, Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger(), copyText() (+4 more)

### Community 42 - "instructorRoute.tsx"
Cohesion: 0.15
Nodes (12): AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView, DashboardInstructor, ModuleEditor, ModuleReadOnly, ModulesArchivedInstructor (+4 more)

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
Cohesion: 0.11
Nodes (23): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, ScanHistory, DatePickerProps (+15 more)

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
Cohesion: 0.23
Nodes (11): react, react, DateTimePicker(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot(), getSnapshot() (+3 more)

### Community 54 - "item.tsx"
Cohesion: 0.18
Nodes (6): Item(), ItemActions(), ItemContent(), ItemMedia(), itemMediaVariants, itemVariants

### Community 55 - "toolbar.tsx"
Cohesion: 0.15
Nodes (13): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef() (+5 more)

### Community 56 - "Commands"
Cohesion: 0.12
Nodes (17): `add` — Add components, `apply` — Apply a preset to an existing project, `build` — Build a custom registry, Commands, Contents, `diff` — Check for updates, `docs` — Get component documentation URLs, Dry-Run Mode (+9 more)

### Community 57 - "Tools"
Cohesion: 0.17
Nodes (11): Configuring Registries, Setup, `shadcn:get_add_command_for_items`, `shadcn:get_audit_checklist`, `shadcn:get_item_examples_from_registries`, `shadcn:get_project_registries`, `shadcn:list_items_in_registries`, shadcn MCP Server (+3 more)

### Community 58 - "PublicNavbar.tsx"
Cohesion: 0.24
Nodes (6): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger()

### Community 59 - "use-image-upload.ts"
Cohesion: 0.29
Nodes (10): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), BreakpointMode (+2 more)

### Community 60 - "analyzerProps.ts"
Cohesion: 0.13
Nodes (20): jspdf, jspdf, AnalyzerResultItem, AnalyzerResultsProps, PrincipleData, PrincipleIssue, PrincipleItem, PrinciplePassed (+12 more)

### Community 61 - "button/button.tsx"
Cohesion: 0.13
Nodes (14): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps (+6 more)

### Community 62 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 63 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint-plugin-react-hooks, eslint-plugin-react-refresh, devDependencies, eslint-plugin-react-hooks, eslint-plugin-react-refresh, sass-embedded, @shadcn/lint, typescript (+3 more)

### Community 64 - "schoolAdminRoute.tsx"
Cohesion: 0.13
Nodes (14): suspense(), AnalyzerLogsClassroomView, AnalyzerLogsSchoolAdmin, ClassroomInstructorView, CoreModulesView, DashboardSchoolAdmin, InstructorMaterials, InstructorMaterialsView (+6 more)

### Community 65 - "QuizzesInstructorView.tsx"
Cohesion: 0.12
Nodes (22): ClassroomCardTemplate(), EditorDropdown(), ModuleCardTemplate(), ModuleCardTemplateProps, HeaderTemplate(), HeaderTemplateProps, QuizCardTemplate(), QuizCardTemplateProps (+14 more)

### Community 68 - "CoreModuleReadOnly.tsx"
Cohesion: 0.23
Nodes (11): CoreModuleInteractiveActivity, CoreModuleLessonActivity, CoreModuleInteractiveView(), CoreModuleInteractiveViewProps, InteractiveAnswerResponse, CoreModuleLessonView(), CoreModuleLessonViewProps, CoreModuleReadOnly() (+3 more)

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
Cohesion: 0.17
Nodes (17): LearnerQuizCardTemplateProps, LearnerQuizHistoryCardTemplateProps, QuizProps, QuizForm(), QuizFormProps, clearQuizProgress(), clearQuizProgressByKey(), getQuizProgressKey() (+9 more)

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

### Community 84 - "Instruments.tsx"
Cohesion: 0.29
Nodes (7): wcagCriteria, WCAGCriterion, WCAGGuideline, wcagGuidelines, WCAGLevel, WCAGPrinciple, WCAGTechnique

### Community 87 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

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
Nodes (13): @base-ui/react, input-otp, dependencies, @base-ui/react, input-otp, @radix-ui/react-dropdown-menu, react-markdown, rehype-highlight (+5 more)

### Community 104 - "theme-toggle.tsx"
Cohesion: 0.32
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 107 - "toast.tsx"
Cohesion: 0.13
Nodes (4): App(), client, Toaster(), RootRouter()

### Community 108 - "ProtectedLayout.tsx"
Cohesion: 0.18
Nodes (13): PublicNavbar(), UserSkeleton(), instructorNav, learnerNav, publicNav, schoolAdminNav, UserRole, linksByRole (+5 more)

## Knowledge Gaps
- **561 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+556 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@shadcn/react`, `survey-core`, `survey-creator-react`, `@radix-ui/react-popover`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `recharts`, `@tiptap/extension-typography`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `class-variance-authority`, `survey-react-ui`, `useIsMobile`, `analyzerProps.ts`, `clsx`, `@tiptap/extensions`, `package.json`, `remark-gfm`, `cmdk`, `@tiptap/extension-image`, `@fontsource-variable/roboto`, `axios`, `cn`, `date-fns`, `@tiptap/extension-list`, `shadcn`, `react-day-picker`, `lodash.throttle`, `lucide-react`, `@mlc-ai/web-llm`, `@tiptap/extension-subscript`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `@tiptap/extension-superscript`, `@tiptap/extension-text-align`, `@floating-ui/react`, `jspdf-autotable`?**
  _High betweenness centrality (0.148) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `dependencies`, `sidebar.tsx`, `SearchTemplate.tsx`, `theme-provider.tsx`, `ClassroomEmpty.tsx`, `chart.tsx`, `AnalyzerLogsSchoolAdmin.tsx`?**
  _High betweenness centrality (0.130) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `Permissions.tsx`, `ui/dropdown-menu.tsx`, `ui/badge.tsx`, `QuizEditor.tsx`, `sidebar.tsx`, `SearchTemplate.tsx`, `ClassroomEmpty.tsx`, `ModuleEditor.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `CoreModulesView.tsx`, `ui/card.tsx`, `modeToggle.tsx`, `AnalyzerResults.tsx`, `ModulesInstructor.tsx`, `Chat.tsx`, `Analyzer.tsx`, `PublicNavbar.tsx`, `attachment.tsx`, `QuizzesInstructorView.tsx`, `CoreModuleReadOnly.tsx`, `Instruments.tsx`, `message-scroller.tsx`, `toast.tsx`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _561 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parseShortcutKeys` be split into smaller, more focused modules?**
  _Cohesion score 0.06636500754147813 - nodes in this community are weakly interconnected._
- **Should `use-heading.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10795454545454546 - nodes in this community are weakly interconnected._
- **Should `use-list-dropdown-menu.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.13438735177865613 - nodes in this community are weakly interconnected._