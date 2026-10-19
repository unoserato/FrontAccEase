# Graph Report - react  (2026-10-18)

## Corpus Check
- 339 files · ~157,070 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1860 nodes · 4308 edges · 164 communities (96 shown, 68 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4caf4653`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- useTiptapEditor
- ClassroomEmpty.tsx
- use-heading.ts
- use-list.ts
- materials.ts
- Permissions.tsx
- QuizEditor.tsx
- ui/button.tsx
- field.tsx
- sidebar.tsx
- materialProps.ts
- tiptap-utils.ts
- use-mark.ts
- search-and-replace.tsx
- Button
- heading-dropdown-menu.tsx
- ModuleEditor.tsx
- Analyzer.tsx
- compilerOptions
- components.json
- use-element-rect.ts
- CoreModulesView.tsx
- image-upload-node.tsx
- DeleteArchiveDialog.tsx
- use-text-align.ts
- use-search-and-replace.ts
- compilerOptions
- ui/card.tsx
- isNodeTypeSelected
- ui/button-group.tsx
- toast.tsx
- AnalyzerResults.tsx
- date-time-picker.tsx
- shadcn/ui
- eslint
- surveyModel.ts
- modeToggle.tsx
- simple-editor.tsx
- color-highlight-popover.tsx
- link-popover.tsx
- Chat.tsx
- instructorRoute.tsx
- cn
- rootRouter.tsx
- Customization & Theming
- Design Critique: FrontAccEase Landing Page
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- PageWithTitleTemplate.tsx
- learnerRoute.tsx
- publicRoute.tsx
- Component Composition
- Styling & Customization
- useIsMobile
- Instruments.tsx
- auth-04.tsx
- Commands
- Tools
- PublicNavbar.tsx
- use-image-upload.ts
- pdfExport.ts
- button/button.tsx
- attachment.tsx
- devDependencies
- schoolAdminRoute.tsx
- QuizzesInstructorView.tsx
- clsx
- theme-provider.tsx
- toolbar.tsx
- SKILL.md
- Registry Authoring and Addresses
- Base vs Radix
- Chat & Messaging
- 2026-09-26T12-28-39Z__src-pages-learner-dashboard-tsx.md
- Impeccable Critique: `src/pages/learner/Classroom.tsx`
- ProtectedLayoutNoSidebar.tsx
- axios
- Forms & Inputs
- @tiptap/extensions
- Critical Rules
- chart.tsx
- package.json
- scripts
- bubble.tsx
- @eslint/js
- ProtectedLayout.tsx
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
- @base-ui/react
- class-variance-authority
- dependencies
- theme-toggle.tsx
- cn
- date-fns
- @tiptap/extension-list
- shadcn
- globals
- lodash.throttle
- lucide-react
- @mlc-ai/web-llm
- ViewToggle.tsx
- @tiptap/extension-subscript
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
- eslint-plugin-react-hooks

## God Nodes (most connected - your core abstractions)
1. `Button()` - 57 edges
2. `buttonVariants` - 52 edges
3. `Badge()` - 45 edges
4. `useTiptapEditor()` - 43 edges
5. `cn()` - 37 edges
6. `Card()` - 35 edges
7. `HeaderTemplate()` - 26 edges
8. `CardContent()` - 23 edges
9. `CardHeader()` - 22 edges
10. `QuizEditorContent()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `ChartContainer()` --references--> `react`  [EXTRACTED]
  src/components/ui/chart.tsx → package.json
- `InputOTPSlot()` --references--> `react`  [EXTRACTED]
  src/components/ui/input-otp.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json

## Import Cycles
- None detected.

## Communities (164 total, 68 thin omitted)

### Community 0 - "useTiptapEditor"
Cohesion: 0.09
Nodes (38): BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButtonProps, CodeBlockShortcutBadge(), CODE_BLOCK_SHORTCUT_KEY, UseCodeBlockConfig (+30 more)

### Community 1 - "ClassroomEmpty.tsx"
Cohesion: 0.19
Nodes (14): EmptyStateProps, Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle() (+6 more)

### Community 2 - "use-heading.ts"
Cohesion: 0.10
Nodes (33): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps (+25 more)

### Community 3 - "use-list.ts"
Cohesion: 0.12
Nodes (26): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+18 more)

### Community 4 - "materials.ts"
Cohesion: 0.09
Nodes (33): CoreModuleActivityContent, CoreModuleProgressProps, QuizAnswer, QuizEditor(), CoreModuleReadOnly(), Analyzer(), InstructorMaterials(), submitCoreAssessmentActivityAPI() (+25 more)

### Community 5 - "Permissions.tsx"
Cohesion: 0.10
Nodes (24): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage() (+16 more)

### Community 6 - "QuizEditor.tsx"
Cohesion: 0.15
Nodes (28): Checkbox(), QuestionElement, QuestionType, QuizJson, QuizPage, AnswerKey, QUESTION_TYPE_OPTIONS, QuizEditorContent() (+20 more)

### Community 7 - "ui/button.tsx"
Cohesion: 0.14
Nodes (19): HeroInterfacePreview(), PourExplorer(), PourPrincipleData, pourPrinciples, PricingBlock(), PricingBlockProps, SectionHeader(), SectionHeaderProps (+11 more)

### Community 8 - "field.tsx"
Cohesion: 0.20
Nodes (5): Field(), FieldDescription(), FieldError(), fieldVariants, Separator()

### Community 9 - "sidebar.tsx"
Cohesion: 0.11
Nodes (17): UserSidebar(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter(), SidebarGroup(), SidebarHeader() (+9 more)

### Community 10 - "materialProps.ts"
Cohesion: 0.08
Nodes (25): coreModules, ClassroomViewProps, CoreLessonsProps, CoreModuleLessonActivity, CoreModuleLessonDetail, CoreModuleScenario, CoreModuleScenarioChoice, CoreModulesProps (+17 more)

### Community 11 - "tiptap-utils.ts"
Cohesion: 0.11
Nodes (22): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton() (+14 more)

### Community 12 - "use-mark.ts"
Cohesion: 0.09
Nodes (24): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+16 more)

### Community 13 - "search-and-replace.tsx"
Cohesion: 0.07
Nodes (25): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+17 more)

### Community 14 - "Button"
Cohesion: 0.11
Nodes (29): EmptyState(), GridListButtonGroupTemplate(), HeaderTemplate(), HeaderTemplateProps, SearchInputProps, SearchTemplate(), TooltipButtonTemplate(), ToolTipTemplateProps (+21 more)

### Community 15 - "heading-dropdown-menu.tsx"
Cohesion: 0.14
Nodes (17): HeadingIcon, SvgProps, HeadingButton, HeadingButtonProps, HeadingShortcutBadge(), HEADING_SHORTCUT_KEYS, headingIcons, isHeadingActive() (+9 more)

### Community 16 - "ModuleEditor.tsx"
Cohesion: 0.16
Nodes (20): LearnerQuizHistoryCardTemplate(), LearnerQuizHistoryCardTemplateProps, Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+12 more)

### Community 17 - "Analyzer.tsx"
Cohesion: 0.18
Nodes (14): ScanHistory, AnalyzerResultItem, PrincipleItem, Result, steps, compileWebLLMResults(), ExtensionScanSession, normalizedPrinciple() (+6 more)

### Community 18 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 19 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 20 - "use-element-rect.ts"
Cohesion: 0.18
Nodes (15): CursorVisibilityOptions, useCursorVisibility(), ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect() (+7 more)

### Community 21 - "CoreModulesView.tsx"
Cohesion: 0.20
Nodes (11): CoreModulesView(), EarnedBagdes(), getActivityDescription(), getActivityIcon(), getActivityKindLabel(), getActivityLink(), ContinueLearningCard(), CoreModuleCardTemplate() (+3 more)

### Community 22 - "image-upload-node.tsx"
Cohesion: 0.11
Nodes (13): CloseIcon, SvgProps, Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction, FileItem, ImageUploadDragAreaProps (+5 more)

### Community 23 - "DeleteArchiveDialog.tsx"
Cohesion: 0.12
Nodes (20): EditorDropdown(), LearnerQuizCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Props, DropdownMenu(), DropdownMenuContent() (+12 more)

### Community 24 - "use-text-align.ts"
Cohesion: 0.12
Nodes (19): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+11 more)

### Community 25 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 26 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 27 - "ui/card.tsx"
Cohesion: 0.22
Nodes (15): ModuleCardTemplateProps, getInitials(), getRoleConfig(), RoleConfig, UserProfile(), Card(), CardAction(), CardContent() (+7 more)

### Community 28 - "isNodeTypeSelected"
Cohesion: 0.16
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButtonProps, canExecuteUndoRedoAction(), executeUndoRedoAction() (+8 more)

### Community 31 - "toast.tsx"
Cohesion: 0.11
Nodes (12): toast, CoreModuleAssessmentActivity, CoreModuleInteractiveActivity, CoreModuleAssessmentView(), CoreModuleAssessmentViewProps, SubmissionResponse, CoreModuleInteractiveView(), CoreModuleInteractiveViewProps (+4 more)

### Community 32 - "AnalyzerResults.tsx"
Cohesion: 0.13
Nodes (17): DatePickerProps, Popover(), PopoverContent(), PopoverDescription(), PopoverHeader(), PopoverTitle(), PopoverTrigger(), AnalyzerResults() (+9 more)

### Community 33 - "date-time-picker.tsx"
Cohesion: 0.10
Nodes (11): Calendar(), CalendarDayButton(), DateTimePickerProps, FieldGroup(), InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton() (+3 more)

### Community 34 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 36 - "surveyModel.ts"
Cohesion: 0.22
Nodes (12): QuizForm(), QuizFormProps, clearQuizProgress(), clearQuizProgressByKey(), getQuizProgressKey(), QuizTaker(), QuizTakerProps, createQuizModel() (+4 more)

### Community 37 - "modeToggle.tsx"
Cohesion: 0.18
Nodes (11): ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue(), AnalyzerExtension(), createExtensionScanAPI() (+3 more)

### Community 38 - "simple-editor.tsx"
Cohesion: 0.09
Nodes (19): ArrowLeftIcon, SvgProps, LinkIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor() (+11 more)

### Community 39 - "color-highlight-popover.tsx"
Cohesion: 0.11
Nodes (25): BanIcon, SvgProps, HighlighterIcon, SvgProps, ColorHighlightButton, canColorHighlight(), COLOR_HIGHLIGHT_SHORTCUT_KEY, getHighlightColorValue() (+17 more)

### Community 40 - "link-popover.tsx"
Cohesion: 0.11
Nodes (16): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkContent() (+8 more)

### Community 41 - "Chat.tsx"
Cohesion: 0.13
Nodes (18): Props, RichText(), RichTextProps, Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger(), ChatMessage (+10 more)

### Community 42 - "instructorRoute.tsx"
Cohesion: 0.15
Nodes (12): AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView, DashboardInstructor, ModuleEditor, ModuleReadOnly, ModulesArchivedInstructor (+4 more)

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

### Community 48 - "PageWithTitleTemplate.tsx"
Cohesion: 0.33
Nodes (6): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode

### Community 49 - "learnerRoute.tsx"
Cohesion: 0.14
Nodes (13): suspense(), Analyzer, AnalyzerExtension, AnalyzerResults, Chat, Classroom, CoreModuleReadOnly, CoreModulesView (+5 more)

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
Cohesion: 0.36
Nodes (7): getSidebarState(), SidebarProvider(), getServerSnapshot(), getSnapshot(), subscribe(), useIsMobile(), Instruments()

### Community 54 - "Instruments.tsx"
Cohesion: 0.12
Nodes (13): Item(), ItemActions(), ItemContent(), ItemMedia(), itemMediaVariants, itemVariants, wcagCriteria, WCAGCriterion (+5 more)

### Community 55 - "auth-04.tsx"
Cohesion: 0.21
Nodes (11): UserProfileProps, UserSidebarProps, LoginPage(), UserProps, SignUpPage(), loginAPI(), signupAPI(), getAllInstructorsAPI() (+3 more)

### Community 56 - "Commands"
Cohesion: 0.12
Nodes (17): `add` — Add components, `apply` — Apply a preset to an existing project, `build` — Build a custom registry, Commands, Contents, `diff` — Check for updates, `docs` — Get component documentation URLs, Dry-Run Mode (+9 more)

### Community 57 - "Tools"
Cohesion: 0.17
Nodes (11): Configuring Registries, Setup, `shadcn:get_add_command_for_items`, `shadcn:get_audit_checklist`, `shadcn:get_item_examples_from_registries`, `shadcn:get_project_registries`, `shadcn:list_items_in_registries`, shadcn MCP Server (+3 more)

### Community 58 - "PublicNavbar.tsx"
Cohesion: 0.16
Nodes (10): Logo(), LogoProps, UserHeader(), Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle() (+2 more)

### Community 59 - "use-image-upload.ts"
Cohesion: 0.30
Nodes (9): ImagePlusIcon, SvgProps, canInsertImage(), IMAGE_UPLOAD_SHORTCUT_KEY, insertImage(), isImageActive(), shouldShowButton(), useImageUpload() (+1 more)

### Community 60 - "pdfExport.ts"
Cohesion: 0.23
Nodes (11): jspdf, jspdf, PrincipleIssue, PrinciplePassed, AnalyzerPDFExportOptions, applyPageNumbersAndFooters(), exportAnalyzerReportToPDF(), exportTableToPDF() (+3 more)

### Community 61 - "button/button.tsx"
Cohesion: 0.13
Nodes (14): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps (+6 more)

### Community 62 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 63 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint-plugin-react-refresh, devDependencies, eslint-plugin-react-refresh, prettier, sass-embedded, @shadcn/lint, typescript, prettier (+3 more)

### Community 64 - "schoolAdminRoute.tsx"
Cohesion: 0.13
Nodes (17): DetailSkeleton(), GridSkeleton(), TableSkeleton(), Skeleton(), AnalyzerLogsClassroomView, AnalyzerLogsSchoolAdmin, ClassroomInstructorView, CoreModulesView (+9 more)

### Community 65 - "QuizzesInstructorView.tsx"
Cohesion: 0.08
Nodes (35): ClassroomCardTemplate(), LearnerQuizCardTemplate(), ModuleCardTemplate(), QuizCardTemplate(), QuizSubmissionsCardTemplate(), Tabs(), TabsContent(), TabsList() (+27 more)

### Community 67 - "theme-provider.tsx"
Cohesion: 0.16
Nodes (14): App(), client, disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES (+6 more)

### Community 68 - "toolbar.tsx"
Cohesion: 0.12
Nodes (15): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator(), BaseProps, Toolbar (+7 more)

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

### Community 75 - "ProtectedLayoutNoSidebar.tsx"
Cohesion: 0.31
Nodes (5): ErrorOne(), ErrorOneProps, UserRole, Forbidden(), Unauthorized()

### Community 77 - "Forms & Inputs"
Cohesion: 0.25
Nodes (8): Buttons inside inputs use InputGroup + InputGroupAddon, Contents, Field validation and disabled states, FieldSet + FieldLegend for grouping related fields, Forms & Inputs, Forms use FieldGroup + Field, InputGroup requires InputGroupInput/InputGroupTextarea, Option sets (2–7 choices) use ToggleGroup

### Community 79 - "Critical Rules"
Cohesion: 0.25
Nodes (8): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Forms & Inputs → [forms.md](./rules/forms.md), Icons → [icons.md](./rules/icons.md), Styling & Tailwind → [styling.md](./rules/styling.md), Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

### Community 80 - "chart.tsx"
Cohesion: 0.15
Nodes (15): react, react, ModeToggle(), useTheme(), ChartContext, ChartContextProps, ChartLegendContent(), ChartTooltipContent() (+7 more)

### Community 81 - "package.json"
Cohesion: 0.29
Nodes (6): allowScripts, @parcel/watcher@2.6.0, name, private, type, version

### Community 82 - "scripts"
Cohesion: 0.29
Nodes (7): scripts, build, dev, format, lint, preview, typecheck

### Community 83 - "bubble.tsx"
Cohesion: 0.38
Nodes (4): Bubble(), BubbleReactions(), bubbleReactionsVariants, bubbleVariants

### Community 87 - "ProtectedLayout.tsx"
Cohesion: 0.18
Nodes (13): PublicFooter(), PublicNavbar(), PageSkeleton(), UserSkeleton(), instructorNav, learnerNav, schoolAdminNav, AuthLayout() (+5 more)

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
Nodes (13): input-otp, dependencies, input-otp, @radix-ui/react-dropdown-menu, react-day-picker, react-markdown, rehype-highlight, @tiptap/extension-horizontal-rule (+5 more)

### Community 104 - "theme-toggle.tsx"
Cohesion: 0.32
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

## Knowledge Gaps
- **558 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+553 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **68 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@shadcn/react`, `survey-core`, `survey-creator-react`, `@radix-ui/react-popover`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `recharts`, `@tiptap/extension-typography`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `survey-react-ui`, `pdfExport.ts`, `clsx`, `axios`, `@tiptap/extensions`, `chart.tsx`, `package.json`, `remark-gfm`, `cmdk`, `@tiptap/extension-image`, `@fontsource-variable/roboto`, `@base-ui/react`, `class-variance-authority`, `cn`, `date-fns`, `@tiptap/extension-list`, `shadcn`, `lodash.throttle`, `lucide-react`, `@mlc-ai/web-llm`, `@tiptap/extension-subscript`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `@tiptap/extension-superscript`, `@tiptap/extension-text-align`, `@floating-ui/react`, `jspdf-autotable`?**
  _High betweenness centrality (0.151) - this node is a cross-community bridge._
- **Why does `react` connect `chart.tsx` to `date-time-picker.tsx`, `ClassroomEmpty.tsx`, `theme-provider.tsx`, `dependencies`, `sidebar.tsx`, `Button`, `useIsMobile`?**
  _High betweenness centrality (0.133) - this node is a cross-community bridge._
- **Why does `Button()` connect `Button` to `ClassroomEmpty.tsx`, `Permissions.tsx`, `QuizEditor.tsx`, `ui/button.tsx`, `sidebar.tsx`, `ModuleEditor.tsx`, `Analyzer.tsx`, `CoreModulesView.tsx`, `DeleteArchiveDialog.tsx`, `ui/card.tsx`, `toast.tsx`, `AnalyzerResults.tsx`, `date-time-picker.tsx`, `modeToggle.tsx`, `Chat.tsx`, `PageWithTitleTemplate.tsx`, `Instruments.tsx`, `auth-04.tsx`, `PublicNavbar.tsx`, `attachment.tsx`, `QuizzesInstructorView.tsx`, `message-scroller.tsx`, `ViewToggle.tsx`?**
  _High betweenness centrality (0.067) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _558 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `useTiptapEditor` be split into smaller, more focused modules?**
  _Cohesion score 0.08549019607843138 - nodes in this community are weakly interconnected._
- **Should `use-heading.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1014799154334038 - nodes in this community are weakly interconnected._
- **Should `use-list.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._