"use client";

import { useEffect } from "react";
import Script from "next/script";

const pageCSS = `
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }

    .enterprise-page {
      --black: #000000;
      --surface: #0a0a0f;
      --surface-light: #111118;
      --bg-navy: #0A1628;
      --navy: #0F1D32;
      --navy-light: #1A2D4A;
      --gold: #F0C030;
      --gold-dark: #D4A017;
      --white: #FFFFFF;
      --white-soft: rgba(255,255,255,0.85);
      --muted: #9ca3af;
      --text-primary: #0F172A;
      --text-secondary: #334155;
      --text-muted: #64748B;
      --bg-card: #F7F8FA;
      --bg-alt: #F1F2F6;
      --border-card: rgba(0,0,0,0.10);
      --noise-texture: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    }

    /* ── Force font everywhere inside the page ── */
    .enterprise-page, .enterprise-page *, .enterprise-page *::before, .enterprise-page *::after {
      font-family: var(--font-display), 'Sora', sans-serif !important;
    }

    .enterprise-page {
      color: #FFFFFF !important;
      background: #000000 !important;
      -webkit-font-smoothing: antialiased !important;
      overflow-x: hidden !important;
    }

    .enterprise-page img { max-width: 100%; display: block; }
    .enterprise-page a { text-decoration: none; color: inherit; }
    .enterprise-page .container { max-width: 1140px; margin: 0 auto; padding: 0 24px; }

    /* ── Full-width section overrides ── */
    .enterprise-page section, .enterprise-page .hero, .enterprise-page .proof-bar,
    .enterprise-page .sec-dark, .enterprise-page .sec-white, .enterprise-page .sec-alt,
    .enterprise-page footer, .enterprise-page .divider-gold, .enterprise-page .divider-light {
      width: 100vw !important; max-width: 100vw !important;
      margin-left: calc(-50vw + 50%) !important; margin-right: 0 !important;
      padding-left: 0 !important; padding-right: 0 !important;
      box-sizing: border-box !important;
    }
    /* Protect logo wrap */
    .enterprise-page .site-logo-wrap, .enterprise-page .site-logo-wrap * {
      width: auto !important; max-width: none !important;
    }

    .enterprise-page .sec-dark h1, .enterprise-page .sec-dark h2, .enterprise-page .sec-dark h3, .enterprise-page .sec-dark h4,
    .enterprise-page .sec-dark p, .enterprise-page .sec-dark li, .enterprise-page .sec-dark span, .enterprise-page .sec-dark div,
    .enterprise-page .hero h1, .enterprise-page .hero h2, .enterprise-page .hero h3, .enterprise-page .hero h4,
    .enterprise-page .hero p, .enterprise-page .hero li, .enterprise-page .hero span,
    .enterprise-page .proof-bar h3, .enterprise-page .proof-bar p, .enterprise-page .proof-bar span,
    .enterprise-page .offer h1, .enterprise-page .offer h2, .enterprise-page .offer h3, .enterprise-page .offer h4,
    .enterprise-page .offer p, .enterprise-page .offer li, .enterprise-page .offer span,
    .enterprise-page .final-cta h2, .enterprise-page .final-cta p, .enterprise-page .final-cta span,
    .enterprise-page footer p, .enterprise-page footer a {
      color: #FFFFFF !important;
    }
    .enterprise-page .sec-dark .eyebrow, .enterprise-page .hero .eyebrow, .enterprise-page .offer .eyebrow,
    .enterprise-page .proof-bar .eyebrow { color: #F0C030 !important; }
    .enterprise-page .sec-dark .text-gradient, .enterprise-page .hero .text-gradient,
    .enterprise-page .offer .text-gradient, .enterprise-page .proof-bar .text-gradient,
    .enterprise-page .final-cta .text-gradient {
      -webkit-text-fill-color: transparent !important;
    }
    .enterprise-page .gold-line { color: #F0C030 !important; -webkit-text-fill-color: #F0C030 !important; }
    .enterprise-page .sec-white h1, .enterprise-page .sec-white h2, .enterprise-page .sec-white h3, .enterprise-page .sec-white h4,
    .enterprise-page .sec-white p, .enterprise-page .sec-white li, .enterprise-page .sec-white span, .enterprise-page .sec-white div,
    .enterprise-page .sec-alt h1, .enterprise-page .sec-alt h2, .enterprise-page .sec-alt h3, .enterprise-page .sec-alt h4,
    .enterprise-page .sec-alt p, .enterprise-page .sec-alt li, .enterprise-page .sec-alt span, .enterprise-page .sec-alt div {
      color: #0F172A !important;
    }
    .enterprise-page .sec-white .eyebrow { color: #0F1D32 !important; }
    .enterprise-page .sec-white .text-gradient, .enterprise-page .sec-alt .text-gradient {
      -webkit-text-fill-color: transparent !important;
    }
    .enterprise-page .sec-white .body, .enterprise-page .sec-alt .body { color: #334155 !important; }
    .enterprise-page .sec-white .arrow-list li { color: #334155 !important; }
    .enterprise-page .vcr-light .vcr-body { color: #334155 !important; }

    /* ── Force white text inside the navy Enterprise Framework card ── */
    .enterprise-page .es-visual, .enterprise-page .es-visual div, .enterprise-page .es-visual p, .enterprise-page .es-visual span {
      color: #FFFFFF !important;
    }
    .enterprise-page .es-visual .ev-num, .enterprise-page .es-visual .ev-title, .enterprise-page .es-visual .ev-result-label {
      color: #F0C030 !important;
    }
    .enterprise-page .es-visual .ev-pdesc {
      color: rgba(255,255,255,0.5) !important;
    }

    .enterprise-page .faq .faq-answer p { color: #334155 !important; }
    .enterprise-page .faq .faq-question { color: #0F172A !important; }

    /* ── Force all decorative layers to never block interaction ── */
    .enterprise-page .grid-bg, .enterprise-page .grid-bg *, .enterprise-page .glow, .enterprise-page .mesh-bg,
    .enterprise-page .mesh-bg-light, .enterprise-page .light-leak,
    .enterprise-page .grain::after, .enterprise-page .grain-light::after { pointer-events: none !important; }

    /* ── Grid Overlay ── */
    .enterprise-page .grid-bg {
      position: absolute; inset: 0; pointer-events: none; z-index: 0;
    }
    .enterprise-page .grid-bg svg { position: absolute; inset: 0; width: 100%; height: 100%; }

    /* ── Glows ── */
    .enterprise-page .glow { position: absolute; border-radius: 50%; pointer-events: none; z-index: 0; }
    .enterprise-page .glow-gold { background: radial-gradient(circle, rgba(240,192,48,0.16) 0%, rgba(240,192,48,0.04) 40%, transparent 70%); filter: blur(80px); }
    .enterprise-page .glow-gold-soft { background: radial-gradient(circle, rgba(240,192,48,0.07) 0%, transparent 70%); filter: blur(120px); }

    /* ── Dividers ── */
    .enterprise-page .divider-gold { height: 1px; background: linear-gradient(to right, transparent, rgba(240,192,48,0.3), transparent); }
    .enterprise-page .divider-light { height: 1px; background: linear-gradient(to right, transparent, rgba(0,0,0,0.08), transparent); }

    /* ── Typography ── */
    .enterprise-page .eyebrow {
      font-family: var(--font-body); font-size: 12px; font-weight: 700;
      text-transform: uppercase; letter-spacing: 0.25em; color: var(--gold); margin-bottom: 20px;
    }
    .enterprise-page h1, .enterprise-page h2, .enterprise-page h3, .enterprise-page h4 { font-family: var(--font-display); line-height: 1.08; letter-spacing: -0.02em; }
    .enterprise-page h1 { font-size: clamp(36px, 5.5vw, 62px); font-weight: 800; text-transform: uppercase; }
    .enterprise-page h2 { font-size: clamp(30px, 4.5vw, 52px); font-weight: 800; text-transform: uppercase; }
    .enterprise-page h3 { font-size: clamp(22px, 3vw, 36px); font-weight: 700; }
    .enterprise-page h4 { font-size: 20px; font-weight: 700; line-height: 1.3; letter-spacing: 0; }

    .enterprise-page .text-gradient {
      background: linear-gradient(135deg, var(--gold) 0%, #FFD700 40%, var(--gold-dark) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      display: inline-block; padding-right: 0.15em;
    }
    .enterprise-page .text-gradient-white {
      background: linear-gradient(180deg, #FFF 0%, rgba(255,255,255,0.7) 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      display: inline-block; padding-right: 0.15em;
    }
    .enterprise-page .gold { color: var(--gold); }

    /* ── Buttons ── */
    .enterprise-page .btn {
      display: inline-block; font-family: var(--font-body); font-weight: 700;
      font-size: 15px; text-transform: uppercase; letter-spacing: 0.12em;
      padding: 20px 48px; border-radius: 9999px; border: none; cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1); text-align: center; position: relative; z-index: 5;
    }
    .enterprise-page .btn-gold {
      background: linear-gradient(135deg, var(--gold) 0%, #E8B820 50%, var(--gold) 100%);
      background-size: 200% 200%; color: #000;
      box-shadow: 0 0 30px rgba(240,192,48,0.25), 0 8px 32px rgba(240,192,48,0.2);
      animation: shimmer 3s ease infinite;
    }
    .enterprise-page .btn-gold:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 0 50px rgba(240,192,48,0.35), 0 12px 40px rgba(240,192,48,0.3);
    }
    @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

    /* ── Animations ── */
    .enterprise-page .reveal {
      opacity: 0; transform: translateY(40px);
      transition: opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1);
    }
    .enterprise-page .reveal.visible { opacity: 1; transform: translateY(0); }
    .enterprise-page .reveal.d1 { transition-delay: .1s; } .enterprise-page .reveal.d2 { transition-delay: .2s; }
    .enterprise-page .reveal.d3 { transition-delay: .3s; } .enterprise-page .reveal.d4 { transition-delay: .4s; }
    .enterprise-page .reveal.d5 { transition-delay: .5s; } .enterprise-page .reveal.d6 { transition-delay: .6s; }
    .enterprise-page .reveal-scale { opacity:0; transform:scale(0.92); transition: opacity .7s ease, transform .7s ease; }
    .enterprise-page .reveal-scale.visible { opacity:1; transform:scale(1); }

    @keyframes pulse-ring {
      0% { transform: translate(-50%,-50%) scale(1); opacity: .15; }
      100% { transform: translate(-50%,-50%) scale(1.5); opacity: 0; }
    }
    @keyframes grain {
      0%,100%{transform:translate(0,0)} 10%{transform:translate(-2%,-2%)} 30%{transform:translate(2%,-1%)}
      50%{transform:translate(-1%,2%)} 70%{transform:translate(1%,-2%)} 90%{transform:translate(-2%,1%)}
    }
    .enterprise-page .grain::after {
      content:''; position:absolute; inset:0; width:100%; height:100%;
      pointer-events:none !important; z-index:0; opacity:1;
      background-image: var(--noise-texture);
      background-repeat: repeat;
    }
    .enterprise-page .grain-light::after {
      content:''; position:absolute; inset:0; width:100%; height:100%;
      pointer-events:none !important; z-index:0; opacity:0.5;
      background-image: var(--noise-texture);
      background-repeat: repeat;
      mix-blend-mode: multiply;
    }

    /* ── Animated mesh gradient ── */
    @keyframes meshMove {
      0%   { background-position: 0% 0%, 100% 100%, 50% 50%; }
      33%  { background-position: 100% 50%, 0% 50%, 80% 20%; }
      66%  { background-position: 50% 100%, 50% 0%, 20% 80%; }
      100% { background-position: 0% 0%, 100% 100%, 50% 50%; }
    }
    .enterprise-page .mesh-bg {
      position:absolute; inset:0; pointer-events:none !important; z-index:0; opacity:0.6;
      background:
        radial-gradient(ellipse 60% 50% at 20% 30%, rgba(240,192,48,0.08) 0%, transparent 60%),
        radial-gradient(ellipse 50% 60% at 80% 70%, rgba(20,40,160,0.06) 0%, transparent 60%),
        radial-gradient(ellipse 40% 40% at 50% 50%, rgba(240,192,48,0.05) 0%, transparent 60%);
      background-size: 200% 200%, 200% 200%, 200% 200%;
      animation: meshMove 25s ease-in-out infinite;
    }
    .enterprise-page .mesh-bg-light {
      position:absolute; inset:0; pointer-events:none !important; z-index:0; opacity:0.5;
      background:
        radial-gradient(ellipse 50% 40% at 10% 20%, rgba(240,192,48,0.07) 0%, transparent 60%),
        radial-gradient(ellipse 60% 50% at 90% 80%, rgba(15,29,50,0.05) 0%, transparent 60%),
        radial-gradient(ellipse 40% 60% at 50% 50%, rgba(240,192,48,0.04) 0%, transparent 60%);
      background-size: 200% 200%, 200% 200%, 200% 200%;
      animation: meshMove 30s ease-in-out infinite;
    }

    /* ── Light leak / flare ── */
    @keyframes lightLeak {
      0%   { opacity:0.04; transform:translateX(-20%) rotate(12deg); }
      50%  { opacity:0.08; transform:translateX(10%) rotate(12deg); }
      100% { opacity:0.04; transform:translateX(-20%) rotate(12deg); }
    }
    .enterprise-page .light-leak {
      position:absolute; top:-30%; right:-20%; width:80%; height:160%;
      background:linear-gradient(135deg, transparent 30%, rgba(240,192,48,0.08) 50%, transparent 70%);
      pointer-events:none; z-index:0; transform:rotate(12deg);
      animation:lightLeak 15s ease-in-out infinite;
    }

    /* ── Section bases ── */
    .enterprise-page .sec-dark { position:relative; overflow:hidden; background:#0a0a0f; width:100%; }
    .enterprise-page .sec-dark > .container { position:relative; z-index:10; }
    .enterprise-page .sec-white { position:relative; overflow:hidden; background:#FFFFFF; color:#0F172A; width:100%; }
    .enterprise-page .sec-white > .container { position:relative; z-index:10; }
    .enterprise-page .sec-alt { position:relative; overflow:hidden; background:#F1F2F6; color:#0F172A; width:100%; }
    .enterprise-page .sec-alt > .container { position:relative; z-index:10; }

    .enterprise-page .hero {
      position:relative; overflow:hidden; text-align:center;
      padding: 80px 0 100px; min-height:100vh; display:flex; align-items:center;
      background: linear-gradient(180deg, var(--black) 0%, var(--surface) 40%, var(--bg-navy) 100%);
    }
    .enterprise-page .hero .container { position:relative; z-index:10; }
    .enterprise-page .hero h1 { margin-bottom:20px; }
    .enterprise-page .hero h1 .gold-line {
      background: linear-gradient(135deg, var(--gold) 0%, #FFD700 30%, var(--gold-dark) 70%, var(--gold) 100%);
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      filter: drop-shadow(0 0 30px rgba(240,192,48,0.2));
      display: inline; padding-right: 0.05em;
    }
    .enterprise-page .site-logo-wrap {
      display:inline-flex !important; align-items:center !important; justify-content:center !important; gap:14px !important;
      margin:0 auto 32px !important; width:auto !important; max-width:none !important;
      flex-wrap:nowrap !important; flex-direction:row !important;
    }
    .enterprise-page .site-logo-wrap .logo-icon {
      height:44px !important; width:auto !important; max-width:44px !important;
      flex-shrink:0 !important; display:inline-block !important;
    }
    .enterprise-page .site-logo-wrap .logo-text {
      font-family:var(--font-display); font-size:22px; font-weight:800;
      text-transform:uppercase; letter-spacing:0.08em; color:var(--gold);
      white-space:nowrap !important; width:auto !important; flex-shrink:0 !important;
    }
    .enterprise-page .hero .subtitle {
      font-family:var(--font-display); font-size:clamp(16px,2vw,20px);
      color:rgba(255,255,255,0.45); font-weight:600; max-width:640px; margin:0 auto 44px;
      text-transform:uppercase; letter-spacing:0.06em;
    }
    .enterprise-page .hero .btn { margin-bottom:48px; }
    .enterprise-page .quiz-modal-overlay {
      position:fixed; inset:0; z-index:9999;
      background:rgba(0,0,0,0.85); backdrop-filter:blur(12px);
      align-items:center; justify-content:center;
      display:none;
    }
    .enterprise-page .quiz-modal-overlay.active { display:flex; }
    .enterprise-page .quiz-modal {
      position:relative; width:90vw; max-width:500px;
      background:#fff; border-radius:16px; overflow:visible;
      display:flex; flex-direction:column;
      box-shadow:0 24px 80px rgba(0,0,0,0.5);
    }
    .enterprise-page .quiz-modal-close {
      position:absolute; top:-12px; right:-12px; z-index:20;
      width:32px; height:32px; border-radius:50%; border:none;
      background:#fff; color:#666; font-size:18px; cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      transition:all .2s ease; box-shadow:0 2px 12px rgba(0,0,0,0.2);
    }
    .enterprise-page .quiz-modal-close:hover { background:#f0f0f0; color:#000; }
    .enterprise-page .quiz-modal-header {
      text-align:center; padding:28px 24px 8px;
    }
    .enterprise-page .quiz-modal-header .qm-step {
      font-family:var(--font-display); font-size:14px; font-weight:800;
      text-transform:uppercase; letter-spacing:0.2em; color:var(--gold-dark); margin-bottom:8px;
    }
    .enterprise-page .quiz-modal-header .qm-title {
      font-family:var(--font-display); font-size:28px; font-weight:800;
      color:var(--text-primary); font-style:italic; line-height:1.2; margin-bottom:6px;
    }
    .enterprise-page .quiz-modal-header .qm-sub {
      font-family:var(--font-body); font-size:14px; color:var(--text-muted);
    }
    .enterprise-page .quiz-modal-body {
      padding:0; margin-top:-8px;
    }
    .enterprise-page .quiz-modal-body iframe { display:block; width:100%; height:487px; border:none; }
    .enterprise-page .quiz-modal-footer {
      padding:12px 20px 16px; text-align:center;
    }
    .enterprise-page .quiz-modal-footer p {
      font-family:var(--font-body); font-size:10px; color:var(--text-muted);
      line-height:1.5;
    }
    .enterprise-page .quiz-modal-footer a { color:var(--gold-dark); text-decoration:underline; }

    .enterprise-page .hero-proof {
      max-width:680px; margin:48px auto 0; text-align:center;
    }
    .enterprise-page .hero-proof .hp-headline {
      font-family:var(--font-display); font-size:clamp(15px,1.8vw,18px); font-weight:700;
      color:rgba(255,255,255,0.55); margin-bottom:24px; line-height:1.6;
    }
    .enterprise-page .hero-proof .hp-headline strong {
      color:var(--gold); font-weight:800;
    }
    .enterprise-page .hero-proof-stats {
      display:flex; justify-content:center; gap:40px; flex-wrap:wrap;
    }
    .enterprise-page .hero-proof-stats .hps {
      text-align:center;
    }
    .enterprise-page .hero-proof-stats .hps-num {
      font-family:var(--font-display); font-size:28px; font-weight:800;
      color:var(--gold); display:block; letter-spacing:0.03em;
    }
    .enterprise-page .hero-proof-stats .hps-desc {
      font-family:var(--font-body); font-size:12px; font-weight:600;
      color:rgba(255,255,255,0.35); text-transform:uppercase; letter-spacing:0.1em;
      margin-top:4px;
    }

    .enterprise-page .vsl-bar {
      font-family:var(--font-body); font-size:12px; font-weight:700;
      text-transform:uppercase; letter-spacing:0.15em; color:rgba(255,255,255,0.35);
      margin-bottom:16px; text-align:center;
    }
    .enterprise-page .hero-video { max-width:720px; margin:0 auto 16px; }
    .enterprise-page .hero-video-frame {
      aspect-ratio:16/9; border-radius:16px;
      background: linear-gradient(135deg, rgba(240,192,48,0.06), rgba(15,29,50,0.4));
      border:1px solid rgba(240,192,48,0.12); overflow:hidden;
      display:flex; align-items:center; justify-content:center; position:relative;
      backdrop-filter:blur(20px);
    }
    .enterprise-page .hero-video-frame .play-btn {
      width:80px; height:80px; border-radius:50%;
      background:linear-gradient(135deg,var(--gold),var(--gold-dark));
      display:flex; align-items:center; justify-content:center;
      font-size:26px; color:#000; cursor:pointer;
      transition:all .3s cubic-bezier(.4,0,.2,1); z-index:2;
      box-shadow:0 0 40px rgba(240,192,48,0.3); position:relative;
    }
    .enterprise-page .hero-video-frame .play-btn::after {
      content:''; position:absolute; inset:-8px; border-radius:50%;
      border:2px solid rgba(240,192,48,0.3); animation:pulse-ring 2s ease-out infinite;
    }
    .enterprise-page .hero-video-frame .play-btn:hover { transform:scale(1.1); }
    .enterprise-page .vsl-quote {
      font-family:var(--font-body); font-size:15px; font-style:italic;
      color:rgba(255,255,255,0.4); max-width:520px; margin:16px auto 0;
      line-height:1.6;
    }

    .enterprise-page .test-strip {
      background:var(--surface); padding:48px 0; position:relative; overflow:hidden;
    }
    .enterprise-page .test-strip .container { position:relative; z-index:10; }
    .enterprise-page .strip-row {
      display:flex; gap:16px; justify-content:center; flex-wrap:wrap;
    }
    .enterprise-page .strip-tile {
      width:200px; height:260px; border-radius:14px;
      background:linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
      border:1px solid rgba(255,255,255,0.06); overflow:hidden; position:relative;
      cursor:pointer; transition:all .3s ease; backdrop-filter:blur(10px);
    }
    .enterprise-page .strip-tile:hover {
      border-color:rgba(240,192,48,0.35); transform:translateY(-4px);
      box-shadow:0 12px 32px rgba(240,192,48,0.1);
    }
    .enterprise-page .strip-tile .tile-label {
      position:absolute; bottom:0; left:0; right:0;
      padding:14px 12px; font-family:var(--font-body); font-size:11px;
      font-weight:700; text-transform:uppercase; letter-spacing:0.1em;
      color:var(--gold); background:linear-gradient(transparent, rgba(0,0,0,0.7));
    }
    .enterprise-page .strip-tile .tile-label span { display:inline; }
    .enterprise-page .strip-tile .tile-label .arrow { color:rgba(240,192,48,0.5); margin-left:4px; }

    .enterprise-page .exact-system { padding:100px 0 120px; }
    .enterprise-page .exact-system .es-grid { display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; }
    .enterprise-page .exact-system h2 { color:var(--navy); margin-bottom:8px; }
    .enterprise-page .exact-system .script-head {
      font-family:var(--font-display); font-style:italic; text-transform:none;
      letter-spacing:0; font-size:clamp(36px,5vw,56px); font-weight:800;
      background:linear-gradient(135deg,var(--gold),var(--gold-dark));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      margin-bottom:8px; display:block;
    }
    .enterprise-page .exact-system .sub-eyebrow {
      font-family:var(--font-display); font-size:clamp(14px,1.8vw,18px);
      font-weight:800; text-transform:uppercase; letter-spacing:0.1em;
      color:var(--navy); margin-bottom:32px;
    }
    .enterprise-page .exact-system .body {
      font-size:18px; color:var(--text-secondary); line-height:1.8; margin-bottom:32px;
    }
    .enterprise-page .exact-system .arrow-list {
      list-style:none; margin-bottom:48px;
    }
    .enterprise-page .exact-system .arrow-list li {
      padding:8px 0; font-size:17px; color:var(--text-secondary); line-height:1.5;
    }
    .enterprise-page .exact-system .arrow-list li::before { content:'\\2192  '; color:var(--gold); font-weight:700; }

    .enterprise-page .es-visual {
      position:relative; display:flex; flex-direction:column; align-items:center; gap:0;
      background:var(--navy); border-radius:20px; padding:40px 32px 36px;
      border:1px solid rgba(240,192,48,0.12);
      box-shadow:0 20px 60px rgba(0,0,0,0.25);
    }
    .enterprise-page .es-visual .ev-crown {
      width:44px; height:auto; margin-bottom:16px;
    }
    .enterprise-page .es-visual .ev-title {
      font-family:var(--font-display); font-size:13px; font-weight:800;
      text-transform:uppercase; letter-spacing:0.2em; color:var(--gold);
      margin-bottom:28px;
    }
    .enterprise-page .es-visual .ev-pillar {
      width:100%; background:rgba(255,255,255,0.05); border-radius:10px; padding:18px 22px;
      margin-bottom:10px; position:relative; overflow:hidden;
      border:1px solid rgba(255,255,255,0.08);
    }
    .enterprise-page .es-visual .ev-pillar::before {
      content:''; position:absolute; left:0; top:0; bottom:0; width:4px;
      background:linear-gradient(180deg, var(--gold), var(--gold-dark));
    }
    .enterprise-page .es-visual .ev-num {
      font-family:var(--font-body); font-size:10px; font-weight:700;
      text-transform:uppercase; letter-spacing:0.2em; color:var(--gold); margin-bottom:4px;
    }
    .enterprise-page .es-visual .ev-pname {
      font-family:var(--font-display); font-size:15px; font-weight:800;
      color:#fff; text-transform:uppercase; letter-spacing:0.03em;
    }
    .enterprise-page .es-visual .ev-pdesc {
      font-family:var(--font-body); font-size:13px; color:rgba(255,255,255,0.5);
      margin-top:4px; line-height:1.4;
    }
    .enterprise-page .es-visual .ev-result {
      margin-top:20px; text-align:center; padding:18px 24px;
      background:linear-gradient(135deg, rgba(240,192,48,0.12), rgba(240,192,48,0.04));
      border:1px solid rgba(240,192,48,0.25); border-radius:12px; width:100%;
    }
    .enterprise-page .es-visual .ev-result-label {
      font-family:var(--font-body); font-size:11px; font-weight:700;
      text-transform:uppercase; letter-spacing:0.15em; color:var(--gold); margin-bottom:6px;
    }
    .enterprise-page .es-visual .ev-result-value {
      font-family:var(--font-display); font-size:18px; font-weight:800;
      color:#fff; line-height:1.3;
    }

    .enterprise-page .result-cards {
      display:grid; grid-template-columns:repeat(3,1fr); gap:20px;
    }
    .enterprise-page .result-card {
      background:var(--bg-card); border:1px solid var(--border-card);
      border-radius:16px; padding:28px 24px; text-align:center;
      box-shadow:0 1px 3px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.04);
      transition:all .3s ease;
    }
    .enterprise-page .result-card:hover { transform:translateY(-3px); box-shadow:0 8px 30px rgba(0,0,0,0.1); }
    .enterprise-page .result-card .rc-stat {
      font-family:var(--font-display); font-size:28px; font-weight:800;
      color:var(--gold-dark); letter-spacing:0.05em; margin-bottom:8px;
    }
    .enterprise-page .result-card .rc-desc {
      font-size:14px; color:var(--text-muted); line-height:1.5;
    }

    .enterprise-page .proof-photo {
      width:100%; height:280px; object-fit:cover;
      background:linear-gradient(135deg,var(--navy),var(--navy-light));
      position:relative;
    }
    .enterprise-page .proof-bar {
      background:var(--surface); padding:100px 0; position:relative; overflow:hidden;
    }
    .enterprise-page .proof-bar .container {
      display:flex; justify-content:center; gap:0; flex-wrap:wrap;
      text-align:center; position:relative; z-index:10;
    }
    .enterprise-page .proof-stat {
      flex:1; min-width:240px; padding:40px 32px;
      border-right:1px solid rgba(255,255,255,0.06);
    }
    .enterprise-page .proof-stat:last-child { border-right:none; }
    .enterprise-page .proof-stat .number {
      font-family:var(--font-display); font-size:clamp(56px,8vw,90px); font-weight:800;
      letter-spacing:0.05em; display:block; line-height:1;
      background:linear-gradient(135deg,var(--gold),#FFD700,var(--gold-dark));
      -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
      display:inline-block; padding-right:0.1em;
      filter:drop-shadow(0 0 40px rgba(240,192,48,0.15));
    }
    .enterprise-page .proof-stat .stat-label {
      font-family:var(--font-display); font-size:16px; font-weight:700;
      color:rgba(255,255,255,0.55); line-height:1.5; max-width:240px; margin:20px auto 0;
      text-transform:uppercase; letter-spacing:0.06em;
    }
    .enterprise-page .proof-stat .stat-label span {
      display:block; font-family:var(--font-body); font-size:13px; font-weight:500;
      text-transform:none; letter-spacing:0; color:rgba(255,255,255,0.35); margin-top:6px;
    }
    .enterprise-page .proof-bar-head {
      text-align:center; margin-bottom:56px; position:relative; z-index:10;
    }
    .enterprise-page .proof-bar-head .eyebrow { color:var(--gold); margin-bottom:12px; }
    .enterprise-page .proof-bar-head h3 {
      font-family:var(--font-display); font-size:clamp(28px,4vw,44px); font-weight:800;
      text-transform:uppercase; color:#fff;
    }

    .enterprise-page .framework {
      padding:100px 0 130px; text-align:center;
      background:linear-gradient(180deg, var(--surface) 0%, var(--bg-navy) 50%, var(--surface) 100%);
    }
    .enterprise-page .playbook {
      padding:100px 0 130px; text-align:center;
      background:linear-gradient(180deg, var(--bg-navy) 0%, var(--surface) 100%);
    }
    .enterprise-page .playbook h2 { margin-bottom:16px; }
    .enterprise-page .playbook .pb-sub {
      font-family:var(--font-display); font-style:italic; text-transform:none;
      letter-spacing:0; font-size:clamp(18px,2.5vw,24px); font-weight:700;
      margin-bottom:32px;
    }
    .enterprise-page .playbook .pb-body {
      font-size:18px; color:rgba(255,255,255,0.55); line-height:1.8;
      max-width:700px; margin:0 auto 40px; text-align:left;
    }

    .enterprise-page .vcr { padding:80px 0; }
    .enterprise-page .vcr-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:24px; }
    .enterprise-page .vcr-card {
      border-radius:16px; padding:32px; transition:all .3s ease;
    }
    .enterprise-page .vcr-dark .vcr-card {
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06);
      backdrop-filter:blur(10px);
    }
    .enterprise-page .vcr-dark .vcr-card:hover {
      border-color:rgba(240,192,48,0.25); transform:translateY(-3px);
      box-shadow:0 12px 40px rgba(240,192,48,0.08);
    }
    .enterprise-page .vcr-dark .vcr-verified {
      font-size:10px; font-weight:700; text-transform:uppercase;
      letter-spacing:0.2em; color:var(--gold); display:flex; align-items:center;
      gap:8px; margin-bottom:16px;
    }
    .enterprise-page .vcr-dark .vcr-verified .chk {
      width:18px; height:18px; border-radius:50%; background:var(--gold);
      color:#000; display:inline-flex; align-items:center; justify-content:center;
      font-size:10px; font-weight:700;
    }
    .enterprise-page .vcr-dark .vcr-body { font-size:16px; color:rgba(255,255,255,0.55); line-height:1.7; margin-bottom:20px; }
    .enterprise-page .vcr-dark .vcr-stat { font-family:var(--font-display); font-size:14px; font-weight:800; color:var(--gold); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px; }
    .enterprise-page .vcr-dark .vcr-co { font-size:13px; color:rgba(255,255,255,0.35); }

    .enterprise-page .vcr-light .vcr-card {
      background:var(--white); border:1px solid var(--border-card);
      box-shadow:0 1px 3px rgba(0,0,0,0.08), 0 4px 20px rgba(0,0,0,0.04);
    }
    .enterprise-page .vcr-light .vcr-card:hover { transform:translateY(-3px); box-shadow:0 8px 30px rgba(0,0,0,0.1); }
    .enterprise-page .vcr-light .vcr-verified {
      font-size:10px; font-weight:700; text-transform:uppercase;
      letter-spacing:0.2em; color:var(--gold-dark); display:flex; align-items:center;
      gap:8px; margin-bottom:16px;
    }
    .enterprise-page .vcr-light .vcr-verified .chk {
      width:18px; height:18px; border-radius:50%; background:var(--gold);
      color:#000; display:inline-flex; align-items:center; justify-content:center;
      font-size:10px; font-weight:700;
    }
    .enterprise-page .vcr-light .vcr-body { font-size:16px; color:var(--text-secondary); line-height:1.7; margin-bottom:20px; }
    .enterprise-page .vcr-light .vcr-stat { font-family:var(--font-display); font-size:14px; font-weight:800; color:var(--gold-dark); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px; }
    .enterprise-page .vcr-light .vcr-co { font-size:13px; color:var(--text-muted); }

    .enterprise-page .offer {
      padding:100px 0 130px; text-align:center;
      background:linear-gradient(180deg, var(--surface) 0%, var(--bg-navy) 30%, var(--surface) 100%);
    }
    .enterprise-page .offer .offer-head {
      font-family:var(--font-display); font-style:italic; text-transform:none;
      letter-spacing:0; font-size:clamp(30px,4.5vw,52px); font-weight:800;
      margin-bottom:12px;
    }
    .enterprise-page .offer .offer-intro {
      font-size:18px; color:rgba(255,255,255,0.5); line-height:1.7;
      max-width:680px; margin:0 auto 56px;
    }
    .enterprise-page .offer-stack {
      max-width:820px; margin:0 auto 40px;
      display:flex; flex-direction:column; gap:16px; text-align:left;
    }
    .enterprise-page .offer-item {
      background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06);
      border-radius:16px; padding:28px 28px 28px 32px; display:flex; gap:20px;
      transition:all .4s cubic-bezier(.4,0,.2,1); backdrop-filter:blur(10px);
      position:relative; overflow:hidden;
    }
    .enterprise-page .offer-item::before {
      content:''; position:absolute; top:0; left:0; width:3px; height:0;
      background:var(--gold); border-radius:0 2px 2px 0; transition:height .4s ease;
    }
    .enterprise-page .offer-item:hover::before { height:100%; }
    .enterprise-page .offer-item:hover {
      border-color:rgba(240,192,48,0.2); background:rgba(255,255,255,0.05);
      transform:translateX(4px);
    }
    .enterprise-page .offer-item.highlight {
      background:linear-gradient(135deg, rgba(240,192,48,0.08) 0%, rgba(240,192,48,0.02) 50%, rgba(240,192,48,0.06) 100%);
      border-color:rgba(240,192,48,0.2);
    }
    .enterprise-page .offer-item.highlight::before { height:100%; }
    .enterprise-page .offer-item .oi-icon {
      flex-shrink:0; width:44px; height:44px; border-radius:12px;
      background:rgba(240,192,48,0.08); border:1px solid rgba(240,192,48,0.2);
      display:flex; align-items:center; justify-content:center; margin-top:4px;
    }
    .enterprise-page .offer-item .oi-icon svg { width:20px; height:20px; stroke:var(--gold); fill:none; stroke-width:1.5; stroke-linecap:round; stroke-linejoin:round; }
    .enterprise-page .offer-item.highlight .oi-icon { background:rgba(240,192,48,0.15); border-color:rgba(240,192,48,0.4); }
    .enterprise-page .offer-item .oi-body { flex:1; }
    .enterprise-page .offer-item .oi-freq {
      font-size:10px; font-weight:700; text-transform:uppercase;
      letter-spacing:0.25em; color:var(--gold); margin-bottom:4px;
    }
    .enterprise-page .offer-item h4 {
      font-family:var(--font-display); font-size:19px; font-weight:800;
      color:#fff; margin-bottom:10px; text-transform:none;
    }
    .enterprise-page .offer-item p {
      font-size:15px; color:rgba(255,255,255,0.5); line-height:1.7;
    }
    .enterprise-page .offer-item .oi-agency-price {
      font-size:13px; color:rgba(255,255,255,0.3); margin-top:10px;
      font-style:italic;
    }

    .enterprise-page .offer-summary {
      font-size:17px; color:rgba(255,255,255,0.5); line-height:1.8;
      max-width:720px; margin:40px auto 44px; text-align:left;
    }

    .enterprise-page .faq { padding:100px 0 120px; }
    .enterprise-page .faq-header { display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
    .enterprise-page .faq h2 { color:var(--navy); text-align:left; }
    .enterprise-page .faq-list { text-align:left; }
    .enterprise-page .faq-item { border-bottom:1px solid rgba(0,0,0,0.06); }
    .enterprise-page .faq-question {
      width:100%; background:none; border:none; text-align:left;
      padding:22px 0; font-family:var(--font-display); font-size:16px;
      font-weight:700; color:var(--text-primary); cursor:pointer;
      display:flex; justify-content:space-between; align-items:center; gap:16px;
      transition:color .2s;
    }
    .enterprise-page .faq-question:hover { color:var(--gold-dark); }
    .enterprise-page .faq-question::after {
      content:'+'; font-size:22px; color:var(--gold); font-weight:400;
      transition:transform .3s; flex-shrink:0;
    }
    .enterprise-page .faq-item.open .faq-question::after { transform:rotate(45deg); }
    .enterprise-page .faq-answer { max-height:0; overflow:hidden; transition:max-height .4s cubic-bezier(.4,0,.2,1); }
    .enterprise-page .faq-item.open .faq-answer { max-height:400px; padding-bottom:20px; }
    .enterprise-page .faq-answer p { font-size:15px; color:var(--text-secondary); line-height:1.7; }

    .enterprise-page .final-cta {
      padding:140px 0; text-align:center;
      background:linear-gradient(180deg, var(--surface) 0%, var(--bg-navy) 40%, var(--surface) 100%);
    }
    .enterprise-page .final-cta h2 { margin-bottom:12px; }
    .enterprise-page .final-cta .fc-sub {
      font-family:var(--font-display); font-style:italic; text-transform:none;
      letter-spacing:0; font-size:clamp(24px,3.5vw,42px); font-weight:800;
      margin-bottom:48px;
    }
    .enterprise-page .final-cta .btn { min-width:340px; }

    .enterprise-page .footer {
      background:var(--black); color:rgba(255,255,255,0.25); text-align:center;
      padding:32px 24px; font-size:13px; line-height:1.6;
    }
    .enterprise-page .footer a { color:rgba(255,255,255,0.4); text-decoration:underline; }

    @media(max-width:1024px){
      .enterprise-page .faq-header { grid-template-columns:1fr; }
    }
    @media(max-width:768px){
      .enterprise-page .es-grid { grid-template-columns:1fr; gap:48px; }
      .enterprise-page .vcr-grid { grid-template-columns:1fr; }
      .enterprise-page .result-cards { grid-template-columns:1fr; }
      .enterprise-page .stats-row { grid-template-columns:repeat(2,1fr); }
      .enterprise-page .strip-row { gap:10px; }
      .enterprise-page .strip-tile { width:150px; height:200px; }
      .enterprise-page .offer-item { flex-direction:column; gap:12px; }
      .enterprise-page .btn { padding:18px 36px; font-size:14px; }
      .enterprise-page .proof-stat { border-right:none; border-bottom:1px solid rgba(255,255,255,0.06); padding:32px 24px; }
      .enterprise-page .proof-stat:last-child { border-bottom:none; }
    }
`;

const pageHTML = `
<div class="quiz-modal-overlay" id="quizModal">
  <div class="quiz-modal">
    <button class="quiz-modal-close" id="quizClose" onclick="closeQuizModal()">&times;</button>
    <div class="quiz-modal-header">
      <p class="qm-step">Step 1 of 2</p>
      <p class="qm-title">Transform Your Business Today</p>
      <p class="qm-sub">Fill out the form below and continue to Step 2</p>
    </div>
    <div class="quiz-modal-body">
      <iframe
        src="https://api.leadconnectorhq.com/widget/form/uJ6DlE4M006lIFLyvx8w"
        style="width:100%;height:100%;border:none;border-radius:3px"
        id="inline-uJ6DlE4M006lIFLyvx8w"
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Ent 360 Lead Form"
        data-height="487"
        data-layout-iframe-id="inline-uJ6DlE4M006lIFLyvx8w"
        data-form-id="uJ6DlE4M006lIFLyvx8w"
        title="Ent 360 Lead Form"
      ></iframe>
    </div>
    <div class="quiz-modal-footer">
      <p>By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message &amp; data rates may apply. You can reply STOP to opt-out of further messaging.</p>
      <p style="margin-top:8px;"><a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></p>
    </div>
  </div>
</div>

<section class="hero grain">
  <div class="mesh-bg"></div>
  <div class="light-leak"></div>
  <div class="grid-bg"><svg width="100%" height="100%" opacity="0.03"><defs><pattern id="g1" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g1)"/></svg></div>
  <div class="glow glow-gold" style="width:700px;height:700px;top:5%;right:0%"></div>
  <div class="glow glow-gold-soft" style="width:600px;height:600px;bottom:0%;left:5%"></div>
  <div class="glow glow-gold" style="width:400px;height:400px;top:60%;left:40%;opacity:0.5"></div>

  <div class="container">
    <div class="site-logo-wrap reveal">
      <img class="logo-icon" src="https://xzotxfwrheaivvwwxupr.supabase.co/storage/v1/object/public/media/landing-page/scale-logo.png" alt="Scale Enterprises">
      <span class="logo-text">Scale Enterprises</span>
    </div>
    <p class="eyebrow reveal">For Owners Of $1M+ Service Businesses</p>
    <h1 class="reveal">Get To <span class="gold-line">$10M ARR</span><br>In 12 Months Or Less<br>Or We Work For Free<br>Until You Do.</h1>
    <p class="subtitle reveal">A 12-month done-for-you partnership. No equity. No revenue share. Just results.</p>
    <a href="#" onclick="return openQuizModal()" class="btn btn-gold reveal">Apply For Enterprise 360 &#8594;</a>

    <div class="hero-proof reveal">
      <p class="hp-headline" style="font-size:clamp(18px,2.2vw,24px);font-weight:800;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.5);">Only <span style="color:var(--gold);">10</span> Spots Available</p>
    </div>
  </div>
</section>

<div class="divider-gold"></div>

<section class="sec-white exact-system grain-light">
  <div class="mesh-bg-light"></div>
  <div class="container">
    <div class="es-grid">
      <div class="es-text">
        <p class="eyebrow reveal" style="color:var(--navy)">Why Most Businesses Stall</p>
        <span class="script-head reveal">Between $1M And $10M</span>
        <p class="sub-eyebrow reveal">And The System That Gets You Past It</p>

        <p class="body reveal">You did not build a million-dollar business by accident. But the system that got you here will not get you to $10M. Most owners try to solve a scaling problem with more effort — more hours, more hires, more hustle. That is not a strategy. That is a ceiling.</p>
        <p class="body reveal">Enterprise 360 is a 12-month partnership where we build and integrate three core systems into your business — so you stop working 60+ hours a week and start leading in 90 minutes a week or less:</p>

        <ul class="arrow-list reveal">
          <li>A custom $10M strategy — built, delivered, and integrated</li>
          <li>A custom $10M scalable business model — engineered for your market</li>
          <li>A custom $10M leadership system — so your team runs the business, not you</li>
        </ul>
      </div>

      <div class="es-visual reveal">
        <img class="ev-crown" src="https://xzotxfwrheaivvwwxupr.supabase.co/storage/v1/object/public/media/landing-page/scale-logo.png" alt="">
        <p class="ev-title">We Build &amp; Integrate</p>

        <div class="ev-pillar">
          <p class="ev-num">System 01</p>
          <p class="ev-pname">Custom $10M Strategy</p>
          <p class="ev-pdesc">Market positioning, growth roadmap, competitive analysis &amp; execution plan</p>
        </div>
        <div class="ev-pillar">
          <p class="ev-num">System 02</p>
          <p class="ev-pname">Custom $10M Scalable Business Model</p>
          <p class="ev-pdesc">Engineered for your market with your final approval on every decision</p>
        </div>
        <div class="ev-pillar">
          <p class="ev-num">System 03</p>
          <p class="ev-pname">Custom $10M Leadership System</p>
          <p class="ev-pdesc">Your team runs the business — you lead in 90 minutes a week</p>
        </div>

        <div class="ev-result">
          <p class="ev-result-label">The Result</p>
          <p class="ev-result-value">$10M ARR — Or We Work For Free Until You Do</p>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider-light"></div>

<div class="proof-bar grain" style="position:relative;overflow:hidden;">
  <div class="mesh-bg" style="opacity:0.3"></div>
  <div class="grid-bg"><svg width="100%" height="100%" opacity="0.02"><defs><pattern id="g4" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g4)"/></svg></div>
  <div class="glow glow-gold" style="width:500px;height:500px;top:50%;left:50%;transform:translate(-50%,-50%)"></div>
  <div class="proof-bar-head reveal">
    <p class="eyebrow">Case Study Results</p>
    <h3>What Happens When We Build It With You</h3>
    <p style="font-size:17px;color:rgba(255,255,255,0.88);max-width:640px;margin:12px auto 0;line-height:1.6;position:relative;z-index:10;">These are real results from real clients who stopped trying to figure it out alone and let us build the systems alongside them.</p>
  </div>
  <div class="container">
    <div class="proof-stat reveal">
      <span class="number">3X</span>
      <span class="stat-label">Lead Generation In 7 Days<span>50-Person Service Team</span></span>
    </div>
    <div class="proof-stat reveal d1">
      <span class="number">2X</span>
      <span class="stat-label">EBITDA In 3 Months<span>Commercial Cleaning Company</span></span>
    </div>
    <div class="proof-stat reveal d2">
      <span class="number">500%</span>
      <span class="stat-label">Revenue Growth In 6 Months<span>Marketing Agency</span></span>
    </div>
    <h3 class="reveal" style="text-align:center;margin-top:48px;font-size:clamp(22px,3vw,32px);font-weight:800;text-transform:uppercase;position:relative;z-index:10;"><span class="text-gradient">One Team. One Result. $10M ARR Or We Work For Free Until We Do.</span></h3>
  </div>
</div>

<section class="sec-white vcr vcr-light grain-light">
  <div class="mesh-bg-light"></div>
  <div class="container">
    <div class="vcr-grid">
      <div class="vcr-card reveal">
        <div class="vcr-verified"><span class="chk">&#10003;</span> Verified Client</div>
        <p class="vcr-body">A 50-person team came in with a lead generation engine that had flatlined. Inside the first week of applying the Enterprise Framework, we rebuilt their outbound system and focus structure. Their lead gen 3x'd in seven days. Not seven months. Seven days, because the constraint was never effort. It was architecture.</p>
        <div class="vcr-stat">Growth &amp; Operations</div>
        <div class="vcr-co">Service Business, 50-Person Team</div>
      </div>
      <div class="vcr-card reveal d1">
        <div class="vcr-verified"><span class="chk">&#10003;</span> Verified Client</div>
        <p class="vcr-body">A commercial cleaning company was profitable but stuck, with the owner buried in operations. We installed the Enterprise Framework and doubled EBITDA in three months while the owner stepped further out of the day-to-day, was able to go on vacation, and truly be on vacation.</p>
        <div class="vcr-stat">EBITDA 2X in 3 Months</div>
        <div class="vcr-co">Commercial Cleaning</div>
      </div>
    </div>
  </div>
</section>

<section class="sec-dark offer grain" id="offer">
  <div class="mesh-bg"></div>
  <div class="light-leak" style="animation-delay:-5s;"></div>
  <div class="grid-bg"><svg width="100%" height="100%" opacity="0.03"><defs><pattern id="g9" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#g9)"/></svg></div>
  <div class="glow glow-gold" style="width:600px;height:600px;top:5%;right:0%"></div>
  <div class="glow glow-gold-soft" style="width:500px;height:500px;bottom:5%;left:0%"></div>
  <div class="glow glow-gold" style="width:350px;height:350px;top:50%;left:50%;opacity:0.4"></div>

  <div class="container">
    <p class="offer-head reveal"><span class="text-gradient">Everything We Build With You To Get To $10M ARR</span></p>
    <p class="offer-intro reveal">Enterprise 360 is not coaching. It is not consulting. It is a 12-month done-with-you partnership where our team works alongside yours to build every system your business needs to scale to $10M ARR. Here is everything that is included:</p>
    <p class="eyebrow reveal" style="color:var(--gold);margin-top:40px;margin-bottom:8px;">What's Included In Enterprise 360</p>

    <div class="offer-stack">
      <div class="offer-item reveal">
        <div class="oi-icon"><svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
        <div class="oi-body">
          <p class="oi-freq">Foundation</p>
          <h4>Full Strategy Build-Out</h4>
          <p>We build your entire strategy to get to $10M ARR — market positioning, growth roadmap, competitive analysis, and a complete execution plan. Not a slide deck. A working strategy you can execute on day one.</p>
          <p class="oi-agency-price">Strategy consulting firms charge <span style="text-decoration:line-through;color:rgba(255,255,255,0.35);">$5,000/mo</span></p>
        </div>
      </div>
      <div class="offer-item reveal">
        <div class="oi-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
        <div class="oi-body">
          <p class="oi-freq">Foundation</p>
          <h4>Business Model Development</h4>
          <p>We build the business model designed to scale to $10M ARR — working side by side with you for final approval on every decision. Your business, your model, engineered for scale.</p>
        </div>
      </div>
      <div class="offer-item reveal">
        <div class="oi-icon"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
        <div class="oi-body">
          <p class="oi-freq">Leadership</p>
          <h4>Leadership System &amp; Leader Development</h4>
          <p>We build your leadership system and coach you into the leader who can run a full enterprise. The system that lets your team operate without you in the weeds.</p>
          <p class="oi-agency-price">Leadership &amp; executive coaching firms charge <span style="text-decoration:line-through;color:rgba(255,255,255,0.35);">$3,000/mo</span></p>
        </div>
      </div>
      <div class="offer-item reveal">
        <div class="oi-icon"><svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>
        <div class="oi-body">
          <p class="oi-freq">Revenue</p>
          <h4>Customer Acquisition Funnel &amp; Revenue Management</h4>
          <p>We build your entire digital funnel — landing pages, email sequences, ad campaigns — and we can run your ads for you. Your team handles sales, but we coach to make sure you are closing effectively.</p>
          <p class="oi-agency-price">Funnel &amp; ads agencies charge <span style="text-decoration:line-through;color:rgba(255,255,255,0.35);">$5,000/mo</span></p>
        </div>
      </div>
      <div class="offer-item reveal">
        <div class="oi-icon"><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
        <div class="oi-body">
          <p class="oi-freq">Finance</p>
          <h4>Financial Roadmap &amp; Cash Flow System</h4>
          <p>A complete financial roadmap from unit economics to scaling, plus a cash flow management system that keeps you capitalized through every stage of growth.</p>
          <p class="oi-agency-price">Fractional CFO services charge <span style="text-decoration:line-through;color:rgba(255,255,255,0.35);">$4,000/mo</span></p>
        </div>
      </div>
      <div class="offer-item reveal">
        <div class="oi-icon"><svg viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg></div>
        <div class="oi-body">
          <p class="oi-freq">Team</p>
          <h4>Recruiting, Team Building &amp; Team Management</h4>
          <p>We craft your job ads, write descriptions, post on Indeed, and vet candidates. You interview, hire, and train. The talent pipeline, handled.</p>
          <p class="oi-agency-price">Recruiting &amp; HR firms charge <span style="text-decoration:line-through;color:rgba(255,255,255,0.35);">$3,000/mo</span></p>
        </div>
      </div>
      <div class="offer-item reveal">
        <div class="oi-icon"><svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg></div>
        <div class="oi-body">
          <p class="oi-freq">Ongoing</p>
          <h4>Ongoing Management — Weekly, Monthly &amp; Quarterly</h4>
          <p>Weekly leadership meetings, monthly business reviews, and quarterly planning sessions. We stay in the business with you for 12 months — not a handoff, a partnership.</p>
          <p class="oi-agency-price">Management &amp; accountability consultants charge <span style="text-decoration:line-through;color:rgba(255,255,255,0.35);">$5,000/mo</span></p>
        </div>
      </div>
      <div class="offer-item reveal">
        <div class="oi-icon"><svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1.27A7 7 0 0 1 14 22h-4a7 7 0 0 1-6.73-3H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z"/><circle cx="9.5" cy="15.5" r="1"/><circle cx="14.5" cy="15.5" r="1"/></svg></div>
        <div class="oi-body">
          <p class="oi-freq">Systems</p>
          <h4>Tech &amp; AI Implementation</h4>
          <p>CRM, AI tools, websites, and custom systems — built and integrated into your operations. No more duct-taped tech stacks. Everything connected, everything working.</p>
          <p class="oi-agency-price">Tech &amp; CRM agencies charge <span style="text-decoration:line-through;color:rgba(255,255,255,0.35);">$5,000/mo</span></p>
        </div>
      </div>
    </div>

    <!-- Pricing Summary -->
    <div class="reveal" style="max-width:820px;margin:48px auto 0;display:flex;justify-content:space-between;align-items:center;padding:24px 32px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;">
      <span style="font-family:var(--font-display);font-size:16px;font-weight:800;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.05em;">Hiring Separate Agencies &amp; Consultants</span>
      <span style="font-family:var(--font-display);font-size:22px;font-weight:800;color:rgba(255,255,255,0.3);text-decoration:line-through;">$30,000+/mo</span>
    </div>

    <div class="reveal" style="max-width:820px;margin:16px auto 0;text-align:center;padding:44px 32px;background:linear-gradient(135deg,rgba(240,192,48,0.1),rgba(240,192,48,0.03));border:1px solid rgba(240,192,48,0.25);border-radius:16px;">
      <p style="font-family:var(--font-display);font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:0.2em;color:var(--gold);margin-bottom:12px;">Enterprise 360 — All Of The Above</p>
      <p style="font-family:var(--font-display);font-size:clamp(40px,6vw,64px);font-weight:800;color:#fff;line-height:1;margin-bottom:8px;">$3,000<span style="font-size:24px;color:rgba(255,255,255,0.5);font-weight:600;">/mo</span></p>
      <p style="font-size:16px;color:rgba(255,255,255,0.5);margin-bottom:4px;">12-Month Partnership · $36,000 Total</p>
      <p style="font-size:14px;color:rgba(255,255,255,0.35);margin-bottom:24px;">No equity. No revenue share. Only 10 spots available.</p>
      <p style="font-family:var(--font-display);font-size:18px;font-weight:800;color:var(--gold);text-transform:uppercase;letter-spacing:0.05em;">One Team. One Result. $10M ARR Or We Work For Free Until We Do.</p>
    </div>

    <div style="text-align:center;margin-top:48px;">
      <a href="#" onclick="return openQuizModal()" class="btn btn-gold reveal">Apply For Enterprise 360 &#8594;</a>
    </div>
  </div>
</section>

<section class="sec-dark vcr vcr-dark grain" style="padding-top:0;">
  <div class="mesh-bg" style="opacity:0.3"></div>
  <div class="container">
    <div class="vcr-grid">
      <div class="vcr-card reveal">
        <div class="vcr-verified"><span class="chk">&#10003;</span> Verified Client</div>
        <p class="vcr-body">A marketing agency joined stuck at a plateau the owner had been fighting for over a year. We rebuilt the offer, installed the leadership cadence, and pointed the whole team at one constraint at a time. The result: 500% growth in six months and an owner who finally works on the business instead of underneath it.</p>
        <div class="vcr-stat">500% Growth in 6 Months</div>
        <div class="vcr-co">Marketing Agency</div>
      </div>
      <div class="vcr-card reveal d1">
        <div class="vcr-verified"><span class="chk">&#10003;</span> Verified Client</div>
        <p class="vcr-body">'I thought I needed more consultants, more agencies, more vendors. What I actually needed was one team that understood the whole picture. They built the strategy, the funnel, the financial model — and stayed in the business with me to make sure it all worked.'</p>
        <div class="vcr-stat">Founder</div>
        <div class="vcr-co">Service Business</div>
      </div>
    </div>
  </div>
</section>

<section class="sec-white faq grain-light">
  <div class="mesh-bg-light"></div>
  <div class="container">
    <div class="faq-header">
      <div>
        <h2 class="reveal">Frequently Asked<br>Questions</h2>
      </div>
      <div class="faq-list">
        <div class="faq-item reveal">
          <button class="faq-question">Who is Enterprise 360 for?</button>
          <div class="faq-answer"><p>Business owners already doing $1M+ in revenue who want to scale to $10M ARR. You have a proven business, a team, and revenue — you just need the systems, strategy, and execution partner to get to the next level.</p></div>
        </div>
        <div class="faq-item reveal">
          <button class="faq-question">How is this different from coaching or consulting?</button>
          <div class="faq-answer"><p>Coaches give you conversations. Consultants give you documents. We build the actual systems — strategy, funnels, financial models, recruiting pipelines, tech stacks — and stay in the business with you for 12 months to make sure they work. This is a done-with-you partnership, not advice from the sidelines.</p></div>
        </div>
        <div class="faq-item reveal">
          <button class="faq-question">What does "we work for free until you do" actually mean?</button>
          <div class="faq-answer"><p>If you have not reached $10M ARR by the end of your 12-month partnership, we continue working with you at no additional cost until you do. No asterisks, no fine print. We are that confident in the system.</p></div>
        </div>
        <div class="faq-item reveal">
          <button class="faq-question">Do you take equity or revenue share?</button>
          <div class="faq-answer"><p>No. Never. You pay $3,000 per month for 12 months. That is it. We do not take equity, revenue share, or any ownership stake in your business. Everything we build is yours.</p></div>
        </div>
        <div class="faq-item reveal">
          <button class="faq-question">What do you actually build for me?</button>
          <div class="faq-answer"><p>Your full growth strategy, business model, leadership system, digital funnels, ad campaigns, financial roadmap, recruiting pipeline, tech and CRM integrations — and we manage the ongoing cadence of weekly, monthly, and quarterly reviews for the full 12 months.</p></div>
        </div>
        <div class="faq-item reveal">
          <button class="faq-question">Why only 10 spots?</button>
          <div class="faq-answer"><p>Because we work inside your business, not from a distance. Each partnership requires dedicated time, attention, and resources from our team. We cap enrollment to protect the quality of work we deliver. When the 10 spots are filled, enrollment closes.</p></div>
        </div>
        <div class="faq-item reveal">
          <button class="faq-question">What is the time commitment on my end?</button>
          <div class="faq-answer"><p>We do the heavy building. You show up for weekly leadership meetings, give final approvals on strategy and model decisions, and lead your team through the changes. Expect a few hours per week — not a second full-time job.</p></div>
        </div>
        <div class="faq-item reveal">
          <button class="faq-question">How do I apply?</button>
          <div class="faq-answer"><p>Click the button, fill out the short application, and we will book a call to see if Enterprise 360 is the right fit for your business.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<div class="divider-gold"></div>

<section class="sec-dark final-cta grain">
  <div class="mesh-bg"></div>
  <div class="light-leak" style="animation-delay:-8s;"></div>
  <div class="grid-bg"><svg width="100%" height="100%" opacity="0.03"><defs><pattern id="gF" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" stroke-width="0.5"/></pattern></defs><rect width="100%" height="100%" fill="url(#gF)"/></svg></div>
  <div class="glow glow-gold" style="width:600px;height:600px;top:50%;left:50%;transform:translate(-50%,-50%)"></div>
  <div class="container">
    <h2 class="reveal"><span class="text-gradient">Join The Enterprise Movement</span></h2>
    <p class="fc-sub reveal"><span class="text-gradient-white">Stop Running A Business</span></p>
    <h3 class="reveal" style="font-size:clamp(22px,3vw,36px);font-weight:800;text-transform:uppercase;margin-bottom:48px;"><span class="text-gradient-white">And Start Leading An Enterprise</span></h3>
    <a href="#" onclick="return openQuizModal()" class="btn btn-gold reveal">Apply For Enterprise 360 &#8594;</a>
    <p class="reveal" style="font-size:15px;color:rgba(255,255,255,0.45);max-width:600px;margin:32px auto 0;line-height:1.6;">Scale Enterprises. A proprietary framework, expert coaching, and a proven path from business owner to enterprise entrepreneur.</p>
  </div>
</section>

<footer class="footer">
  <p>Scale Enterprises. A proprietary framework, expert coaching, and a proven path from business owner to enterprise entrepreneur.</p>
  <p style="margin-top:12px;">Scaleenterprises.com &copy; 2026. All Rights Reserved.</p>
  <p style="margin-top:6px;"><a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">California Notice</a></p>
</footer>
`;

export default function EnterprisePage() {
  useEffect(() => {
    // Define global functions for inline onclick handlers
    (window as unknown as Record<string, unknown>).openQuizModal = function () {
      const modal = document.getElementById("quizModal");
      if (modal) {
        modal.className = "quiz-modal-overlay active";
        document.body.style.overflow = "hidden";
      }
      return false;
    };

    (window as unknown as Record<string, unknown>).closeQuizModal = function () {
      const modal = document.getElementById("quizModal");
      if (modal) {
        modal.className = "quiz-modal-overlay";
        document.body.style.overflow = "";
      }
    };

    // IntersectionObserver for .reveal animations
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal,.reveal-scale").forEach(function (el) {
      io.observe(el);
    });

    // FAQ accordion toggles
    document.querySelectorAll(".faq-question").forEach(function (btn) {
      btn.addEventListener("click", function (this: HTMLElement) {
        const item = this.closest(".faq-item");
        if (item) {
          item.classList.toggle("open");
        }
      });
    });

    // Cleanup
    return () => {
      io.disconnect();
      delete (window as unknown as Record<string, unknown>).openQuizModal;
      delete (window as unknown as Record<string, unknown>).closeQuizModal;
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      <div className="enterprise-page">
        <div dangerouslySetInnerHTML={{ __html: pageHTML }} />
      </div>
      <Script
        src="https://link.msgsndr.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
