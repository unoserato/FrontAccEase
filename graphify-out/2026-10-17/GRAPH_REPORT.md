# Graph Report - react  (2026-10-16)

## Corpus Check
- 332 files · ~148,459 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1796 nodes · 4071 edges · 160 communities (94 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 26 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8a76f39f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- AnalyzerResults.tsx
- Chat.tsx
- simple-editor.tsx
- useTiptapEditor
- Permissions.tsx
- search-and-replace.tsx
- isNodeTypeSelected
- use-undo-redo.ts
- Button
- compilerOptions
- tiptap-utils.ts
- chart.tsx
- sidebar.tsx
- ModuleEditor.tsx
- attachment.tsx
- components.json
- use-search-and-replace.ts
- compilerOptions
- PageSkeleton.tsx
- data.ts
- cn
- image-upload-node.tsx
- button/index.tsx
- ModuleCardTemplate.tsx
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
- buttonVariants
- ui/card.tsx
- instructorRoute.tsx
- image-upload-button.tsx
- PageWithTitleTemplate.tsx
- AnalyzerLogsSchoolAdmin.tsx
- color-highlight-popover.tsx
- rules/graphify.md
- Design Critique: FrontAccEase Landing Page
- workflows/graphify.md
- toast.tsx
- ui/badge.tsx
- @tiptap/extension-image
- publicRoute.tsx
- @tiptap/extension-list
- error-1.tsx
- modeToggle.tsx
- SignUpPage.tsx
- use-scrolling.ts
- tsconfig.json
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- schoolAdminRoute.tsx
- vercel.json
- Instruments.tsx
- marker.tsx
- CoreModulesView.tsx
- @types/react
- @tiptap/extension-text-align
- date-fns
- useIsMobile
- @fontsource-variable/roboto
- rootRouter.tsx
- Q: Add elapsed time in webLLM.ts
- dependencies
- ui/button.tsx
- @radix-ui/react-dropdown-menu
- react-dom
- react-hotkeys-hook
- react-day-picker
- react-icons
- shadcn
- materialsCRUDAPI.ts
- link-popover.tsx
- button-group/button-group.tsx
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
- shadcn CLI Reference
- @tiptap/extension-typography
- Icons
- Q: Fix production build errors caused by stale const/data imports
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
- UserHeader.tsx
- ProtectedLayout.tsx
- @base-ui/react
- globals
- class-variance-authority
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
7. `CardContent()` - 23 edges
8. `QuizEditorContent()` - 22 edges
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

## Communities (160 total, 66 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (27): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+19 more)

### Community 1 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react-refresh, sass-embedded, @shadcn/lint, typescript (+3 more)

### Community 2 - "AnalyzerResults.tsx"
Cohesion: 0.15
Nodes (14): PrincipleIssue, PrinciplePassed, AnalyzerResults(), capitalize(), FindingCard(), FindingItem, FindingType, formatDate() (+6 more)

### Community 3 - "Chat.tsx"
Cohesion: 0.18
Nodes (11): RichText(), RichTextProps, copyText(), CopyTextParams, ClassroomInstructorView(), Chat(), STARTER_PROMPTS, Classroom() (+3 more)

### Community 4 - "simple-editor.tsx"
Cohesion: 0.07
Nodes (25): ArrowLeftIcon, SvgProps, HorizontalRule, SEARCH_AND_REPLACE_SCROLL_OPTIONS, ColorHighlightPopover(), ColorHighlightPopoverButton, ColorHighlightPopoverContent(), LinkButton (+17 more)

### Community 5 - "useTiptapEditor"
Cohesion: 0.11
Nodes (32): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, ListButton, ListButtonProps (+24 more)

### Community 6 - "Permissions.tsx"
Cohesion: 0.19
Nodes (11): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage() (+3 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (22): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+14 more)

### Community 8 - "isNodeTypeSelected"
Cohesion: 0.23
Nodes (20): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+12 more)

### Community 9 - "use-undo-redo.ts"
Cohesion: 0.18
Nodes (12): Redo2Icon, SvgProps, SvgProps, Undo2Icon, canExecuteUndoRedoAction(), executeUndoRedoAction(), historyActionLabels, historyIcons (+4 more)

### Community 10 - "Button"
Cohesion: 0.12
Nodes (15): CheckIcon, SvgProps, Button, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent (+7 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.12
Nodes (15): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, findNodeAtPosition(), getSelectedNodesOfType(), isAllowedUri(), MAC_SYMBOLS (+7 more)

### Community 13 - "chart.tsx"
Cohesion: 0.25
Nodes (9): ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent(), getPayloadConfigFromPayload(), INITIAL_DIMENSION, THEMES, TooltipNameType (+1 more)

### Community 14 - "sidebar.tsx"
Cohesion: 0.10
Nodes (18): UserSidebar(), UserSidebarProps, Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup() (+10 more)

### Community 15 - "ModuleEditor.tsx"
Cohesion: 0.18
Nodes (17): Props, Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+9 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "use-search-and-replace.ts"
Cohesion: 0.07
Nodes (36): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+28 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 20 - "PageSkeleton.tsx"
Cohesion: 0.33
Nodes (5): PublicFooter(), PublicNavbar(), PageSkeleton(), UserSkeleton(), PublicLayout()

### Community 21 - "data.ts"
Cohesion: 0.14
Nodes (13): ClassLogItem, classworks, instructorClassLogs, instructors, learners, quizSubmissions, Role, user (+5 more)

### Community 22 - "cn"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 23 - "image-upload-node.tsx"
Cohesion: 0.06
Nodes (33): CloseIcon, SvgProps, Commands, ImageUploadNode, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem (+25 more)

### Community 24 - "button/index.tsx"
Cohesion: 0.28
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 25 - "ModuleCardTemplate.tsx"
Cohesion: 0.30
Nodes (8): EditorDropdown(), ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), meAPI(), useMe()

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.06
Nodes (61): LearnerQuizCardTemplateProps, LearnerQuizHistoryCardTemplate(), LearnerQuizHistoryCardTemplateProps, Checkbox(), QuizSubmissionProps, ClassroomViewProps, CoreLessonsProps, CoreTopicsProps (+53 more)

### Community 27 - "Analyzer.tsx"
Cohesion: 0.13
Nodes (20): ScanHistory, Result, Analyzer(), steps, AnalyzerExtension(), createExtensionScanAPI(), getExtensionScanAPI(), webLLMTasksAPI() (+12 more)

### Community 28 - "shadcn/ui"
Cohesion: 0.11
Nodes (19): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Docs, Examples, and Usage, Component Selection, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Current Project Context, Detailed References (+11 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.08
Nodes (32): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+24 more)

### Community 30 - "TooltipButtonTemplate.tsx"
Cohesion: 0.26
Nodes (7): Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

### Community 31 - "PublicNavbar.tsx"
Cohesion: 0.22
Nodes (7): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger(), publicNav

### Community 32 - "Customization & Theming"
Cohesion: 0.14
Nodes (14): 1. Built-in variants, 2. Tailwind classes via `className`, 3. Add a new variant, 4. Wrapper components, Adding Custom Colors, Border Radius, Changing the Theme, Checking for Updates (+6 more)

### Community 33 - "ClassroomEmpty.tsx"
Cohesion: 0.22
Nodes (12): EmptyState(), EmptyStateProps, Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants (+4 more)

### Community 34 - "QuizzesInstructorView.tsx"
Cohesion: 0.20
Nodes (11): QuizCardTemplate(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger(), Dashboard(), getMockClassroomQuizzes() (+3 more)

### Community 35 - "materials.ts"
Cohesion: 0.12
Nodes (24): AnalyzerResultItem, InstructorMaterialsProps, QuizEditor(), InstructorMaterials(), getInstructorMaterialsAPI(), getInstructorMaterialsModulesAPI(), getInstructorQuizzesAPI(), getModuleByIdAPI() (+16 more)

### Community 36 - "buttonVariants"
Cohesion: 0.15
Nodes (18): GridListButtonGroupTemplate(), HeroInterfacePreview(), buttonVariants, ClassroomInstructor(), DashboardInstructor(), ModulesInstructor(), QuizzesInstructor(), QuizzesInstructorView() (+10 more)

### Community 37 - "ui/card.tsx"
Cohesion: 0.16
Nodes (18): getInitials(), getRoleConfig(), RoleConfig, UserProfile(), UserProfileProps, Card(), CardAction(), CardContent() (+10 more)

### Community 38 - "instructorRoute.tsx"
Cohesion: 0.15
Nodes (12): suspense(), AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView, DashboardInstructor, ModuleEditor, ModuleReadOnly (+4 more)

### Community 39 - "image-upload-button.tsx"
Cohesion: 0.16
Nodes (16): ImagePlusIcon, SvgProps, IconComponent, IconProps, ImageUploadButton, ImageUploadButtonProps, canInsertImage(), IMAGE_UPLOAD_SHORTCUT_KEY (+8 more)

### Community 40 - "PageWithTitleTemplate.tsx"
Cohesion: 0.19
Nodes (12): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, Popover(), PopoverContent() (+4 more)

### Community 41 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.13
Nodes (22): ClassroomCardTemplate(), HeaderTemplate(), HeaderTemplateProps, SearchInputProps, SearchTemplate(), TooltipButtonTemplate(), ChartConfig, ChartContainer() (+14 more)

### Community 42 - "color-highlight-popover.tsx"
Cohesion: 0.12
Nodes (24): BanIcon, SvgProps, HighlighterIcon, SvgProps, ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), canColorHighlight() (+16 more)

### Community 44 - "Design Critique: FrontAccEase Landing Page"
Cohesion: 0.14
Nodes (13): Design Critique: FrontAccEase Landing Page, Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] Missing WAI-ARIA Tab Semantics in Interactive Tab Lists, [P2] Mobile Visibility Gap for Instructor Preview Tab, [P3] Non-Functional Mockup Action Buttons (+5 more)

### Community 46 - "toast.tsx"
Cohesion: 0.12
Nodes (5): App(), client, Toaster(), TooltipProvider(), RootRouter()

### Community 47 - "ui/badge.tsx"
Cohesion: 0.16
Nodes (12): PourExplorer(), PourPrincipleData, pourPrinciples, PricingBlock(), PricingBlockProps, SectionHeader(), SectionHeaderProps, Badge() (+4 more)

### Community 49 - "publicRoute.tsx"
Cohesion: 0.15
Nodes (12): AboutPage, AccessibilityPage, AccessibilityStatementPage, ContactPage, FeaturesPage, HowItWorksPage, LandingPage, LoginPage (+4 more)

### Community 52 - "modeToggle.tsx"
Cohesion: 0.07
Nodes (22): ModeToggle(), ModeToggleProps, disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES (+14 more)

### Community 53 - "SignUpPage.tsx"
Cohesion: 0.14
Nodes (14): LoginPage(), Field(), FieldDescription(), FieldError(), FieldGroup(), fieldVariants, Input(), Spinner() (+6 more)

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
Cohesion: 0.13
Nodes (17): DetailSkeleton(), GridSkeleton(), TableSkeleton(), Skeleton(), AnalyzerLogsClassroomView, AnalyzerLogsSchoolAdmin, ClassroomInstructorView, CoreModulesView (+9 more)

### Community 59 - "Instruments.tsx"
Cohesion: 0.24
Nodes (8): Textarea(), wcagCriteria, WCAGCriterion, WCAGGuideline, wcagGuidelines, WCAGLevel, WCAGPrinciple, WCAGTechnique

### Community 61 - "CoreModulesView.tsx"
Cohesion: 0.13
Nodes (11): Item(), ItemActions(), ItemContent(), ItemMedia(), itemMediaVariants, ItemTitle(), itemVariants, Label() (+3 more)

### Community 65 - "useIsMobile"
Cohesion: 0.23
Nodes (11): react, react, CalendarDayButton(), getSidebarState(), SidebarMenuSkeleton(), SidebarProvider(), getServerSnapshot(), getSnapshot() (+3 more)

### Community 67 - "rootRouter.tsx"
Cohesion: 0.22
Nodes (8): RootLayout(), ErrorBoundary(), NotFound(), instructorRoute, learnerRoute, publicRoute, router, schoolAdminRoute

### Community 68 - "Q: Add elapsed time in webLLM.ts"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Add elapsed time in webLLM.ts, Source Nodes

### Community 69 - "dependencies"
Cohesion: 0.15
Nodes (13): axios, @floating-ui/react, dependencies, axios, @floating-ui/react, @radix-ui/react-popover, recharts, rehype-highlight (+5 more)

### Community 70 - "ui/button.tsx"
Cohesion: 0.15
Nodes (10): LearnerQuizCardTemplate(), ViewMode, ViewToggleProps, Button(), Calendar(), DatePickerProps, ModuleReadOnly(), ReadOnlyProps (+2 more)

### Community 77 - "materialsCRUDAPI.ts"
Cohesion: 0.31
Nodes (7): LearnerQuizView(), createSubmissionTicket(), updateSubmissionTicket(), getAllInstructorsAPI(), api, staleTime, useInstructors()

### Community 78 - "link-popover.tsx"
Cohesion: 0.10
Nodes (23): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, LinkIcon, SvgProps, SvgProps, TrashIcon (+15 more)

### Community 79 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 94 - "shadcn CLI Reference"
Cohesion: 0.40
Nodes (5): Contents, Presets, shadcn CLI Reference, Switching Presets, Templates

### Community 96 - "Icons"
Cohesion: 0.40
Nodes (4): Icons, Icons in Button use data-icon attribute, No sizing classes on icons inside components, Pass icons as component objects, not string keys

### Community 97 - "Q: Fix production build errors caused by stale const/data imports"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: Fix production build errors caused by stale const/data imports, Source Nodes

### Community 98 - "date-time-picker.tsx"
Cohesion: 0.11
Nodes (9): DateTimePicker(), DateTimePickerProps, FieldLabel(), InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants (+1 more)

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

### Community 124 - "learnerRoute.tsx"
Cohesion: 0.15
Nodes (12): Analyzer, AnalyzerExtension, AnalyzerResults, Chat, Classroom, CoreModuleReadOnly, CoreModulesView, Dashboard (+4 more)

### Community 127 - "parseShortcutKeys"
Cohesion: 0.08
Nodes (27): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+19 more)

### Community 128 - "package.json"
Cohesion: 0.29
Nodes (6): allowScripts, @parcel/watcher@2.6.0, name, private, type, version

### Community 129 - "UserHeader.tsx"
Cohesion: 0.50
Nodes (3): Logo(), LogoProps, UserHeader()

### Community 130 - "ProtectedLayout.tsx"
Cohesion: 0.23
Nodes (10): instructorNav, learnerNav, schoolAdminNav, User, UserRole, AuthLayout(), linksByRole, ProtectedLayout() (+2 more)

## Knowledge Gaps
- **545 isolated node(s):** `Answer`, `Outcome`, `Source Nodes`, `Answer`, `Outcome` (+540 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `useIsMobile` to `ClassroomEmpty.tsx`, `date-time-picker.tsx`, `dependencies`, `AnalyzerLogsSchoolAdmin.tsx`, `chart.tsx`, `sidebar.tsx`, `modeToggle.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`, `@base-ui/react`, `class-variance-authority`, `input-otp`, `@shadcn/react`, `survey-core`, `@tiptap/react`, `@mlc-ai/web-llm`, `survey-creator-react`, `cmdk`, `lodash.throttle`, `react-router-dom`, `@tiptap/extension-find-and-replace`, `remark-gfm`, `tw-animate-css`, `@tiptap/extension-subscript`, `@tiptap/extensions`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-text-align`, `date-fns`, `useIsMobile`, `@fontsource-variable/roboto`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `cn`, `@tiptap/starter-kit`, `lucide-react`, `@tiptap/extension-typography`, `clsx`, `react-markdown`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `UserHeader.tsx`, `AnalyzerResults.tsx`, `Chat.tsx`, `Permissions.tsx`, `sidebar.tsx`, `ModuleEditor.tsx`, `attachment.tsx`, `ModuleCardTemplate.tsx`, `QuizEditor.tsx`, `Analyzer.tsx`, `TooltipButtonTemplate.tsx`, `PublicNavbar.tsx`, `ClassroomEmpty.tsx`, `QuizzesInstructorView.tsx`, `buttonVariants`, `ui/card.tsx`, `PageWithTitleTemplate.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `toast.tsx`, `modeToggle.tsx`, `SignUpPage.tsx`, `Instruments.tsx`, `CoreModulesView.tsx`, `date-time-picker.tsx`, `message-scroller.tsx`?**
  _High betweenness centrality (0.064) - this node is a cross-community bridge._
- **What connects `Answer`, `Outcome`, `Source Nodes` to the rest of the system?**
  _545 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._
- **Should `AnalyzerResults.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14619883040935672 - nodes in this community are weakly interconnected._
- **Should `simple-editor.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0746031746031746 - nodes in this community are weakly interconnected._