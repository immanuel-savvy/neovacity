let combo_hover = document.getElementById("combo_courses");

const is_child_of = (target, parent_class, depth) => {
  let depth_count = 0;
  while (true) {
    if (target.parentElement?.classList?.contains(parent_class)) return true;
    target = target.parentElement;
    if ((depth && depth === depth_count) || target?.tagName === "body") break;
    depth_count++;
  }
};

if (combo_hover) {
  combo_hover.addEventListener(
    "mouseover",
    (e) =>
      e.target.classList.contains("combo_course") &&
      e.target.classList.add("combo_hover")
  );

  combo_hover.addEventListener("mouseout", (e) => {
    if (e.target.classList.contains("combo_course"))
      e.target.classList.remove("combo_hover");
  });
}

console.log("WHAT IS HAPPENING HERE...");
