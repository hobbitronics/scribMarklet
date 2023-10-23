javascript: (function () {
  function cAndT(par) {
    const nodes = [...par.childNodes].filter(
      (n) => n.nodeType === Node.TEXT_NODE
    );
    if (nodes.length > 0) {
      const nd = nodes[nodes.length - 1];
      const r = document.createRange();
      r.selectNodeContents(nd);
      r.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(r);
      const rng = r.getBoundingClientRect();
      const x = rng.right - 5;
      const y = rng.bottom;
      const t = document.elementFromPoint(x, y);
      if (t) {
        t.click();
        const inss = document.querySelectorAll("ins");
        const ins = [...inss].find((el) => el.textContent.trim() === "");
        if (ins) {
          ins.textContent = "*";
        }
      }
    }
  }

  function clkParas() {
    const div = document.getElementById("work-body");
    let ps = Array.from(div.querySelectorAll("p"));
    for (p of ps) {
      p.scrollIntoView();
      cAndT(p);
      p.scrollIntoView();
    }
  }

  clkParas();
})();
