# Graph Report - react  (2026-10-06)

## Corpus Check
- 306 files · ~141,091 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1645 nodes · 3635 edges · 159 communities (90 shown, 69 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 16 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `550d6fc0`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- use-mark.ts
- devDependencies
- UserSidebar.tsx
- rootRouter.tsx
- simple-editor.tsx
- use-list.ts
- color-highlight-popover.tsx
- search-and-replace.tsx
- use-blockquote.ts
- use-undo-redo.ts
- button/button.tsx
- compilerOptions
- tiptap-utils.ts
- modeToggle.tsx
- sidebar.tsx
- Instruments.tsx
- attachment.tsx
- components.json
- materialsAPI.ts
- compilerOptions
- error-1.tsx
- data.ts
- cn
- use-element-rect.ts
- isNodeTypeSelected
- use-text-align.ts
- QuizEditor.tsx
- Analyzer.tsx
- shadcn/ui
- use-heading.ts
- Critical Rules
- PublicNavbar.tsx
- Customization & Theming
- item.tsx
- ui/button.tsx
- schoolAdminRoute.tsx
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
- buttonVariants
- @tiptap/extension-image
- use-throttled-callback.ts
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
- ui/button-group.tsx
- @tiptap/extension-text-align
- date-fns
- @floating-ui/react
- @fontsource-variable/roboto
- @tiptap/extensions
- ViewToggle.tsx
- dependencies
- @radix-ui/react-popover
- @radix-ui/react-dropdown-menu
- react-dom
- react-hotkeys-hook
- react-day-picker
- react-icons
- shadcn
- PublicLayout.tsx
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
- cn
- @tiptap/starter-kit
- lucide-react
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
- react-markdown
- button/index.tsx
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
- QuizProps
- App.tsx
- getQuizJson
- spacer.tsx
- class-variance-authority
- cmdk
- lodash.throttle
- react-router-dom
- rehype-highlight
- remark-gfm
- tw-animate-css

## God Nodes (most connected - your core abstractions)
1. `buttonVariants` - 50 edges
2. `Button()` - 48 edges
3. `useTiptapEditor()` - 43 edges
4. `Badge()` - 40 edges
5. `cn()` - 37 edges
6. `Card()` - 34 edges
7. `CardContent()` - 23 edges
8. `CardHeader()` - 22 edges
9. `parseShortcutKeys()` - 22 edges
10. `CardTitle()` - 21 edges

## Surprising Connections (you probably didn't know these)
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `SidebarMenuSkeleton()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `SidebarProvider()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useSidebar()` --references--> `react`  [EXTRACTED]
  src/components/ui/sidebar.tsx → package.json
- `useIsMobile()` --references--> `react`  [EXTRACTED]
  src/hooks/use-mobile.ts → package.json

## Import Cycles
- None detected.

## Communities (159 total, 69 thin omitted)

### Community 0 - "use-mark.ts"
Cohesion: 0.08
Nodes (28): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+20 more)

### Community 1 - "devDependencies"
Cohesion: 0.18
Nodes (11): eslint, eslint-plugin-react-refresh, devDependencies, eslint, eslint-plugin-react-refresh, @tanstack/eslint-plugin-query, @types/lodash.throttle, @vitejs/plugin-react (+3 more)

### Community 2 - "UserSidebar.tsx"
Cohesion: 0.20
Nodes (12): UserSidebar(), UserSidebarProps, SidebarContent(), SidebarFooter(), SidebarGroup(), SidebarHeader(), SidebarMenu(), SidebarMenuItem() (+4 more)

### Community 3 - "rootRouter.tsx"
Cohesion: 0.06
Nodes (34): publicRoute, Analyzer, AnalyzerExtension, AnalyzerLogsClassroomView, AnalyzerLogsInstructor, AnalyzerLogsSchoolAdmin, AnalyzerResults, Chat (+26 more)

### Community 4 - "simple-editor.tsx"
Cohesion: 0.16
Nodes (11): ArrowLeftIcon, SvgProps, HorizontalRule, ImageUploadNode, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), CursorVisibilityOptions, useCursorVisibility() (+3 more)

### Community 5 - "use-list.ts"
Cohesion: 0.11
Nodes (30): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, ListButton, ListButtonProps (+22 more)

### Community 6 - "color-highlight-popover.tsx"
Cohesion: 0.09
Nodes (31): BanIcon, SvgProps, HighlighterIcon, SvgProps, ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), canColorHighlight() (+23 more)

### Community 7 - "search-and-replace.tsx"
Cohesion: 0.08
Nodes (21): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+13 more)

### Community 8 - "use-blockquote.ts"
Cohesion: 0.25
Nodes (16): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+8 more)

### Community 9 - "use-undo-redo.ts"
Cohesion: 0.18
Nodes (12): Redo2Icon, SvgProps, SvgProps, Undo2Icon, canExecuteUndoRedoAction(), executeUndoRedoAction(), historyActionLabels, historyIcons (+4 more)

### Community 10 - "button/button.tsx"
Cohesion: 0.13
Nodes (14): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, Tooltip(), TooltipContent, TooltipContentProps (+6 more)

### Community 11 - "compilerOptions"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 12 - "tiptap-utils.ts"
Cohesion: 0.06
Nodes (34): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY (+26 more)

### Community 13 - "modeToggle.tsx"
Cohesion: 0.06
Nodes (31): react, react, ModeToggle(), ModeToggleProps, disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme (+23 more)

### Community 14 - "sidebar.tsx"
Cohesion: 0.11
Nodes (11): UserHeader(), getSidebarState(), Sidebar(), SidebarContext, SidebarContextProps, SidebarMenuButton(), sidebarMenuButtonVariants, SidebarProvider() (+3 more)

### Community 15 - "Instruments.tsx"
Cohesion: 0.11
Nodes (18): SearchInputProps, SearchTemplate(), InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput() (+10 more)

### Community 16 - "attachment.tsx"
Cohesion: 0.20
Nodes (4): Attachment(), AttachmentMedia(), attachmentMediaVariants, attachmentVariants

### Community 17 - "components.json"
Cohesion: 0.08
Nodes (23): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+15 more)

### Community 18 - "materialsAPI.ts"
Cohesion: 0.16
Nodes (12): RichText(), RichTextProps, ChatMessage, ModuleEditor(), Chat(), STARTER_PROMPTS, analyzeAPI, chatAPI() (+4 more)

### Community 19 - "compilerOptions"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 21 - "data.ts"
Cohesion: 0.09
Nodes (28): ClassroomCardTemplate(), LearnerQuizCardTemplate(), HeaderTemplate(), HeaderTemplateProps, QuizCardTemplate(), QuizCardTemplateProps, TooltipButtonTemplate(), ClassworkCardTemplate() (+20 more)

### Community 22 - "cn"
Cohesion: 0.11
Nodes (20): DropdownMenu(), DropdownMenuCheckboxItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut(), DropdownMenuSubContent(), DropdownMenuSubTrigger() (+12 more)

### Community 23 - "use-element-rect.ts"
Cohesion: 0.39
Nodes (7): ElementRectOptions, initialRect, isClientSide(), RectState, useBodyRect(), useElementRect(), useRefRect()

### Community 24 - "isNodeTypeSelected"
Cohesion: 0.40
Nodes (9): canSetLink(), isLinkActive(), LinkHandlerProps, shouldShowLinkButton(), useLinkHandler(), useLinkPopover(), useLinkState(), isNodeTypeSelected() (+1 more)

### Community 25 - "use-text-align.ts"
Cohesion: 0.06
Nodes (40): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+32 more)

### Community 26 - "QuizEditor.tsx"
Cohesion: 0.21
Nodes (18): Checkbox(), QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion(), DEFAULT_QUIZ_JSON, deleteChoice() (+10 more)

### Community 27 - "Analyzer.tsx"
Cohesion: 0.11
Nodes (22): BreadcrumbItem, CtaItem, PageWithTitleTemplate(), SectionHeaderTemplateProps, StatusTabValue, ViewMode, Calendar(), CalendarDayButton() (+14 more)

### Community 28 - "shadcn/ui"
Cohesion: 0.18
Nodes (11): Component Docs, Examples, and Usage, Component Selection, Current Project Context, Detailed References, Key Fields, Key Patterns, Principles, Quick Reference (+3 more)

### Community 29 - "use-heading.ts"
Cohesion: 0.11
Nodes (23): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+15 more)

### Community 30 - "Critical Rules"
Cohesion: 0.25
Nodes (8): Chat & Messaging → [chat.md](./rules/chat.md), CLI, Component Structure → [composition.md](./rules/composition.md), Critical Rules, Forms & Inputs → [forms.md](./rules/forms.md), Icons → [icons.md](./rules/icons.md), Styling & Tailwind → [styling.md](./rules/styling.md), Use Components, Not Custom Markup → [composition.md](./rules/composition.md)

### Community 31 - "PublicNavbar.tsx"
Cohesion: 0.17
Nodes (9): Logo(), LogoProps, Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), SheetTrigger() (+1 more)

### Community 32 - "Customization & Theming"
Cohesion: 0.14
Nodes (14): 1. Built-in variants, 2. Tailwind classes via `className`, 3. Add a new variant, 4. Wrapper components, Adding Custom Colors, Border Radius, Changing the Theme, Checking for Updates (+6 more)

### Community 33 - "item.tsx"
Cohesion: 0.22
Nodes (5): Item(), ItemMedia(), itemMediaVariants, ItemTitle(), itemVariants

### Community 34 - "ui/button.tsx"
Cohesion: 0.12
Nodes (17): Props, Button(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader() (+9 more)

### Community 35 - "schoolAdminRoute.tsx"
Cohesion: 0.10
Nodes (22): ModuleCardTemplate(), PublicNavbar(), ModuleReadOnly(), copyText(), CopyTextParams, getDateString(), ProtectedLayout(), AnalyzerLogsClassroomView() (+14 more)

### Community 36 - "ui/card.tsx"
Cohesion: 0.16
Nodes (19): ModuleCardTemplateProps, ActionType, HeroInterfacePreview(), Card(), CardAction(), CardContent(), CardDescription(), CardFooter() (+11 more)

### Community 37 - "AnalyzerLogsSchoolAdmin.tsx"
Cohesion: 0.20
Nodes (15): Table(), TableBody(), TableCell(), TableHead(), TableHeader(), TableRow(), instructors, classroomDistributionData (+7 more)

### Community 38 - "toolbar.tsx"
Cohesion: 0.17
Nodes (12): BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef(), useComposedRef() (+4 more)

### Community 39 - "button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 40 - "use-search-and-replace.ts"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 41 - "materialsProps.ts"
Cohesion: 0.12
Nodes (15): Classwork, CoreLessonsProps, CoreTopicsProps, PrincipleData, PrincipleItem, PrincipleScoreItem, PrincipleSummaryCount, QuestionElement (+7 more)

### Community 42 - "link-popover.tsx"
Cohesion: 0.11
Nodes (18): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, LinkIcon, SvgProps, SvgProps, TrashIcon (+10 more)

### Community 44 - "Design Critique: FrontAccEase Landing Page"
Cohesion: 0.14
Nodes (13): Design Critique: FrontAccEase Landing Page, Design Health Score, Design Specificity Verdict, Minor Observations, Overall Impression, [P1] Missing WAI-ARIA Tab Semantics in Interactive Tab Lists, [P2] Mobile Visibility Gap for Instructor Preview Tab, [P3] Non-Functional Mockup Action Buttons (+5 more)

### Community 47 - "buttonVariants"
Cohesion: 0.09
Nodes (26): LearnerQuizCardTemplateProps, LearnerQuizHistoryCardTemplate(), LearnerQuizHistoryCardTemplateProps, PourExplorer(), PourPrincipleData, pourPrinciples, PricingBlock(), PricingBlockProps (+18 more)

### Community 49 - "use-throttled-callback.ts"
Cohesion: 0.36
Nodes (5): defaultOptions, ThrottleSettings, useThrottledCallback(), useUnmount(), WindowSizeState

### Community 51 - "ProtectedLayout.tsx"
Cohesion: 0.31
Nodes (6): UserSkeleton(), Skeleton(), instructorNav, learnerNav, schoolAdminNav, linksByRole

### Community 52 - "TooltipButtonTemplate.tsx"
Cohesion: 0.27
Nodes (7): App(), Props, ToolTipTemplateProps, Tooltip(), TooltipContent(), TooltipProvider(), TooltipTrigger()

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
Cohesion: 0.14
Nodes (15): HeadingButton, HeadingButtonProps, HeadingShortcutBadge(), HEADING_SHORTCUT_KEYS, UseHeadingConfig, HeadingDropdownMenu, HeadingDropdownMenuProps, UseHeadingDropdownMenuConfig (+7 more)

### Community 61 - "AnalyzerResults.tsx"
Cohesion: 0.16
Nodes (12): SelectContent(), SelectGroup(), SelectItem(), SelectTrigger(), SelectValue(), PrincipleIssue, PrinciplePassed, AnalyzerResults() (+4 more)

### Community 62 - "ui/button-group.tsx"
Cohesion: 0.38
Nodes (3): ButtonGroup(), buttonGroupVariants, Separator()

### Community 69 - "dependencies"
Cohesion: 0.18
Nodes (11): axios, @base-ui/react, dependencies, axios, @base-ui/react, @shadcn/react, survey-core, @tiptap/react (+3 more)

### Community 96 - "CoreModulesView.tsx"
Cohesion: 0.16
Nodes (16): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), Avatar(), AvatarFallback(), AvatarImage() (+8 more)

### Community 97 - "image-upload-node.tsx"
Cohesion: 0.15
Nodes (9): CloseIcon, SvgProps, FileItem, ImageUploadDragAreaProps, ImageUploadNode(), ImageUploadPreviewProps, UploadOptions, useFileUpload() (+1 more)

### Community 98 - "useIsMobile"
Cohesion: 0.53
Nodes (5): getServerSnapshot(), getSnapshot(), subscribe(), useIsMobile(), Instruments()

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

### Community 127 - "button/index.tsx"
Cohesion: 0.28
Nodes (5): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle()

### Community 128 - "package.json"
Cohesion: 0.40
Nodes (4): name, private, type, version

### Community 129 - "image-upload-node-extension.ts"
Cohesion: 0.33
Nodes (4): Commands, ImageUploadNodeOptions, @tiptap/react, UploadFunction

### Community 146 - "QuizProps"
Cohesion: 0.43
Nodes (6): QuizProps, clearQuizProgress(), getQuizStorageKey(), QuizForm(), QuizFormProps, SURVEY_THEMES_MAP

### Community 147 - "App.tsx"
Cohesion: 0.50
Nodes (3): client, Toaster(), RootRouter()

### Community 148 - "getQuizJson"
Cohesion: 0.43
Nodes (7): QuizSubmissionsCardTemplate(), getQuizJson(), getQuizTotalPoints(), getQuizTotalQuestions(), DashboardTab(), LearnerQuizView(), mockStartAttemptServerRequest()

## Knowledge Gaps
- **530 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+525 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **69 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`, `modeToggle.tsx`, `class-variance-authority`, `cmdk`, `lodash.throttle`, `react-router-dom`, `rehype-highlight`, `remark-gfm`, `tw-animate-css`, `@tiptap/extension-image`, `@tiptap/extension-list`, `@tiptap/extension-subscript`, `@tiptap/extension-text-align`, `date-fns`, `@floating-ui/react`, `@fontsource-variable/roboto`, `@tiptap/extensions`, `@radix-ui/react-popover`, `@radix-ui/react-dropdown-menu`, `react-dom`, `react-hotkeys-hook`, `react-day-picker`, `react-icons`, `shadcn`, `survey-creator-react`, `survey-react-ui`, `tailwindcss`, `@tailwindcss/vite`, `@tanstack/react-query`, `@tiptap/core`, `@tiptap/extension-find-and-replace`, `@tiptap/extension-highlight`, `@tiptap/extension-horizontal-rule`, `@tiptap/extension-superscript`, `@tiptap/pm`, `cn`, `@tiptap/starter-kit`, `lucide-react`, `recharts`, `@tiptap/extension-typography`, `clsx`, `react-markdown`?**
  _High betweenness centrality (0.126) - this node is a cross-community bridge._
- **Why does `react` connect `modeToggle.tsx` to `useIsMobile`, `Analyzer.tsx`, `dependencies`, `sidebar.tsx`?**
  _High betweenness centrality (0.121) - this node is a cross-community bridge._
- **Why does `Button()` connect `ui/button.tsx` to `UserSidebar.tsx`, `modeToggle.tsx`, `sidebar.tsx`, `Instruments.tsx`, `attachment.tsx`, `materialsAPI.ts`, `data.ts`, `QuizEditor.tsx`, `Analyzer.tsx`, `PublicNavbar.tsx`, `schoolAdminRoute.tsx`, `ui/card.tsx`, `AnalyzerLogsSchoolAdmin.tsx`, `toast.tsx`, `buttonVariants`, `TooltipButtonTemplate.tsx`, `auth-04.tsx`, `AnalyzerResults.tsx`, `ViewToggle.tsx`, `CoreModulesView.tsx`, `message-scroller.tsx`?**
  _High betweenness centrality (0.058) - this node is a cross-community bridge._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _530 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `use-mark.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08392603129445235 - nodes in this community are weakly interconnected._
- **Should `rootRouter.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05714285714285714 - nodes in this community are weakly interconnected._
- **Should `use-list.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1066066066066066 - nodes in this community are weakly interconnected._