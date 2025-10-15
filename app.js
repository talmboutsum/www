document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const navBtns = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const blogListContainer = document.getElementById("blog-list-container");
  const blogPostsContainer = document.getElementById("blog-posts-container");
  const blogListView = document.querySelector(".blog-list-view");

  const savedTheme = sessionStorage.getItem("theme") || "dark";
  body.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
    sessionStorage.setItem("theme", newTheme);
  });

  function renderMath(element) {
    if (typeof renderMathInElement !== "undefined") {
      renderMathInElement(element, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
          { left: "\\[", right: "\\]", display: true },
          { left: "\\(", right: "\\)", display: false },
        ],
        throwOnError: false,
      });
    }
  }

  async function generateBlogPosts() {
    blogListContainer.innerHTML = "";
    blogPostsContainer.innerHTML = "";

    const treeDiv = document.createElement("div");
    treeDiv.className = "blog-tree";

    for (const category of Object.keys(blogPosts)) {
      const categoryFolder = document.createElement("div");
      categoryFolder.className = "tree-folder";
      categoryFolder.textContent = category;

      const categoryChildren = document.createElement("div");
      categoryChildren.className = "tree-children";

      treeDiv.appendChild(categoryFolder);
      treeDiv.appendChild(categoryChildren);

      categoryFolder.addEventListener("click", (e) => {
        e.stopPropagation();
        categoryFolder.classList.toggle("collapsed");
      });

      const posts = Object.keys(blogPosts[category]);
      posts.forEach((postId) => {
        const postData = blogPosts[category][postId];

        const fileItem = document.createElement("div");
        fileItem.className = "tree-file";
        fileItem.innerHTML = `<a href="#blog/${category}/${postId}">${postId}</a>`;

        categoryChildren.appendChild(fileItem);

        const postView = document.createElement("div");
        postView.className = "blog-post";
        postView.id = `${category}-${postId}`;
        postView.innerHTML = `
          <a href="#blog" class="back-button">← back to all posts</a>
          <div class="blog-content"></div>
        `;
        blogPostsContainer.appendChild(postView);

        const postContent = postView.querySelector(".blog-content");

        if (postData.markdownFile) {
          fetch(`writings/${postData.markdownFile}`)
            .then((response) => response.text())
            .then((markdown) => {
              postContent.innerHTML = marked.parse(markdown);
              setupCodeBlocks(postContent);
              renderMath(postContent);
            })
            .catch((error) => {
              postContent.innerHTML = "<p>Error loading post content.</p>";
              console.error("Error loading markdown file:", error);
            });
        } else if (postData.markdown) {
          postContent.innerHTML = marked.parse(postData.markdown);
          setupCodeBlocks(postContent);
          renderMath(postContent);
        }
      });
    }

    blogListContainer.appendChild(treeDiv);
  }

  function setupCodeBlocks(container) {
    container.querySelectorAll("pre code").forEach((block) => {
      hljs.highlightElement(block);
      const pre = block.closest("pre");
      if (!pre.previousElementSibling?.classList.contains("code-header")) {
        const lang =
          block.className.match(/language-(\w+)/)?.[1] ||
          block.className.match(/hljs (\w+)/)?.[1] ||
          "Code";
        const header = document.createElement("div");
        header.className = "code-header";
        header.innerHTML = `
          <span>${lang.toUpperCase()}</span>
          <button class="copy-button" aria-label="Copy code">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
        `;
        pre.parentElement.insertBefore(header, pre);

        const copyButton = header.querySelector(".copy-button");
        copyButton.addEventListener("click", async () => {
          const code = block.textContent;
          try {
            await navigator.clipboard.writeText(code);
            copyButton.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `;
            setTimeout(() => {
              copyButton.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              `;
            }, 2000);
          } catch (err) {
            console.error("Failed to copy code:", err);
          }
        });
      }
    });
  }

  function handleRouteChange() {
    const hash = window.location.hash || "#home";
    const parts = hash.substring(1).split("/");
    const mainRoute = parts[0];
    const category = parts[1];
    const postId = parts[2];

    navBtns.forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.tab === mainRoute);
    });

    tabContents.forEach((content) => {
      content.classList.toggle("active", content.id === mainRoute);
    });

    if (mainRoute === "blog") {
      document
        .querySelectorAll(".blog-post")
        .forEach((p) => p.classList.remove("active"));
      if (category && postId) {
        blogListView.style.display = "none";
        const activePost = document.getElementById(`${category}-${postId}`);
        if (activePost) {
          activePost.classList.add("active");
        }
      } else {
        blogListView.style.display = "block";
      }
    }
  }

  window.addEventListener("hashchange", handleRouteChange);

  generateBlogPosts();
  handleRouteChange();
});
