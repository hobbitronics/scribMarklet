javascript: (function () {
  function clk(nd) {
    const r = document.createRange();
    r.selectNodeContents(nd);
    r.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(r);
    const evt = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    const rng = r.getBoundingClientRect();
    const x = rng.right - 5;
    const y = rng.bottom;
    const t = document.elementFromPoint(x, y);
    if (t) {
      t.dispatchEvent(evt);
      const inss = document.querySelectorAll("ins");
      const ins = Array.from(inss).find((el) => el.textContent.trim() === "");
      if (ins) {
        ins.textContent = "*";
      }
    }
  }
  function cAndT(par) {
    const nodes = [...par.childNodes].filter(
      (n) => n.nodeType === Node.TEXT_NODE
    );
    if (nodes.length > 0) {
      const last = nodes[nodes.length - 1];
      clk(last);
    }
  }
  function clkParas() {
    const div = document.getElementById("work-body");
    let ps = Array.from(div.querySelectorAll("p"));
    const scrollInterval = setInterval(function () {
      if (ps.length) {
        const p = ps[0];
        p.scrollIntoView();
        cAndT(p);
        ps = ps.slice(1);
        p.scrollIntoView();
      } else {
        clearInterval(scrollInterval);
      }
    }, 0);
  }
  clkParas();
})();
