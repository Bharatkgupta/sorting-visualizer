document.getElementById("newarray").addEventListener("click", createbars);
document.getElementById("bubble").addEventListener("click", bubbleSort);
document.getElementById("selection").addEventListener("click", selectionSort);
document.getElementById("insertion").addEventListener("click", insertionSort);
document.getElementById("quick").addEventListener("click", quicksort);
document.getElementById("merge").addEventListener("click", mergesort);

var arr;
var n;
var running = false;

function checkrun() {
    if (running == false) {
        running = true;
        return false;
    }
    return true;
}

function createbars() {
    if (running) {
        alert("Sorting is currently in progress!!");
        return;
    }
    var arr_size = document.querySelector("#arr_sz");
    n = arr_size.value;
    nper = 100 / n;
    var bars = document.getElementById("bars");
    bars.innerHTML = "";
    arr = [];

    for (let i = 0; i < n; i++) {
        var bar = document.createElement("div");
        bar.setAttribute("id", `bar${i}`)
        var num = Math.floor(Math.random() * 100) + 1;
        arr.push(num);
        bar.style.height = `${num}%`;
        bar.style.width = `${nper}%`;
        bars.appendChild(bar);
    }

    var randbar = Math.floor(Math.random() * n);
    var bar = document.getElementById(`bar${randbar}`);
    bar.setAttribute("id", `bar${randbar}`)
    arr[randbar] = 100;
    bar.style.height = `${100}%`;
}

function showsp(sp) {
    var speedp = document.querySelector("#speed");
    speedp.innerHTML = `${sp}`;
}

function showarr(arr_sz) {
    var array_size = document.querySelector("#array_size");
    array_size.innerHTML = `${arr_sz}`;
}

function delay(time) {
    var sort_sp = document.querySelector("#sort_sp");
    var sp = sort_sp.value;
    return new Promise(resolve => setTimeout(resolve, time / sp));
}

async function swap(xp, yp) {
    var bar1 = document.getElementById(`bar${xp}`);
    var bar2 = document.getElementById(`bar${yp}`);
    bar1.style.background = "red";
    bar2.style.background = "red";
    await delay(100);
    var temp = arr[xp];
    arr[xp] = arr[yp];
    arr[yp] = temp;
    bar1.style.height = `${arr[xp]}%`;
    bar2.style.height = `${arr[yp]}%`;
    bar1.style.backgroundColor = "green";
    bar2.style.backgroundColor = "green";
    await delay(100);
    bar1.style.backgroundColor = "#95A5A6";
    bar2.style.backgroundColor = "#95A5A6";
}

async function greenbars(xp, yp) {
    var bar1 = document.getElementById(`bar${xp}`);
    var bar2 = document.getElementById(`bar${yp}`);
    bar1.style.backgroundColor = "green";
    bar2.style.backgroundColor = "green";
    await delay(100);
    bar1.style.backgroundColor = "#95A5A6";
    bar2.style.backgroundColor = "#95A5A6";
}

function greenbar(p) {
    var bar = document.getElementById(`bar${p}`);
    bar.style.backgroundColor = "green";
}

function redbar(p) {
    var bar = document.getElementById(`bar${p}`);
    bar.style.backgroundColor = "red";
}

function normalbar(p) {
    var bar = document.getElementById(`bar${p}`);
    bar.style.backgroundColor = "#95A5A6";
}

async function bubbleSort() {
    if (checkrun()) {
        alert("Sorting is currently in progress!!");
        return;
    }
    var i, j;
    for (i = 0; i < n - 1; i++) {
        for (j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                await swap(j, j + 1);
            } else {
                await greenbars(j, j + 1);
            }
        }
        greenbar(j);
        await delay(100);
    }
    greenbar(0);
    running = false;
}

async function selectionSort() {
    if (checkrun()) {
        alert("Sorting is currently in progress!!");
        return;
    }
    var i, j, min_idx;
    for (i = 0; i < n - 1; i++) {
        min_idx = i;
        greenbar(min_idx);
        await delay(100);
        for (j = i + 1; j < n; j++) {
            if (arr[j] < arr[min_idx]) {
                normalbar(min_idx)
                min_idx = j;
                greenbar(min_idx);
                await delay(100);
            } else {
                redbar(j);
                await delay(100);
                normalbar(j);
            }
        }
        await swap(min_idx, i);
        greenbar(i);
        await delay(100);
    }
    greenbar(n - 1);
    running = false;
}

async function insertionSort() {
    if (checkrun()) {
        alert("Sorting is currently in progress!!");
        return;
    }
    var i, j;
    for (i = 1; i < n; i++) {
        for (j = i - 1; j >= 0; j--) {
            if (arr[j] > arr[j + 1]) {
                await swap(j, j + 1);
            } else {
                await greenbars(j, j + 1);
                break;
            }
        }
    }
    for (i = 0; i < n; i++) {
        greenbar(i);
    }
    running = false;
}

async function partition(low, high) {
    var pivot = arr[high];
    redbar(high);
    var i = (low - 1);
    for (var j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            await swap(i, j);
        } else {
            greenbar(j);
            await delay(100);
            normalbar(j);
        }
    }
    await swap(i + 1, high)
    return i + 1;
}

async function qsort(low, high) {
    if (low < high) {
        var pi = await partition(low, high);
        await qsort(low, pi - 1);
        await qsort(pi + 1, high);
    }
}

async function quicksort() {
    if (checkrun()) {
        alert("Sorting is currently in progress!!");
        return;
    }
    var low = 0;
    var high = n - 1;
    await qsort(low, high);
    for (low = 0; low < n; low++) {
        greenbar(low);
    }
    running = false;
}

async function cbar(p) {
    var bar = document.getElementById(`bar${p}`);
    bar.style.height = `${arr[p]}%`;
    await delay(100);
}

async function merge(l, m, r) {
    var n1 = m - l + 1;
    var n2 = r - m;
    var L = new Array(n1);
    var R = new Array(n2);
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
    var i = 0;
    var j = 0;
    var k = l;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            await cbar(k);
            i++;
        } else {
            arr[k] = R[j];
            await cbar(k);
            j++;
        }
        k++;
    }
    while (i < n1) {
        arr[k] = L[i];
        await cbar(k);
        i++;
        k++;
    }
    while (j < n2) {
        arr[k] = R[j];
        await cbar(k);
        j++;
        k++;
    }
}

async function mSort(l, r) {
    if (l >= r) {
        return;
    }
    var m = l + parseInt((r - l) / 2);
    await mSort(l, m);
    await mSort(m + 1, r);
    await merge(l, m, r);
    await delay(50);
}

async function mergesort() {
    if (checkrun()) {
        alert("Sorting is currently in progress!!");
        return;
    }
    var l = 0;
    var r = n - 1;
    await mSort(l, r);
    for (l = 0; l < n; l++) {
        var bar = document.getElementById(`bar${l}`);
        bar.style.height = `${arr[l]}%`;
        bar.style.backgroundColor = "green";
    }
    running = false;
}