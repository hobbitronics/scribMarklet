javascript: (function () {
  function cAndT(par) {
    const nodes = [...par.childNodes].filter(
      (n) => n.nodeType === Node.TEXT_NODE
    );
    if (nodes.length > 0) {
      const nd = nodes[nodes.length - 1];
      const r = document.createRange();
      r.selectNodeContents(nd);
      r.collapse();
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      const rng = r.getBoundingClientRect();
      const x = rng.right - 5;
      const y = rng.bottom;
      const t = document.elementFromPoint(x, y);
      if (t) {
        const clickEvent = new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
          view: window,
        });
        t.dispatchEvent(clickEvent);
        let inss = document.querySelectorAll("ins");
        inss = [...inss].filter((el) => el.textContent.trim() == "");
        inss.forEach((ins) => (ins.textContent = "*"));
      }
    }
  }

  function clkParas() {
    const div = document.getElementById("work-body");
    const paragraphs = [...div.querySelectorAll("p")].filter(
      (p) => !![...p.childNodes].find((n) => n.nodeType === Node.TEXT_NODE)
    );
    const ems = div.querySelectorAll("em");
    let chunks = [...paragraphs, ...ems];
    for (p of chunks) {
      p.scrollIntoView();
      cAndT(p);
    }
  }

  clkParas();
})();
