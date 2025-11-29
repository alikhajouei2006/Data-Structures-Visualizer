const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ---------------- مدل داده ---------------- */
class VisualLinkedList {
    constructor(){ this.items = []; }
    addHead(v){ this.items.unshift(String(v)); }
    addTail(v){ this.items.push(String(v)); }
    removeHead(){ return this.items.length ? this.items.shift() : null; }
    removeTail(){ return this.items.length ? this.items.pop() : null; }
    clear(){ this.items = []; }
    size(){ return this.items.length; }
}

const ll = new VisualLinkedList();

/* ---------------- reference to DOM ---------------- */
const llInput = $('#ll-input');
const llAddHeadBtn = $('#ll-add-head');
const llAddTailBtn = $('#ll-add-tail');
const llRemoveHeadBtn = $('#ll-remove-head');
const llRemoveTailBtn = $('#ll-remove-tail');
const llClearBtn = $('#ll-clear');

const llCanvas = $('.ll-canvas');
const llStatus = $('#ll-status');

/* ---------------- utilities ---------------- */
function setStatus(el, text, isError=false){
    el.textContent = text;
    el.className = isError ? 'status status-error' : 'status';
}

function renderLinkedList(){
    llCanvas.innerHTML = '';
    if(ll.size() === 0){
        const placeholder = document.createElement('div');
        placeholder.style.opacity = '0.03';
        placeholder.style.height = '48px';
        placeholder.style.width = '100%';
        llCanvas.appendChild(placeholder);
        return;
    }

    ll.items.forEach((val, idx) => {
        const node = document.createElement('div');
        node.className = 'node-card';
        node.textContent = val;
        llCanvas.appendChild(node);

        if(idx !== ll.size()-1){
            const arrow = document.createElement('div');
            arrow.className = 'queue-arrow';
            arrow.innerHTML = '&#10132;';
            llCanvas.appendChild(arrow);
        }
    });
}

/* ---------------- interactions ---------------- */
llAddHeadBtn.addEventListener('click', () => {
    const v = llInput.value.trim();
    if(!v){ setStatus(llStatus, 'لطفاً یک مقدار معتبر وارد کنید.', true); return; }
    ll.addHead(v);
    renderLinkedList();
    const nodes = llCanvas.querySelectorAll('.node-card');
    nodes[0]?.classList.add('node-new');
    setTimeout(()=>nodes[0]?.classList.remove('node-new'), 420);
    setStatus(llStatus, `"${v}" به انتهای لیست اضافه شد.`);
    llInput.value = '';
});

llAddTailBtn.addEventListener('click', () => {
    const v = llInput.value.trim();
    if(!v){ setStatus(llStatus, 'لطفاً یک مقدار معتبر وارد کنید.', true); return; }
    ll.addTail(v);
    renderLinkedList();
    const nodes = llCanvas.querySelectorAll('.node-card');
    nodes[nodes.length-1]?.classList.add('node-new');
    setTimeout(()=>nodes[nodes.length-1]?.classList.remove('node-new'), 420);
    setStatus(llStatus, `"${v}" به ابتدای لیست اضافه شد.`);
    llInput.value = '';
});

llRemoveHeadBtn.addEventListener('click', () => {
    const removed = ll.removeHead();
    if(removed === null){ setStatus(llStatus,'خطا: لیست خالی است.', true); return; }
    renderLinkedList();
    setStatus(llStatus, `"${removed}" از انتهای لیست حذف شد.`);
});

llRemoveTailBtn.addEventListener('click', () => {
    const removed = ll.removeTail();
    if(removed === null){ setStatus(llStatus,'خطا: لیست خالی است.', true); return; }
    renderLinkedList();
    setStatus(llStatus, `"${removed}" از ابتدای لیست حذف شد.`);
});

llClearBtn.addEventListener('click', () => {
    ll.clear();
    renderLinkedList();
    setStatus(llStatus,'لیست پاک شد.');
});

/* ---------------- tab switching ---------------- */
const tabBtns = $$('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b=>b.classList.remove('active'));
        btn.classList.add('active');
        $$('.panel').forEach(p => p.classList.remove('active'));
        const tgt = document.getElementById(btn.dataset.target);
        if(tgt) tgt.classList.add('active');
    });
});

/* initial render */
renderLinkedList();
setStatus(llStatus,'آماده');