# archculars website

Landing page für [archculars](https://github.com/alpwrk/archculars) — einem modernen Terminal-UI für die Paketverwaltung von Arch Linux + AUR.

Die Seite stellt das Projekt im Stil eines Terminal-Fensters dar und enthält alle Infos zu Features, Installation, Bedienung, Architektur und Stack.

## Inhalt

- **about** — was archculars ist, mit Paketinfos und TUI-Preview
- **features** — Async-Search, PKGBUILD-Viewer, Dependency-Tree, Upgrades, Arch-News, Stats und mehr
- **install** — Build aus Source und Installation als Arch-Paket via `makepkg -si`
- **usage** — CLI-Flags und Beispielaufrufe
- **keys** — komplette Liste der Keybindings
- **arch** — Modulübersicht des Rust-Quellbaums
- **stack** — verwendete Crates (ratatui, alpm, raur, tokio, syntect …)

## Über archculars

- Geschrieben in **Rust 2021** auf Basis von [ratatui](https://ratatui.rs/) und [libalpm](https://man.archlinux.org/man/libalpm.3.en)
- Eine einzige statisch gelinkte Binary, ~9 MB
- Parallele Suche in Repos und AUR mit On-Disk-Cache (1h TTL)
- Live-PKGBUILD-Viewer mit Syntax-Highlighting
- Dependency-Tree mit Cycle-Detection
- Upgrades via `alpm::vercmp`, Arch-News via offiziellem RSS-Feed
- Install/Remove über `pkexec pacman` bzw. `paru`/`yay`
- Lizenz: MIT

## Tech

SvelteKit + TypeScript, statisch gebaut mit `@sveltejs/adapter-static`.

## Links

- Projekt: <https://github.com/alpwrk/archculars>
- Maintainer: x@alpwrk.cc
