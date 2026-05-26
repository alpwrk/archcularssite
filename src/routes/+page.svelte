<script lang="ts">
	import {
		META,
		FEATURES,
		KEYBINDINGS,
		CLI_ARGS,
		ARCHITECTURE,
		STACK,
		TUI_PREVIEW
	} from '$lib/content';

	const PANES = [
		{ id: 'about', label: 'about' },
		{ id: 'features', label: 'features' },
		{ id: 'install', label: 'install' },
		{ id: 'usage', label: 'usage' },
		{ id: 'keys', label: 'keys' },
		{ id: 'arch', label: 'arch' },
		{ id: 'stack', label: 'stack' }
	];

	let active = $state('about');

	let TIME = $state(new Date().toTimeString().split(' ')[0]);
	$effect(() => {
		const id = setInterval(() => {
			TIME = new Date().toTimeString().split(' ')[0];
		}, 1000);
		return () => clearInterval(id);
	});

	const W = 52;
	const LOGO_TAGLINE = 'modern TUI for Arch + AUR';
	const LOGO_VERSION = `v${META.version}  ·  ${META.license}  ·  rust 2021`;
	const row = (s: string) => '│' + s.padEnd(W, ' ') + '│';
	const LOGO = [
		'┌' + '─'.repeat(W) + '┐',
		row('  ███▄ ▄███▓  archculars'),
		row(`  ▓██▒▀█▀ ██▒ ${LOGO_TAGLINE}`),
		row(`  ▓██    ▓██░ ${LOGO_VERSION}`),
		'└' + '─'.repeat(W) + '┘'
	].join('\n');
</script>

<svelte:head>
	<title>archculars — {META.tagline}</title>
	<meta name="description" content={META.tagline} />
</svelte:head>

<div class="screen">
	<div class="frame">
		<div class="titlebar">
			<span class="tb-left">
				<span class="dot red"></span><span class="dot yellow"></span><span class="dot green"></span>
			</span>
			<span class="tb-title">visitor@archculars: ~ — archculars docs (tty1)</span>
			<span class="tb-right">{TIME}</span>
		</div>

		<div class="body">
			<header class="header">
				<pre class="logo">{LOGO}</pre>
				<div class="cta-line">
					<a href={META.repo} target="_blank" rel="noreferrer" class="cta-link">github →</a>
					<span class="sep">·</span>
					<span class="cta-hint">click a tab below to navigate</span>
				</div>
			</header>

			<nav class="tabs" aria-label="sections">
				{#each PANES as p, i}
					<button
						class="tab"
						class:active={active === p.id}
						onclick={() => (active = p.id)}
					>
						<span class="tab-key">[{i + 1}]</span>
						<span class="tab-label">{p.label}</span>
					</button>
				{/each}
			</nav>

			<div class="content">
				{#if active === 'about'}
					<section class="pane">
						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">archculars --help</span>
						</div>
						<div class="output">
							<p>
								<span class="ok">archculars</span> is a modern terminal UI for browsing and managing
								<span class="hi">Arch Linux + AUR</span> packages.
							</p>
							<p>
								Written in Rust on top of
								<a href="https://ratatui.rs/" target="_blank" rel="noreferrer">ratatui</a>
								and
								<a
									href="https://man.archlinux.org/man/libalpm.3.en"
									target="_blank"
									rel="noreferrer">libalpm</a
								>. A single statically-linked <span class="hi">{META.binarySize}</span> binary
								with async parallel repo + AUR search, live PKGBUILD viewer, dependency tree,
								upgrades, stats and Arch news — all without leaving the terminal.
							</p>
						</div>

						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">archculars linux</span>
						</div>
						<pre class="screenshot">{TUI_PREVIEW}</pre>

						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">pacman -Qi archculars</span>
						</div>
						<div class="kv">
							<div><span class="k">Name</span> <span class="v">{META.name}</span></div>
							<div><span class="k">Version</span> <span class="v">{META.version}</span></div>
							<div><span class="k">Description</span> <span class="v">{META.tagline}</span></div>
							<div><span class="k">License</span> <span class="v">{META.license}</span></div>
							<div><span class="k">Language</span> <span class="v">{META.language}</span></div>
							<div><span class="k">Binary size</span> <span class="v">{META.binarySize}</span></div>
							<div><span class="k">Maintainer</span> <span class="v">{META.author}</span></div>
							<div><span class="k">Repo</span> <span class="v"><a href={META.repo} target="_blank" rel="noreferrer">{META.repo}</a></span></div>
						</div>
					</section>
				{:else if active === 'features'}
					<section class="pane">
						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">archculars --features</span>
							<span class="count">{FEATURES.length} entries</span>
						</div>
						<div class="features-list">
							{#each FEATURES as f, i}
								<article class="feat">
									<header class="feat-head">
										<span class="feat-num">{String(i + 1).padStart(2, '0')}</span>
										<span class="feat-title">{f.title}</span>
										<span class="feat-short">// {f.short}</span>
									</header>
									<p class="feat-body">{f.body}</p>
								</article>
							{/each}
						</div>
					</section>
				{:else if active === 'install'}
					<section class="pane">
						<div class="prompt-line">
							<span class="prompt">#</span> <span class="cmd">install archculars</span>
						</div>

						<div class="step">
							<div class="step-head">
								<span class="step-num">[1/3]</span> build from source
							</div>
							<pre class="block">{`$ git clone https://github.com/alpwrk/archculars
$ cd archculars
$ cargo build --release
$ ./target/release/archculars`}</pre>
						</div>

						<div class="step">
							<div class="step-head">
								<span class="step-num">[2/3]</span> install as arch package
							</div>
							<pre class="block">{`$ cd archculars
$ makepkg -si
==> Making package: archculars ${META.version}-1
==> Checking runtime dependencies...
==> Checking buildtime dependencies...
==> Retrieving sources...
==> Starting build()...
   Compiling archculars v${META.version}
    Finished release [optimized] target(s)
==> Entering fakeroot environment...
==> Tidying install...
==> Creating package "archculars"...`}</pre>
						</div>

						<div class="step">
							<div class="step-head">
								<span class="step-num">[3/3]</span> optional dependencies
							</div>
							<ul class="opt">
								<li><span class="dep">paru</span> — preferred AUR helper</li>
								<li><span class="dep">yay</span> — alternative AUR helper</li>
								<li><span class="dep">polkit</span> — graphical sudo prompts via pkexec</li>
							</ul>
						</div>

						<div class="note">
							<span class="note-tag">[note]</span> Requires the <span class="hi">libalpm</span>
							headers (shipped with pacman) and a recent Rust toolchain. The release binary is a single
							<span class="hi">{META.binarySize}</span> self-contained executable.
						</div>
					</section>
				{:else if active === 'usage'}
					<section class="pane">
						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">archculars --help</span>
						</div>
						<pre class="block">{`Usage: archculars [OPTIONS] [QUERY]

Modern TUI for Arch Linux + AUR package management

Arguments:
  [QUERY]  Optional search term to populate the search bar on start

Options:
${CLI_ARGS.filter((a) => a.flag.startsWith('-'))
	.map(
		(a) =>
			'  ' + (a.flag + (a.long ? ', ' + a.long : '')).padEnd(26) + a.description
	)
	.join('\n')}
  -h, --help                  Print help
  -V, --version               Print version`}</pre>

						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">archculars --examples</span>
						</div>
						<pre class="block">{`# search the repos and AUR
$ archculars linux

# limit repo searches to core,extra
$ archculars -r core,extra

# open the upgrades view on start
$ archculars -u

# pre-select the "installed" filter
$ archculars -i firefox`}</pre>
					</section>
				{:else if active === 'keys'}
					<section class="pane">
						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">cat ~/.config/archculars/keybindings</span>
						</div>
						<div class="keys">
							{#each KEYBINDINGS as kb}
								<div class="key">
									<span class="kbd">{kb.key}</span>
									<span class="key-act">{kb.action}</span>
								</div>
							{/each}
						</div>
					</section>
				{:else if active === 'arch'}
					<section class="pane">
						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">tree -L 2 src/</span>
						</div>
						<div class="arch">
							{#each ARCHITECTURE as m, i}
								<div class="arch-row">
									<span class="arch-tree">{i === ARCHITECTURE.length - 1 ? '└──' : '├──'}</span>
									<span class="arch-path">{m.path}</span>
									<span class="arch-comment"># {m.purpose}</span>
								</div>
							{/each}
						</div>

						<div class="note">
							<span class="note-tag">[note]</span>
							<span class="hi">alpm::Alpm</span> is <span class="hi">!Send</span> — it owns raw FFI
							callbacks. The handle stays in a <span class="hi">RefCell</span> on the main thread; all
							long-running work (PKGBUILDs, AUR queries, news feed) lives on tokio tasks via
							<span class="hi">reqwest</span>.
						</div>
					</section>
				{:else if active === 'stack'}
					<section class="pane">
						<div class="prompt-line">
							<span class="prompt">$</span> <span class="cmd">cargo tree --depth 1</span>
						</div>
						<div class="stack">
							{#each STACK as s, i}
								<a class="stack-row" href={s.url} target="_blank" rel="noreferrer">
									<span class="stack-tree">{i === STACK.length - 1 ? '└──' : '├──'}</span>
									<span class="stack-name">{s.name}</span>
									<span class="stack-role">— {s.role}</span>
								</a>
							{/each}
						</div>
					</section>
				{/if}
			</div>

			<div class="statusbar">
				<span class="sb-section">
					<span class="sb-pill">NORMAL</span>
					<span class="sb-key">archculars/website</span>
				</span>
				<span class="sb-section">
					<span>pane: {active}</span>
					<span class="sep">|</span>
					<span>{PANES.findIndex((p) => p.id === active) + 1}/{PANES.length}</span>
					<span class="sep">|</span>
					<span>tab to switch · or click</span>
				</span>
			</div>
		</div>
	</div>

	<div class="caption">
		<a href={META.repo} target="_blank" rel="noreferrer">view source on github</a>
	</div>
</div>

<style>
	.screen {
		height: 100vh;
		height: 100dvh;
		max-height: 100vh;
		max-height: 100dvh;
		background: #0a0a0d;
		background-image:
			radial-gradient(ellipse at top, rgba(255, 85, 85, 0.04), transparent 60%),
			repeating-linear-gradient(
				0deg,
				rgba(255, 255, 255, 0.012),
				rgba(255, 255, 255, 0.012) 1px,
				transparent 1px,
				transparent 3px
			);
		color: #d4d4dc;
		font-family: 'JetBrains Mono', 'Fira Code', Menlo, Consolas, monospace;
		padding: 16px 18px 10px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 8px;
		overflow: hidden;
	}

	.frame {
		width: 100%;
		max-width: 1100px;
		flex: 1 1 auto;
		min-height: 0;
		background: #0d0d10;
		border: 1px solid #2a2a30;
		border-radius: 8px;
		box-shadow:
			0 30px 60px -25px rgba(0, 0, 0, 0.6),
			0 0 0 1px rgba(255, 85, 85, 0.05);
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.titlebar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 9px 14px;
		background: #16161b;
		border-bottom: 1px solid #2a2a30;
		font-size: 12px;
		flex-shrink: 0;
	}
	.tb-left {
		display: flex;
		gap: 6px;
	}
	.dot {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		display: inline-block;
	}
	.dot.red {
		background: #ff5f57;
	}
	.dot.yellow {
		background: #febc2e;
	}
	.dot.green {
		background: #28c840;
	}
	.tb-title {
		color: #7a7a85;
		font-size: 11.5px;
	}
	.tb-right {
		color: #7a7a85;
		font-size: 11.5px;
	}

	.body {
		padding: 18px 24px 0;
		font-size: 13.5px;
		line-height: 1.55;
		flex: 1 1 auto;
		min-height: 0;
		display: flex;
		flex-direction: column;
	}

	.header {
		margin-bottom: 12px;
		flex-shrink: 0;
	}
	.logo {
		margin: 0 0 8px;
		color: #ff5555;
		font-size: 12px;
		line-height: 1.35;
		white-space: pre;
		overflow-x: auto;
		/* Force a system monospace font for the logo: Google's JetBrains Mono
		   subset doesn't always ship the block-element glyphs (█▓▒░▄▀), and
		   the browser then falls back to a CJK/symbol font that renders them
		   at non-monospace widths — which is what broke alignment. System
		   monospace fonts ship these glyphs at proper 1ch width. */
		font-family:
			ui-monospace,
			'DejaVu Sans Mono',
			'Liberation Mono',
			'Cascadia Mono',
			'SF Mono',
			Menlo,
			Consolas,
			monospace;
		font-variant-ligatures: none;
		font-feature-settings:
			'liga' 0,
			'calt' 0,
			'kern' 0;
		letter-spacing: 0;
		font-synthesis: none;
		text-rendering: geometricPrecision;
	}
	.cta-line {
		display: flex;
		gap: 8px;
		align-items: center;
		font-size: 12.5px;
		color: #6a6a78;
	}
	.cta-link {
		color: #ff8866;
		text-decoration: none;
	}
	.cta-link:hover {
		color: #ff5555;
		text-decoration: underline;
	}
	.sep {
		color: #3a3a45;
	}
	.cta-hint {
		color: #5a5a66;
		font-style: italic;
	}
	.kbd {
		display: inline-block;
		padding: 1px 6px;
		background: #1f1f26;
		border: 1px solid #2f2f38;
		border-bottom-width: 2px;
		border-radius: 3px;
		color: #ffaaaa;
		font-size: 11.5px;
		font-weight: 500;
	}

	.tabs {
		display: flex;
		gap: 2px;
		border-bottom: 1px solid #2a2a30;
		margin-bottom: 0;
		flex-wrap: wrap;
		flex-shrink: 0;
	}
	.tab {
		font-family: inherit;
		background: transparent;
		border: 1px solid transparent;
		border-bottom: none;
		color: #7a7a85;
		padding: 7px 14px;
		cursor: pointer;
		font-size: 12.5px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		transition: all 0.12s;
		display: flex;
		gap: 6px;
		align-items: center;
	}
	.tab:hover {
		color: #d4d4dc;
		background: #14141a;
	}
	.tab.active {
		color: #ff5555;
		background: #0d0d10;
		border-color: #2a2a30;
		position: relative;
		top: 1px;
	}
	.tab-key {
		opacity: 0.5;
		font-size: 11px;
	}

	.content {
		padding: 18px 4px 18px;
		flex: 1 1 auto;
		min-height: 0;
		overflow-y: auto;
		overflow-x: hidden;
		border-bottom: 1px solid #2a2a30;
		scrollbar-width: thin;
		scrollbar-color: #2a2a30 transparent;
	}
	.content::-webkit-scrollbar {
		width: 8px;
	}
	.content::-webkit-scrollbar-thumb {
		background: #2a2a30;
		border-radius: 4px;
	}
	.content::-webkit-scrollbar-thumb:hover {
		background: #3a3a45;
	}

	.prompt-line {
		display: flex;
		align-items: baseline;
		gap: 8px;
		margin: 0 0 10px;
		font-size: 13px;
	}
	.prompt-line + .prompt-line,
	.block + .prompt-line,
	.kv + .prompt-line,
	.screenshot + .prompt-line {
		margin-top: 22px;
	}
	.prompt {
		color: #ff5555;
		font-weight: 600;
	}
	.cmd {
		color: #c8c8d4;
	}
	.count {
		margin-left: auto;
		color: #5a5a66;
		font-size: 11.5px;
	}

	.output {
		margin-bottom: 18px;
	}
	.output p {
		margin: 0 0 8px;
		color: #b8b8c4;
	}
	.output a,
	.kv a {
		color: #ff8866;
	}
	.output a:hover,
	.kv a:hover {
		color: #ff5555;
	}
	.ok {
		color: #6acc6a;
	}
	.hi {
		color: #ff8866;
	}

	.screenshot {
		margin: 0 0 6px;
		padding: 14px 12px;
		background: #050507;
		border: 1px solid #1a1a22;
		border-radius: 4px;
		color: #c8c8d4;
		font-size: 12.5px;
		line-height: 1.5;
		white-space: pre;
		overflow-x: auto;
	}

	.kv {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 4px 28px;
		padding: 12px 14px;
		background: #050507;
		border: 1px solid #1a1a22;
		border-radius: 4px;
		font-size: 12.5px;
	}
	.k {
		display: inline-block;
		width: 108px;
		color: #6a6a78;
	}
	.v {
		color: #d4d4dc;
	}

	/* features pane */
	.features-list {
		display: grid;
		gap: 4px;
	}
	.feat {
		padding: 10px 12px;
		border-left: 2px solid #2a2a30;
		transition: border-color 0.12s;
	}
	.feat:hover {
		border-left-color: #ff5555;
	}
	.feat-head {
		display: flex;
		gap: 10px;
		align-items: baseline;
		flex-wrap: wrap;
	}
	.feat-num {
		color: #4a4a55;
		font-size: 11.5px;
	}
	.feat-title {
		color: #ff8866;
		font-weight: 500;
	}
	.feat-short {
		color: #5a5a66;
		font-size: 12px;
	}
	.feat-body {
		margin: 4px 0 0;
		padding-left: 38px;
		color: #b8b8c4;
		font-size: 12.5px;
		line-height: 1.6;
	}

	/* install pane */
	.step {
		margin-bottom: 18px;
	}
	.step-head {
		display: flex;
		gap: 10px;
		align-items: center;
		margin-bottom: 8px;
		color: #c8c8d4;
		font-size: 13px;
	}
	.step-num {
		color: #ff5555;
		font-weight: 600;
	}
	.block {
		margin: 0;
		padding: 14px 16px;
		background: #050507;
		border: 1px solid #1a1a22;
		border-radius: 4px;
		color: #c8c8d4;
		font-size: 12.5px;
		line-height: 1.55;
		white-space: pre;
		overflow-x: auto;
	}

	.opt {
		margin: 4px 0 0;
		padding-left: 20px;
		font-size: 12.5px;
		color: #b8b8c4;
	}
	.opt li {
		margin-bottom: 3px;
	}
	.dep {
		color: #ff8866;
	}

	.note {
		margin-top: 14px;
		padding: 10px 12px;
		background: rgba(255, 85, 85, 0.04);
		border-left: 2px solid #ff5555;
		font-size: 12.5px;
		color: #b8b8c4;
		line-height: 1.6;
	}
	.note-tag {
		color: #ff5555;
		margin-right: 6px;
		font-weight: 600;
	}

	/* keys pane */
	.keys {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
		gap: 4px;
		padding: 12px 0;
	}
	.key {
		display: flex;
		gap: 12px;
		align-items: center;
		padding: 5px 6px;
	}
	.key-act {
		color: #b8b8c4;
		font-size: 12.5px;
	}

	/* arch pane */
	.arch {
		font-size: 12.5px;
		padding: 12px 14px;
		background: #050507;
		border: 1px solid #1a1a22;
		border-radius: 4px;
		overflow-x: auto;
	}
	.arch-row {
		display: flex;
		gap: 8px;
		align-items: baseline;
		padding: 1px 0;
		white-space: nowrap;
	}
	.arch-tree {
		color: #3a3a45;
	}
	.arch-path {
		color: #ff8866;
		min-width: 220px;
	}
	.arch-comment {
		color: #6a6a78;
		white-space: normal;
	}

	/* stack pane */
	.stack {
		font-size: 12.5px;
		padding: 12px 14px;
		background: #050507;
		border: 1px solid #1a1a22;
		border-radius: 4px;
	}
	.stack-row {
		display: flex;
		gap: 8px;
		align-items: baseline;
		padding: 2px 0;
		text-decoration: none;
		color: inherit;
	}
	.stack-row:hover .stack-name {
		color: #ff5555;
	}
	.stack-tree {
		color: #3a3a45;
	}
	.stack-name {
		color: #ff8866;
		min-width: 130px;
		transition: color 0.12s;
	}
	.stack-role {
		color: #6a6a78;
	}

	.statusbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 7px 14px;
		font-size: 11.5px;
		color: #7a7a85;
		background: #050507;
		margin: 0 -24px;
		flex-wrap: wrap;
		gap: 10px;
		flex-shrink: 0;
	}
	.sb-section {
		display: flex;
		gap: 8px;
		align-items: center;
	}
	.sb-pill {
		background: #ff5555;
		color: #050507;
		padding: 2px 8px;
		border-radius: 2px;
		font-weight: 600;
		letter-spacing: 0.04em;
	}
	.sb-key {
		color: #c8c8d4;
	}

	.caption {
		font-size: 11.5px;
		color: #5a5a66;
		display: flex;
		gap: 12px;
		flex-shrink: 0;
	}
	.caption a {
		color: #7a7a85;
		text-decoration: none;
	}
	.caption a:hover {
		color: #ff5555;
	}

	@media (max-width: 720px) {
		.screen {
			padding: 10px 10px 6px;
		}
		.body {
			padding: 14px 14px 0;
			font-size: 12.5px;
		}
		.statusbar {
			margin: 0 -14px;
		}
		.logo {
			font-size: 9px;
		}
		.kv {
			grid-template-columns: 1fr;
		}
		.tab {
			padding: 6px 10px;
			font-size: 12px;
		}
	}
	@media (max-height: 720px) {
		.logo {
			font-size: 10.5px;
			line-height: 1.3;
		}
		.body {
			padding-top: 12px;
		}
		.header {
			margin-bottom: 8px;
		}
		.content {
			padding: 12px 4px;
		}
	}
</style>
