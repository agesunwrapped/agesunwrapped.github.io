/* Ages Unwrapped illustrations. Shared by the site, the pin template and the share card.
   Every drawing is original: no brand logos and no character artwork.
   Products are drawn on a 120 x 120 box and tinted by their color (--c main, --cd deep, --cs soft). */
(function () {
  "use strict";

  const INK = "#241B35";
  const COLORS = {
    tomato: { c: "#FF5B3A", d: "#D9401F", s: "#FFE1D8" },
    sun:    { c: "#FFC233", d: "#E09A00", s: "#FFF1C9" },
    teal:   { c: "#19B9A8", d: "#0E8F82", s: "#D3F4EF" },
    grape:  { c: "#7B61FF", d: "#5B41E0", s: "#E7E1FF" },
    pink:   { c: "#FF7FB6", d: "#E5568F", s: "#FFE2EF" }
  };
  const ITEM_COLOR = {
    walker: "sun", words: "teal", elmo: "tomato", tonies: "grape", echo: "grape", printcam: "teal",
    yoshi: "pink", botley: "sun", megalodon: "teal", furblet: "pink", legopoke: "sun", snap: "tomato"
  };
  const vars = key => { const k = COLORS[key] || COLORS.sun; return `--c:${k.c};--cd:${k.d};--cs:${k.s}`; };

  const ART_CSS = `
.au-o{stroke:${INK};stroke-width:3;stroke-linejoin:round;stroke-linecap:round}
.au-c{fill:var(--c)}.au-d{fill:var(--cd)}.au-s{fill:var(--cs)}.au-w{fill:#fff}.au-k{fill:${INK}}
.au-l{fill:none;stroke-linecap:round;stroke-linejoin:round}
.au-tom{fill:#FF5B3A}.au-sun{fill:#FFC233}.au-tea{fill:#19B9A8}.au-gra{fill:#7B61FF}.au-pin{fill:#FF7FB6}
.au-t{font-family:"Bricolage Grotesque","Arial Black",system-ui,sans-serif;font-weight:800}`;

  /* Small helpers */
  const dots = (x0, y0, cols, rows, step, r, cls, op) => {
    let s = `<g class="${cls}"${op ? ` opacity="${op}"` : ""}>`;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) s += `<circle cx="${x0 + i * step}" cy="${y0 + j * step}" r="${r}"/>`;
    return s + "</g>";
  };
  const star = (x, y, r, fill) => `<path d="M${x} ${y - r}C${x + r * 0.16} ${y - r * 0.16} ${x + r * 0.16} ${y - r * 0.16} ${x + r} ${y}C${x + r * 0.16} ${y + r * 0.16} ${x + r * 0.16} ${y + r * 0.16} ${x} ${y + r}C${x - r * 0.16} ${y + r * 0.16} ${x - r * 0.16} ${y + r * 0.16} ${x - r} ${y}C${x - r * 0.16} ${y - r * 0.16} ${x - r * 0.16} ${y - r * 0.16} ${x} ${y - r}Z" fill="${fill}"/>`;
  /* A fuzzy circle for plush toys: bumps all the way around. */
  const fuzz = (cx, cy, r, n, bump) => {
    let d = "";
    for (let i = 0; i <= n; i++) {
      const a = (i / n) * Math.PI * 2 - Math.PI / 2, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r;
      if (i === 0) { d += `M${x.toFixed(1)} ${y.toFixed(1)}`; continue; }
      const m = a - Math.PI / n, mx = cx + Math.cos(m) * (r + bump), my = cy + Math.sin(m) * (r + bump);
      d += `Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }
    return d + "Z";
  };
  /* A brick stud seen from the front: a short cylinder. */
  const stud = (x, y, w, cls) => `<path class="${cls} au-o" d="M${x} ${y + 7}v-6a${w / 2} 3.2 0 0 1 ${w} 0v6z"/><ellipse class="${cls} au-o" cx="${x + w / 2}" cy="${y + 1}" rx="${w / 2}" ry="3.2"/>`;

  const ART = {
    /* VTech Sit-to-Stand Learning Walker: handle, play panel, piano keys, wheels */
    walker:
      `<path class="au-l" d="M30 52V30a11 11 0 0 1 11-11h38a11 11 0 0 1 11 11v22" stroke="${INK}" stroke-width="11"/>` +
      `<path class="au-l" d="M30 52V30a11 11 0 0 1 11-11h38a11 11 0 0 1 11 11v22" stroke="var(--cs)" stroke-width="5"/>` +
      `<path class="au-d au-o" d="M16 86h88l-6 12H22z"/>` +
      `<rect class="au-c au-o" x="18" y="42" width="84" height="48" rx="13"/>` +
      `<circle class="au-tom au-o" cx="36" cy="59" r="8"/>` + star(36, 59, 4.5, "#fff") +
      `<circle class="au-tea au-o" cx="56" cy="56" r="5.5"/><circle class="au-gra au-o" cx="71" cy="56" r="5.5"/>` +
      dots(85, 52, 3, 2, 5.2, 1.6, "au-k") +
      `<rect class="au-w au-o" x="29" y="70" width="62" height="12" rx="3.5"/>` +
      `<path class="au-l" d="M41.4 70v12M53.8 70v12M66.2 70v12M78.6 70v12" stroke="${INK}" stroke-width="2"/>` +
      `<circle class="au-k" cx="31" cy="101" r="11"/><circle class="au-w" cx="31" cy="101" r="4"/>` +
      `<circle class="au-k" cx="89" cy="101" r="11"/><circle class="au-w" cx="89" cy="101" r="4"/>`,

    /* LeapFrog 100 Words Book: an open board book with picture tiles and a big star button */
    words:
      `<path class="au-d au-o" d="M10 38q50-12 100 0v60q-50-12-100 0z"/>` +
      `<path class="au-w au-o" d="M17 36q22-7 43 2v58q-21-9-43-2z"/>` +
      `<path class="au-w au-o" d="M103 36q-22-7-43 2v58q21-9 43-2z"/>` +
      `<circle class="au-tom" cx="29" cy="52" r="6.5"/><path class="au-l" d="M29 45.5q1-4 4-5" stroke="${INK}" stroke-width="2"/>` +
      `<rect class="au-sun" x="40" y="45" width="12" height="12" rx="2.5"/>` +
      `<path class="au-gra" d="M29 64l7.5 12.5h-15z"/>` +
      `<circle class="au-tea" cx="46" cy="71" r="6.5"/>` +
      `<circle class="au-c au-o" cx="82" cy="58" r="14"/>` + star(82, 58, 8, "#fff") +
      `<circle class="au-k" cx="73" cy="83" r="2.2"/><circle class="au-k" cx="82" cy="84" r="2.2"/><circle class="au-k" cx="91" cy="83" r="2.2"/>`,

    /* Tickle Me Elmo Giggle Max: drawn as the giggle itself, a laugh bubble and a tickle feather */
    elmo:
      `<path class="au-w au-o" d="M19 16h82a11 11 0 0 1 11 11v34a11 11 0 0 1-11 11H58L41 87V72H19A11 11 0 0 1 8 61V27a11 11 0 0 1 11-11z"/>` +
      `<text class="au-t" x="60" y="53" text-anchor="middle" font-size="25" letter-spacing="-.5" fill="${INK}">HA HA!</text>` +
      `<g transform="rotate(-28 82 96)">` +
        `<path class="au-c au-o" d="M52 96c12-15 44-15 58 0-14 10-46 10-58 0z"/>` +
        `<path class="au-l" d="M62 96l-5-6M72 96l-5-7M82 96l-5-7M92 96l-5-6M62 96l-5 6M72 96l-5 7M82 96l-5 7M92 96l-5 6" stroke="var(--cd)" stroke-width="2.2"/>` +
        `<path class="au-l" d="M44 96h64" stroke="${INK}" stroke-width="3"/>` +
      `</g>` +
      `<path class="au-l" d="M16 92l-7 3M22 103l-6 6M33 108l-2 7" stroke="${INK}" stroke-width="3"/>`,

    /* Toniebox Lite: a soft cube speaker with ears, a figure on top and a music note */
    tonies:
      `<rect class="au-d au-o" x="24" y="46" width="17" height="14" rx="6"/><rect class="au-d au-o" x="79" y="46" width="17" height="14" rx="6"/>` +
      `<rect class="au-c au-o" x="20" y="52" width="80" height="60" rx="15"/>` +
      dots(33, 70, 7, 4, 9, 1.7, "au-d", ".75") +
      `<rect class="au-w" x="27" y="58" width="5" height="44" rx="2.5" opacity=".35"/>` +
      `<rect class="au-sun au-o" x="49" y="33" width="22" height="22" rx="7"/>` +
      `<circle class="au-sun au-o" cx="60" cy="26" r="10"/>` +
      `<circle class="au-k" cx="56.5" cy="25.5" r="1.6"/><circle class="au-k" cx="63.5" cy="25.5" r="1.6"/>` +
      `<path class="au-l" d="M57 30q3 2.4 6 0" stroke="${INK}" stroke-width="1.8"/>` +
      `<path class="au-k" d="M98 12.5l13-4v16.5a5 5 0 1 1-2.6-4.4V14.6l-7.8 2.4v13.2a5 5 0 1 1-2.6-4.4z"/>`,

    /* Hatchin' Yoshi: drawn as a generic speckled egg cracking open, two eyes peeking out (not the character) */
    yoshi:
      `<ellipse class="au-k" cx="60" cy="109" rx="34" ry="5" opacity=".12"/>` +
      `<path class="au-l" d="M15 70q-7 10 0 20M105 70q7 10 0 20" stroke="${INK}" stroke-width="3"/>` +
      `<path class="au-k" d="M31 62q29-12 58 0v12H31z"/>` +
      `<circle class="au-w" cx="51" cy="66" r="5"/><circle class="au-w" cx="69" cy="66" r="5"/>` +
      `<circle class="au-k" cx="52.5" cy="67" r="2.4"/><circle class="au-k" cx="70.5" cy="67" r="2.4"/>` +
      `<path class="au-w au-o" d="M29 68l8 7 8-8 8 8 7-8 7 8 8-8 8 8 7-7c2 4 3 8 3 13 0 20-15 33-31 33S29 96 29 76c0-3 0-5 0-8z"/>` +
      `<circle class="au-c" cx="44" cy="92" r="5.5"/><circle class="au-sun" cx="68" cy="99" r="4.5"/><circle class="au-c" cx="79" cy="84" r="4"/><circle class="au-sun" cx="52" cy="104" r="3"/>` +
      `<g transform="rotate(-18 30 52)">` +
        `<path class="au-w au-o" d="M30 56c0-23 13-39 30-39s30 16 30 39l-7-6-8 8-8-8-7 8-7-8-8 8-8-8z"/>` +
        `<circle class="au-c" cx="48" cy="34" r="5"/><circle class="au-sun" cx="68" cy="30" r="4"/><circle class="au-c" cx="76" cy="44" r="3.4"/>` +
      `</g>` +
      star(98, 22, 8, "#FFC233") + star(20, 30, 5.5, "#19B9A8"),

    /* Primal Hatch Megalodon: a generic cartoon shark bursting out of a cracked egg */
    megalodon:
      `<ellipse class="au-k" cx="60" cy="110" rx="44" ry="5" opacity=".12"/>` +
      `<circle class="au-w au-o" cx="16" cy="40" r="4"/><circle class="au-w au-o" cx="26" cy="26" r="3"/><circle class="au-w au-o" cx="108" cy="78" r="3.5"/>` +
      `<path class="au-d au-o" d="M44 46L36 20l26 16z"/>` +
      `<path class="au-c au-o" d="M22 96C24 66 42 40 70 28c14-6 28-6 38-1-2 10-6 19-13 25l-12 1 13 8c-9 12-25 21-44 25-12 3-22 6-30 10z"/>` +
      `<path class="au-s" d="M30 94c18-6 36-12 52-26l13 0c-9 12-25 21-44 25-8 2-15 3-21 1z"/>` +
      `<path class="au-w" d="M95 52l-3 4-3-4-3 4-3-3zM84 61l3 3 3-3 3 3 3-3z"/>` +
      `<circle class="au-sun au-o" cx="90" cy="36" r="5.5"/><circle class="au-k" cx="91" cy="36" r="2.4"/>` +
      `<path class="au-l" d="M64 52q-4 7 0 14M71 49q-4 7 0 14" stroke="var(--cd)" stroke-width="3"/>` +
      `<path class="au-w au-o" d="M14 90l9 7 9-8 9 8 9-8 9 8 9-8 9 8 9-8 9 8 8-7-5 20H19z"/>` +
      `<path class="au-l" d="M30 104h60" stroke="var(--cs)" stroke-width="3"/>`,

    /* VTech KidiZoom PrintCam: a chunky kid camera printing a photo */
    printcam:
      `<g transform="rotate(-7 60 30)">` +
        `<rect class="au-w au-o" x="38" y="6" width="44" height="42" rx="3"/>` +
        `<rect x="43" y="11" width="34" height="27" rx="2" fill="#E9E4F4"/>` +
        `<circle cx="70" cy="18" r="4" fill="#B9B0CF"/><path d="M43 38l11-12 8 8 6-6 9 10z" fill="#B9B0CF"/>` +
      `</g>` +
      `<rect class="au-d au-o" x="20" y="34" width="22" height="10" rx="4"/>` +
      `<rect class="au-c au-o" x="12" y="40" width="96" height="64" rx="17"/>` +
      `<rect class="au-k" x="44" y="40" width="40" height="5" rx="2.5"/>` +
      `<circle class="au-w au-o" cx="60" cy="73" r="23"/>` +
      `<circle class="au-k" cx="60" cy="73" r="15.5"/><circle class="au-tea" cx="60" cy="73" r="9"/>` +
      `<circle class="au-w" cx="55" cy="68" r="3.6"/>` +
      `<rect class="au-sun au-o" x="87" y="49" width="13" height="10" rx="2.5"/>` +
      `<rect class="au-w" x="18" y="50" width="5" height="44" rx="2.5" opacity=".35"/>`,

    /* Botley 2.0: a friendly little robot with arrow coding cards */
    botley:
      `<rect class="au-k" x="31" y="98" width="20" height="11" rx="5.5"/><rect class="au-k" x="69" y="98" width="20" height="11" rx="5.5"/>` +
      `<path class="au-c au-o" d="M23 72h74v12a17 17 0 0 1-17 17H40a17 17 0 0 1-17-17z"/>` +
      `<path class="au-w au-o" d="M23 74c0-28 16-46 37-46s37 18 37 46z"/>` +
      `<rect class="au-k" x="35" y="48" width="50" height="21" rx="10.5"/>` +
      `<rect class="au-tea" x="44" y="53" width="9" height="11" rx="4.5"/><rect class="au-tea" x="67" y="53" width="9" height="11" rx="4.5"/>` +
      `<path class="au-l" d="M60 28v-9" stroke="${INK}" stroke-width="3"/><circle class="au-tom au-o" cx="60" cy="16" r="4.5"/>` +
      `<g transform="rotate(-12 15 94)"><rect class="au-w au-o" x="3" y="82" width="23" height="23" rx="4.5"/><path class="au-l" d="M14.5 99V88.5m-4.5 4.5 4.5-4.5 4.5 4.5" stroke="var(--cd)" stroke-width="3"/></g>` +
      `<g transform="rotate(11 105 94)"><rect class="au-w au-o" x="94" y="82" width="23" height="23" rx="4.5"/><path class="au-l" d="M100 98.5v-4a5 5 0 0 1 5-5h6m-3.5-3.5 3.5 3.5-3.5 3.5" stroke="var(--cd)" stroke-width="3"/></g>`,

    /* Echo Pop Kids: a half-dome speaker with a light bar and a happy face */
    echo:
      `<ellipse class="au-k" cx="58" cy="108" rx="42" ry="5.5" opacity=".12"/>` +
      `<path class="au-d au-o" d="M16 72a42 42 0 0 1 84 0c0 20-18 34-42 34S16 92 16 72z"/>` +
      `<ellipse class="au-c au-o" cx="58" cy="76" rx="37" ry="28"/>` +
      dots(34, 66, 7, 3, 8, 1.6, "au-d", ".55") +
      `<path class="au-l" d="M37 54q21-9 42 0" stroke="${INK}" stroke-width="9"/><path class="au-l" d="M37 54q21-9 42 0" stroke="#7CF2E2" stroke-width="4.5"/>` +
      `<circle class="au-k" cx="48" cy="77" r="4"/><circle class="au-k" cx="68" cy="77" r="4"/>` +
      `<path class="au-l" d="M51 87q7 6 14 0" stroke="${INK}" stroke-width="3"/>` +
      `<path class="au-l" d="M104 56q8 11 0 22M110 47q15 20 0 40" stroke="${INK}" stroke-width="3"/>`,

    /* KPop Demon Hunters Furblets: a generic fuzzy keychain plush with sparkles (not the character) */
    furblet:
      `<circle cx="60" cy="15" r="9" fill="none" stroke="${INK}" stroke-width="3.5"/>` +
      `<rect class="au-gra au-o" x="55" y="21" width="10" height="13" rx="3.5"/>` +
      `<path class="au-c au-o" d="${fuzz(60, 72, 34, 18, 5)}"/>` +
      `<ellipse class="au-s" cx="60" cy="88" rx="19" ry="13"/>` +
      `<circle class="au-w au-o" cx="48" cy="66" r="11"/><circle class="au-w au-o" cx="72" cy="66" r="11"/>` +
      `<circle class="au-k" cx="50" cy="68" r="5.6"/><circle class="au-k" cx="70" cy="68" r="5.6"/>` +
      `<circle class="au-w" cx="52" cy="65.5" r="2"/><circle class="au-w" cx="72" cy="65.5" r="2"/>` +
      `<path class="au-l" d="M55 81q5 4 10 0" stroke="${INK}" stroke-width="2.6"/>` +
      star(17, 40, 9, "#FFC233") + star(104, 30, 7, "#19B9A8") + star(106, 98, 6, "#FFC233"),

    /* LEGO Pokémon SMART Play: a studded brick with a glowing light panel and a spark (no characters) */
    legopoke:
      `<path class="au-l" d="M16 34l-8-6M14 50H4M60 22V10M44 26l-6-9" stroke="var(--cd)" stroke-width="3.2"/>` +
      `<path class="au-d au-o" d="M90 56l16-13v42l-16 13z"/>` +
      `<path class="au-s au-o" d="M16 56l16-13h74l-16 13z"/>` +
      stud(30, 43, 13, "au-c") + stud(50, 43, 13, "au-c") + stud(70, 43, 13, "au-c") +
      `<rect class="au-c au-o" x="16" y="56" width="74" height="42" rx="4"/>` +
      `<rect class="au-w au-o" x="28" y="66" width="50" height="22" rx="7"/>` +
      `<rect class="au-tea" x="33" y="71" width="40" height="12" rx="5"/>` +
      `<rect class="au-w" x="37" y="74" width="16" height="3.5" rx="1.75" opacity=".7"/>` +
      `<path class="au-sun au-o" d="M100 4l-15 23h10.5l-8.5 19 19-26h-10.5l8.5-16z"/>`,

    /* Snap Circuits Jr.: a grid board with a snap wire, a battery block and a glowing bulb */
    snap:
      `<rect class="au-w au-o" x="8" y="24" width="104" height="80" rx="9"/>` +
      dots(18, 34, 11, 8, 9.4, 1.4, "au-s") +
      `<path class="au-l" d="M27 44H93" stroke="${INK}" stroke-width="10"/><path class="au-l" d="M27 44H93" stroke="var(--c)" stroke-width="5.5"/>` +
      `<path class="au-l" d="M93 44v22" stroke="${INK}" stroke-width="10"/><path class="au-l" d="M93 44v22" stroke="var(--c)" stroke-width="5.5"/>` +
      `<circle class="au-k" cx="27" cy="44" r="5.5"/><circle class="au-w" cx="27" cy="44" r="2"/><circle class="au-k" cx="93" cy="44" r="5.5"/><circle class="au-w" cx="93" cy="44" r="2"/>` +
      `<rect class="au-k" x="16" y="56" width="40" height="36" rx="5"/>` +
      `<path class="au-l" d="M27 69v8M23 73h8M45 73h8" stroke="#fff" stroke-width="2.6"/>` +
      `<rect class="au-tom" x="16" y="56" width="40" height="7" rx="3"/>` +
      `<path class="au-l" d="M93 58l-5-6M101 64l7-3M93 92v7" stroke="var(--cd)" stroke-width="3" opacity="0"/>` +
      `<circle class="au-sun au-o" cx="88" cy="79" r="13"/>` +
      `<path class="au-l" d="M84 79q4-7 8 0" stroke="${INK}" stroke-width="2.2"/>` +
      `<path class="au-l" d="M70 66l-6-5M106 66l6-5M108 82h7M68 82h-6" stroke="var(--cd)" stroke-width="3"/>`
  };

  /* One product drawing as a standalone SVG. */
  const art = (id, extra) => ART[id]
    ? `<svg class="art" viewBox="0 0 120 120" style="${vars(ITEM_COLOR[id])}" aria-hidden="true" focusable="false"${extra || ""}><g class="art__g">${ART[id]}</g></svg>`
    : "";

  /* The white sticker outline and drop under each drawing. Put this once on any page that uses art(). */
  const DEFS = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<filter id="au-sticker" x="-25%" y="-25%" width="150%" height="150%" color-interpolation-filters="sRGB">
<feMorphology in="SourceAlpha" operator="dilate" radius="3.6" result="grow"/>
<feFlood flood-color="#fff" result="white"/><feComposite in="white" in2="grow" operator="in" result="rim"/>
<feOffset in="grow" dx="0" dy="4.5" result="drop"/><feFlood flood-color="${INK}" flood-opacity=".16"/><feComposite in2="drop" operator="in" result="shadow"/>
<feMerge><feMergeNode in="shadow"/><feMergeNode in="rim"/><feMergeNode in="SourceGraphic"/></feMerge>
</filter></defs></svg>`;

  /* Gift boxes for each age, 1 to 12: body color and ribbon color. */
  const BOX = [
    null,
    ["tomato", "sun"], ["teal", "pink"], ["sun", "grape"], ["grape", "sun"],
    ["pink", "teal"], ["sun", "tomato"], ["teal", "sun"], ["tomato", "grape"],
    ["grape", "pink"], ["pink", "sun"], ["sun", "teal"], ["teal", "tomato"]
  ];
  const boxColors = n => { const [a, b] = BOX[n] || BOX[1]; return { a: COLORS[a].c, ad: COLORS[a].d, b: COLORS[b].c }; };

  /* A wrapped box with a number sticker. opts.label adds an accessible name (for buttons, the button carries it instead). */
  function box(n, opts) {
    const o = opts || {}, k = boxColors(n), big = String(n).length > 1;
    return `<svg class="gbox" viewBox="0 0 120 140" style="--a:${k.a};--ad:${k.ad};--b:${k.b}" aria-hidden="true" focusable="false">
<ellipse cx="60" cy="133" rx="47" ry="5" fill="${INK}" opacity=".13"/>
<g class="gbox__body">
<rect x="16" y="64" width="88" height="66" rx="8" fill="var(--a)" stroke="${INK}" stroke-width="3"/>
<path d="M22 70h76" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".3"/>
<rect x="52" y="64" width="16" height="66" fill="var(--b)" stroke="${INK}" stroke-width="3"/>
<circle cx="60" cy="98" r="${big ? 21 : 19}" fill="#fff" stroke="${INK}" stroke-width="3"/>
<text class="au-t" x="60" y="${big ? 107 : 108}" text-anchor="middle" font-size="${big ? 25 : 29}" letter-spacing="${big ? -1.6 : 0}" fill="${INK}">${n}</text>
</g>
<g class="gbox__lid">
<rect x="10" y="47" width="100" height="21" rx="6" fill="var(--a)" stroke="${INK}" stroke-width="3"/>
<rect x="52" y="47" width="16" height="21" fill="var(--b)" stroke="${INK}" stroke-width="3"/>
<path d="M60 47c-5-15-27-22-30-9-1.5 7 12 9.5 30 9z" fill="var(--b)" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
<path d="M60 47c5-15 27-22 30-9 1.5 7-12 9.5-30 9z" fill="var(--b)" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
<path d="M58 46c-2.5 6-6.5 11-11.5 13M62 46c2.5 6 6.5 11 11.5 13" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
<rect x="53.5" y="39" width="13" height="10" rx="3.5" fill="var(--b)" stroke="${INK}" stroke-width="3"/>
</g>
${o.confetti ? `<g class="gbox__pop">${star(24, 30, 7, "#FFC233")}${star(98, 24, 6, "#19B9A8")}${star(104, 52, 4.5, "#FF7FB6")}</g>` : ""}
</svg>`;
  }

  /* The gift pile in the list drawer: up to 12 wrapped boxes in a pyramid, filled bottom row first. */
  const PILE = [
    [30, 80, 40], [90, 80, 40], [150, 80, 40], [210, 80, 40], [270, 80, 40],
    [60, 42, 36], [120, 42, 36], [180, 42, 36], [240, 42, 36],
    [90, 8, 32], [150, 8, 32], [210, 8, 32]
  ];
  function pile(colorKeys) {
    const list = (colorKeys || []).slice(0, 12);
    const body = PILE.map(([x, y, h], i) => {
      const key = list[i];
      if (!key) return `<rect x="${x + 1.5}" y="${y + 1.5}" width="53" height="${h - 3}" rx="6" fill="none" stroke="${INK}" stroke-width="1.6" stroke-dasharray="4 4" opacity=".22"/>`;
      const c = COLORS[key] || COLORS.sun, rib = key === "sun" ? COLORS.tomato.c : COLORS.sun.c;
      return `<g><rect x="${x + 1.5}" y="${y + 1.5}" width="53" height="${h - 3}" rx="6" fill="${c.c}" stroke="${INK}" stroke-width="2.6"/>` +
        `<rect x="${x + 22}" y="${y + 1.5}" width="12" height="${h - 3}" fill="${rib}" stroke="${INK}" stroke-width="2.6"/>` +
        `<path d="M${x + 28} ${y + 2}c-3-7-12-9-13-3-.5 3 6 3.6 13 3zM${x + 28} ${y + 2}c3-7 12-9 13-3 .5 3-6 3.6-13 3z" fill="${rib}" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/></g>`;
    }).join("");
    return `<svg class="pile" viewBox="0 0 360 122" role="img" aria-label="${list.length ? `A pile of ${list.length} wrapped ${list.length === 1 ? "gift" : "gifts"}` : "No gifts on the pile yet"}">${body}</svg>`;
  }

  /* The logo mark: a gift box with its lid tipped open. */
  const MARK = `<svg viewBox="0 0 40 40" aria-hidden="true" focusable="false">
<rect x="6" y="17" width="28" height="19" rx="3.5" fill="#FF5B3A" stroke="${INK}" stroke-width="2.4"/>
<rect x="17" y="17" width="6" height="19" fill="#FFC233" stroke="${INK}" stroke-width="2.4"/>
<g transform="rotate(-17 5 15)"><rect x="3" y="9.5" width="33" height="7.5" rx="2.5" fill="#FF5B3A" stroke="${INK}" stroke-width="2.4"/>
<rect x="16.5" y="9.5" width="6" height="7.5" fill="#FFC233" stroke="${INK}" stroke-width="2.4"/>
<path d="M19.5 9.5c-2-5.5-9.5-7.5-10.5-3.5-.4 2.6 4.6 3.6 10.5 3.5zM19.5 9.5c2-5.5 9.5-7.5 10.5-3.5.4 2.6-4.6 3.6-10.5 3.5z" fill="#FFC233" stroke="${INK}" stroke-width="2.2" stroke-linejoin="round"/></g>
${star(32.5, 7, 4.2, "#19B9A8")}
</svg>`;

  window.AU = { COLORS, ITEM_COLOR, ART, ART_CSS, DEFS, MARK, vars, art, box, boxColors, pile, star };
})();
