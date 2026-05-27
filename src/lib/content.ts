export interface Feature {
	title: string;
	short: string;
	body: string;
	icon: string;
}

export interface Keybinding {
	key: string;
	action: string;
}

export interface CliArg {
	flag: string;
	long: string;
	description: string;
}

export interface ArchModule {
	path: string;
	purpose: string;
}

export interface StackEntry {
	name: string;
	role: string;
	url: string;
}

export const META = {
	name: 'archculars',
	tagline: 'Modern TUI for Arch Linux + AUR package management',
	description: 'A modern and fast AUR seeker',
	version: '0.1.2',
	release: '1',
	architecture: 'x86_64',
	license: 'MIT',
	repo: 'https://github.com/alpwrk/archculars',
	binarySize: '8.96 MiB',
	language: 'Rust 2021',
	author: 'x@alpwrk.cc',
	installReason: 'Explicitly installed'
};

export const FEATURES: Feature[] = [
	{
		title: 'Async parallel search',
		short: 'Repos + AUR in parallel',
		body: 'Searches the sync databases (via libalpm) and the AUR (via raur) in parallel. An on-disk cache with a 1h TTL makes repeated queries instant.',
		icon: 'search'
	},
	{
		title: 'Modern UI',
		short: 'Mouse, accents, borders',
		body: 'Mouse input, red accent theme, smooth scrolling, focused borders and a responsive split-pane layout — all in the terminal.',
		icon: 'sparkle'
	},
	{
		title: 'Rich details panel',
		short: 'Everything at a glance',
		body: 'Shows version, source, install size, license, maintainer, AUR votes/popularity, out-of-date flag and recent dependencies.',
		icon: 'panel'
	},
	{
		title: 'Dependency tree',
		short: 'Modal via [d]',
		body: 'Walks depends, makedepends and optdepends up to 4 levels deep — with cycle detection. Opened with the d key.',
		icon: 'tree'
	},
	{
		title: 'PKGBUILD viewer',
		short: 'Modal via [p]',
		body: 'Fetches the PKGBUILD live from aur.archlinux.org and renders it with syntect syntax highlighting.',
		icon: 'code'
	},
	{
		title: 'Upgrade screen',
		short: 'Modal via [u]',
		body: 'Uses alpm::vercmp to find packages whose sync version is newer than what is installed.',
		icon: 'upgrade'
	},
	{
		title: 'Stats view',
		short: 'Modal via [s]',
		body: 'Top-30 largest installed packages and a heuristic orphan list via reverse-deps.',
		icon: 'stats'
	},
	{
		title: 'Arch news feed',
		short: 'Modal via [n]',
		body: 'Fetches the official archlinux.org RSS feed and shows the latest 20 entries directly in the TUI.',
		icon: 'news'
	},
	{
		title: 'Install / remove',
		short: 'Native pacman',
		body: 'pkexec pacman -S/-Rns for repo packages, paru or yay for AUR. Live output is streamed into a modal.',
		icon: 'install'
	},
	{
		title: 'Filter cycling',
		short: 'Press [f]',
		body: 'Cycles through all → installed → repos → aur → upgrades. The fastest way to move between views.',
		icon: 'filter'
	}
];

export const KEYBINDINGS: Keybinding[] = [
	{ key: '/', action: 'Focus the search bar' },
	{ key: 'Esc', action: 'Leave search / close active modal' },
	{ key: 'Enter', action: 'Install (or remove) selected package' },
	{ key: '↑ ↓ / j k', action: 'Move selection or scroll modal' },
	{ key: 'PageUp / PageDown', action: 'Page through table or modal' },
	{ key: 'Home / End', action: 'Jump to first / last row' },
	{ key: 'f', action: 'Cycle filter (All → Installed → Repos → AUR → Upgrades)' },
	{ key: 'd', action: 'Open dependency tree for selected package' },
	{ key: 'p', action: 'Open PKGBUILD viewer (AUR only)' },
	{ key: 'u', action: 'Open upgrades screen' },
	{ key: 'n', action: 'Open Arch news feed' },
	{ key: 's', action: 'Open stats (largest packages + orphans)' },
	{ key: 'r', action: 'Force-refresh the current view (invalidate cache)' },
	{ key: 'Ctrl+Q', action: 'Quit from anywhere' },
	{ key: 'q', action: 'Quit when the search bar is empty' }
];

export const CLI_ARGS: CliArg[] = [
	{
		flag: '<query>',
		long: '',
		description: 'Optional search term that pre-fills the search bar on start.'
	},
	{
		flag: '-r',
		long: '--repos <names>',
		description: 'Limit repo searches to a comma-separated list (e.g. core,extra).'
	},
	{
		flag: '-u',
		long: '--upgrades',
		description: 'Open the upgrades view immediately on start.'
	},
	{
		flag: '-i',
		long: '--installed',
		description: 'Pre-select the "installed" filter on start.'
	}
];

export const ARCHITECTURE: ArchModule[] = [
	{ path: 'src/main.rs', purpose: 'Entry-point — sets up tracing, the ratatui terminal, mouse capture and drives app::run.' },
	{ path: 'src/cli.rs', purpose: 'clap-derived CLI parsing — concise single-letter flags plus a positional query.' },
	{ path: 'src/app.rs', purpose: 'Event loop, App state, render dispatcher, modal handling, async-channel draining.' },
	{ path: 'src/app/install.rs', purpose: 'InstallState — keeps log lines, scroll offset and the spawned waiter handle.' },
	{ path: 'src/core/alpm.rs', purpose: 'Wraps libalpm in a RefCell on the main thread — searches sync DBs, lists installed, finds upgrades via vercmp.' },
	{ path: 'src/core/aur.rs', purpose: 'raur RPC client with cache, dedup against repos, PKGBUILD fetch from aur.archlinux.org.' },
	{ path: 'src/core/cache.rs', purpose: 'Disk-persisted cache (~/.cache/archculars/aur.json) with 1h TTL for AUR queries.' },
	{ path: 'src/core/deps.rs', purpose: 'Dependency tree builder with cycle detection and reverse-dependency scanning.' },
	{ path: 'src/core/news.rs', purpose: 'feed-rs based parser for the archlinux.org news Atom feed.' },
	{ path: 'src/core/orphans.rs', purpose: 'Heuristic orphan detection + top-N largest packages by install size.' },
	{ path: 'src/core/pacman.rs', purpose: 'Spawns pacman / pkexec / paru / yay and streams stdout+stderr line-by-line over an mpsc channel.' },
	{ path: 'src/core/models.rs', purpose: 'Package, Source, Filter, DepNode, DepKind — the shared data model.' },
	{ path: 'src/ui/', purpose: 'Ratatui widgets: search bar, results table, info panel, deps / pkgbuild / install / updates / news / stats modals and the footer.' },
	{ path: 'src/theme.rs', purpose: 'Color palette: red accent, source-specific colors (AUR yellow, multilib blue, core/extra green).' }
];

export const STACK: StackEntry[] = [
	{ name: 'ratatui', role: 'TUI rendering', url: 'https://ratatui.rs/' },
	{ name: 'crossterm', role: 'Terminal input & mouse', url: 'https://github.com/crossterm-rs/crossterm' },
	{ name: 'alpm', role: 'libalpm bindings — local + sync DB', url: 'https://crates.io/crates/alpm' },
	{ name: 'pacmanconf', role: '/etc/pacman.conf parser', url: 'https://crates.io/crates/pacmanconf' },
	{ name: 'raur', role: 'AUR RPC v5 client', url: 'https://crates.io/crates/raur' },
	{ name: 'tokio', role: 'current-thread async runtime', url: 'https://tokio.rs/' },
	{ name: 'reqwest', role: 'HTTPS for PKGBUILDs & news', url: 'https://crates.io/crates/reqwest' },
	{ name: 'feed-rs', role: 'Atom/RSS parser for Arch news', url: 'https://crates.io/crates/feed-rs' },
	{ name: 'syntect', role: 'PKGBUILD syntax highlighting', url: 'https://crates.io/crates/syntect' },
	{ name: 'clap', role: 'CLI argument parsing', url: 'https://crates.io/crates/clap' }
];

export const TUI_PREVIEW = ` ─────────────────────────────────────────────────────────────
   archculars   modern TUI for Arch + AUR
 ─────────────────────────────────────────────────────────────
 / Search [enter] linux
 ─────────────────────── Packages · All · 47 results ────────
 ▶ linux            6.12.1.arch1-1   core    142 MB  ✓
   linux-zen        6.12.1.zen1-1    extra   148 MB  ✓
   linux-cachyos    6.12.1-1         AUR     151 MB  —
   linux-firmware   20250108.1-1     core     1.4 GB ✓
 ───────────────────────────────────────────────────────────
 / Search  ↑↓ Nav  Enter Install/Remove  d Deps  p PKGBUILD …`;
