// Urdu CMS – Pure Frontend (LocalStorage based)
(function () {
  const STORAGE_POSTS_KEY = "urduCmsPosts_v1";
  const STORAGE_CATS_KEY = "urduCmsCategories_v1";
  const STORAGE_THEME_KEY = "urduCmsTheme_v1";

  let posts = [];
  let categories = [];
  let editingPostId = null;
  let featuredImageDataUrl = null;

  // Views & main elements
  const body = document.body;
  const views = {
    dashboard: document.getElementById("view-dashboard"),
    "new-post": document.getElementById("view-new-post"),
    posts: document.getElementById("view-posts"),
    categories: document.getElementById("view-categories"),
    settings: document.getElementById("view-settings"),
  };

  const navItems = document.querySelectorAll(".nav-item");
  const globalSearchInput = document.getElementById("global-search");

  const titleInput = document.getElementById("post-title");
  const editorEl = document.getElementById("editor");
  const headingSelect = document.getElementById("heading-select");
  const imageBtn = document.getElementById("image-btn");
  const imageInput = document.getElementById("image-input");
  const linkBtn = document.getElementById("link-btn");
  const statusSelect = document.getElementById("post-status");
  const dateInput = document.getElementById("post-date");
  const categorySelect = document.getElementById("post-category");
  const addCategoryBtn = document.getElementById("add-category-btn");
  const featuredInput = document.getElementById("featured-image");
  const featuredPreview = document.getElementById("featured-preview");
  const descTextarea = document.getElementById("post-description");
  const descCount = document.getElementById("desc-count");
  const slugInput = document.getElementById("post-slug");
  const tagsInput = document.getElementById("post-tags");
  const savePostBtn = document.getElementById("save-post-btn");
  const previewBtn = document.getElementById("preview-btn");

  const postsTableBody = document.querySelector("#posts-table tbody");
  const recentPostsBody = document.querySelector("#recent-posts-table tbody");
  const catsTableBody = document.querySelector("#categories-table tbody");

  const statTotal = document.getElementById("stat-total-posts");
  const statPublished = document.getElementById("stat-published-posts");
  const statDraft = document.getElementById("stat-draft-posts");
  const statCats = document.getElementById("stat-categories");

  const themeSelect = document.getElementById("theme-select");

  // Modals
  const previewModal = document.getElementById("preview-modal");
  const previewBody = document.getElementById("preview-body");
  const previewClose = document.getElementById("preview-close");

  const categoryModal = document.getElementById("category-modal");
  const categoryClose = document.getElementById("category-close");
  const categoryCancel = document.getElementById("category-cancel");
  const categorySave = document.getElementById("category-save");
  const modalCategoryName = document.getElementById("modal-category-name");

  const newCatInlineInput = document.getElementById("new-category-name");
  const createCatInlineBtn = document.getElementById("create-category-inline");

  /* ---------- Utils ---------- */
  function savePosts() {
    localStorage.setItem(STORAGE_POSTS_KEY, JSON.stringify(posts));
  }

  function saveCategories() {
    localStorage.setItem(STORAGE_CATS_KEY, JSON.stringify(categories));
  }

  function loadData() {
    try {
      const p = localStorage.getItem(STORAGE_POSTS_KEY);
      const c = localStorage.getItem(STORAGE_CATS_KEY);
      posts = p ? JSON.parse(p) : [];
      categories = c ? JSON.parse(c) : ["بلا کیٹیگری"];
    } catch (e) {
      posts = [];
      categories = ["بلا کیٹیگری"];
    }
    categories = Array.from(new Set(categories));
  }

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleDateString("ur-PK", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function slugify(str) {
    if (!str) return "";
    return str
      .trim()
      .toLowerCase()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\u0600-\u06FFa-z0-9-]+/g, "")
      .replace(/-+/g, "-");
  }

  function switchView(name) {
    Object.values(views).forEach((v) => v.classList.remove("active"));
    if (views[name]) views[name].classList.add("active");

    navItems.forEach((btn) => {
      if (btn.dataset.view === name) btn.classList.add("active");
      else btn.classList.remove("active");
    });

    if (name === "dashboard") {
      renderStats();
      renderRecentPosts();
    } else if (name === "posts") {
      renderPostsTable();
    } else if (name === "categories") {
      renderCategoriesTable();
    }
  }

  function renderStatusPill(status) {
    const cls = status === "published" ? "status-published" : "status-draft";
    const label = status === "published" ? "پبلشڈ" : "ڈرافٹ";
    return `<span class="status-pill ${cls}">${label}</span>`;
  }

  function renderStats() {
    const total = posts.length;
    const pub = posts.filter((p) => p.status === "published").length;
    const draft = total - pub;
    const catCount = categories.length;

    statTotal.textContent = total;
    statPublished.textContent = pub;
    statDraft.textContent = draft;
    statCats.textContent = catCount;
  }

  function renderRecentPosts() {
    recentPostsBody.innerHTML = "";
    const sorted = [...posts].sort(
      (a, b) =>
        new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
    );
    sorted.slice(0, 5).forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.title || "(بغیر عنوان)"}</td>
        <td>${p.category || ""}</td>
        <td>${renderStatusPill(p.status)}</td>
        <td>${formatDate(p.date || p.createdAt)}</td>
      `;
      recentPostsBody.appendChild(tr);
    });
  }

  function renderPostsTable(filterTerm) {
    postsTableBody.innerHTML = "";
    let list = [...posts];

    if (filterTerm) {
      const q = filterTerm.toLowerCase();
      list = list.filter((p) => (p.title || "").toLowerCase().includes(q));
    }

    list.sort(
      (a, b) =>
        new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
    );

    list.forEach((p) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${p.title || "(بغیر عنوان)"}</td>
        <td>${p.category || ""}</td>
        <td>${renderStatusPill(p.status)}</td>
        <td>${formatDate(p.date || p.createdAt)}</td>
        <td>
          <button class="action-btn" data-action="edit" data-id="${p.id}">ایڈٹ</button>
          <button class="action-btn delete" data-action="delete" data-id="${p.id}">ڈیلیٹ</button>
        </td>
      `;
      postsTableBody.appendChild(tr);
    });
  }

  function renderCategoriesToSelect() {
    categorySelect.innerHTML = "";
    categories.forEach((cat) => {
      const opt = document.createElement("option");
      opt.value = cat;
      opt.textContent = cat;
      categorySelect.appendChild(opt);
    });
  }

  function renderCategoriesTable() {
    catsTableBody.innerHTML = "";
    categories.forEach((cat) => {
      const count = posts.filter((p) => p.category === cat).length;
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${cat}</td>
        <td>${count}</td>
        <td>
          <button class="action-btn delete" data-cat="${cat}">حذف</button>
        </td>
      `;
      catsTableBody.appendChild(tr);
    });
  }

  function resetEditorForm() {
    editingPostId = null;
    featuredImageDataUrl = null;
    titleInput.value = "";
    editorEl.innerHTML = "";
    statusSelect.value = "draft";
    dateInput.valueAsDate = new Date();
    if (categories[0]) categorySelect.value = categories[0];
    featuredInput.value = "";
    featuredPreview.innerHTML = "";
    descTextarea.value = "";
    descCount.textContent = "0";
    slugInput.value = "";
    tagsInput.value = "";
  }

  function collectPostDataFromForm(requireTitle = true) {
    const title = titleInput.value.trim();
    if (requireTitle && !title) {
      alert("پوسٹ کا عنوان لازمی ہے۔");
      return null;
    }

    const contentHtml = editorEl.innerHTML.trim();
    const status = statusSelect.value;
    const dateStr = dateInput.value || new Date().toISOString().slice(0, 10);
    const cat = categorySelect.value || "";
    const desc = descTextarea.value.trim();
    const slug = slugInput.value ? slugify(slugInput.value) : slugify(title);
    const tags = tagsInput.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    return {
      title,
      contentHtml,
      status,
      date: dateStr,
      category: cat,
      description: desc,
      slug,
      tags,
      featuredImage: featuredImageDataUrl || null,
    };
  }

  function openPreview() {
    const tempPost = collectPostDataFromForm(false);
    if (!tempPost) return;

    previewBody.innerHTML = "";

    const container = document.createElement("div");
    container.className = "preview-article";

    const meta = document.createElement("div");
    meta.className = "preview-meta";
    meta.textContent = `${tempPost.category || ""} • ${formatDate(
      tempPost.date || new Date().toISOString()
    )}`;

    const h = document.createElement("h2");
    h.className = "preview-title";
    h.textContent = tempPost.title || "(بغیر عنوان)";

    const desc = document.createElement("p");
    desc.className = "preview-meta";
    desc.textContent = tempPost.description || "";

    container.appendChild(meta);
    container.appendChild(h);

    if (tempPost.featuredImage) {
      const img = document.createElement("img");
      img.src = tempPost.featuredImage;
      img.alt = tempPost.title 