# Graph Report - .  (2026-09-21)

## Corpus Check
- 22 files · ~66,097 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1160 nodes · 2416 edges · 96 communities (57 shown, 39 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.65)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Component arrow-left-icon.tsx
- Component eslint
- Component bold-icon.tsx
- Component blockquote-button.tsx
- Component heading-five-icon.tsx
- Component ClassroomCardTemplate.tsx
- Component sheet.tsx
- Instructor Quizzes View
- Component align-center-icon.tsx
- Component dropdown-menu/dropdown-menu.tsx
- UI Date Picker Components
- Component list-icon.tsx
- Component arrow-right-icon.tsx
- Component DOM
- Component CodeBlockShortcutBadge()
- Component SearchTemplate.tsx
- Module Editor & Content
- Component corner-down-left-icon.tsx
- Component item.tsx
- Component components.json
- Component search-icon.tsx
- Quiz Editor & Authoring
- Component node
- Component ClassroomCardTemplate()
- Component redo2-icon.tsx
- Component UserSidebar()
- Component blockquote-icon.tsx
- Component App.tsx
- Component ClassworkCardTemplate.tsx
- Component modeToggle.tsx
- Component Logo.tsx
- Component close-icon.tsx
- Component ColorHighlightPopoverContent()
- Quiz Form & SurveyJS Core
- Component ban-icon.tsx
- Component react
- Component GridListButtonGroupTemplate.tsx
- Instructor Quizzes View
- Component field.tsx
- Component highlighter-icon.tsx
- Component image-plus-icon.tsx
- Component check-icon.tsx
- Component button-group/button-group.tsx
- Component tooltip/tooltip.tsx
- Component moon-star-icon.tsx
- Component image-upload-button.tsx
- Component dependencies
- Component node-background-extension.ts
- Component image-upload-node-extension.ts
- Component color-highlight-button.tsx
- Component use-scrolling.ts
- Component tsconfig.json
- Component @base-ui/react
- Component class-variance-authority
- Component clsx
- Component cmdk
- Component cn
- Component date-fns
- Component @floating-ui/react
- Component @fontsource-variable/roboto
- Component lodash.throttle
- Component lucide-react
- Component @radix-ui/react-dropdown-menu
- Component @radix-ui/react-popover
- Component react-day-picker
- Component react-dom
- Component react-hotkeys-hook
- Component react-icons
- Component react-router-dom
- Component shadcn
- Component survey-core
- Component survey-creator-react
- Component survey-react-ui
- Component tailwindcss
- Component @tailwindcss/vite
- Component @tanstack/react-query
- Component @tiptap/core
- Component @tiptap/extension-find-and-replace
- Component @tiptap/extension-highlight
- Component @tiptap/extension-horizontal-rule
- Component @tiptap/extension-typography
- Component @tiptap/pm
- Component @tiptap/react
- Component @tiptap/starter-kit
- Component tw-animate-css
- Component scss.d.ts
- Component React Application HTML Entrypoint
- Component Application Logo Asset
- Component Vite Logo Asset
- Component FrontAccEase React Frontend
- Component React Logo Asset

## God Nodes (most connected - your core abstractions)
1. `useTiptapEditor()` - 43 edges
2. `cn()` - 37 edges
3. `Button()` - 29 edges
4. `parseShortcutKeys()` - 22 edges
5. `isNodeTypeSelected()` - 19 edges
6. `compilerOptions` - 19 edges
7. `Button` - 18 edges
8. `compilerOptions` - 16 edges
9. `QuizEditor()` - 16 edges
10. `ButtonProps` - 15 edges

## Surprising Connections (you probably didn't know these)
- `useIsMobile()` --references--> `react`  [EXTRACTED]
  src/hooks/use-mobile.ts → package.json
- `CalendarDayButton()` --references--> `react`  [EXTRACTED]
  src/components/ui/calendar.tsx → package.json
- `ThemeProvider()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `useTheme()` --references--> `react`  [EXTRACTED]
  src/components/theme-provider.tsx → package.json
- `ButtonGroupText()` --calls--> `cn()`  [EXTRACTED]
  src/components/tiptap-ui-primitive/button-group/button-group.tsx → src/lib/tiptap-utils.ts

## Import Cycles
- None detected.

## Communities (96 total, 39 thin omitted)

### Community 0 - "Component arrow-left-icon.tsx"
Cohesion: 0.07
Nodes (34): ArrowLeftIcon, SvgProps, LinkIcon, SvgProps, HorizontalRule, SEARCH_AND_REPLACE_SCROLL_OPTIONS, SimpleEditor(), LinkContent() (+26 more)

### Community 1 - "Component eslint"
Cohesion: 0.04
Nodes (44): eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, devDependencies, eslint, @eslint/js (+36 more)

### Community 2 - "Component bold-icon.tsx"
Cohesion: 0.08
Nodes (27): BoldIcon, SvgProps, Code2Icon, SvgProps, ItalicIcon, SvgProps, StrikeIcon, SvgProps (+19 more)

### Community 3 - "Component blockquote-button.tsx"
Cohesion: 0.10
Nodes (23): BlockquoteButton, BlockquoteButtonProps, BlockquoteShortcutBadge(), BLOCKQUOTE_SHORTCUT_KEY, UseBlockquoteConfig, CodeBlockButton, CodeBlockButtonProps, CODE_BLOCK_SHORTCUT_KEY (+15 more)

### Community 4 - "Component heading-five-icon.tsx"
Cohesion: 0.10
Nodes (25): HeadingFiveIcon, SvgProps, HeadingFourIcon, SvgProps, HeadingIcon, SvgProps, HeadingOneIcon, SvgProps (+17 more)

### Community 5 - "Component ClassroomCardTemplate.tsx"
Cohesion: 0.12
Nodes (15): ModuleCardTemplateProps, QuizCardTemplateProps, ActionType, DeleteArchiveDialog(), Card(), CardAction(), CardContent(), CardDescription() (+7 more)

### Community 6 - "Component sheet.tsx"
Cohesion: 0.08
Nodes (14): Sheet(), SheetContent(), SheetDescription(), SheetHeader(), SheetTitle(), getSidebarState(), SidebarContext, SidebarContextProps (+6 more)

### Community 7 - "Instructor Quizzes View"
Cohesion: 0.07
Nodes (6): CtaItem, PageWithTitleTemplate(), StatusTabValue, cta, QuizzesInstructorView(), Quizzes()

### Community 8 - "Component align-center-icon.tsx"
Cohesion: 0.10
Nodes (24): AlignCenterIcon, SvgProps, AlignJustifyIcon, SvgProps, AlignLeftIcon, SvgProps, AlignRightIcon, SvgProps (+16 more)

### Community 9 - "Component dropdown-menu/dropdown-menu.tsx"
Cohesion: 0.12
Nodes (21): DropdownMenuCheckboxItem(), DropdownMenuContent(), DropdownMenuGroup(), DropdownMenuItem(), DropdownMenuLabel(), DropdownMenuRadioItem(), DropdownMenuSeparator(), DropdownMenuShortcut() (+13 more)

### Community 10 - "UI Date Picker Components"
Cohesion: 0.13
Nodes (16): HeaderTemplate(), HeaderTemplateProps, BreadcrumbItem, SectionHeaderTemplateProps, ViewMode, ViewMode, ViewToggleProps, Button() (+8 more)

### Community 11 - "Component list-icon.tsx"
Cohesion: 0.14
Nodes (25): ListIcon, SvgProps, ListOrderedIcon, SvgProps, ListTodoIcon, SvgProps, canToggleList(), isListActive() (+17 more)

### Community 12 - "Component arrow-right-icon.tsx"
Cohesion: 0.09
Nodes (19): ArrowRightIcon, SvgProps, CaseSensitiveIcon, SvgProps, ChevronDownIcon, SvgProps, ChevronUpIcon, SvgProps (+11 more)

### Community 13 - "Component DOM"
Cohesion: 0.08
Nodes (24): DOM, src, vite/client, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, jsx, lib (+16 more)

### Community 14 - "Component CodeBlockShortcutBadge()"
Cohesion: 0.11
Nodes (20): CodeBlockShortcutBadge(), HeadingButton, HeadingButtonProps, HeadingShortcutBadge(), HEADING_SHORTCUT_KEYS, UseHeadingConfig, ListShortcutBadge(), TextAlignShortcutBadge() (+12 more)

### Community 15 - "Component SearchTemplate.tsx"
Cohesion: 0.12
Nodes (8): SearchInputProps, InputGroup(), InputGroupAddon(), inputGroupAddonVariants, InputGroupButton(), inputGroupButtonVariants, InputGroupInput(), Textarea()

### Community 16 - "Module Editor & Content"
Cohesion: 0.19
Nodes (13): Checkbox(), Dialog(), DialogClose(), DialogContent(), DialogDescription(), DialogFooter(), DialogHeader(), DialogTitle() (+5 more)

### Community 17 - "Component corner-down-left-icon.tsx"
Cohesion: 0.11
Nodes (17): CornerDownLeftIcon, SvgProps, ExternalLinkIcon, SvgProps, SvgProps, TrashIcon, LinkButton, LinkMainProps (+9 more)

### Community 18 - "Component item.tsx"
Cohesion: 0.13
Nodes (12): Item(), ItemContent(), ItemDescription(), ItemGroup(), ItemMedia(), itemMediaVariants, ItemTitle(), itemVariants (+4 more)

### Community 19 - "Component components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 20 - "Component search-icon.tsx"
Cohesion: 0.13
Nodes (19): SearchIcon, SvgProps, DEFAULT_SCROLL_INTO_VIEW_OPTIONS, EMPTY_EDITOR_STATE, formatResultCount(), getFindAndReplaceStorage(), isFindAndReplaceAvailable(), navigateSearchResult() (+11 more)

### Community 21 - "Quiz Editor & Authoring"
Cohesion: 0.22
Nodes (19): Switch(), QuestionType, QuizJson, QUESTION_TYPE_OPTIONS, QuizEditor(), addChoice(), addPage(), addQuestion() (+11 more)

### Community 22 - "Component node"
Cohesion: 0.10
Nodes (20): node, vite.config.ts, compilerOptions, allowImportingTsExtensions, erasableSyntaxOnly, lib, module, moduleDetection (+12 more)

### Community 23 - "Component ClassroomCardTemplate()"
Cohesion: 0.13
Nodes (11): ClassroomCardTemplate(), ModuleCardTemplate(), QuizCardTemplate(), SearchTemplate(), classrooms, classworks, modules, quizSubmissions (+3 more)

### Community 24 - "Component redo2-icon.tsx"
Cohesion: 0.16
Nodes (16): Redo2Icon, SvgProps, SvgProps, Undo2Icon, UndoRedoButton, UndoRedoButtonProps, canExecuteUndoRedoAction(), executeUndoRedoAction() (+8 more)

### Community 25 - "Component UserSidebar()"
Cohesion: 0.14
Nodes (14): UserSidebar(), UserSkeleton(), user, instructorNav, learnerNav, schoolAdminNav, useIsMobile(), linksByRole (+6 more)

### Community 26 - "Component blockquote-icon.tsx"
Cohesion: 0.24
Nodes (16): BlockquoteIcon, SvgProps, CodeBlockIcon, SvgProps, canToggleBlockquote(), shouldShowButton(), toggleBlockquote(), useBlockquote() (+8 more)

### Community 27 - "Component App.tsx"
Cohesion: 0.12
Nodes (6): App(), client, toast, Toaster(), TooltipProvider(), router

### Community 28 - "Component ClassworkCardTemplate.tsx"
Cohesion: 0.21
Nodes (10): QuizSubmissionsCardTemplateProps, Accordion(), AccordionContent(), AccordionItem(), AccordionTrigger(), AvatarFallback(), AvatarImage(), Badge() (+2 more)

### Community 29 - "Component modeToggle.tsx"
Cohesion: 0.17
Nodes (12): ModeToggle(), ModeToggleProps, SelectContent(), SelectGroup(), SelectItem(), SelectLabel(), SelectTrigger(), SelectValue() (+4 more)

### Community 30 - "Component Logo.tsx"
Cohesion: 0.19
Nodes (12): Logo(), LogoProps, UserSidebarProps, Avatar(), Sidebar(), SidebarContent(), SidebarFooter(), SidebarGroup() (+4 more)

### Community 31 - "Component close-icon.tsx"
Cohesion: 0.15
Nodes (9): CloseIcon, SvgProps, FileItem, ImageUploadDragAreaProps, ImageUploadNode(), ImageUploadPreviewProps, UploadOptions, useFileUpload() (+1 more)

### Community 32 - "Component ColorHighlightPopoverContent()"
Cohesion: 0.15
Nodes (13): ColorHighlightPopoverContent(), BaseProps, Toolbar, ToolbarGroup, ToolbarProps, ToolbarSeparator, useToolbarNavigation(), updateRef() (+5 more)

### Community 33 - "Quiz Form & SurveyJS Core"
Cohesion: 0.16
Nodes (14): Props, ClassroomProps, Classwork, ModuleProps, QuestionElement, QuizPage, QuizProps, QuizSubmissionProps (+6 more)

### Community 34 - "Component ban-icon.tsx"
Cohesion: 0.17
Nodes (11): BanIcon, SvgProps, HighlightColor, pickHighlightColorsByValue(), ColorHighlightPopover(), ColorHighlightPopoverButton, ColorHighlightPopoverContentProps, ColorHighlightPopoverProps (+3 more)

### Community 35 - "Component react"
Cohesion: 0.18
Nodes (14): react, react, disableTransitionsTemporarily(), getSystemTheme(), isTheme(), ResolvedTheme, Theme, THEME_VALUES (+6 more)

### Community 36 - "Component GridListButtonGroupTemplate.tsx"
Cohesion: 0.21
Nodes (7): Props, ToolTipTemplateProps, ButtonGroup(), buttonGroupVariants, Tooltip(), TooltipContent(), TooltipTrigger()

### Community 37 - "Instructor Quizzes View"
Cohesion: 0.20
Nodes (6): QuizSubmissionsCardTemplate(), Tabs(), TabsContent(), TabsList(), tabsListVariants, TabsTrigger()

### Community 38 - "Component field.tsx"
Cohesion: 0.16
Nodes (5): Field(), FieldError(), FieldLabel(), fieldVariants, Label()

### Community 39 - "Component highlighter-icon.tsx"
Cohesion: 0.29
Nodes (11): HighlighterIcon, SvgProps, canColorHighlight(), getHighlightColorValue(), HIGHLIGHT_COLORS, HighlightMode, isColorHighlightActive(), removeHighlight() (+3 more)

### Community 40 - "Component image-plus-icon.tsx"
Cohesion: 0.27
Nodes (10): ImagePlusIcon, SvgProps, canInsertImage(), insertImage(), isImageActive(), shouldShowButton(), useImageUpload(), LinkMain() (+2 more)

### Community 41 - "Component check-icon.tsx"
Cohesion: 0.22
Nodes (6): CheckIcon, SvgProps, ButtonSize, ButtonStyle, ButtonVariant, TooltipTrigger

### Community 42 - "Component button-group/button-group.tsx"
Cohesion: 0.24
Nodes (6): ButtonGroup(), ButtonGroupSeparator(), ButtonGroupText(), buttonGroupVariants, Orientation, Separator()

### Community 43 - "Component tooltip/tooltip.tsx"
Cohesion: 0.22
Nodes (8): Tooltip(), TooltipContent, TooltipContentProps, TooltipContext, TooltipContextValue, TooltipProviderProps, TooltipTriggerProps, useTooltip()

### Community 44 - "Component moon-star-icon.tsx"
Cohesion: 0.28
Nodes (6): MoonStarIcon, SvgProps, SunIcon, SvgProps, ThemeToggle(), Button

### Community 45 - "Component image-upload-button.tsx"
Cohesion: 0.25
Nodes (7): IconComponent, IconProps, ImageShortcutBadge(), ImageUploadButton, ImageUploadButtonProps, IMAGE_UPLOAD_SHORTCUT_KEY, UseImageUploadConfig

### Community 46 - "Component dependencies"
Cohesion: 0.43
Nodes (8): dependencies, @tiptap/extension-image, @tiptap/extension-list, @tiptap/extension-subscript, @tiptap/extension-superscript, @tiptap/extension-text-align, @tiptap/extensions, @tiptap/extensions

### Community 47 - "Component node-background-extension.ts"
Cohesion: 0.25
Nodes (6): Commands, NodeBackground, NodeBackgroundOptions, @tiptap/core, getSelectedNodesOfType(), updateNodesAttr()

### Community 48 - "Component image-upload-node-extension.ts"
Cohesion: 0.29
Nodes (5): Commands, ImageUploadNode, ImageUploadNodeOptions, @tiptap/react, UploadFunction

### Community 49 - "Component color-highlight-button.tsx"
Cohesion: 0.33
Nodes (5): ColorHighlightButton, ColorHighlightButtonProps, ColorHighlightShortcutBadge(), COLOR_HIGHLIGHT_SHORTCUT_KEY, UseColorHighlightConfig

### Community 50 - "Component use-scrolling.ts"
Cohesion: 0.50
Nodes (4): EventTargetWithScroll, ScrollTarget, useScrolling(), UseScrollingOptions

### Community 51 - "Component tsconfig.json"
Cohesion: 0.40
Nodes (4): compilerOptions, paths, files, references

## Knowledge Gaps
- **284 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+279 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **39 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `Component dependencies` to `Component eslint`, `Component react`, `Component @base-ui/react`, `Component class-variance-authority`, `Component clsx`, `Component cmdk`, `Component cn`, `Component date-fns`, `Component @floating-ui/react`, `Component @fontsource-variable/roboto`, `Component lodash.throttle`, `Component lucide-react`, `Component @radix-ui/react-dropdown-menu`, `Component @radix-ui/react-popover`, `Component react-day-picker`, `Component react-dom`, `Component react-hotkeys-hook`, `Component react-icons`, `Component react-router-dom`, `Component shadcn`, `Component survey-core`, `Component survey-creator-react`, `Component survey-react-ui`, `Component tailwindcss`, `Component @tailwindcss/vite`, `Component @tanstack/react-query`, `Component @tiptap/core`, `Component @tiptap/extension-find-and-replace`, `Component @tiptap/extension-highlight`, `Component @tiptap/extension-horizontal-rule`, `Component @tiptap/extension-typography`, `Component @tiptap/pm`, `Component @tiptap/react`, `Component @tiptap/starter-kit`, `Component tw-animate-css`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **Why does `react` connect `Component react` to `Component UserSidebar()`, `Component dependencies`?**
  _High betweenness centrality (0.123) - this node is a cross-community bridge._
- **Why does `useIsMobile()` connect `Component UserSidebar()` to `Component react`, `Component ClassroomCardTemplate.tsx`, `Component sheet.tsx`, `UI Date Picker Components`, `Component modeToggle.tsx`, `Component Logo.tsx`?**
  _High betweenness centrality (0.096) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _284 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Component arrow-left-icon.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.0653061224489796 - nodes in this community are weakly interconnected._
- **Should `Component eslint` be split into smaller, more focused modules?**
  _Cohesion score 0.044444444444444446 - nodes in this community are weakly interconnected._
- **Should `Component bold-icon.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.08408408408408409 - nodes in this community are weakly interconnected._