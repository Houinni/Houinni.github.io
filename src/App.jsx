import React, { useMemo, useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs.jsx";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import {
  Github,
  Linkedin,
  Camera,
  FileDown,
  Play,
  ChevronsRight,
  Menu,
  ExternalLink,
  Film,
  Layers,
  BookOpen,
  GalleryHorizontal,
  Wrench,
} from "lucide-react";

const SOCIAL_LINKS = [
  { label: "GitHub", icon: <Github className="h-4 w-4" />, href: "#" },
  { label: "LinkedIn", icon: <Linkedin className="h-4 w-4" />, href: "#" },
  { label: "Bilibili", icon: <Play className="h-4 w-4" />, href: "#" },
  { label: "RED(小红书)", icon: <Camera className="h-4 w-4" />, href: "#" },
  { label: "Résumé", icon: <FileDown className="h-4 w-4" />, href: "/resume.pdf" },
];

const PROJECTS = [
  {
    id: "proj-ml-1",
    title: "Term Deposit Prediction",
    teaser: "Compared LR/Tree/RF on UCI bank data; outcome-first ML demo.",
    result: "RF F1 0.63 (↑16% vs baseline)",
    stack: ["Python", "scikit-learn", "pandas"],
    category: "Data/ML",
    tags: ["ml", "python", "classification"],
    links: { code: "#", demo: "#", poster: "#" },
  },
  {
    id: "proj-web-1",
    title: "Heeseung Meme Generator",
    teaser: "Lightweight web tool for captioned memes.",
    result: "2k+ sessions, ~3:12 avg dwell",
    stack: ["HTML", "CSS", "JavaScript"],
    category: "Web",
    tags: ["web", "javascript"],
    links: { code: "#", demo: "#" },
  },
  {
    id: "proj-sys-1",
    title: "C/Java Coursework Highlights",
    teaser: "Systems fundamentals and data structures.",
    result: "Passed rigorous perf + correctness tests",
    stack: ["C", "Java"],
    category: "Systems",
    tags: ["c", "java", "systems"],
    links: { code: "#" },
  },
];

const RESEARCH = {
  data: [
    {
      id: "rs-1",
      title: "Funding Networks in Chiapas/Oaxaca",
      advisor: "Advisor Name",
      question: "How did NGO networks evolve across regions?",
      method: "OCR → tidyverse tagging → geospatial viz",
      contribution: "Built pipeline, maps, and codebook",
      finding: "Revealed collaboration clusters and flows",
      artifact: { label: "Poster", href: "#" },
    },
  ],
  film: [
    {
      id: "rs-2",
      title: "Microfilm Festival Audience Reception",
      advisor: "Advisor Name",
      question: "What themes drive audience ratings?",
      method: "Qual content analysis + basic stats",
      contribution: "Survey design, coding, analysis",
      finding: "Narrative clarity & pacing correlate with scores",
      artifact: { label: "PDF", href: "#" },
    },
  ],
};

const PERFORM = {
  reel: { href: "#", length: "90s" },
  credits: [
    {
      id: "cr-1",
      role: "Lead",
      production: "Spring Musical",
      dates: "Mar–Apr 2025",
      note: "Focus: acting beats & vocal dynamics",
    },
    {
      id: "cr-2",
      role: "Ensemble",
      production: "Fall Production",
      dates: "Oct 2024",
      note: "Dance-heavy, ensemble harmonies",
    },
  ],
  festival: {
    stats: { submissions: 45, attendees: 300, sponsors: 6 },
    highlights: "Built judging rubric, marketing plan, run-of-show",
    video: "#",
  },
};

const GALLERY = {
  portfolio: new Array(9).fill(0).map((_, i) => ({
    id: `p-${i + 1}`,
    title: `Portfolio ${i + 1}`,
    where: "Cusco, Peru",
    note: "Backlight silhouettes",
    href: "#",
  })),
  bsides: new Array(6).fill(0).map((_, i) => ({
    id: `b-${i + 1}`,
    title: `B-Side ${i + 1}`,
    lesson: "Missed focus; learn to pre-focus.",
    href: "#",
  })),
};

const Container = ({ children }) => (
  <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
);

const PageHeader = ({ title, subtitle, icon }) => (
  <div className="flex items-center gap-3 pb-6">
    {icon}
    <div>
      <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  </div>
);

const Pill = ({ children }) => (
  <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-[12px]">
    {children}
  </Badge>
);

const NAV = [
  { to: "/about", label: "About", icon: <BookOpen className="h-4 w-4" /> },
  { to: "/build", label: "Build", icon: <Wrench className="h-4 w-4" /> },
  { to: "/perform", label: "Perform", icon: <Film className="h-4 w-4" /> },
  { to: "/research", label: "Research", icon: <Layers className="h-4 w-4" /> },
  { to: "/gallery", label: "Gallery", icon: <GalleryHorizontal className="h-4 w-4" /> },
];

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-14 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open Menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle>Kira Hou</SheetTitle>
                </SheetHeader>
                <nav className="mt-4 grid gap-1">
                  {NAV.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={({ isActive }) =>
                        `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                          isActive ? "bg-muted" : "hover:bg-muted"
                        }`
                      }
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  ))}
                </nav>
                <Separator className="my-4" />
                <div className="grid gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <Button key={s.label} variant="secondary" className="justify-start" asChild>
                      <a href={s.href} aria-label={s.label}>
                        <span className="mr-2 inline-flex">{s.icon}</span>
                        {s.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <NavLink to="/about" className="font-semibold tracking-tight">
              Kira Hou
            </NavLink>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
                    isActive ? "bg-muted" : "hover:bg-muted"
                  }`
                }
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            {SOCIAL_LINKS.map((s) => (
              <Button
                key={s.label}
                variant="ghost"
                size="icon"
                asChild
                aria-label={s.label}
              >
                <a href={s.href}>{s.icon}</a>
              </Button>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t py-8">
      <Container>
        <div className="flex flex-col items-start justify-between gap-4 text-sm text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Kira Hou · All rights reserved.</div>
          <div className="flex flex-wrap items-center gap-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="inline-flex items-center gap-1 hover:underline"
              >
                {s.icon}
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}

function AboutPage() {
  return (
    <Container>
      <PageHeader
        title="About"
        subtitle="CS & SDS @ Smith · Builder × Artist · Tutor & Organizer"
        icon={<BookOpen className="h-7 w-7" />}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Hi, I’m Kira 👋</CardTitle>
            <CardDescription>
              A stats-minded developer who also lives on stage and behind the camera. I
              build neat tools, mentor peers, and produce shows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-6">
            <p>
              I’m studying Computer Science and Statistical &amp; Data Sciences. Comfortable
              with Python, Java, C, and front‑end (HTML/CSS/JS). I’ve built websites for
              clients and ML prototypes that prioritize outcomes over buzzwords.
            </p>
            <p>
              On the arts side, I perform in musical theatre, direct films, and run a
              microfilm festival. I also shoot photography—both portfolios and B‑sides to
              show the learning curve.
            </p>
            <p>
              On campus, I organize events (e.g., with the Chinese Student Association) and
              tutor peers in CS/SDS.
            </p>
          </CardContent>
          <CardFooter className="flex flex-wrap gap-2">
            {SOCIAL_LINKS.map((s) => (
              <Button key={s.label} variant="secondary" asChild>
                <a href={s.href} className="inline-flex items-center gap-2">
                  {s.icon}
                  {s.label}
                </a>
              </Button>
            ))}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Now</CardTitle>
            <CardDescription>本学期在做什么</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="space-y-1">
              <div className="font-medium">• Building</div>
              <div className="text-muted-foreground">
                Personal website, ML poster refinement
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">• Performing</div>
              <div className="text-muted-foreground">
                Rehearsal for spring musical (reel update)
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">• Learning</div>
              <div className="text-muted-foreground">
                Data viz &amp; interaction design
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

function BuildPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Web", "Data/ML", "Systems"];
  const filtered = useMemo(() => {
    return PROJECTS.filter((p) =>
      (filter === "All" || p.category === filter) &&
      (!query || `${p.title} ${p.teaser} ${p.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()))
    );
  }, [query, filter]);

  return (
    <Container>
      <PageHeader
        title="Build"
        subtitle="Web · Data/ML · Systems — outcome‑first projects"
        icon={<Wrench className="h-7 w-7" />}
      />
      <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-center">
        <Tabs value={filter} onValueChange={setFilter} className="w-full md:w-auto">
          <TabsList className="grid w-full grid-cols-4 md:w-auto">
            {categories.map((c) => (
              <TabsTrigger key={c} value={c}>
                {c}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex w-full items-center gap-2 md:ml-auto md:w-80">
          <Input
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <Card key={p.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-base">{p.title}</CardTitle>
              <CardDescription>{p.teaser}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                <ChevronsRight className="h-4 w-4" />
                <span className="font-medium">Result:</span>
                <span>{p.result}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.stack.map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
                {p.tags.map((t) => (
                  <Pill key={t}>#{t}</Pill>
                ))}
              </div>
            </CardContent>
            <CardFooter className="mt-auto flex gap-2">
              {p.links.code && (
                <Button asChild size="sm">
                  <a href={p.links.code} className="inline-flex items-center gap-2">
                    View Code <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
              {p.links.demo && (
                <Button variant="secondary" asChild size="sm">
                  <a href={p.links.demo} className="inline-flex items-center gap-2">
                    Live Demo <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
              {p.links.poster && (
                <Button variant="ghost" asChild size="sm">
                  <a href={p.links.poster} className="inline-flex items-center gap-2">
                    Poster <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </Container>
  );
}

function PerformPage() {
  return (
    <Container>
      <PageHeader
        title="Perform"
        subtitle="Theatre &amp; Film — watch first, then read"
        icon={<Film className="h-7 w-7" />}
      />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Reel</CardTitle>
          <CardDescription>30–90s selection; keep fresh each semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid aspect-video w-full place-items-center rounded-lg bg-muted">
            <Button asChild>
              <a href={PERFORM.reel.href} className="inline-flex items-center gap-2">
                <Play className="h-4 w-4" /> Watch Reel ({PERFORM.reel.length})
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Credits</CardTitle>
            <CardDescription>Selected roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {PERFORM.credits.map((c) => (
              <div key={c.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div className="font-medium">
                    {c.role} — {c.production}
                  </div>
                  <div className="text-xs text-muted-foreground">{c.dates}</div>
                </div>
                <div className="mt-1 text-muted-foreground">{c.note}</div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Microfilm Festival</CardTitle>
            <CardDescription>Director &amp; Chief Organizer</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex flex-wrap gap-2">
              <Pill>Submissions: {PERFORM.festival.stats.submissions}</Pill>
              <Pill>Attendees: {PERFORM.festival.stats.attendees}+</Pill>
              <Pill>Sponsors: {PERFORM.festival.stats.sponsors}</Pill>
            </div>
            <div className="text-muted-foreground">
              {PERFORM.festival.highlights}
            </div>
            <Button variant="secondary" asChild>
              <a href={PERFORM.festival.video} className="inline-flex items-center gap-2">
                Festival Highlights <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
}

function ResearchPage() {
  const [tab, setTab] = useState("data");
  return (
    <Container>
      <PageHeader
        title="Research"
        subtitle="Evidence of inquiry + artifacts"
        icon={<Layers className="h-7 w-7" />}
      />

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:inline-grid md:w-auto">
          <TabsTrigger value="data">Math/Stats &amp; Data</TabsTrigger>
          <TabsTrigger value="film">Film Studies</TabsTrigger>
        </TabsList>
        <TabsContent value="data" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {RESEARCH.data.map((r) => (
              <ResearchCard key={r.id} r={r} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="film" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {RESEARCH.film.map((r) => (
              <ResearchCard key={r.id} r={r} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}

function ResearchCard({ r }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{r.title}</CardTitle>
        <CardDescription>{r.advisor ? `Advisor: ${r.advisor}` : null}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div>
          <span className="font-medium">Question:</span> {r.question}
        </div>
        <div>
          <span className="font-medium">Method:</span> {r.method}
        </div>
        <div>
          <span className="font-medium">Your contribution:</span> {r.contribution}
        </div>
        <div className="text-emerald-600 dark:text-emerald-400">
          <span className="font-medium">Finding:</span> {r.finding}
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild size="sm">
          <a href={r.artifact?.href || "#"} className="inline-flex items-center gap-2">
            {r.artifact?.label || "Artifact"} <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

function GalleryPage() {
  const [tab, setTab] = useState("portfolio");
  return (
    <Container>
      <PageHeader
        title="Gallery"
        subtitle="Visual taste + growth"
        icon={<GalleryHorizontal className="h-7 w-7" />}
      />

      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:inline-grid md:w-auto">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="bsides">B‑Sides / Outtakes</TabsTrigger>
        </TabsList>
        <TabsContent value="portfolio" className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.portfolio.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-0">
                  <div className="aspect-[3/2] w-full bg-muted" />
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>
                    {item.where} — {item.note}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="bsides" className="mt-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.bsides.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-0">
                  <div className="aspect-[3/2] w-full bg-muted" />
                </CardContent>
                <CardHeader>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>
                    Lesson learned: {item.lesson}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function DevTests() {
  const location = useLocation();
  useEffect(() => {
    const results = [
      { name: "Router context available", pass: Boolean(location) },
      {
        name: "Routes present",
        pass: ["/about", "/build", "/perform", "/research", "/gallery"].every((p) =>
          NAV.some((n) => n.to === p)
        ),
      },
    ];
    console.table(results);
  }, [location]);
  return null;
}

function AppInner() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/") {
      console.info("Redirect: '/' -> '/about'");
      navigate("/about", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="py-8">
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="/build" element={<BuildPage />} />
          <Route path="/perform" element={<PerformPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <DevTests />
    </div>
  );
}

export default function Root() {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppInner />
    </HashRouter>
  );
}

function NotFound() {
  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>404</CardTitle>
          <CardDescription>Page not found.</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <NavLink to="/about">Go Home</NavLink>
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
}
