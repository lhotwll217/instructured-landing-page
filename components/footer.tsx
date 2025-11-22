"use client"

export default function Footer() {
  return (
    <footer className="border-t border-border py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Instructured</h3>
            <p className="text-sm text-muted-foreground">AI workspace for knowledge work.</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-muted-foreground">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-muted-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-muted-foreground">Stay Updated</h4>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-card border border-border rounded-l-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-r-lg text-sm font-medium hover:opacity-90 transition-opacity">
                →
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2025 Instructured. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
