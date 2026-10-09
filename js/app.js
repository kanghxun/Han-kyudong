// 화면 그리기 담당 파일. 데이터는 data.js에서 가져옵니다.

// 문자열 안의 특수문자를 안전하게 바꿉니다.
function esc(text) {
  const d = document.createElement("div");
  d.textContent = text == null ? "" : String(text);
  return d.innerHTML.replace(/"/g, "&quot;");
}

function $(id) { return document.getElementById(id); }

// 이미지 경로가 비어 있거나 파일이 없으면 기본 이미지로 바꿉니다.
function imgTag(src, alt) {
  return `<img src="${esc(src || SITE.fallbackImage)}" alt="${esc(alt)}" loading="lazy"
    onerror="this.onerror=null;this.src='${SITE.fallbackImage}'">`;
}

function detailUrl(id) { return "detail.html?id=" + encodeURIComponent(id); }

function cardHtml(d) {
  return `<a class="card" href="${detailUrl(d.id)}">
    <div class="card-img">${imgTag(d.image, d.name)}</div>
    <div class="card-body">
      <h3>${esc(d.name)}</h3>
      <p class="muted">${esc(d.region)}</p>
      <p>${esc(d.summary)}</p>
    </div></a>`;
}

function emptyHtml(msg) { return `<p class="notice">${esc(msg)}</p>`; }

// ---------- 공통: 헤더/푸터 ----------
function renderHeader() {
  const page = document.body.dataset.page;
  const links = [
    ["index.html", "홈", "home"],
    ["destinations.html", "여행지", "list"]
  ];
  $("site-header").innerHTML = `<div class="wrap header-in">
    <a class="brand" href="index.html">${esc(SITE.name)}</a>
    <nav aria-label="주 메뉴">${links.map(([href, label, key]) =>
      `<a href="${href}" ${page === key || (page === "detail" && key === "list") ? 'aria-current="page"' : ""}>${label}</a>`
    ).join("")}</nav></div>`;
  $("site-footer").innerHTML = `<div class="wrap">${esc(SITE.name)}</div>`;
}

// ---------- 메인 ----------
function renderHome() {
  $("hero-title").textContent = SITE.heroTitle;
  $("hero-text").textContent = SITE.heroText;

  const featured = DESTINATIONS.filter(d => d.featured);
  $("featured").innerHTML = featured.length
    ? featured.map(cardHtml).join("") : emptyHtml("소개할 여행지가 아직 없습니다.");

  $("schedule").innerHTML = SCHEDULE.length
    ? SCHEDULE.map(s => {
        const ok = DESTINATIONS.some(d => d.id === s.destination);
        const title = ok ? `<a href="${detailUrl(s.destination)}">${esc(s.title)}</a>` : esc(s.title);
        return `<li><span class="day">${esc(s.date)}</span><span>${title}</span></li>`;
      }).join("")
    : `<li>${emptyHtml("등록된 일정이 없습니다.")}</li>`;
}

// ---------- 목록 ----------
function renderList() {
  $("list").innerHTML = DESTINATIONS.length
    ? DESTINATIONS.map(cardHtml).join("") : emptyHtml("등록된 여행지가 없습니다.");
}

// ---------- 상세 ----------
function renderDetail() {
  const id = new URLSearchParams(location.search).get("id");
  const d = DESTINATIONS.find(x => x.id === id);
  const box = $("detail");

  if (!d) {
    document.title = "여행지를 찾을 수 없음 - " + SITE.name;
    box.innerHTML = `<div class="notice">
      <h1>여행지를 찾을 수 없어요</h1>
      <p>주소가 잘못되었거나 삭제된 여행지입니다. 목록에서 다시 선택해 주세요.</p>
      <a class="btn" href="destinations.html">여행지 목록으로</a></div>`;
    return;
  }

  document.title = d.name + " - " + SITE.name;
  const places = (d.places && d.places.length)
    ? `<ul class="places">${d.places.map(p => `<li>
        <strong>${esc(p.name)}</strong>
        ${p.time ? `<span class="muted">${esc(p.time)}</span>` : ""}
        <p>${esc(p.info)}</p></li>`).join("")}</ul>`
    : emptyHtml("세부 장소 정보가 아직 없습니다.");

  box.innerHTML = `
    <a class="btn ghost" href="destinations.html">목록으로 돌아가기</a>
    <div class="detail-img">${imgTag(d.image, d.name)}</div>
    <h1>${esc(d.name)}</h1>
    <p class="muted">${esc(d.region)}</p>
    <p class="lead">${esc(d.description)}</p>
    <h2>세부 장소</h2>${places}`;
}

// ---------- 시작 ----------
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  const page = document.body.dataset.page;
  if (page === "home") renderHome();
  if (page === "list") renderList();
  if (page === "detail") renderDetail();
});
