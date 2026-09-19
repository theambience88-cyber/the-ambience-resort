/* =========================================================================
   THE AMBIENCE RESORT — SCRIPT
   Reads everything dynamic from SITE_CONFIG (site-config.js) and wires up
   navigation, hero slideshow, reveal animations, gallery + lightbox and
   the WhatsApp-based enquiry form.
   ========================================================================= */
(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};

  /* ----------------------------------------------------------------- */
  /* Small inline icon set used by the Experiences cards                */
  /* ----------------------------------------------------------------- */
  const ICONS = {
    rings: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="9" cy="14" r="5.2"/><circle cx="15" cy="14" r="5.2"/></svg>',
    glass: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 3h12l-1.5 9a4.5 4.5 0 0 1-9 0L6 3z"/><path d="M12 15.5V21"/><path d="M8 21h8"/></svg>',
    flower: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="12" cy="12" r="2.4"/><path d="M12 2c1.8 0 3 1.6 3 3.4S13.8 9 12 9s-3-1.8-3-3.6S10.2 2 12 2zM12 15c1.8 0 3 1.6 3 3.4S13.8 22 12 22s-3-1.8-3-3.6S10.2 15 12 15zM2 12c0-1.8 1.6-3 3.4-3S9 10.2 9 12s-1.8 3-3.6 3S2 13.8 2 12zM15 12c0-1.8 1.6-3 3.4-3S22 10.2 22 12s-1.8 3-3.6 3-3.4-1.2-3.4-3z"/></svg>',
    briefcase: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="3" y="7" width="18" height="12" rx="1.5"/><path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7"/></svg>',
    utensils: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M7 2v7a2 2 0 0 0 2 2v11M7 2v7M9 2v9M17 2c-1.7 0-3 2-3 5s1.3 5 3 5v9"/></svg>',
    hall: '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M3 21V10L12 4l9 6v11"/><path d="M7 21v-6h10v6"/><path d="M3 10h18"/></svg>',
    grandhall: '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M4 21V9l8-5 8 5v12"/><path d="M4 9l8 5 8-5"/><path d="M9 21v-7h6v7"/></svg>',
    lawn: '<svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3"><path d="M12 21c4-2 4-6 4-9-3 0-4 2-4 2s-1-2-4-2c0 3 0 7 4 9z"/><path d="M12 12c0-4 2-6 2-6s-4-1-6 3"/><path d="M3 21h18"/></svg>',
    check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>'
  };

  /* ----------------------------------------------------------------- */
  /* Helpers                                                            */
  /* ----------------------------------------------------------------- */
  function el(tag, attrs, html) {
    const e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(k => e.setAttribute(k, attrs[k]));
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function digitsOnly(str) { return (str || "").replace(/\D/g, ""); }

  function waLink(number, message) {
    return "https://wa.me/" + digitsOnly(number) + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  function telLink(number) { return "tel:+" + digitsOnly(number); }

  /* ----------------------------------------------------------------- */
  /* 1. Loader — animated percentage counter, then fade into homepage   */
  /* ----------------------------------------------------------------- */
  (function runLoader() {
    const loader = document.getElementById("loader");
    const percentEl = document.getElementById("loaderPercent");
    const barFillEl = document.getElementById("loaderBarFill");
    if (!loader) return;

    let progress = 0;
    const duration = 1900; // ms, target time to reach 100%
    const start = performance.now();

    function tick(now) {
      const elapsed = now - start;
      // ease-out so it feels like it's "loading" rather than linear
      progress = Math.min(100, Math.round((1 - Math.pow(1 - elapsed / duration, 2)) * 100));
      if (percentEl) percentEl.textContent = String(progress);
      if (barFillEl) barFillEl.style.width = progress + "%";
      if (progress < 100 && elapsed < duration) {
        requestAnimationFrame(tick);
      } else {
        if (percentEl) percentEl.textContent = "100";
        if (barFillEl) barFillEl.style.width = "100%";
        setTimeout(function () { loader.classList.add("hidden"); }, 350);
      }
    }
    requestAnimationFrame(tick);
  })();

  /* ----------------------------------------------------------------- */
  /* 2. Navbar scroll state + hamburger                                 */
  /* ----------------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  function onScroll() {
    if (window.scrollY > 40) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobileMenu");
  function closeMobileMenu() {
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }
  hamburger.addEventListener("click", function () {
    const willOpen = !mobileMenu.classList.contains("open");
    hamburger.classList.toggle("open", willOpen);
    hamburger.setAttribute("aria-expanded", String(willOpen));
    mobileMenu.classList.toggle("open", willOpen);
    document.body.style.overflow = willOpen ? "hidden" : "";
  });
  mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobileMenu));

  /* ----------------------------------------------------------------- */
  /* 3. Hero slideshow                                                  */
  /* ----------------------------------------------------------------- */
  const heroSlidesEl = document.getElementById("heroSlides");
  const heroImages = (cfg.heroImages && cfg.heroImages.length) ? cfg.heroImages : ["assets/images/hero-1.jpg"];
  heroImages.forEach(function (src, i) {
    const slide = el("div", { class: "hero-slide" + (i === 0 ? " active" : "") });
    slide.style.backgroundImage = "url('" + src + "')";
    heroSlidesEl.appendChild(slide);
  });
  if (heroImages.length > 1) {
    let heroIndex = 0;
    setInterval(function () {
      const slides = heroSlidesEl.querySelectorAll(".hero-slide");
      slides[heroIndex].classList.remove("active");
      heroIndex = (heroIndex + 1) % slides.length;
      slides[heroIndex].classList.add("active");
    }, 5500);
  }

  /* ----------------------------------------------------------------- */
  /* 3b. Hero heading split-word reveal                                 */
  /* ----------------------------------------------------------------- */
  (function splitHeroHeading() {
    const heading = document.getElementById("heroHeading");
    if (!heading) return;
    if (heading.classList.contains("hero-heading-statement")) return;
    const lines = heading.innerHTML.split("<br>");
    let wordDelay = 0;
    heading.innerHTML = lines.map(function (line) {
      const words = line.trim().split(" ").filter(Boolean);
      const wrapped = words.map(function (word) {
        const span = '<span class="split-word" style="animation-delay:' + wordDelay + 'ms">' + word + '&nbsp;</span>';
        wordDelay += 90;
        return span;
      }).join("");
      return '<span class="split-line">' + wrapped + '</span>';
    }).join("<br>");
  })();

  /* ----------------------------------------------------------------- */
  /* 3c. Marquee ticker                                                 */
  /* ----------------------------------------------------------------- */
  (function buildMarquee() {
    const track = document.getElementById("marqueeTrack");
    if (!track || !cfg.marquee || !cfg.marquee.length) return;
    // Render the list twice back-to-back so the CSS animation (which
    // shifts by -50%) loops seamlessly.
    const html = cfg.marquee.map(function (item) { return '<span class="marquee-item">' + item + "</span>"; }).join("");
    track.innerHTML = html + html;
  })();

  /* ----------------------------------------------------------------- */
  /* 4. Reveal-on-scroll                                                */
  /* ----------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });
  revealTargets.forEach(t => revealObserver.observe(t));

  /* ----------------------------------------------------------------- */
  /* 5. About — single image (with a designed fallback, never a         */
  /*    "coming soon" box), animated badge, and feature points          */
  /* ----------------------------------------------------------------- */
  (function buildAbout() {
    const img = document.getElementById("aboutMain");
    if (img && cfg.aboutImage) {
      img.src = cfg.aboutImage;
      img.alt = cfg.resortName || "The Ambience Resort";
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        const frame = img.parentElement;
        if (!frame) return;
        const emblem = el("div", { class: "about-emblem" },
          '<span class="about-emblem-mark">✦</span>' +
          '<span class="about-emblem-name">' + (cfg.resortName || "The Ambience Resort") + '</span>' +
          '<span class="about-emblem-sub">' + (cfg.shortLocation || "") + '</span>'
        );
        img.replaceWith(emblem);
      });
    }

    // Floating stat badge — pulled from the first stats entry so it always
    // matches whatever numbers are set in site-config.js.
    const firstStat = (cfg.stats && cfg.stats[0]) || null;
    if (firstStat) {
      const numEl = document.getElementById("aboutBadgeNumber");
      const labelEl = document.getElementById("aboutBadgeLabel");
      if (numEl) numEl.textContent = firstStat.number + (firstStat.suffix || "");
      if (labelEl) labelEl.textContent = firstStat.label;
    }

    // A few short feature points drawn from "highlights" to fill the
    // column without needing extra photography.
    const pointsEl = document.getElementById("aboutPoints");
    if (pointsEl && cfg.highlights) {
      cfg.highlights.slice(0, 3).forEach(function (h) {
        pointsEl.appendChild(el("div", { class: "about-point" },
          '<span class="about-point-icon">' + ICONS.check + '</span><span class="about-point-label">' + h + '</span>'
        ));
      });
    }
  })();

  /* ----------------------------------------------------------------- */
  /* 6. Venues — icon-based cards by default; automatically switches to */
  /*    a photo card once venue.image is set in site-config.js          */
  /* ----------------------------------------------------------------- */
  const venueGrid = document.getElementById("venueGrid");
  (cfg.venues || []).forEach(function (v) {
    if (v.image) {
      // Photo card, with a graceful fallback to the icon card if the
      // photo fails to load — never a broken-image icon.
      const card = el("div", { class: "venue-card venue-card--photo" });
      const img = el("img", { alt: v.name, loading: "lazy" });
      img.src = v.image;
      card.appendChild(img);
      const body = el("div", { class: "venue-card-body" },
        "<h3>" + v.name + "</h3><p>" + v.description + "</p>"
      );
      body.appendChild(el("a", { href: "#contact", class: "btn btn-gold" }, "Enquire Now"));
      card.appendChild(body);
      img.addEventListener("error", function onErr() {
        img.removeEventListener("error", onErr);
        card.replaceWith(buildIconVenueCard(v));
      });
      venueGrid.appendChild(card);
    } else {
      venueGrid.appendChild(buildIconVenueCard(v));
    }
  });

  function buildIconVenueCard(v) {
    const card = el("div", { class: "venue-card venue-card--icon" },
      '<div class="venue-card-icon">' + (ICONS[v.icon] || ICONS.hall) + "</div>" +
      "<h3>" + v.name + "</h3>" +
      '<div class="venue-card-underline"></div>' +
      "<p>" + v.description + "</p>"
    );
    card.appendChild(el("a", { href: "#contact", class: "btn btn-gold" }, "Enquire Now"));
    return card;
  }

  /* ----------------------------------------------------------------- */
  /* 7. Gallery — up to 4 real photos only; whole section (and its nav  */
  /*    links) hides itself automatically when none are supplied        */
  /* ----------------------------------------------------------------- */
  const gallerySection = document.getElementById("gallery");
  const galleryGridEl = document.getElementById("galleryGrid");
  const galleryItems = (cfg.gallery || []).slice(0, 4);

  if (!galleryItems.length) {
    gallerySection.classList.add("section-hidden");
    document.querySelectorAll('a[href="#gallery"]').forEach(function (link) {
      const li = link.closest("li") || link;
      li.style.display = "none";
    });
  }

  const galleryImgEls = [];
  galleryItems.forEach(function (item, i) {
    const figure = el("div", { class: "gallery-item", "data-index": String(i) });
    const img = el("img", { alt: item.alt || "The Ambience Resort gallery photo", loading: "lazy" });
    img.src = item.src;
    figure.appendChild(img);
    galleryGridEl.appendChild(figure);
    galleryImgEls.push(figure);
    // If a listed gallery photo fails to load, remove that tile entirely
    // rather than showing a broken-image icon or placeholder box.
    img.addEventListener("error", function onErr() {
      img.removeEventListener("error", onErr);
      figure.remove();
      const idx = galleryImgEls.indexOf(figure);
      if (idx > -1) galleryImgEls.splice(idx, 1);
      if (!galleryImgEls.length) {
        gallerySection.classList.add("section-hidden");
        document.querySelectorAll('a[href="#gallery"]').forEach(function (link) {
          const li = link.closest("li") || link;
          li.style.display = "none";
        });
      }
    });
  });

  // Lightbox
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  let lightboxIndex = 0;

  function openLightbox(index) {
    lightboxIndex = galleryImgEls.findIndex(item => Number(item.getAttribute("data-index")) === index);
    if (lightboxIndex === -1) lightboxIndex = 0;
    renderLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function renderLightbox() {
    const item = galleryImgEls[lightboxIndex];
    if (!item) return;
    const img = item.querySelector("img");
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  galleryGridEl.addEventListener("click", function (e) {
    const item = e.target.closest(".gallery-item");
    if (!item) return;
    openLightbox(Number(item.getAttribute("data-index")));
  });

  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (e) { if (e.target === lightbox) closeLightbox(); });
  document.getElementById("lightboxPrev").addEventListener("click", function () {
    lightboxIndex = (lightboxIndex - 1 + galleryImgEls.length) % galleryImgEls.length;
    renderLightbox();
  });
  document.getElementById("lightboxNext").addEventListener("click", function () {
    lightboxIndex = (lightboxIndex + 1) % galleryImgEls.length;
    renderLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") document.getElementById("lightboxPrev").click();
    if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
  });

  /* ----------------------------------------------------------------- */
  /* 8. Experiences                                                     */
  /* ----------------------------------------------------------------- */
  const experienceGrid = document.getElementById("experienceGrid");
  (cfg.experiences || []).forEach(function (exp) {
    const card = el("div", { class: "experience-card" },
      '<div class="experience-icon">' + (ICONS[exp.icon] || "") + "</div>" +
      "<h3>" + exp.title + "</h3><p>" + exp.description + "</p>"
    );
    experienceGrid.appendChild(card);
  });

  /* ----------------------------------------------------------------- */
  /* 9. Why choose us                                                   */
  /* ----------------------------------------------------------------- */
  const whyList = document.getElementById("whyList");
  (cfg.highlights || []).forEach(function (h) {
    whyList.appendChild(el("li", {}, h));
  });

  /* ----------------------------------------------------------------- */
  /* 9b. Stats — animated count-up, triggered when scrolled into view   */
  /* ----------------------------------------------------------------- */
  const statsGrid = document.getElementById("statsGrid");
  (cfg.stats || []).forEach(function (stat) {
    const block = el("div", { class: "stat-block" },
      '<div class="stat-number" data-target="' + stat.number + '" data-suffix="' + (stat.suffix || "") + '">0' + (stat.suffix || "") + '</div>' +
      '<div class="stat-label">' + stat.label + "</div>"
    );
    statsGrid.appendChild(block);
  });

  const statNumberEls = statsGrid.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const target = entry.target;
      statsObserver.unobserve(target);
      const endValue = Number(target.getAttribute("data-target")) || 0;
      const suffix = target.getAttribute("data-suffix") || "";
      const duration = 1500;
      const startTime = performance.now();
      function step(now) {
        const p = Math.min(1, (now - startTime) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        target.textContent = Math.round(eased * endValue) + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }, { threshold: 0.5 });
  statNumberEls.forEach(n => statsObserver.observe(n));

  /* ----------------------------------------------------------------- */
  /* 10. Birthday Celebrations — video gallery; whole section (and its  */
  /*     nav links) hides itself automatically when no videos are set   */
  /* ----------------------------------------------------------------- */
  (function buildBirthdayGallery() {
    const section = document.getElementById("birthdays");
    const grid = document.getElementById("birthdayGrid");
    if (!section || !grid) return;

    const videos = cfg.birthdayVideos || [];

    function hideBirthdaySection() {
      section.classList.add("section-hidden");
      document.querySelectorAll('a[href="#birthdays"]').forEach(function (link) {
        const li = link.closest("li") || link;
        li.style.display = "none";
      });
    }

    if (!videos.length) {
      hideBirthdaySection();
      return;
    }

    const cards = [];
    videos.forEach(function (item) {
      const card = el("div", { class: "birthday-card" });
      const wrap = el("div", { class: "birthday-card-video-wrap" });
      const video = el("video", { controls: "", muted: "", loop: "", playsinline: "", preload: "metadata" });
      video.src = item.video;
      wrap.appendChild(video);
      wrap.appendChild(el("div", { class: "birthday-film-label", "aria-hidden": "true" }, "The Ambience · Rajpura"));
      card.appendChild(wrap);
      card.appendChild(el("div", { class: "birthday-card-underline" }));
      card.appendChild(el("div", { class: "birthday-card-title" }, item.title || "Birthday Celebration"));
      grid.appendChild(card);
      cards.push(card);

      // If a listed clip fails to load, remove that card entirely — never
      // a broken-video icon or a "video coming soon" placeholder.
      video.addEventListener("error", function onErr() {
        video.removeEventListener("error", onErr);
        card.remove();
        const idx = cards.indexOf(card);
        if (idx > -1) cards.splice(idx, 1);
        if (!cards.length) hideBirthdaySection();
      });

      const videoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) video.play().catch(function () {});
          else video.pause();
        });
      }, { threshold: 0.58 });
      videoObserver.observe(video);
    });
  })();

  /* ----------------------------------------------------------------- */
  /* 10b. Testimonials slider (auto-rotating, with dots)                */
  /* ----------------------------------------------------------------- */
  (function buildTestimonials() {
    const track = document.getElementById("testimonialTrack");
    const dotsEl = document.getElementById("testimonialDots");
    const items = cfg.testimonials || [];
    const section = document.getElementById("testimonials");
    if (!track || !items.length) {
      if (section) section.hidden = true;
      return;
    }

    items.forEach(function (t, i) {
      const slide = el("div", { class: "testimonial-slide" + (i === 0 ? " active" : "") },
        '<p class="testimonial-quote">' + t.quote + "</p>" +
        '<p class="testimonial-name">' + t.name + "</p>" +
        '<p class="testimonial-event">' + t.event + "</p>"
      );
      track.appendChild(slide);
      const dot = el("button", { class: "testimonial-dot" + (i === 0 ? " active" : ""), "data-index": String(i), "aria-label": "Show testimonial " + (i + 1) });
      dotsEl.appendChild(dot);
    });

    let current = 0;
    const slides = track.querySelectorAll(".testimonial-slide");
    const dots = dotsEl.querySelectorAll(".testimonial-dot");

    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }

    dotsEl.addEventListener("click", function (e) {
      const dot = e.target.closest(".testimonial-dot");
      if (!dot) return;
      goTo(Number(dot.getAttribute("data-index")));
      resetAutoplay();
    });

    let autoplay = setInterval(function () { goTo(current + 1); }, 6000);
    function resetAutoplay() { clearInterval(autoplay); autoplay = setInterval(function () { goTo(current + 1); }, 6000); }
  })();

  /* ----------------------------------------------------------------- */
  /* 10c. FAQ accordion                                                 */
  /* ----------------------------------------------------------------- */
  (function buildFaq() {
    const list = document.getElementById("faqList");
    if (!list || !cfg.faqs) return;
    cfg.faqs.forEach(function (item) {
      const faqItem = el("div", { class: "faq-item" });
      const question = el("button", { class: "faq-question", type: "button" },
        "<span>" + item.q + '</span><span class="faq-question-icon"></span>'
      );
      const answer = el("div", { class: "faq-answer" }, "<p>" + item.a + "</p>");
      faqItem.appendChild(question);
      faqItem.appendChild(answer);
      list.appendChild(faqItem);

      question.addEventListener("click", function () {
        const isOpen = faqItem.classList.contains("open");
        list.querySelectorAll(".faq-item.open").forEach(function (open) {
          open.classList.remove("open");
          open.querySelector(".faq-answer").style.maxHeight = null;
        });
        if (!isOpen) {
          faqItem.classList.add("open");
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  })();

  /* ----------------------------------------------------------------- */
  /* 10d. Custom cursor (mouse-driven devices only)                     */
  /* ----------------------------------------------------------------- */
  (function customCursor() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = document.getElementById("cursorDot");
    const ring = document.getElementById("cursorRing");
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
    document.addEventListener("mousemove", function (e) {
      mouseX = e.clientX; mouseY = e.clientY;
      dot.style.left = mouseX + "px"; dot.style.top = mouseY + "px";
      document.body.classList.add("cursor-ready");
    });

    function animateRing() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ring.style.left = ringX + "px"; ring.style.top = ringY + "px";
      requestAnimationFrame(animateRing);
    }
    animateRing();

    const hoverTargets = "a, button, .venue-card, .gallery-item, input, select, textarea";
    document.addEventListener("mouseover", function (e) {
      if (e.target.closest(hoverTargets)) document.body.classList.add("cursor-hover");
    });
    document.addEventListener("mouseout", function (e) {
      if (e.target.closest(hoverTargets)) document.body.classList.remove("cursor-hover");
    });
  })();

  /* ----------------------------------------------------------------- */
  /* 10e. Magnetic buttons                                              */
  /* ----------------------------------------------------------------- */
  (function magneticButtons() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.querySelectorAll(".magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = "translate(" + (x * 0.25) + "px," + (y * 0.35) + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = "translate(0,0)"; });
    });
  })();

  /* ----------------------------------------------------------------- */
  /* 11. Wire up all contact links from config                          */
  /* ----------------------------------------------------------------- */
  const c = cfg.contact || {};
  const defaultWaMessage = "Hello! I'd like to enquire about The Ambience Resort.";

  function setHref(id, href) { const n = document.getElementById(id); if (n) n.setAttribute("href", href); }
  function setText(id, text) { const n = document.getElementById(id); if (n) n.textContent = text; }

  // Hero buttons
  setHref("heroCall", telLink(c.callNumber1));
  setHref("heroWhatsapp", waLink(c.whatsappNumber, defaultWaMessage));

  // Mobile menu buttons
  setHref("mobileCall", telLink(c.callNumber1));
  setHref("mobileWhatsapp", waLink(c.whatsappNumber, defaultWaMessage));

  // Instagram follow button
  setHref("instaBtn", c.instagramUrl);
  setHref("contactInstaBtn", c.instagramUrl);
  setHref("contactFbBtn", c.facebookUrl);
  setHref("footerInsta", c.instagramUrl);
  setHref("footerFb", c.facebookUrl);

  // Contact section
  setText("contactCallText", (c.displayName1 ? c.displayName1 + ": " : "") + c.callNumber1Display +
    (c.callNumber2Display ? "  ·  " + (c.displayName2 ? c.displayName2 + ": " : "") + c.callNumber2Display : "") +
    (c.callNumber3Display ? "  ·  " + (c.displayName3 ? c.displayName3 + ": " : "") + c.callNumber3Display : ""));
  setText("contactWhatsappText", c.whatsappDisplay);
  setText("contactAddressText", c.address);
  setHref("contactCallBtn", telLink(c.callNumber1));
  setHref("contactWhatsappBtn", waLink(c.whatsappNumber, defaultWaMessage));
  setHref("contactMapsBtn", c.googleMapsUrl);
  setHref("googlePresenceBtn", c.googleMapsUrl);

  // Floating buttons
  setHref("floatWhatsapp", waLink(c.whatsappNumber, defaultWaMessage));
  setHref("floatCall", telLink(c.callNumber1));

  // Closing CTA band
  setHref("ctaWhatsapp", waLink(c.whatsappNumber, defaultWaMessage));

  // Footer
  setText("footerCall", "Call: " +
    (c.displayName1 ? c.displayName1 + " " : "") + c.callNumber1Display +
    (c.callNumber2Display ? " · " + (c.displayName2 ? c.displayName2 + " " : "") + c.callNumber2Display : "") +
    (c.callNumber3Display ? " · " + (c.displayName3 ? c.displayName3 + " " : "") + c.callNumber3Display : ""));
  setText("footerWhatsapp", "WhatsApp: " + c.whatsappDisplay);
  setText("footerAddress", c.address);
  document.getElementById("footerYear").textContent = String(new Date().getFullYear());

  /* ----------------------------------------------------------------- */
  /* 12. Enquiry form -> pre-filled WhatsApp message                    */
  /* ----------------------------------------------------------------- */
  const enquiryForm = document.getElementById("enquiryForm");
  enquiryForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const mobile = document.getElementById("mobileNumber").value.trim();

    if (!name || !mobile) {
      alert("Please share your name and mobile number so we can reach you.");
      return;
    }

    const date = document.getElementById("eventDate").value;
    const functionType = document.getElementById("functionType").value;
    const guests = document.getElementById("guestCount").value;
    const message = document.getElementById("enquiryMessage").value.trim();

    const lines = [
      "Hello! I'd like to enquire about The Ambience Resort.",
      "Name: " + name,
      "Mobile: " + mobile
    ];
    if (functionType) lines.push("Function Type: " + functionType);
    if (date) lines.push("Event Date: " + date);
    if (guests) lines.push("Estimated Guests: " + guests);
    if (message) lines.push("Message: " + message);

    window.open(waLink(c.whatsappNumber, lines.join("\n")), "_blank");
  });

})();
