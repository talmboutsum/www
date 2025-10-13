document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.querySelector(".theme-toggle");
  const body = document.body;
  const navBtns = document.querySelectorAll(".nav-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  const blogListContainer = document.getElementById("blog-list-container");
  const blogPostsContainer = document.getElementById("blog-posts-container");
  const blogListView = document.querySelector(".blog-list-view");

  themeToggle.addEventListener("click", () => {
    const currentTheme = body.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    body.setAttribute("data-theme", newTheme);
  });

  async function generateBlogPosts() {
    blogListContainer.innerHTML = "";
    blogPostsContainer.innerHTML = "";

    for (const category of Object.keys(blogPosts)) {
      const categorySection = document.createElement("div");
      categorySection.className = "category-section";
      categorySection.dataset.category = category;

      const categoryHeader = document.createElement("div");
      categoryHeader.className = "category-header";
      categoryHeader.innerHTML = `
                <span class="category-toggle">|</span>
                <h2 class="category-title">${category}</h2>
            `;

      const categoryPostsContainer = document.createElement("div");
      categoryPostsContainer.className = "category-posts";

      categoryHeader.addEventListener("click", () => {
        categorySection.classList.toggle("collapsed");
      });

      categorySection.appendChild(categoryHeader);
      categorySection.appendChild(categoryPostsContainer);
      blogListContainer.appendChild(categorySection);

      for (const postId of Object.keys(blogPosts[category])) {
        const postData = blogPosts[category][postId];

        const listItem = document.createElement("div");
        listItem.className = "blog-item";
        listItem.innerHTML = `
                    <a href="#blog/${category}/${postId}" class="blog-item-link">
                        <h3>${postData.title}</h3>
                        <p class="description">${postData.description}</p>
                        <div class="date">${postData.date}</div>
                    </a>
                `;
        categoryPostsContainer.appendChild(listItem);

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
          try {
            const response = await fetch(`writings/${postData.markdownFile}`);
            const markdown = await response.text();
            postContent.innerHTML = marked.parse(markdown);
          } catch (error) {
            postContent.innerHTML = "<p>Error loading post content.</p>";
            console.error("Error loading markdown file:", error);
          }
        } else if (postData.markdown) {
          postContent.innerHTML = marked.parse(postData.markdown);
        }

        postContent.querySelectorAll("pre code").forEach((block) => {
          hljs.highlightElement(block);
        });
      }
    }
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
