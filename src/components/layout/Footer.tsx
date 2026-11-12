import { Container } from "@/components/layout/Container";
import { Logo } from "@/components/layout/Logo";
import { footerGroups } from "@/data/footer";
import { siteConfig } from "@/lib/site";

const linkClass =
  "text-muted-foreground hover:text-foreground active:text-foreground text-sm transition-colors";

export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <Container className="flex flex-col gap-12 py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo />
            <p className="text-sm text-pretty text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* One navigation landmark for the whole footer, and named lists
              instead of headings, so the page outline stays limited to the
              actual content sections. */}
          <nav
            aria-label="Liens de pied de page"
            className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:gap-14"
          >
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p
                  id={`footer-${group.title}`}
                  className="mb-4 text-label font-semibold tracking-[0.08em] uppercase"
                >
                  {group.title}
                </p>
                <ul
                  aria-labelledby={`footer-${group.title}`}
                  className="flex flex-col gap-3"
                >
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {link.href ? (
                        <a href={link.href} className={linkClass}>
                          {link.label}
                        </a>
                      ) : (
                        /* No page exists in the demo, so this stays plain
                           text rather than a control that goes nowhere. */
                        <span className="text-sm text-subtle">
                          {link.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-2 border-t pt-8 text-small text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Nexa. Tous droits réservés.</p>
          <p className="text-pretty">
            Projet fictif réalisé à des fins de démonstration. Les entrées sans
            page correspondante ne sont pas cliquables.
          </p>
        </div>
      </Container>
    </footer>
  );
}
