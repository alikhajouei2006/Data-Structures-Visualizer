const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ---------------- مدل داده ---------------- */

class VisualStack {
  constructor() {
    this.items = [];
  }
  push(v){
    this.items.push(String(v));
  }
  pop(){
    return this.items.length ? this.items.pop() : null;
  }
  clear(){ this.items = []; }
  peek(){ return this.items[this.items.length-1] ?? null; }
  size(){ return this.items.length; }
}

class VisualQueue {
  constructor(){
    this.items = [];
  }
  enqueue(v){ this.items.push(String(v)); }
  dequeue(){ return this.items.length ? this.items.shift() : null; }
  clear(){ this.items = []; }
  front(){ return this.items[0] ?? null; }
  size(){ return this.items.length; }
}

/* ---------------- reference to DOM ---------------- */

const stack = new VisualStack();
const queue = new VisualQueue();

const stackInput = $('#stack-input');
const stackPushBtn = $('#stack-push');
const stackPopBtn = $('#stack-pop');
const stackClearBtn = $('#stack-clear');
const stackCanvas = document.querySelector('.stack-canvas');
const stackStatus = $('#stack-status');

const queueInput = $('#queue-input');
const queueEnqBtn = $('#queue-enq');
const queueDeqBtn = $('#queue-deq');
const queueClearBtn = $('#queue-clear');
const queueCanvas = document.querySelector('.queue-canvas');
const queueStatus = $('#queue-status');

/* -------------- utilities -------------- */
function setStatus(el, text, isError=false){
  el.textContent = text;
  el.className = isError ? 'status status-error' : 'status';
}

/* -------------- renderers -------------- */

function renderStack(){
  // clear
  stackCanvas.innerHTML = '';
  // show nodes from bottom to top (we use column-reverse)
  stack.items.forEach((val, idx) => {
    const node = document.createElement('div');
    node.className = 'node-card';
    node.textContent = val;
    stackCanvas.appendChild(node);
  });
  // add tiny spacer if empty to keep height
  if(stack.size() === 0){
    const placeholder = document.createElement('div');
    placeholder.style.opacity = '0.03';
    placeholder.style.height = '40px';
    stackCanvas.appendChild(placeholder);
  }
}

function renderQueue(){
  queueCanvas.innerHTML = '';
  // label front/back if non-empty
  if(queue.size() === 0){
    const placeholder = document.createElement('div');
    placeholder.style.opacity = '0.03';
    placeholder.style.height = '48px';
    placeholder.style.width = '100%';
    queueCanvas.appendChild(placeholder);
    return;
  }
  // front label
  const frontLabel = document.createElement('div');
  frontLabel.className = 'queue-end';
  frontLabel.textContent = 'Front';
  queueCanvas.appendChild(frontLabel);

  queue.items.forEach((val, idx) => {
    const node = document.createElement('div');
    node.className = 'node-card';
    node.textContent = val;
    if(idx === queue.size()-1){
      // rear element highlight briefly when enqueued
    }
    queueCanvas.appendChild(node);

    if(idx !== queue.size()-1){
      // arrow
      const arrow = document.createElement('div');
      arrow.className = 'queue-arrow';
      arrow.innerHTML = '&#10132;'; // arrow symbol
      queueCanvas.appendChild(arrow);
    }
  });

  const backLabel = document.createElement('div');
  backLabel.className = 'queue-end';
  backLabel.textContent = 'Back';
  queueCanvas.appendChild(backLabel);
}

/* -------------- interactions -------------- */


stackPushBtn.addEventListener('click', () => {
  const v = stackInput.value.trim();
  if(!v){ setStatus(stackStatus, 'لطفاً یک مقدار معتبر وارد کنید.', true); return; }
  stack.push(v);
  renderStack();

  const nodes = stackCanvas.querySelectorAll('.node-card');
  if(nodes.length){
    const last = nodes[nodes.length-1];
    last.classList.add('node-new');
    setTimeout(()=> last.classList.remove('node-new'), 420);
  }
  setStatus(stackStatus, `"${v}" به پشته اضافه شد.`);
  stackInput.value = '';
});

stackPopBtn.addEventListener('click', () => {
  const removed = stack.pop();
  if(removed === null){
    setStatus(stackStatus, 'خطا: پشته خالی است.', true);
    return;
  }
  renderStack();
  setStatus(stackStatus, `"${removed}" از پشته خارج شد.`);
});

stackClearBtn.addEventListener('click', () => {
  stack.clear();
  renderStack();
  setStatus(stackStatus, 'پشته پاک شد.');
});

queueEnqBtn.addEventListener('click', () => {
  const v = queueInput.value.trim();
  if(!v){ setStatus(queueStatus, 'لطفاً یک مقدار معتبر وارد کنید.', true); return; }
  queue.enqueue(v);
  renderQueue();

  const nodes = queueCanvas.querySelectorAll('.node-card');
  if(nodes.length){
    const last = nodes[nodes.length-1];
    last.classList.add('node-new');
    setTimeout(()=> last.classList.remove('node-new'), 420);
  }
  setStatus(queueStatus, `"${v}" وارد صف شد.`);
  queueInput.value = '';
});


queueDeqBtn.addEventListener('click', () => {
  const removed = queue.dequeue();
  if(removed === null){
    setStatus(queueStatus, 'خطا: صف خالی است.', true);
    return;
  }
  renderQueue();
  setStatus(queueStatus, `"${removed}" از صف خارج شد.`);
});


queueClearBtn.addEventListener('click', () => {
  queue.clear();
  renderQueue();
  setStatus(queueStatus, 'صف پاک شد.');
});

/* -------------- tab switching -------------- */
const tabBtns = $$('.tab-btn');
tabBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    tabBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');

    $$('.panel').forEach(p => p.classList.remove('active'));
    const tgt = document.getElementById(btn.dataset.target);
    if(tgt) tgt.classList.add('active');
  });
});

/* initial render */
renderStack();
renderQueue();
setStatus(stackStatus, 'آماده');
setStatus(queueStatus, 'آماده');
