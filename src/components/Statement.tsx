import { formatStatementValue, type StatementSection } from '../features/practice'

export function Statement({ sections }: { sections: StatementSection[] }) {
  return (
    <div className="statement">
      {sections.map((section, sectionIndex) => (
        <section className="statement-section" key={`${section.title}-${sectionIndex}`}>
          {section.title && <h3>{section.title}</h3>}
          <div className="statement-rows">
            {section.rows.map((row, rowIndex) => (
              <div
                className={`statement-row ${row.emphasis ? 'statement-row--emphasis' : ''}`}
                key={`${row.label}-${rowIndex}`}
              >
                <span className={row.indent ? 'statement-label statement-label--indent' : 'statement-label'}>
                  {row.label}
                </span>
                <span className="statement-value">{formatStatementValue(row)}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
