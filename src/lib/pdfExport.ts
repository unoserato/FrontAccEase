import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import type { Result, PrincipleIssue, PrinciplePassed } from "@/const/props/analyzerProps"

export interface TableColumn {
  header: string
  dataKey: string
  width?: number
}

export interface SummaryCardItem {
  label: string
  value: string | number
  color?: [number, number, number]
}

export interface GenericPDFExportOptions {
  filename: string
  title: string
  subtitle?: string
  metadata?: Record<string, string | number | undefined | null>
  summaryCards?: SummaryCardItem[]
  columns: TableColumn[]
  data: Array<Record<string, unknown>>
}

export interface AnalyzerPDFExportOptions {
  result: Result
  scanInfo?: {
    id?: string
    createdAt?: string
  }
  filename?: string
}

function applyPageNumbersAndFooters(doc: jsPDF, title: string) {
  const pageCount = doc.getNumberOfPages()
  const pageWidth = doc.internal.pageSize.width
  const pageHeight = doc.internal.pageSize.height

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184) // Slate 400

    // Footer divider line
    doc.setDrawColor(226, 232, 240) // Slate 200
    doc.setLineWidth(0.3)
    doc.line(14, pageHeight - 12, pageWidth - 14, pageHeight - 12)

    // Left footer text
    doc.text(`FrontAccEase — ${title}`, 14, pageHeight - 7)

    // Right footer text: Page X of Y
    const pageText = `Page ${i} of ${pageCount}`
    doc.text(pageText, pageWidth - 14, pageHeight - 7, { align: "right" })
  }
}

/**
 * Generic reusable table exporter for components like Users.tsx, ClassroomInstructorView.tsx, etc.
 */
export function exportTableToPDF({
  filename,
  title,
  subtitle,
  metadata = {},
  summaryCards = [],
  columns,
  data,
}: GenericPDFExportOptions) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.width
  let currentY = 16

  // Top header brand accent bar
  doc.setFillColor(15, 23, 42) // Slate 900
  doc.rect(14, currentY, pageWidth - 28, 1.5, "F")
  currentY += 8

  // Document Title
  doc.setFont("helvetica", "bold")
  doc.setFontSize(18)
  doc.setTextColor(15, 23, 42)
  doc.text(title, 14, currentY)
  currentY += 6

  // Subtitle
  if (subtitle) {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9.5)
    doc.setTextColor(100, 116, 139)
    doc.text(subtitle, 14, currentY)
    currentY += 6
  }

  // Metadata block
  const metaEntries = Object.entries(metadata).filter(
    ([, val]) => val !== undefined && val !== null && val !== ""
  )
  if (metaEntries.length > 0) {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(8.5)
    doc.setTextColor(71, 85, 105)
    const metaString = metaEntries
      .map(([k, v]) => `${k}: ${v}`)
      .join("   |   ")
    doc.text(metaString, 14, currentY)
    currentY += 6
  }

  // Summary metric cards row
  if (summaryCards.length > 0) {
    currentY += 2
    const cardGap = 3
    const totalGap = cardGap * (summaryCards.length - 1)
    const cardWidth = (pageWidth - 28 - totalGap) / summaryCards.length
    const cardHeight = 14

    summaryCards.forEach((card, idx) => {
      const cardX = 14 + idx * (cardWidth + cardGap)
      doc.setFillColor(248, 250, 252) // Slate 50
      doc.setDrawColor(226, 232, 240)
      doc.roundedRect(cardX, currentY, cardWidth, cardHeight, 1.5, 1.5, "FD")

      // Card Label
      doc.setFont("helvetica", "normal")
      doc.setFontSize(7.5)
      doc.setTextColor(100, 116, 139)
      doc.text(card.label.toUpperCase(), cardX + 3, currentY + 4.5)

      // Card Value
      doc.setFont("helvetica", "bold")
      doc.setFontSize(11)
      if (card.color) {
        doc.setTextColor(card.color[0], card.color[1], card.color[2])
      } else {
        doc.setTextColor(15, 23, 42)
      }
      doc.text(String(card.value), cardX + 3, currentY + 11)
    })

    currentY += cardHeight + 6
  }

  // Prepare table data
  const head = [columns.map((c) => c.header)]
  const body = data.map((row) =>
    columns.map((col) => {
      const val = row[col.dataKey]
      if (val === null || val === undefined) return "-"
      if (typeof val === "boolean") return val ? "Yes" : "No"
      return String(val)
    })
  )

  autoTable(doc, {
    startY: currentY,
    head,
    body,
    theme: "striped",
    margin: { left: 14, right: 14, top: 16, bottom: 18 },
    styles: {
      fontSize: 8.5,
      cellPadding: 2.5,
      textColor: [30, 41, 59],
      overflow: "linebreak",
    },
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8.5,
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
  })

  applyPageNumbersAndFooters(doc, title)
  const cleanFilename = filename.endsWith(".pdf") ? filename : `${filename}.pdf`
  doc.save(cleanFilename)
}

/**
 * Specialized comprehensive PDF exporter for AnalyzerResults.tsx.
 * Exports 100% of audit findings, scores, WCAG violations, impacted selectors,
 * remediation advice, and verified passed checks.
 */
export function exportAnalyzerReportToPDF({
  result,
  scanInfo,
  filename,
}: AnalyzerPDFExportOptions) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  })

  const pageWidth = doc.internal.pageSize.width
  let currentY = 16

  // Overall Score & Summary counts calculation
  const overallScore = Math.round(result.overall_score ?? 0)

  const getCount = (
    name: "critical" | "serious" | "moderate" | "minor" | "total_passed"
  ): number => {
    if (Array.isArray(result.summary)) {
      const item = result.summary.find(
        (s) => s.name?.toLowerCase() === name.toLowerCase()
      )
      return item?.count || 0
    }
    if (result.summary && typeof result.summary === "object") {
      const s = result.summary as Record<string, number | undefined>
      if (name === "critical") return s.critical_count || 0
      if (name === "serious") return s.serious_count || 0
      if (name === "moderate") return s.moderate_count || 0
      if (name === "minor") return s.minor_count || 0
      if (name === "total_passed") return s.passed_count || 0
    }
    return 0
  }

  const criticalCount = getCount("critical")
  const seriousCount = getCount("serious")
  const moderateCount = getCount("moderate")
  const minorCount = getCount("minor")
  const totalViolations =
    criticalCount + seriousCount + moderateCount + minorCount
  const totalPassedCount = getCount("total_passed")

  // Header Brand Banner
  doc.setFillColor(15, 23, 42) // Slate 900
  doc.roundedRect(14, currentY, pageWidth - 28, 20, 2, 2, "F")

  doc.setFont("helvetica", "bold")
  doc.setFontSize(13)
  doc.setTextColor(255, 255, 255)
  doc.text("FrontAccEase — Accessibility Audit Report", 20, currentY + 7.5)

  doc.setFont("helvetica", "normal")
  doc.setFontSize(8)
  doc.setTextColor(203, 213, 225) // Slate 300
  const dateStr = scanInfo?.createdAt
    ? new Date(scanInfo.createdAt).toLocaleString()
    : new Date().toLocaleString()
  doc.text(`Generated: ${dateStr}   |   Standard: WCAG 2.2 AA / AAA`, 20, currentY + 14)

  currentY += 25

  // URL Banner
  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.setTextColor(71, 85, 105)
  doc.text("AUDITED TARGET URL", 14, currentY)
  currentY += 4.5

  doc.setFont("helvetica", "normal")
  doc.setFontSize(9.5)
  doc.setTextColor(37, 99, 235) // Blue 600
  const urlWrapped = doc.splitTextToSize(result.url || "N/A", pageWidth - 28)
  doc.text(urlWrapped, 14, currentY)
  currentY += urlWrapped.length * 4.5 + 4

  // Executive Summary Boxes: Score + Counts
  const scoreCardWidth = 46
  const countsCardWidth = pageWidth - 28 - scoreCardWidth - 4
  const cardHeight = 28

  // Score Card Box
  let scoreBadgeColor: [number, number, number] = [22, 163, 74] // Green
  let scoreLabel = "PASSING"
  if (overallScore < 50) {
    scoreBadgeColor = [220, 38, 38] // Red
    scoreLabel = "FAILS COMPLIANCE"
  } else if (overallScore < 80) {
    scoreBadgeColor = [234, 88, 12] // Orange
    scoreLabel = "NEEDS REVISION"
  }

  doc.setFillColor(248, 250, 252)
  doc.setDrawColor(226, 232, 240)
  doc.roundedRect(14, currentY, scoreCardWidth, cardHeight, 2, 2, "FD")

  doc.setFont("helvetica", "normal")
  doc.setFontSize(7.5)
  doc.setTextColor(100, 116, 139)
  doc.text("COMPLIANCE SCORE", 18, currentY + 6)

  doc.setFont("helvetica", "bold")
  doc.setFontSize(20)
  doc.setTextColor(scoreBadgeColor[0], scoreBadgeColor[1], scoreBadgeColor[2])
  doc.text(`${overallScore}/100`, 18, currentY + 16)

  doc.setFontSize(7.5)
  doc.text(scoreLabel, 18, currentY + 23)

  // Metrics Grid Box
  const metricsBoxX = 14 + scoreCardWidth + 4
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(metricsBoxX, currentY, countsCardWidth, cardHeight, 2, 2, "FD")

  const colWidth = countsCardWidth / 5
  const metrics = [
    { label: "Critical", value: criticalCount, color: [220, 38, 38] as [number, number, number] },
    { label: "Serious", value: seriousCount, color: [234, 88, 12] as [number, number, number] },
    { label: "Moderate", value: moderateCount, color: [202, 138, 4] as [number, number, number] },
    { label: "Minor", value: minorCount, color: [37, 99, 235] as [number, number, number] },
    { label: "Passed", value: totalPassedCount, color: [22, 163, 74] as [number, number, number] },
  ]

  metrics.forEach((m, idx) => {
    const mx = metricsBoxX + idx * colWidth
    doc.setFont("helvetica", "normal")
    doc.setFontSize(7.5)
    doc.setTextColor(100, 116, 139)
    doc.text(m.label.toUpperCase(), mx + 4, currentY + 7)

    doc.setFont("helvetica", "bold")
    doc.setFontSize(13)
    doc.setTextColor(m.color[0], m.color[1], m.color[2])
    doc.text(String(m.value), mx + 4, currentY + 18)
  })

  currentY += cardHeight + 8

  // Section 1: Principle-by-Principle Breakdown Table
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(15, 23, 42)
  doc.text("1. WCAG Principles Breakdown", 14, currentY)
  currentY += 4

  const principleRows = (result.principles || []).map((p) => {
    const issues = p.data?.issues || []
    const passed = p.data?.passed || []
    const pScore = p.data?.score !== undefined ? `${Math.round(p.data.score)}%` : "N/A"
    return [
      p.name.charAt(0).toUpperCase() + p.name.slice(1),
      pScore,
      String(issues.length),
      String(passed.length),
    ]
  })

  autoTable(doc, {
    startY: currentY,
    head: [["Principle", "Score", "Violations Count", "Passed Rules Count"]],
    body: principleRows,
    theme: "striped",
    margin: { left: 14, right: 14 },
    styles: { fontSize: 8.5, cellPadding: 2.5 },
    headStyles: { fillColor: [15, 23, 42], fontStyle: "bold" },
  })

  currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8

  // Section 2: Comprehensive Violations Register (All Issues)
  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(15, 23, 42)
  doc.text(`2. Complete Violations Register (${totalViolations} issues found)`, 14, currentY)
  currentY += 4

  const allIssues: Array<PrincipleIssue & { principleName: string }> =
    result.principles?.flatMap((p) =>
      (p.data?.issues || []).map((iss) => ({
        ...iss,
        principleName: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      }))
    ) || []

  if (allIssues.length === 0) {
    doc.setFont("helvetica", "normal")
    doc.setFontSize(9)
    doc.setTextColor(22, 163, 74)
    doc.text("No accessibility violations detected across evaluated criteria.", 14, currentY + 4)
    currentY += 10
  } else {
    const issueTableBody = allIssues.map((iss, index) => {
      const criterionStr = `[${iss.wcag || "WCAG"}] ${iss.level ? `(${iss.level})` : ""}\nPrinciple: ${iss.principleName}`
      const severityStr = (iss.severity || "moderate").toUpperCase()

      const selectorDetails = iss.selector || iss.element || iss.identifier || "N/A"
      const descriptionWithAdvice = `${iss.message || "Accessibility rule violation"}\n\nSelector / Element:\n${selectorDetails}`

      return [
        String(index + 1),
        criterionStr,
        severityStr,
        descriptionWithAdvice,
      ]
    })

    autoTable(doc, {
      startY: currentY,
      head: [["#", "Criterion & Principle", "Severity", "Violation Details & Impacted Elements"]],
      body: issueTableBody,
      theme: "striped",
      margin: { left: 14, right: 14 },
      columnStyles: {
        0: { cellWidth: 8, halign: "center" },
        1: { cellWidth: 42 },
        2: { cellWidth: 22 },
        3: { cellWidth: "auto" },
      },
      styles: {
        fontSize: 8,
        cellPadding: 2.5,
        overflow: "linebreak",
        valign: "top",
      },
      headStyles: {
        fillColor: [15, 23, 42],
        fontStyle: "bold",
      },
      didParseCell: (data) => {
        // Color-code severity column
        if (data.section === "body" && data.column.index === 2) {
          const text = String(data.cell.raw).toLowerCase()
          if (text.includes("critical")) {
            data.cell.styles.textColor = [220, 38, 38]
            data.cell.styles.fontStyle = "bold"
          } else if (text.includes("serious")) {
            data.cell.styles.textColor = [234, 88, 12]
            data.cell.styles.fontStyle = "bold"
          } else if (text.includes("moderate")) {
            data.cell.styles.textColor = [161, 98, 7]
          } else if (text.includes("minor")) {
            data.cell.styles.textColor = [37, 99, 235]
          }
        }
      },
    })

    currentY = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 8
  }

  // Section 3: Verified Passed Checks Register
  const allPassed: Array<PrinciplePassed & { principleName: string }> =
    result.principles?.flatMap((p) =>
      (p.data?.passed || []).map((passItem) => ({
        ...passItem,
        principleName: p.name.charAt(0).toUpperCase() + p.name.slice(1),
      }))
    ) || []

  // If page space is low, start on next page
  if (currentY > doc.internal.pageSize.height - 40) {
    doc.addPage()
    currentY = 16
  }

  doc.setFont("helvetica", "bold")
  doc.setFontSize(11)
  doc.setTextColor(15, 23, 42)
  doc.text(`3. Verified Passed Checks (${allPassed.length} rules passed)`, 14, currentY)
  currentY += 4

  if (allPassed.length > 0) {
    const passedRows = allPassed.map((p, idx) => [
      String(idx + 1),
      p.principleName,
      `[${p.wcag || "Rule"}] ${p.level ? `(${p.level})` : ""}`,
      p.message || "Rule evaluated and satisfied compliance criteria",
    ])

    autoTable(doc, {
      startY: currentY,
      head: [["#", "Principle", "Criterion", "Verified Rule Description"]],
      body: passedRows,
      theme: "striped",
      margin: { left: 14, right: 14, bottom: 18 },
      columnStyles: {
        0: { cellWidth: 8, halign: "center" },
        1: { cellWidth: 32 },
        2: { cellWidth: 36 },
        3: { cellWidth: "auto" },
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 2,
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [30, 41, 59],
        fontStyle: "bold",
      },
    })
  }

  applyPageNumbersAndFooters(doc, "Accessibility Audit Report")

  const hostClean = result.url
    ? result.url.replace(/^https?:\/\//, "").replace(/[^\w-]/g, "_")
    : "audit"
  const defaultFilename = `${hostClean}-wcag-audit-report.pdf`
  const exportFilename = filename || defaultFilename

  doc.save(exportFilename.endsWith(".pdf") ? exportFilename : `${exportFilename}.pdf`)
}
