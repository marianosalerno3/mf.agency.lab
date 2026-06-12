/* MF Agency Lab - production bundle (JSX precompilato). Sorgente: index.dev.html */

/* --- block 0 --- */
(function(){
function Svg({
  children,
  className = "h-6 w-6",
  stroke = true
}) {
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: stroke ? "none" : "currentColor",
    stroke: stroke ? "currentColor" : "none",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    className: className
  }, children);
}
window.ArrowUpRight = p => /*#__PURE__*/React.createElement(Svg, {
  className: p.className || "h-5 w-5"
}, /*#__PURE__*/React.createElement("path", {
  d: "M7 17L17 7"
}), /*#__PURE__*/React.createElement("path", {
  d: "M7 7h10v10"
}));
window.Play = p => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 24 24",
  fill: "currentColor",
  className: p.className || "h-4 w-4"
}, /*#__PURE__*/React.createElement("polygon", {
  points: "6 4 20 12 6 20 6 4"
}));
window.IconCamera = p => /*#__PURE__*/React.createElement(Svg, {
  className: p.className
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 8a2 2 0 0 1 2-2h2l1.5-2h7L19 6h0a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "13",
  r: "3.5"
}));
window.IconCode = p => /*#__PURE__*/React.createElement(Svg, {
  className: p.className
}, /*#__PURE__*/React.createElement("path", {
  d: "M8 9l-4 3 4 3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 9l4 3-4 3"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 6l-2 12"
}));
window.IconMegaphone = p => /*#__PURE__*/React.createElement(Svg, {
  className: p.className
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 11v2a1 1 0 0 0 1 1h2l4 3V7L6 10H4a1 1 0 0 0-1 1Z"
}), /*#__PURE__*/React.createElement("path", {
  d: "M10 7l9-4v18l-9-4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M16 9a3 3 0 0 1 0 6"
}));
window.IconStar = p => /*#__PURE__*/React.createElement(Svg, {
  className: p.className
}, /*#__PURE__*/React.createElement("path", {
  d: "m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z"
}));
window.IconChart = p => /*#__PURE__*/React.createElement(Svg, {
  className: p.className
}, /*#__PURE__*/React.createElement("path", {
  d: "M4 19V5"
}), /*#__PURE__*/React.createElement("path", {
  d: "M4 19h16"
}), /*#__PURE__*/React.createElement("path", {
  d: "M8 16v-4"
}), /*#__PURE__*/React.createElement("path", {
  d: "M13 16V8"
}), /*#__PURE__*/React.createElement("path", {
  d: "M18 16v-7"
}));
window.IconInstagram = p => /*#__PURE__*/React.createElement(Svg, {
  className: p.className
}, /*#__PURE__*/React.createElement("rect", {
  x: "3",
  y: "3",
  width: "18",
  height: "18",
  rx: "5"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "12",
  r: "4"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "17.2",
  cy: "6.8",
  r: "0.6",
  fill: "currentColor",
  stroke: "none"
}));
window.IconMapPin = p => /*#__PURE__*/React.createElement(Svg, {
  className: p.className
}, /*#__PURE__*/React.createElement("path", {
  d: "M12 21s-6-5.3-6-10a6 6 0 1 1 12 0c0 4.7-6 10-6 10Z"
}), /*#__PURE__*/React.createElement("circle", {
  cx: "12",
  cy: "11",
  r: "2.2"
}));
})();

/* --- block 1 --- */
(function(){
const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;
function FadingVideo({
  src,
  className,
  style
}) {
  const videoRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const fadingOutRef = React.useRef(false);
  const restartTimeoutRef = React.useRef(null);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    function fadeTo(target, duration) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // requestAnimationFrame is paused while the page is hidden (background
      // tab / offscreen render). Jump straight to the target so the video is
      // never stuck invisible; the crossfade still animates when visible.
      if (document.hidden) {
        video.style.opacity = String(target);
        rafRef.current = null;
        return;
      }
      const start = parseFloat(video.style.opacity) || 0;
      const delta = target - start;
      const startTime = performance.now();
      function step(now) {
        const t = duration > 0 ? Math.min((now - startTime) / duration, 1) : 1;
        video.style.opacity = String(start + delta * t);
        if (t < 1) rafRef.current = requestAnimationFrame(step);else rafRef.current = null;
      }
      rafRef.current = requestAnimationFrame(step);
    }
    function onLoadedData() {
      video.style.opacity = "0";
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
      fadeTo(1, FADE_MS);
    }
    function onTimeUpdate() {
      const remaining = video.duration - video.currentTime;
      if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    }
    function onEnded() {
      video.style.opacity = "0";
      restartTimeoutRef.current = setTimeout(() => {
        video.currentTime = 0;
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    }
    video.addEventListener("loadeddata", onLoadedData);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("ended", onEnded);
    if (video.readyState >= 2) onLoadedData();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (restartTimeoutRef.current) clearTimeout(restartTimeoutRef.current);
      video.removeEventListener("loadeddata", onLoadedData);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);
  return /*#__PURE__*/React.createElement("video", {
    ref: videoRef,
    className: className,
    style: Object.assign({
      opacity: 0
    }, style || {}),
    src: src,
    autoPlay: true,
    muted: true,
    playsInline: true,
    loop: false,
    preload: "auto"
  });
}
window.FadingVideo = FadingVideo;
})();

/* --- block 2 --- */
(function(){
function BlurText({
  text,
  className
}) {
  const motion = window.Motion.motion;
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(e.target);
        }
      });
    }, {
      threshold: 0.1
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const words = text.split(" ");
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    className: className,
    style: {
      display: "flex",
      flexWrap: "wrap",
      rowGap: "0.1em"
    }
  }, words.map((w, i) => /*#__PURE__*/React.createElement(motion.span, {
    key: i,
    style: {
      display: "inline-block",
      marginRight: "0.28em"
    },
    initial: {
      filter: "blur(10px)",
      opacity: 0,
      y: 50
    },
    animate: inView ? {
      filter: ["blur(10px)", "blur(5px)", "blur(0px)"],
      opacity: [0, 0.5, 1],
      y: [50, -5, 0]
    } : {},
    transition: {
      duration: 0.7,
      times: [0, 0.5, 1],
      ease: "easeOut",
      delay: i * 100 / 1000
    }
  }, w)));
}
window.BlurText = BlurText;
})();

/* --- block 3 --- */
(function(){
function Logo({
  color = "text-green",
  sub = "text-green/70",
  size = "text-2xl"
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col leading-none"
  }, /*#__PURE__*/React.createElement("span", {
    className: `font-heading font-extrabold tracking-tight ${color} ${size}`
  }, "MF"), /*#__PURE__*/React.createElement("span", {
    className: `font-heading font-medium ${sub}`,
    style: {
      fontSize: "9px",
      letterSpacing: "0.28em"
    }
  }, "AGENCY LAB"));
}
window.Logo = Logo;
})();

/* --- block 4 --- */
(function(){
function Navbar() {
  const ArrowUpRight = window.ArrowUpRight;
  const Logo = window.Logo;
  const links = [["Servizi", "#servizi"], ["Casi Studio", "#casi-studio"], ["Approccio", "#approccio"], ["Contatti", "#contatti"]];
  return /*#__PURE__*/React.createElement("nav", {
    className: "absolute top-5 left-0 right-0 z-50 px-6 md:px-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top"
  }, /*#__PURE__*/React.createElement(Logo, null)), /*#__PURE__*/React.createElement("div", {
    className: "hidden md:flex items-center glass rounded-full px-2 py-2"
  }, links.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: label,
    href: href,
    className: "px-4 py-2 text-sm font-medium text-green/90 hover:text-green transition-colors"
  }, label))), /*#__PURE__*/React.createElement("a", {
    href: "#contatti",
    className: "hidden sm:inline-flex items-center gap-1.5 bg-green text-cream rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-greenlt transition-colors whitespace-nowrap"
  }, "Lavora con noi ", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-4 w-4"
  }))));
}
window.Navbar = Navbar;
})();

/* --- block 5 --- */
(function(){
function Hero() {
  const motion = window.Motion.motion;
  const {
    FadingVideo,
    Navbar,
    BlurText,
    ArrowUpRight,
    Play
  } = window;
  const enter = {
    initial: {
      filter: "blur(10px)",
      opacity: 0,
      y: 20
    },
    animate: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "relative w-full h-screen overflow-hidden bg-cream"
  }, /*#__PURE__*/React.createElement(FadingVideo, {
    src: "hero.mp4",
    className: "absolute inset-0 w-full h-full object-cover object-center z-0"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-cream via-cream/80 to-transparent z-[1]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 flex flex-col h-full"
  }, /*#__PURE__*/React.createElement(Navbar, null), /*#__PURE__*/React.createElement("div", {
    className: "mt-auto px-6 md:px-12 pb-14 max-w-4xl"
  }, /*#__PURE__*/React.createElement(motion.div, {
    initial: enter.initial,
    animate: enter.animate,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 0.3
    },
    className: "glass rounded-full inline-flex items-center gap-2 px-4 py-1.5 mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h-2 w-2 rounded-full bg-greenlt"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs md:text-sm font-medium text-green/90"
  }, "Agenzia di Comunicazione")), /*#__PURE__*/React.createElement(BlurText, {
    text: "Diamo voce ai brand.",
    className: "font-heading font-bold text-green text-5xl md:text-7xl tracking-[-0.02em] leading-[0.95]"
  }), /*#__PURE__*/React.createElement(motion.p, {
    initial: enter.initial,
    animate: enter.animate,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 0.8
    },
    className: "mt-5 text-base md:text-lg text-green/80 font-light max-w-xl leading-relaxed"
  }, "Contenuti, siti web e advertising che fanno crescere la tua impresa. Strategia e creativit\xE0, dalla produzione alla pubblicazione."), /*#__PURE__*/React.createElement(motion.div, {
    initial: enter.initial,
    animate: enter.animate,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      delay: 1.0
    },
    className: "flex flex-wrap items-center gap-4 mt-8"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#servizi",
    className: "inline-flex items-center gap-2 bg-green text-cream rounded-full px-6 py-3 text-sm font-semibold hover:bg-greenlt transition-colors"
  }, "Scopri i servizi ", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-5 w-5"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#casi-studio",
    className: "inline-flex items-center gap-2 text-green text-sm font-semibold hover:opacity-70 transition-opacity"
  }, "Guarda i casi studio ", /*#__PURE__*/React.createElement(Play, {
    className: "h-4 w-4"
  }))))));
}
window.Hero = Hero;
})();

/* --- block 6 --- */
(function(){
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Servizi() {
  const motion = window.Motion.motion;
  const {
    BlurText,
    IconCamera,
    IconCode,
    IconMegaphone
  } = window;
  const services = [{
    Icon: IconCamera,
    title: "Produzione Contenuti",
    desc: "Veniamo direttamente presso la tua sede con troupe e creativi per realizzare foto e video professionali del tuo prodotto, del team e degli spazi.",
    tags: ["On-site", "Foto & Video", "Reel & Spot"]
  }, {
    Icon: IconCode,
    title: "Siti Web",
    desc: "Progettiamo e sviluppiamo siti web su misura: veloci, responsive e ottimizzati per la conversione. Dal landing page all'e-commerce.",
    tags: ["Design", "Sviluppo", "SEO"]
  }, {
    Icon: IconMegaphone,
    title: "Gestione Pubblicitaria",
    desc: "Pianifichiamo e gestiamo campagne su tutte le principali piattaforme — Meta, Google, TikTok, LinkedIn — con monitoraggio e ottimizzazione continui.",
    tags: ["Meta", "Google", "TikTok", "LinkedIn"]
  }];
  const card = {
    initial: {
      opacity: 0,
      y: 30
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true,
      amount: 0.3
    }
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "servizi",
    className: "bg-green text-cream py-24 md:py-32 px-6 md:px-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-cream/60 mb-4"
  }, "// Servizi"), /*#__PURE__*/React.createElement(BlurText, {
    text: "Tutto ci\xF2 che serve alla tua comunicazione.",
    className: "font-heading font-bold text-4xl md:text-6xl tracking-[-0.02em] leading-[1.0] max-w-3xl"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
  }, services.map((s, i) => /*#__PURE__*/React.createElement(motion.div, _extends({
    key: s.title
  }, card, {
    transition: {
      duration: 0.6,
      ease: "easeOut",
      delay: i * 0.12
    },
    className: "glass-on-dark rounded-[1.5rem] p-7 flex flex-col min-h-[340px]"
  }), /*#__PURE__*/React.createElement("div", {
    className: "glass-on-dark rounded-2xl flex items-center justify-center mb-6",
    style: {
      width: 52,
      height: 52
    }
  }, /*#__PURE__*/React.createElement(s.Icon, {
    className: "h-6 w-6 text-cream"
  })), /*#__PURE__*/React.createElement("h3", {
    className: "font-heading font-semibold text-2xl mb-3"
  }, s.title), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-cream/75 font-light leading-relaxed flex-1"
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-6"
  }, s.tags.map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "glass-on-dark rounded-full px-3 py-1 text-[11px] text-cream/90 font-medium"
  }, t))))))));
}
window.Servizi = Servizi;
})();

/* --- block 7 --- */
(function(){
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Reel({
  src,
  poster
}) {
  const Play = window.Play;
  const [play, setPlay] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: "relative rounded-xl overflow-hidden bg-green/5 aspect-[9/16]"
  }, play ? /*#__PURE__*/React.createElement("video", {
    src: src,
    poster: poster,
    className: "w-full h-full object-cover",
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    controls: true
  }) : /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setPlay(true),
    "aria-label": "Riproduci video",
    className: "group block w-full h-full"
  }, /*#__PURE__*/React.createElement("img", {
    src: poster,
    alt: "",
    loading: "lazy",
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute inset-0 flex items-center justify-center bg-green/10 group-hover:bg-green/0 transition-colors"
  }, /*#__PURE__*/React.createElement("span", {
    className: "glass rounded-full flex items-center justify-center",
    style: {
      width: 48,
      height: 48
    }
  }, /*#__PURE__*/React.createElement(Play, {
    className: "h-4 w-4 text-green ml-0.5"
  })))));
}
function CasiStudio() {
  const motion = window.Motion.motion;
  const {
    BlurText,
    ArrowUpRight,
    IconInstagram,
    IconMapPin
  } = window;
  const cases = [{
    title: "Valentinario",
    handle: "@valentinario.official",
    href: "https://www.instagram.com/valentinario.official/",
    place: "Campania",
    sector: "Brand",
    desc: "Produzione video on-site presso l'azienda e gestione marketing completa sui canali social.",
    services: ["Produzione Video", "Social Media", "Advertising"],
    videos: ["valentinario-1", "valentinario-2", "valentinario-3"]
  }, {
    title: "Napolitano Rooms",
    handle: "@napolitanorooms",
    href: "https://www.instagram.com/napolitanorooms/",
    place: "Campania",
    sector: "Hospitality",
    desc: "Attività ricettiva: produzione video on-site della struttura e gestione marketing completa.",
    services: ["Produzione Video", "Social Media", "Advertising"],
    videos: ["napolitano-1", "napolitano-2", "napolitano-3"]
  }, {
    title: "Oltretempo",
    handle: "@oltretempo.it",
    href: "https://www.instagram.com/oltretempo.it/",
    place: "Campania",
    sector: "Brand",
    desc: "Produzione video on-site presso l'azienda e gestione marketing completa sui canali social.",
    services: ["Produzione Video", "Social Media", "Advertising"],
    videos: []
  }];
  const featured = cases.filter(c => c.videos.length > 0);
  const others = cases.filter(c => c.videos.length === 0);
  const reveal = {
    initial: {
      opacity: 0,
      y: 30
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true,
      amount: 0.2
    }
  };
  const Info = c => /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "glass rounded-full inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-green/80"
  }, /*#__PURE__*/React.createElement(IconMapPin, {
    className: "h-3.5 w-3.5"
  }), " ", c.place), /*#__PURE__*/React.createElement("div", {
    className: "text-xs font-medium text-greenlt mt-4 mb-1"
  }, c.sector), /*#__PURE__*/React.createElement("h3", {
    className: "font-heading font-semibold text-4xl md:text-5xl tracking-tight leading-none"
  }, c.title), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-green/60 font-light"
  }, c.handle), /*#__PURE__*/React.createElement("p", {
    className: "text-sm md:text-base text-green/70 font-light leading-relaxed mt-4 max-w-md"
  }, c.desc), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 mt-5"
  }, c.services.map(s => /*#__PURE__*/React.createElement("span", {
    key: s,
    className: "glass rounded-full px-3 py-1 text-[11px] text-green/80 font-medium"
  }, s))), /*#__PURE__*/React.createElement("a", {
    href: c.href,
    target: "_blank",
    rel: "noopener",
    className: "group inline-flex items-center gap-1.5 text-sm font-semibold text-green mt-6 hover:opacity-70 transition-opacity"
  }, /*#__PURE__*/React.createElement(IconInstagram, {
    className: "h-4 w-4"
  }), " Vedi su Instagram", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
  })));
  return /*#__PURE__*/React.createElement("section", {
    id: "casi-studio",
    className: "bg-cream text-green py-24 md:py-32 px-6 md:px-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-end justify-between gap-6 mb-16"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-green/60 mb-4"
  }, "// Casi Studio"), /*#__PURE__*/React.createElement(BlurText, {
    text: "Progetti che parlano da soli.",
    className: "font-heading font-bold text-4xl md:text-6xl tracking-[-0.02em] leading-[1.0] max-w-3xl"
  })), /*#__PURE__*/React.createElement("a", {
    href: "#contatti",
    className: "inline-flex items-center gap-2 text-sm font-semibold text-green hover:opacity-70 transition-opacity"
  }, "Vuoi essere il prossimo? ", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-4 w-4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-20"
  }, featured.map((c, i) => /*#__PURE__*/React.createElement(motion.div, _extends({
    key: c.title
  }, reveal, {
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
    className: "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center"
  }), /*#__PURE__*/React.createElement("div", {
    className: i % 2 === 1 ? "lg:order-2" : ""
  }, Info(c)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-3 sm:gap-4 " + (i % 2 === 1 ? "lg:order-1" : "")
  }, c.videos.map(v => /*#__PURE__*/React.createElement(Reel, {
    key: v,
    src: "media/" + v + ".mp4",
    poster: "media/" + v + ".jpg"
  })))))), others.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
  }, others.map(c => /*#__PURE__*/React.createElement(motion.div, _extends({
    key: c.title
  }, reveal, {
    transition: {
      duration: 0.6,
      ease: "easeOut"
    },
    className: "bg-creamlt border border-green/10 rounded-[1.5rem] p-7 flex flex-col"
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("span", {
    className: "glass rounded-full inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-green/80"
  }, /*#__PURE__*/React.createElement(IconMapPin, {
    className: "h-3.5 w-3.5"
  }), " ", c.place), /*#__PURE__*/React.createElement(IconInstagram, {
    className: "h-5 w-5 text-green/70"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-medium text-greenlt mb-2"
  }, c.sector), /*#__PURE__*/React.createElement("h3", {
    className: "font-heading font-semibold text-3xl tracking-tight leading-none"
  }, c.title), /*#__PURE__*/React.createElement("span", {
    className: "text-sm text-green/60 font-light mt-1"
  }, c.handle), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-green/70 font-light leading-relaxed mt-4 flex-1"
  }, c.desc), /*#__PURE__*/React.createElement("a", {
    href: c.href,
    target: "_blank",
    rel: "noopener",
    className: "group inline-flex items-center gap-1.5 text-sm font-semibold text-green mt-6 hover:opacity-70 transition-opacity"
  }, "Vedi su Instagram", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
  }))))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green/40 mt-10"
  }, "Alcuni dei brand che hanno scelto MF Agency Lab.")));
}
window.CasiStudio = CasiStudio;
})();

/* --- block 8 --- */
(function(){
function Approccio() {
  const motion = window.Motion.motion;
  const steps = [["01", "Ascolto", "Analizziamo brand, obiettivi e pubblico."], ["02", "Strategia", "Definiamo il piano di comunicazione su misura."], ["03", "Produzione", "Realizziamo contenuti, siti e campagne."], ["04", "Crescita", "Misuriamo i risultati e ottimizziamo nel tempo."]];
  return /*#__PURE__*/React.createElement("section", {
    id: "approccio",
    className: "bg-green text-cream py-20 px-6 md:px-12 border-t border-cream/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-cream/60 mb-10"
  }, "// Il nostro approccio"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
  }, steps.map(([n, t, d], i) => /*#__PURE__*/React.createElement(motion.div, {
    key: n,
    initial: {
      opacity: 0,
      y: 20
    },
    whileInView: {
      opacity: 1,
      y: 0
    },
    viewport: {
      once: true
    },
    transition: {
      duration: 0.5,
      delay: i * 0.1
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-heading font-bold text-3xl text-cream/30"
  }, n), /*#__PURE__*/React.createElement("h4", {
    className: "font-heading font-semibold text-xl mt-2"
  }, t), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-cream/70 font-light mt-2 leading-relaxed"
  }, d))))));
}
window.Approccio = Approccio;
})();

/* --- block 9 --- */
(function(){
// Web3Forms: chiave gratuita da https://web3forms.com (usa la tua email
// mf.agency.lab@gmail.com). Incolla qui la access key per ricevere le
// richieste via email. Finché è vuota, il form usa il fallback mailto.
const WEB3FORMS_ACCESS_KEY = "82ab177f-c125-40fb-8886-ce09422c54a7";
function Contatti() {
  const {
    Logo,
    ArrowUpRight
  } = window;
  const SERVICES = ["Produzione Contenuti", "Sito Web", "Gestione Pubblicitaria", "Altro / Strategia"];
  const empty = {
    name: "",
    email: "",
    phone: "",
    servizio: SERVICES[0],
    message: "",
    consent: false
  };
  const [form, setForm] = React.useState(empty);
  const [status, setStatus] = React.useState("idle"); // idle | sending | success | error
  const upd = k => e => setForm(Object.assign({}, form, {
    [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value
  }));
  const summary = () => `Nome: ${form.name}\nEmail: ${form.email}\nTelefono: ${form.phone || "-"}\nServizio: ${form.servizio}\n\nMessaggio:\n${form.message}`;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.consent) return;
    setStatus("sending");
    const configured = WEB3FORMS_ACCESS_KEY && WEB3FORMS_ACCESS_KEY.length > 10;
    if (configured) {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            subject: `Nuova richiesta dal sito — ${form.servizio}`,
            from_name: form.name,
            email: form.email,
            telefono: form.phone,
            servizio: form.servizio,
            message: form.message
          })
        });
        const data = await res.json();
        if (data.success) {
          setStatus("success");
          setForm(empty);
        } else setStatus("error");
      } catch (err) {
        setStatus("error");
      }
    } else {
      // Fallback senza backend: apre il client email con tutto precompilato
      const subject = encodeURIComponent(`Richiesta informazioni — ${form.servizio}`);
      const body = encodeURIComponent(summary());
      window.location.href = `mailto:mf.agency.lab@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  }
  function handleWhatsApp() {
    const text = encodeURIComponent(`Ciao MF Agency Lab! Sono ${form.name || "..."}. Vorrei informazioni su: ${form.servizio}.` + (form.message ? `\n\n${form.message}` : ""));
    window.open(`https://wa.me/393487313525?text=${text}`, "_blank", "noopener");
  }
  const inputCls = "w-full bg-creamlt border border-green/15 rounded-xl px-4 py-3 text-sm text-green placeholder-green/40 outline-none focus:border-green/50 focus:ring-2 focus:ring-green/10 transition";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    id: "contatti",
    className: "bg-cream text-green px-6 md:px-12 pt-24 md:pt-32 pb-20"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-medium text-green/60 mb-4"
  }, "// Contatti"), /*#__PURE__*/React.createElement("h2", {
    className: "font-heading font-bold text-4xl md:text-6xl tracking-[-0.02em] leading-[1.0]"
  }, "Pronto a far crescere il tuo brand?"), /*#__PURE__*/React.createElement("p", {
    className: "text-green/70 font-light mt-5 max-w-md leading-relaxed"
  }, "Compila il form per ricevere informazioni sui nostri servizi: produzione contenuti, siti web e gestione pubblicitaria. Ti rispondiamo entro 24 ore."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-3 mt-8"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/393487313525",
    target: "_blank",
    rel: "noopener",
    className: "inline-flex items-center gap-2 text-sm font-semibold text-green hover:opacity-70 transition-opacity"
  }, "WhatsApp \xB7 348 731 3525 ", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-4 w-4"
  })), /*#__PURE__*/React.createElement("a", {
    href: "tel:+393487313525",
    className: "inline-flex items-center gap-2 text-sm font-semibold text-green hover:opacity-70 transition-opacity"
  }, "Telefono \xB7 348 731 3525 ", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-4 w-4"
  })), /*#__PURE__*/React.createElement("a", {
    href: "mailto:mf.agency.lab@gmail.com",
    className: "inline-flex items-center gap-2 text-sm font-semibold text-green hover:opacity-70 transition-opacity"
  }, "mf.agency.lab@gmail.com ", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-4 w-4"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-creamlt border border-green/10 rounded-[1.75rem] p-6 md:p-8"
  }, status === "success" ? /*#__PURE__*/React.createElement("div", {
    className: "text-center py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "glass rounded-full inline-flex items-center justify-center mb-5",
    style: {
      width: 56,
      height: 56
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "\u2713")), /*#__PURE__*/React.createElement("h3", {
    className: "font-heading font-semibold text-2xl"
  }, "Richiesta inviata!"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-green/70 font-light mt-2 max-w-xs mx-auto"
  }, "Grazie, ti ricontatteremo al pi\xF9 presto. Per urgenze scrivici su WhatsApp."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setStatus("idle"),
    className: "mt-6 text-sm font-semibold text-green underline underline-offset-4"
  }, "Invia un'altra richiesta")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "flex flex-col gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-medium text-green/70 mb-1.5"
  }, "Nome e cognome *"), /*#__PURE__*/React.createElement("input", {
    className: inputCls,
    type: "text",
    required: true,
    value: form.name,
    onChange: upd("name"),
    placeholder: "Mario Rossi"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-medium text-green/70 mb-1.5"
  }, "Email *"), /*#__PURE__*/React.createElement("input", {
    className: inputCls,
    type: "email",
    required: true,
    value: form.email,
    onChange: upd("email"),
    placeholder: "nome@email.it"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-medium text-green/70 mb-1.5"
  }, "Telefono"), /*#__PURE__*/React.createElement("input", {
    className: inputCls,
    type: "tel",
    value: form.phone,
    onChange: upd("phone"),
    placeholder: "+39 ..."
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-medium text-green/70 mb-1.5"
  }, "Servizio di interesse"), /*#__PURE__*/React.createElement("select", {
    className: inputCls,
    value: form.servizio,
    onChange: upd("servizio")
  }, SERVICES.map(s => /*#__PURE__*/React.createElement("option", {
    key: s,
    value: s
  }, s))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-medium text-green/70 mb-1.5"
  }, "Messaggio"), /*#__PURE__*/React.createElement("textarea", {
    className: inputCls + " resize-none",
    rows: "4",
    value: form.message,
    onChange: upd("message"),
    placeholder: "Raccontaci il tuo progetto o cosa ti serve..."
  })), /*#__PURE__*/React.createElement("label", {
    className: "flex items-start gap-2.5 text-xs text-green/70 font-light"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    required: true,
    checked: form.consent,
    onChange: upd("consent"),
    className: "mt-0.5 accent-green"
  }), /*#__PURE__*/React.createElement("span", null, "Acconsento al trattamento dei dati personali per essere ricontattato. *")), status === "error" && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-red-700"
  }, "Invio non riuscito. Riprova o scrivici su WhatsApp."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center gap-3 mt-1"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: status === "sending",
    className: "inline-flex items-center gap-2 bg-green text-cream rounded-full px-6 py-3 text-sm font-semibold hover:bg-greenlt transition-colors disabled:opacity-60"
  }, status === "sending" ? "Invio..." : "Invia richiesta", " ", /*#__PURE__*/React.createElement(ArrowUpRight, {
    className: "h-4 w-4"
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: handleWhatsApp,
    className: "inline-flex items-center gap-2 border border-green/25 text-green rounded-full px-6 py-3 text-sm font-semibold hover:bg-green/5 transition-colors"
  }, "Invia su WhatsApp")))))), /*#__PURE__*/React.createElement("footer", {
    className: "bg-cream text-green px-6 md:px-12 pb-10 pt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto border-t border-green/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6"
  }, /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6 text-sm text-green/70"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#servizi",
    className: "hover:text-green transition-colors"
  }, "Servizi"), /*#__PURE__*/React.createElement("a", {
    href: "#casi-studio",
    className: "hover:text-green transition-colors"
  }, "Casi Studio"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:mf.agency.lab@gmail.com",
    className: "hover:text-green transition-colors"
  }, "mf.agency.lab@gmail.com")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-green/50"
  }, "\xA9 ", new Date().getFullYear(), " MF Agency Lab"))));
}
window.Contatti = Contatti;
})();

/* --- block 10 --- */
(function(){
function App() {
  const {
    Hero,
    Servizi,
    CasiStudio,
    Approccio,
    Contatti
  } = window;
  return /*#__PURE__*/React.createElement("div", {
    className: "bg-cream"
  }, /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Servizi, null), /*#__PURE__*/React.createElement(CasiStudio, null), /*#__PURE__*/React.createElement(Approccio, null), /*#__PURE__*/React.createElement(Contatti, null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();