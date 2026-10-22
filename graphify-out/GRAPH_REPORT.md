# Graph Report - react  (2026-10-23)

## Corpus Check
- 353 files · ~175,401 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1964 nodes · 4578 edges · 175 communities (109 shown, 66 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.76)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `37b73c06`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- parseShortcutKeys
- SignUpPage.tsx
- use-heading.ts
- use-list.ts
- materialsGETAPI.ts
- link-popover.tsx
- tiptap-utils.ts
- use-text-align.ts
- QuizEditor.tsx
- sidebar.tsx
- isNodeTypeSelected
- Permissions.tsx
- use-mark.ts
- search-and-replace.tsx
- AnalyzerLogsSchoolAdmin.tsx
- CoreModuleLessonView.tsx
- AnalyzerExtension.tsx
- simple-editor.tsx
- compilerOptions
- components.json
- toast.tsx
- theme-provider.tsx
- image-upload-node.tsx
- PageSkeleton.tsx
- use-search-and-replace.ts
- input-group/input-group.tsx
- compilerOptions
- ui/button.tsx
- use-undo-redo.ts
- materials.ts
- materialsCRUDAPI.ts
- moduleProps.ts
- AnalyzerResults.tsx
- CoreModulesView.tsx
- shadcn/ui
- ClassroomEmpty.tsx
- use-image-upload.ts
- ProtectedLayout.tsx
- use-composed-ref.ts
- Analyzer.tsx
- userProps.ts
- toolbar.tsx
- instructorRoute.tsx
- cn
- rootRouter.tsx
- Customization & Theming
- Design Critique: FrontAccEase Landing Page
- Critique Snapshot: `src/pages/learner/Classroom.tsx`
- use-color-highlight.ts
- learnerRoute.tsx
- publicRoute.tsx
- Component Composition
- Styling & Customization
- useIsMobile
- item.tsx
- useTiptapEditor
- Commands
- Tools
- EditorShortcutGuide.tsx
- color-highlight-popover.tsx
- analyzerProps.ts
- Button
- attachment.tsx
- devDependencies
- schoolAdminRoute.tsx
- AnalyzerLogsClassroomView.tsx
- pdfExport.ts
- globals
- QuizzesInstructorView.tsx
- SKILL.md
- Registry Authoring and Addresses
- Base vs Radix
- Chat & Messaging
- 2026-09-26T12-28-39Z__src-pages-learner-dashboard-tsx.md
- Impeccable Critique: `src/pages/learner/Classroom.tsx`
- quizProps.ts
- Instruments.tsx
- Forms & Inputs
- @tiptap/extensions
- Critical Rules
- prettier-plugin-tailwindcss
- package.json
- scripts
- bubble.tsx
- DeleteArchiveDialog.tsx
- Chat.tsx
- criterion.ts
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
- cmdk
- dependencies
- Button
- cn
- date-fns
- use-element-rect.ts
- @tiptap/extension-list
- shadcn
- image-upload-node-extension.ts
- react-day-picker
- lodash.throttle
- lucide-react
- @mlc-ai/web-llm
- eslint-plugin-react-hooks
- @tiptap/extension-subscript
- ui/button-group.tsx
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
- LearningMaterials.tsx
- ModuleEditor.tsx
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
- clsx
- survey-react-ui
- Analyzer
- prettier
- miscellaneousProps.ts
- text-align-button.tsx
- @base-ui/react
- @eslint/js

## God Nodes (most connected - your core abstractions)
1. `Button()` - 57 edges
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

## Communities (175 total, 66 thin omitted)

### Community 0 - "parseShortcutKeys"
Cohesion: 0.07
Nodes (34): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CodeBlockShortcutBadge() (+26 more)

### Community 1 - "SignUpPage.tsx"
Cohesion: 0.12
Nodes (16): Logo(), LogoProps, UserHeader(), LoginPage(), Field(), FieldDescription(), FieldError(), FieldGroup() (+8 more)

### Community 2 - "use-heading.ts"
Cohesion: 0.09
Nodes (27): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+19 more)

### Community 3 - "use-list.ts"
Cohesion: 0.14
Nodes (24): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+16 more)

### Community 4 - "materialsGETAPI.ts"
Cohesion: 0.16
Nodes (15): Props, ClassroomContentProps, ClassroomProps, ClassroomViewProps, InstructorMaterialsCountProps, CoreModuleActivityResponse, CoreModuleProgressProps, ModuleProps (+7 more)

### Community 5 - "link-popover.tsx"
Cohesion: 0.10
Nodes (18): CornerDownLeftIcon, SvgProps, LinkIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkContent() (+10 more)

### Community 6 - "tiptap-utils.ts"
Cohesion: 0.10
Nodes (23): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton() (+15 more)

### Community 7 - "use-text-align.ts"
Cohesion: 0.15
Nodes (16): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+8 more)

### Community 8 - "QuizEditor.tsx"
Cohesion: 0.17
Nodes (26): QuestionElement, QuestionType, QuizPage, AnswerKey, QUESTION_TYPE_OPTIONS, QuizEditorContent(), stitchCorrectAnswer(), stripCorrectAnswers() (+18 more)

### Community 9 - "sidebar.tsx"
Cohesion: 0.10
Nodes (18): UserSidebar(), UserSidebarProps, useTheme(), Sidebar(), SidebarContent(), SidebarContext, SidebarContextProps, SidebarFooter() (+10 more)

### Community 10 - "isNodeTypeSelected"
Cohesion: 0.23
Nodes (19): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+11 more)

### Community 11 - "Permissions.tsx"
Cohesion: 0.11
Nodes (23): EditorDropdown(), QuizCardTemplateProps, ActionType, QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger() (+15 more)

### Community 12 - "use-mark.ts"
Cohesion: 0.10
Nodes (23): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+15 more)

### Community 13 - "search-and-replace.tsx"
Cohesion: 0.09
Nodes (20): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+12 more)

### Community 14 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.07
Nodes (41): SearchTemplate(), Avatar(), AvatarFallback(), AvatarImage(), ChartConfig, ChartContainer(), ChartContext, ChartContextProps (+33 more)

### Community 15 - "CoreModuleLessonView.tsx"
Cohesion: 0.21
Nodes (12): PourContent(), buttonTypes, LessonButton, LessonButtonAttributes, buttonNode(), normalizeLessonContent(), normalizeNode(), normalizeText() (+4 more)

### Community 16 - "AnalyzerExtension.tsx"
Cohesion: 0.21
Nodes (7): ModeToggle(), ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue()

### Community 17 - "simple-editor.tsx"
Cohesion: 0.13
Nodes (14): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), Spacer(), SpacerOrientation (+6 more)

### Community 18 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 19 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 20 - "toast.tsx"
Cohesion: 0.12
Nodes (5): App(), client, Toaster(), TooltipProvider(), RootRouter()

### Community 21 - "theme-provider.tsx"
Cohesion: 0.25
Nodes (10): disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES, ThemeProvider(), ThemeProviderContext (+2 more)

### Community 22 - "image-upload-node.tsx"
Cohesion: 0.14
Nodes (10): CloseIcon, SvgProps, FileItem, generateUUID(), ImageUploadDragAreaProps, ImageUploadNode(), ImageUploadPreviewProps, UploadOptions (+2 more)

### Community 23 - "PageSkeleton.tsx"
Cohesion: 0.39
Nodes (4): PublicFooter(), PageSkeleton(), UserSkeleton(), PublicLayout()

### Community 24 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 25 - "input-group/input-group.tsx"
Cohesion: 0.16
Nodes (10): InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), InputGroupText(), InputGroupTextarea() (+2 more)

### Community 26 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 27 - "ui/button.tsx"
Cohesion: 0.13
Nodes (20): HeroInterfacePreview(), PourExplorer(), PourPrincipleData, pourPrinciples, PricingBlock(), PricingBlockProps, SectionHeader(), SectionHeaderProps (+12 more)

### Community 28 - "use-undo-redo.ts"
Cohesion: 0.15
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, HistoryShortcutBadge(), UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction() (+8 more)

### Community 29 - "materials.ts"
Cohesion: 0.09
Nodes (33): QuizEditor(), CoreModuleInteractiveView(), AnalyzerLogsClassroomView(), buildFallbackScanResult(), AnalyzerLogsInstructorWithQuery(), answerCoreInteractiveActivityAPI(), completeCoreActivityAPI(), createAnalyzerCommentById() (+25 more)

### Community 30 - "materialsCRUDAPI.ts"
Cohesion: 0.25
Nodes (7): LearnerQuizView(), AnswerCoreInteractivePayload, createSubmissionTicket(), saveAnalyzerResultAPI(), SubmitCoreAssessmentPayload, updateSubmissionTicket(), updateWCAGInstruments()

### Community 31 - "moduleProps.ts"
Cohesion: 0.07
Nodes (35): coreModules, ActivityLockedResponse, CoreLessonsProps, CoreModuleActivityContent, CoreModuleActivityItemProps, CoreModuleAssessmentActivity, CoreModuleCompletionItemProps, CoreModuleInteractiveActivity (+27 more)

### Community 32 - "AnalyzerResults.tsx"
Cohesion: 0.10
Nodes (23): AnalyzerResultsProps, Content, WcagEvaluationProps, copyText(), CopyTextParams, AnalyzerResults(), capitalize(), convertWcagEvaluationToResult() (+15 more)

### Community 33 - "CoreModulesView.tsx"
Cohesion: 0.10
Nodes (19): Progress(), ProgressLabel(), ProgressValue(), CoreModuleProgressItemProps, NextActivityProps, NotFound(), CoreModuleActivityItem, CoreModuleCompletionItem (+11 more)

### Community 34 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 35 - "ClassroomEmpty.tsx"
Cohesion: 0.19
Nodes (14): EmptyStateProps, Empty(), EmptyContent(), EmptyDescription(), EmptyHeader(), EmptyMedia(), emptyMediaVariants, EmptyTitle() (+6 more)

### Community 36 - "use-image-upload.ts"
Cohesion: 0.24
Nodes (11): ImagePlusIcon, SvgProps, canInsertImage(), IMAGE_UPLOAD_SHORTCUT_KEY, insertImage(), isImageActive(), shouldShowButton(), useImageUpload() (+3 more)

### Community 37 - "ProtectedLayout.tsx"
Cohesion: 0.15
Nodes (15): ErrorOne(), ErrorOneProps, PublicNavbar(), instructorNav, learnerNav, publicNav, schoolAdminNav, UserRole (+7 more)

### Community 38 - "use-composed-ref.ts"
Cohesion: 0.67
Nodes (3): updateRef(), useComposedRef(), UserRef

### Community 39 - "Analyzer.tsx"
Cohesion: 0.14
Nodes (17): ScanHistory, PopoverHeader(), PopoverTitle(), AnalyzerResultItem, PrincipleItem, Result, AnalyzerPDFExportOptions, steps (+9 more)

### Community 40 - "userProps.ts"
Cohesion: 0.31
Nodes (7): UserProps, uploadProfileImage, getAllInstructorsAPI(), api, staleTime, useInstructors(), useUploadProfileImage()

### Community 41 - "toolbar.tsx"
Cohesion: 0.19
Nodes (10): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), MenuNavigationOptions (+2 more)

### Community 42 - "instructorRoute.tsx"
Cohesion: 0.13
Nodes (14): suspense(), AnalyzerLogsClassroomView, AnalyzerLogsInstructor, ClassroomInstructor, ClassroomInstructorView, DashboardInstructor, ModuleEditor, ModuleReadOnly (+6 more)

### Community 43 - "cn"
Cohesion: 0.15
Nodes (14): CheckIcon, SvgProps, DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem() (+6 more)

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

### Community 48 - "use-color-highlight.ts"
Cohesion: 0.24
Nodes (13): HighlighterIcon, SvgProps, ColorHighlightButtonProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive() (+5 more)

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
Cohesion: 0.18
Nodes (4): Item(), ItemMedia(), itemMediaVariants, itemVariants

### Community 55 - "useTiptapEditor"
Cohesion: 0.24
Nodes (8): HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig, ListDropdownMenu, ListDropdownMenuImpl(), DropdownMenu(), DropdownMenuTrigger(), useTiptapEditor()

### Community 56 - "Commands"
Cohesion: 0.12
Nodes (17): `add` — Add components, `apply` — Apply a preset to an existing project, `build` — Build a custom registry, Commands, Contents, `diff` — Check for updates, `docs` — Get component documentation URLs, Dry-Run Mode (+9 more)

### Community 57 - "Tools"
Cohesion: 0.17
Nodes (11): Configuring Registries, Setup, `shadcn:get_add_command_for_items`, `shadcn:get_audit_checklist`, `shadcn:get_item_examples_from_registries`, `shadcn:get_project_registries`, `shadcn:list_items_in_registries`, shadcn MCP Server (+3 more)

### Community 58 - "EditorShortcutGuide.tsx"
Cohesion: 0.18
Nodes (11): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger(), CATEGORIES, EditorShortcutGuideProps (+3 more)

### Community 59 - "color-highlight-popover.tsx"
Cohesion: 0.11
Nodes (17): BanIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopover(), ColorHighlightPopoverButton, ColorHighlightPopoverContentProps, ColorHighlightPopoverProps (+9 more)

### Community 60 - "analyzerProps.ts"
Cohesion: 0.10
Nodes (19): mockClassroomAnalyzerLogsDetail, AnalyzerSummaryProps, AnalyzerUsageDay, ClassroomAnalyzerLogsDetailResponse, ClassroomScanDetailItem, ClassroomScanItem, Criterion, IssuesPerPrinciple (+11 more)

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
Cohesion: 0.13
Nodes (14): AnalyzerLogsClassroomView, AnalyzerLogsSchoolAdmin, ClassroomInstructorView, DashboardSchoolAdmin, InstructorMaterials, InstructorMaterialsView, Instruments, LearningMaterials (+6 more)

### Community 65 - "AnalyzerLogsClassroomView.tsx"
Cohesion: 0.15
Nodes (21): ClassroomCardTemplate(), LearnerQuizCardTemplate(), ModuleCardTemplate(), ModuleCardTemplateProps, QuizCardTemplate(), Card(), CardAction(), CardContent() (+13 more)

### Community 66 - "pdfExport.ts"
Cohesion: 0.25
Nodes (10): jspdf, jspdf, PrincipleIssue, PrinciplePassed, applyPageNumbersAndFooters(), exportAnalyzerReportToPDF(), exportTableToPDF(), GenericPDFExportOptions (+2 more)

### Community 68 - "QuizzesInstructorView.tsx"
Cohesion: 0.11
Nodes (22): EmptyState(), GridListButtonGroupTemplate(), HeaderTemplate(), TooltipButtonTemplate(), QuizSubmissionsCardTemplate(), Tabs(), TabsContent(), TabsList() (+14 more)

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
Cohesion: 0.14
Nodes (20): LearnerQuizCardTemplateProps, InstructorQuizClassroom, InstructorQuizLearner, QuizAnswerKey, QuizClassroom, QuizLearner, QuizProps, QuizSubmissionAnswerKey (+12 more)

### Community 76 - "Instruments.tsx"
Cohesion: 0.33
Nodes (9): BrowseGuidelinesContent(), compareCriterionNum(), Instruments(), parseInstrument(), PRINCIPLES, renderContentBody(), getWCAGInstruments(), useUpdateWCAGInstrument() (+1 more)

### Community 77 - "Forms & Inputs"
Cohesion: 0.25
Nodes (8): Buttons inside inputs use InputGroup + InputGroupAddon, Contents, Field validation and disabled states, FieldSet + FieldLegend for grouping related fields, Forms & Inputs, Forms use FieldGroup + Field, InputGroup requires InputGroupInput/InputGroupTextarea, Option sets (2–7 choices) use ToggleGroup

### Community 79 - "Critical Rules"
Cohesion: 0.25
Nodes (8): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Forms & Inputs → [forms.md](./rules/forms.md), Icons → [icons.md](./rules/icons.md), Styling & Tailwind → [styling.md](./rules/styling.md), Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

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
Cohesion: 0.11
Nodes (22): LearnerQuizHistoryCardTemplate(), LearnerQuizHistoryCardTemplateProps, DeleteArchiveDialog(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter() (+14 more)

### Community 87 - "Chat.tsx"
Cohesion: 0.24
Nodes (10): Props, ToolTipTemplateProps, RichText(), RichTextProps, Tooltip(), TooltipContent(), TooltipTrigger(), Chat() (+2 more)

### Community 88 - "criterion.ts"
Cohesion: 0.25
Nodes (7): wcagCriteria, WCAGCriterion, WCAGGuideline, wcagGuidelines, WCAGLevel, WCAGPrinciple, WCAGTechnique

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

### Community 104 - "Button"
Cohesion: 0.08
Nodes (23): HeaderTemplateProps, BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, SearchInputProps (+15 more)

### Community 108 - "use-element-rect.ts"
Cohesion: 0.23
Nodes (11): ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect(), useRefRect(), defaultOptions (+3 more)

### Community 111 - "image-upload-node-extension.ts"
Cohesion: 0.33
Nodes (4): Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction

### Community 118 - "ui/button-group.tsx"
Cohesion: 0.38
Nodes (3): ButtonGroup(), buttonGroupVariants, Separator()

### Community 144 - "LearningMaterials.tsx"
Cohesion: 0.33
Nodes (4): CurriculumPrinciple, LearningMaterials(), getCurriculumAPI(), useCurriculum()

### Community 145 - "ModuleEditor.tsx"
Cohesion: 0.29
Nodes (9): Checkbox(), EditorShortcutGuide(), formatDraftDate(), formatTime(), ModuleEditor(), UsePromptProps, useUnmount(), isMac() (+1 more)

### Community 169 - "Analyzer"
Cohesion: 0.33
Nodes (7): Analyzer(), AnalyzerExtension(), createExtensionScanAPI(), getExtensionScanAPI(), useAnalyzerLogsByLearner(), useCreateExtensionScan(), useExtensionScan()

### Community 171 - "miscellaneousProps.ts"
Cohesion: 0.40
Nodes (4): instrumentsData, ChatMessage, InstrumentProps, ParsedInstrument

### Community 172 - "text-align-button.tsx"
Cohesion: 0.25
Nodes (7): IconComponent, IconProps, TextAlignButton, TextAlignButtonProps, TextAlignShortcutBadge(), TEXT_ALIGN_SHORTCUT_KEYS, UseTextAlignConfig

## Knowledge Gaps
- **592 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+587 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **66 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `@shadcn/react`, `survey-core`, `survey-creator-react`, `@radix-ui/react-popover`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `recharts`, `@tiptap/extension-typography`, `@tiptap/pm`, `@tiptap/react`, `@tiptap/starter-kit`, `tw-animate-css`, `clsx`, `survey-react-ui`, `@base-ui/react`, `useIsMobile`, `pdfExport.ts`, `@tiptap/extensions`, `package.json`, `remark-gfm`, `class-variance-authority`, `@tiptap/extension-image`, `@fontsource-variable/roboto`, `cmdk`, `cn`, `date-fns`, `@tiptap/extension-list`, `shadcn`, `react-day-picker`, `lodash.throttle`, `lucide-react`, `@mlc-ai/web-llm`, `@tiptap/extension-subscript`, `react-dom`, `react-hotkeys-hook`, `react-icons`, `react-router-dom`, `@tiptap/extension-superscript`, `@tiptap/extension-text-align`, `@floating-ui/react`, `jspdf-autotable`?**
  _High betweenness centrality (0.142) - this node is a cross-community bridge._
- **Why does `react` connect `useIsMobile` to `ClassroomEmpty.tsx`, `dependencies`, `sidebar.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `theme-provider.tsx`?**
  _High betweenness centrality (0.129) - this node is a cross-community bridge._
- **Why does `Button()` connect `Button` to `SignUpPage.tsx`, `QuizEditor.tsx`, `sidebar.tsx`, `Permissions.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `CoreModuleLessonView.tsx`, `AnalyzerExtension.tsx`, `ModuleEditor.tsx`, `toast.tsx`, `ui/button.tsx`, `moduleProps.ts`, `AnalyzerResults.tsx`, `CoreModulesView.tsx`, `ClassroomEmpty.tsx`, `Analyzer.tsx`, `EditorShortcutGuide.tsx`, `attachment.tsx`, `AnalyzerLogsClassroomView.tsx`, `QuizzesInstructorView.tsx`, `Instruments.tsx`, `DeleteArchiveDialog.tsx`, `message-scroller.tsx`, `Chat.tsx`?**
  _High betweenness centrality (0.059) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _592 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `parseShortcutKeys` be split into smaller, more focused modules?**
  _Cohesion score 0.06560283687943262 - nodes in this community are weakly interconnected._
- **Should `SignUpPage.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.12169312169312169 - nodes in this community are weakly interconnected._
- **Should `use-heading.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09246088193456614 - nodes in this community are weakly interconnected._