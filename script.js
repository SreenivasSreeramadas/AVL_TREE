function buildTree() {
    resetTree();

    const values = document.getElementById("values").value
        .trim()
        .split(" ")
        .map(Number)
        .filter(v => !isNaN(v))
        .sort((a, b) => a - b);

    if (!values.length) return;

    drawTree(values, 450, 40, 200);
}

function drawTree(arr, x, y, gap) {
    if (!arr.length) return;

    const mid = Math.floor(arr.length / 2);
    drawNode(arr[mid], x, y);

    if (mid > 0) {
        drawEdge(x, y, x - gap, y + 90);
        drawTree(arr.slice(0, mid), x - gap, y + 90, gap * 0.6);
    }

    if (mid < arr.length - 1) {
        drawEdge(x, y, x + gap, y + 90);
        drawTree(arr.slice(mid + 1), x + gap, y + 90, gap * 0.6);
    }
}

function drawNode(value, x, y) {
    const node = document.createElement("div");
    node.className = "node";
    node.textContent = value;
    node.style.left = x + "px";
    node.style.top = y + "px";
    document.getElementById("tree").appendChild(node);
}

function drawEdge(x1, y1, x2, y2) {
    const line = document.createElement("div");
    line.className = "line";

    const length = Math.hypot(x2 - x1, y2 - y1);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    line.style.width = length + "px";
    line.style.left = x1 + 23 + "px";
    line.style.top = y1 + 23 + "px";
    line.style.transform = `rotate(${angle}deg)`;

    document.getElementById("tree").appendChild(line);
}

function resetTree() {
    document.getElementById("tree").innerHTML = "";
}
