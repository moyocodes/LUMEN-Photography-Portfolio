(function () {
  "use strict"

  var CFG = window.SITE_CONFIG

  function buildWhatsAppLink(message) {
    var encoded = encodeURIComponent(message)
    return "https://wa.me/" + CFG.contact.whatsappNumber + "?text=" + encoded
  }

  var clamp = function (t) {
    return Math.max(0, Math.min(1, t))
  }
  var remap = function (t, a, b) {
    return clamp((t - a) / (b - a))
  }
  var easeOut = function (t) {
    return 1 - Math.pow(1 - t, 3)
  }

  function el(tag, className, text) {
    var e = document.createElement(tag)
    if (className) e.className = className
    if (text != null) e.textContent = text
    return e
  }

  function bindText(root) {
    root.querySelectorAll("[data-bind]").forEach(function (node) {
      var path = node.getAttribute("data-bind").split(".")
      var val = CFG
      for (var i = 0; i < path.length; i++) {
        val = val ? val[path[i]] : undefined
      }
      if (val != null) node.textContent = val
    })
  }

  // ---------------------------------------------------------------------
  // Shared theme state — used by the nav toggle and the dark-mode toast
  // ---------------------------------------------------------------------
  var Theme = (function () {
    var STORAGE_KEY = "site-theme"
    var CHOSEN_KEY = "site-theme-chosen"
    var listeners = []

    function get() {
      return document.documentElement.getAttribute("data-theme") || "light"
    }
    function hasChosen() {
      return localStorage.getItem(CHOSEN_KEY) === "1"
    }
    function choose(theme) {
      document.documentElement.setAttribute("data-theme", theme)
      localStorage.setItem(STORAGE_KEY, theme)
      localStorage.setItem(CHOSEN_KEY, "1")
      listeners.forEach(function (fn) {
        fn(theme)
      })
    }
    function onChange(fn) {
      listeners.push(fn)
    }

    return { get: get, hasChosen: hasChosen, choose: choose, onChange: onChange }
  })()

  document.addEventListener("DOMContentLoaded", init)

  function init() {
    document.title = CFG.site.metaTitle
    bindText(document)

    setupBookingLinks()
    setupCursor()
    setupNav()
    setupHero()
    setupTicker()
    setupFilmStrip()
    setupAboutImages()
    setupPackages()
    setupPolicyFaq()
    setupTestimonials()
    setupContactBg()
    setupContactForm()
    setupWhatsAppWidget()
    setupRateCardWidget()
    setupDarkModeToast()
    setupScrollReveal()
  }

  // ---------------------------------------------------------------------
  // Shared booking links (nav, about, faq, testimonials use the default msg)
  // ---------------------------------------------------------------------
  function setupBookingLinks() {
    var link = buildWhatsAppLink(CFG.defaultBookingMessage)
    ;[
      "nav-book-link",
      "drawer-book-link",
      "about-book-link",
      "faq-book-link",
      "testi-book-link",
      "rate-book-link",
    ].forEach(function (id) {
      var node = document.getElementById(id)
      if (node) node.href = link
    })

    var igLinks = ["contact-ig-link", "footer-ig-link"]
    igLinks.forEach(function (id) {
      var node = document.getElementById(id)
      if (node) node.href = CFG.contact.instagramUrl
    })
  }

  // ---------------------------------------------------------------------
  // Custom cursor
  // ---------------------------------------------------------------------
  function setupCursor() {
    var cur = document.getElementById("cur")
    if (!cur) return

    document.addEventListener("mousemove", function (e) {
      cur.style.left = e.clientX + "px"
      cur.style.top = e.clientY + "px"
    })

    var hoverables = "a,button,[data-cursor-hover]"
    function onEnter() {
      cur.classList.add("hov")
    }
    function onLeave() {
      cur.classList.remove("hov")
    }
    function attach() {
      document.querySelectorAll(hoverables).forEach(function (node) {
        if (node.__cursorBound) return
        node.__cursorBound = true
        node.addEventListener("mouseenter", onEnter)
        node.addEventListener("mouseleave", onLeave)
      })
    }
    attach()
    new MutationObserver(attach).observe(document.body, { childList: true, subtree: true })
  }

  // ---------------------------------------------------------------------
  // Nav
  // ---------------------------------------------------------------------
  function setupNav() {
    var nav = document.getElementById("nav")
    window.addEventListener(
      "scroll",
      function () {
        nav.classList.toggle("stuck", window.scrollY > 60)
      },
      { passive: true }
    )

    var navLinksMount = document.querySelector('[data-mount="nav-links"]')
    var drawerLinksMount = document.querySelector('[data-mount="drawer-links"]')
    CFG.navLinks.forEach(function (pair) {
      var a1 = el("a", null, pair[1])
      a1.href = pair[0]
      a1.setAttribute("data-cursor-hover", "")
      navLinksMount.appendChild(a1)

      var a2 = el("a", null, pair[1])
      a2.href = pair[0]
      a2.setAttribute("data-cursor-hover", "")
      a2.addEventListener("click", closeDrawer)
      drawerLinksMount.appendChild(a2)
    })

    var drawer = document.getElementById("nav-drawer")
    var back = document.getElementById("nav-drawer-back")
    var menuToggle = document.getElementById("menu-toggle")
    var drawerClose = document.getElementById("drawer-close")

    function openDrawer() {
      drawer.classList.add("open")
      back.classList.add("open")
      menuToggle.setAttribute("aria-expanded", "true")
      document.body.style.overflow = "hidden"
    }
    function closeDrawer() {
      drawer.classList.remove("open")
      back.classList.remove("open")
      menuToggle.setAttribute("aria-expanded", "false")
      document.body.style.overflow = ""
    }
    menuToggle.addEventListener("click", function () {
      if (drawer.classList.contains("open")) closeDrawer()
      else openDrawer()
    })
    drawerClose.addEventListener("click", closeDrawer)
    back.addEventListener("click", closeDrawer)
    document.querySelector('a[href="#top"]').addEventListener("click", closeDrawer)

    // Theme toggle
    var themeToggle = document.getElementById("theme-toggle")
    var iconMoon = themeToggle.querySelector(".icon-moon")
    var iconSun = themeToggle.querySelector(".icon-sun")

    function applyThemeIcon(theme) {
      iconMoon.style.display = theme === "light" ? "" : "none"
      iconSun.style.display = theme === "light" ? "none" : ""
    }
    applyThemeIcon(Theme.get())
    Theme.onChange(applyThemeIcon)

    themeToggle.addEventListener("click", function () {
      Theme.choose(Theme.get() === "light" ? "dark" : "light")
    })
  }

  // ---------------------------------------------------------------------
  // Hero — rotating collages + scroll-driven reveal sequence
  // ---------------------------------------------------------------------
  var COLLAGE = CFG.demoCollage
  var PORTRAITS = CFG.demoPortraits
  var GALLERY = [
    COLLAGE[0], PORTRAITS[0], COLLAGE[1], PORTRAITS[1], COLLAGE[2], PORTRAITS[2],
    COLLAGE[3], PORTRAITS[3], COLLAGE[4], PORTRAITS[4], COLLAGE[5], PORTRAITS[5],
    COLLAGE[6], COLLAGE[7], COLLAGE[8], COLLAGE[9],
  ]

  function buildRotator(mount, images, extraClass, intervalMs, offset) {
    mount.innerHTML = ""
    var idx = (offset || 0) % images.length
    var imgs = images.map(function (src) {
      var img = el("img", "rot-frame" + (extraClass ? " " + extraClass : ""))
      img.src = src
      img.alt = ""
      mount.appendChild(img)
      return img
    })
    imgs[idx].classList.add("on")
    setInterval(function () {
      imgs[idx].classList.remove("on")
      idx = (idx + 1) % imgs.length
      imgs[idx].classList.add("on")
    }, intervalMs)
    return imgs
  }

  function setupHero() {
    buildRotator(document.querySelector('[data-mount="gallery-mobile"]'), GALLERY, "", 3500, 0)
    buildRotator(document.querySelector('[data-mount="collage-a"]'), COLLAGE, "top", 3500, 0)
    buildRotator(document.querySelector('[data-mount="portrait-a"]'), PORTRAITS, "", 3500, 0)
    buildRotator(document.querySelector('[data-mount="collage-b"]'), COLLAGE, "top", 3500, Math.floor(COLLAGE.length / 2))
    buildRotator(document.querySelector('[data-mount="portrait-cta-a"]'), PORTRAITS, "top", 3500, 0)
    buildRotator(document.querySelector('[data-mount="portrait-cta-b"]'), PORTRAITS, "top", 3500, Math.floor(PORTRAITS.length / 2))

    var zone = document.getElementById("hero-zone")
    var pin = document.getElementById("hero-pin")
    var img = document.getElementById("h-img")
    var text = document.getElementById("h-text")
    var hint = document.getElementById("h-hint")
    var quote = document.getElementById("h-quote")
    var quoteInner = document.getElementById("h-q-inner")
    var cta = document.getElementById("h-cta")
    var ctaIn = document.getElementById("h-cta-in")

    function update() {
      var zt = zone.getBoundingClientRect().top
      var zh = zone.offsetHeight - innerHeight
      var p = clamp(-zt / zh)

      var p0 = remap(p, 0, 0.18)
      text.style.opacity = String(1 - easeOut(p0))
      text.style.transform = "translateY(" + -easeOut(p0) * 50 + "px)"
      hint.style.opacity = String(Math.max(0, 1 - p0 * 5))

      img.style.transform = "scale(" + (1 + p * 0.06) + ")"

      var qIn = remap(p, 0.3, 0.46)
      var qOut = remap(p, 0.5, 0.64)
      var qO = easeOut(qIn) * (1 - easeOut(qOut))
      quote.style.opacity = String(qO)
      quoteInner.style.transform = "translateY(" + (1 - easeOut(qIn)) * 30 + "px)"

      var cp = remap(p, 0.62, 0.78)
      cta.style.opacity = String(easeOut(cp))
      cta.style.pointerEvents = cp > 0.05 ? "auto" : "none"
      ctaIn.style.opacity = String(easeOut(remap(p, 0.64, 0.8)))
      ctaIn.style.transform = "translateY(" + (1 - easeOut(remap(p, 0.64, 0.8))) * 36 + "px)"

      pin.style.opacity = p > 0.96 ? String(1 - remap(p, 0.96, 1)) : "1"
    }

    var tick = false
    window.addEventListener(
      "scroll",
      function () {
        if (tick) return
        tick = true
        requestAnimationFrame(function () {
          update()
          tick = false
        })
      },
      { passive: true }
    )
    update()
  }

  // ---------------------------------------------------------------------
  // Ticker
  // ---------------------------------------------------------------------
  function setupTicker() {
    var mount = document.querySelector('[data-mount="ticker"]')
    var items = CFG.tickerItems.concat(CFG.tickerItems)
    items.forEach(function (item) {
      mount.appendChild(el("span", null, item))
    })
  }

  // ---------------------------------------------------------------------
  // Film strip
  // ---------------------------------------------------------------------
  function setupFilmStrip() {
    var zone = document.getElementById("film-zone")
    var track = document.getElementById("film-track")
    var progFill = document.getElementById("prog-fill")
    var progCount = document.getElementById("prog-count")
    var code = document.getElementById("film-code")
    var topPerf = document.querySelector('[data-mount="perf-top"]')
    var botPerf = document.querySelector('[data-mount="perf-bottom"]')

    CFG.frames.forEach(function (frame, i) {
      var card = el("div", "frame")
      card.setAttribute("data-cursor-hover", "")

      var wrap = el("div", "frame-img-wrap")
      var img = el("img")
      img.src = frame.src
      img.alt = frame.title
      img.loading = "lazy"
      wrap.appendChild(img)
      card.appendChild(wrap)

      card.appendChild(el("div", "frame-num", String(i + 1).padStart(3, "0")))

      var info = el("div", "frame-info")
      info.appendChild(el("span", "tag", frame.tag))
      info.appendChild(el("h4", null, frame.title))
      card.appendChild(info)

      track.appendChild(card)
    })

    code.textContent = CFG.reelLabel
    progCount.textContent = "01 / " + String(CFG.frames.length).padStart(2, "0")

    function buildPerfs() {
      var n = Math.ceil(innerWidth / 44) + 2
      ;[topPerf, botPerf].forEach(function (mount) {
        mount.innerHTML = ""
        for (var i = 0; i < n; i++) mount.appendChild(el("div", "perf"))
      })
    }
    buildPerfs()
    window.addEventListener("resize", buildPerfs)

    function update() {
      var fRect = zone.getBoundingClientRect()
      var filmH = zone.offsetHeight - innerHeight
      if (filmH <= 0) return
      var scrolled = -fRect.top
      if (scrolled < 0 || scrolled > filmH) return
      var p = clamp(scrolled / filmH)
      var trackW = track.scrollWidth
      var visW = track.parentElement.offsetWidth
      var maxT = Math.max(0, trackW - visW)
      track.style.transform = "translateX(" + -easeOut(p) * maxT + "px)"
      progFill.style.width = (p * 100).toFixed(1) + "%"
      var fc = track.children.length
      var cf = Math.min(fc, Math.floor(p * fc) + 1)
      progCount.textContent = String(cf).padStart(2, "0") + " / " + String(fc).padStart(2, "0")
      code.textContent = p > 0.5 ? CFG.reelLabel2 : CFG.reelLabel
      var tx = -easeOut(p) * maxT
      var cx = -tx + visW / 2
      Array.prototype.forEach.call(track.children, function (f) {
        var fx = f.offsetLeft + f.offsetWidth / 2
        var dist = Math.abs(fx - cx)
        var frac = clamp(dist / (visW * 0.6))
        f.style.opacity = (1 - frac * 0.55).toFixed(2)
      })
    }

    var tick = false
    window.addEventListener(
      "scroll",
      function () {
        if (tick) return
        tick = true
        requestAnimationFrame(function () {
          update()
          tick = false
        })
      },
      { passive: true }
    )
    update()
  }

  // ---------------------------------------------------------------------
  // About images
  // ---------------------------------------------------------------------
  function setupAboutImages() {
    var img1 = document.getElementById("about-img-1")
    var img2 = document.getElementById("about-img-2")
    if (img1 && CFG.about.images[0]) img1.src = CFG.about.images[0]
    if (img2 && CFG.about.images[1]) img2.src = CFG.about.images[1]
  }

  // ---------------------------------------------------------------------
  // Contact background image
  // ---------------------------------------------------------------------
  function setupContactBg() {
    var bg = document.getElementById("ct-bg")
    if (bg && CFG.contactBgImage) bg.src = CFG.contactBgImage
  }

  // ---------------------------------------------------------------------
  // Packages
  // ---------------------------------------------------------------------
  function setupPackages() {
    var mount = document.querySelector('[data-mount="packages"]')
    var delays = ["d1", "d2", "d3"]
    CFG.packages.forEach(function (pkg, i) {
      var card = el("div", "sr " + delays[i] + " pkg-card" + (pkg.feat ? " feat" : ""))
      card.setAttribute("data-cursor-hover", "")

      card.appendChild(el("div", "pkg-name", pkg.name))
      card.appendChild(el("div", "pkg-price", pkg.price))
      card.appendChild(el("div", "pkg-sub", pkg.sub))

      var ul = el("ul", "pkg-features")
      pkg.features.forEach(function (f) {
        ul.appendChild(el("li", null, f))
      })
      card.appendChild(ul)

      var a = el("a", "pkg-cta", "Book now")
      a.href = buildWhatsAppLink(pkg.message)
      a.target = "_blank"
      a.rel = "noopener noreferrer"
      a.setAttribute("data-cursor-hover", "")
      card.appendChild(a)

      mount.appendChild(card)
    })
  }

  // ---------------------------------------------------------------------
  // Policy + FAQ
  // ---------------------------------------------------------------------
  function setupPolicyFaq() {
    var policyMount = document.querySelector('[data-mount="policies"]')
    CFG.policies.forEach(function (p) {
      policyMount.appendChild(el("li", null, p))
    })

    var faqMount = document.querySelector('[data-mount="faqs"]')
    CFG.faqs.forEach(function (item) {
      var wrap = el("div", "faq-item")
      var btn = el("button", "faq-q")
      btn.type = "button"
      btn.setAttribute("data-cursor-hover", "")
      var qSpan = el("span", null, item.q)
      btn.appendChild(qSpan)
      btn.appendChild(el("span", "plus", "+"))

      var aWrap = el("div", "faq-a-wrap")
      var p = el("p", null, item.a)
      aWrap.appendChild(p)

      btn.addEventListener("click", function () {
        var isOpen = wrap.classList.contains("open")
        faqMount.querySelectorAll(".faq-item.open").forEach(function (openItem) {
          openItem.classList.remove("open")
        })
        if (!isOpen) wrap.classList.add("open")
      })

      wrap.appendChild(btn)
      wrap.appendChild(aWrap)
      faqMount.appendChild(wrap)
    })
  }

  // ---------------------------------------------------------------------
  // Testimonials
  // ---------------------------------------------------------------------
  function buildReviewCard(r) {
    var card = el("div", "review-card")
    card.setAttribute("data-cursor-hover", "")

    var stars = el("div", "review-stars")
    for (var s = 0; s < 5; s++) {
      var star = document.createElementNS("http://www.w3.org/2000/svg", "svg")
      star.setAttribute("width", "13")
      star.setAttribute("height", "13")
      star.setAttribute("viewBox", "0 0 24 24")
      star.setAttribute("fill", s < r.rating ? "currentColor" : "none")
      star.setAttribute("stroke", "currentColor")
      star.setAttribute("stroke-width", "1.5")
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path")
      path.setAttribute("d", "M12 2.5l2.9 6.6 7.1.7-5.4 4.8 1.6 7-6.2-3.7-6.2 3.7 1.6-7-5.4-4.8 7.1-.7z")
      star.appendChild(path)
      stars.appendChild(star)
    }
    card.appendChild(stars)

    var q = el("q", "review-quote", r.quote)
    card.appendChild(q)

    var footer = el("div", "review-footer")
    var img = el("img", "review-photo")
    img.src = r.photo
    img.alt = ""
    footer.appendChild(img)
    var meta = el("div")
    meta.appendChild(el("div", "review-name", r.name))
    meta.appendChild(el("div", "review-location", r.location))
    footer.appendChild(meta)
    card.appendChild(footer)

    return card
  }

  function setupTestimonials() {
    var gridMount = document.querySelector('[data-mount="testi-grid"]')
    var slidesMount = document.getElementById("testi-track")
    var dotsMount = document.getElementById("testi-dots")
    var track = document.getElementById("testi-track")

    CFG.reviews.forEach(function (r) {
      gridMount.appendChild(buildReviewCard(r))
    })

    var active = 0
    var dots = []
    CFG.reviews.forEach(function (r, i) {
      var slide = el("div", "testi-slide")
      slide.appendChild(buildReviewCard(r))
      slidesMount.appendChild(slide)

      var dot = el("button")
      dot.type = "button"
      dot.setAttribute("data-cursor-hover", "")
      dot.setAttribute("aria-label", "Go to review " + (i + 1))
      if (i === 0) dot.classList.add("active")
      dot.addEventListener("click", function () {
        setActive(i)
      })
      dotsMount.appendChild(dot)
      dots.push(dot)
    })

    function setActive(i) {
      active = i
      track.style.transform = "translateX(-" + active * 100 + "%)"
      dots.forEach(function (d, idx) {
        d.classList.toggle("active", idx === active)
      })
    }

    setInterval(function () {
      setActive((active + 1) % CFG.reviews.length)
    }, 5000)
  }

  // ---------------------------------------------------------------------
  // Contact form
  // ---------------------------------------------------------------------
  function setupContactForm() {
    var typeSelect = document.getElementById("cf-type")
    CFG.packages.forEach(function (pkg) {
      var opt = el("option", null, pkg.name)
      typeSelect.appendChild(opt)
    })

    var form = document.getElementById("contact-form")
    form.addEventListener("submit", function (e) {
      e.preventDefault()
      var name = document.getElementById("cf-name").value
      var type = typeSelect.value
      var note = document.getElementById("cf-note").value
      var lines = ["Hi " + CFG.site.brandName + "! I'd like to book a session."]
      if (name) lines.push("Name: " + name)
      if (type) lines.push("Session type: " + type)
      if (note) lines.push("Details: " + note)
      window.open(buildWhatsAppLink(lines.join("\n")), "_blank", "noopener,noreferrer")
    })
  }

  // ---------------------------------------------------------------------
  // WhatsApp widget
  // ---------------------------------------------------------------------
  function setupWhatsAppWidget() {
    var panel = document.getElementById("wa-panel")
    var toggleBtn = document.getElementById("wa-widget")
    var chatLabelBtn = document.getElementById("wa-chat-label")
    var textarea = document.getElementById("wa-message")
    var sendLink = document.getElementById("wa-send")

    textarea.value = CFG.defaultBookingMessage

    function updateSendLink() {
      var msg = textarea.value.trim()
      sendLink.href = buildWhatsAppLink(textarea.value)
      sendLink.setAttribute("aria-disabled", msg ? "false" : "true")
    }
    updateSendLink()
    textarea.addEventListener("input", updateSendLink)

    function setOpen(open) {
      panel.hidden = !open
      toggleBtn.setAttribute("aria-expanded", String(open))
      if (open) textarea.focus()
    }
    function toggle() {
      setOpen(panel.hidden)
    }
    toggleBtn.addEventListener("click", toggle)
    chatLabelBtn.addEventListener("click", toggle)

    sendLink.addEventListener("click", function (e) {
      if (!textarea.value.trim()) {
        e.preventDefault()
      } else {
        setOpen(false)
      }
    })

    document.addEventListener("mousedown", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
        setOpen(false)
      }
    })
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false)
    })
  }

  // ---------------------------------------------------------------------
  // Rate card widget
  // ---------------------------------------------------------------------
  function setupRateCardWidget() {
    var panel = document.getElementById("rate-panel")
    var toggleBtn = document.getElementById("rate-widget")
    var listMount = document.querySelector('[data-mount="rate-list"]')

    CFG.packages.forEach(function (pkg) {
      var li = el("li")
      li.appendChild(el("span", "rate-name", pkg.sub))
      li.appendChild(el("span", "rate-price", pkg.price))
      listMount.appendChild(li)
    })

    function setOpen(open) {
      panel.hidden = !open
      toggleBtn.setAttribute("aria-expanded", String(open))
    }
    toggleBtn.addEventListener("click", function () {
      setOpen(panel.hidden)
    })
    panel.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false)
      })
    })

    document.addEventListener("mousedown", function (e) {
      if (!panel.hidden && !panel.contains(e.target) && e.target !== toggleBtn && !toggleBtn.contains(e.target)) {
        setOpen(false)
      }
    })
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false)
    })
  }

  // ---------------------------------------------------------------------
  // Dark mode toast — suggests switching theme, until the visitor decides
  // ---------------------------------------------------------------------
  function setupDarkModeToast() {
    if (Theme.hasChosen()) return

    var toast = document.getElementById("theme-toast")
    var label = document.getElementById("theme-toast-label")
    var switchBtn = document.getElementById("theme-toast-switch")
    var dismissBtn = document.getElementById("theme-toast-dismiss")
    var showTimer, hideTimer

    function render() {
      var suggested = Theme.get() === "light" ? "dark" : "light"
      label.textContent = "Prefer it dark? This site looks great in " + suggested + " mode too."
      switchBtn.textContent = "Switch to " + suggested
      switchBtn.setAttribute("data-suggested", suggested)
    }

    function hide() {
      toast.classList.remove("open")
      clearTimeout(hideTimer)
    }

    render()
    showTimer = setTimeout(function () {
      toast.classList.add("open")
      hideTimer = setTimeout(hide, 8000)
    }, 1200)

    switchBtn.addEventListener("click", function () {
      Theme.choose(switchBtn.getAttribute("data-suggested"))
      hide()
    })
    dismissBtn.addEventListener("click", hide)
    Theme.onChange(hide)
  }

  // ---------------------------------------------------------------------
  // Scroll reveal (IntersectionObserver, run after all sections are built)
  // ---------------------------------------------------------------------
  function setupScrollReveal() {
    var els = document.querySelectorAll(".sr, .srl, .srr")
    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("on")
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    )
    els.forEach(function (node) {
      obs.observe(node)
    })
  }
})()
