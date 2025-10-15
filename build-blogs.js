const fs = require("fs");
const path = require("path");

const writingsDir = "./writings";
const outputFile = "./blog-posts.js";

function generateStructure(dir) {
  const structure = {};
  const entries = fs.readdirSync(dir);

  entries.forEach((entry) => {
    const entryPath = path.join(dir, entry);
    const stat = fs.statSync(entryPath);

    if (stat.isDirectory()) {
      structure[entry] = generateStructure(entryPath);
    } else if (entry.endsWith(".md")) {
      const postId = entry.replace(".md", "");
      const markdown = fs.readFileSync(entryPath, "utf8");
      const title = postId
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      structure[postId] = {
        title: title,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        description: `Read about ${title.toLowerCase()}`,
        markdown: markdown,
      };
    }
  });

  return structure;
}

const blogPosts = generateStructure(writingsDir);

const output = `const blogPosts = ${JSON.stringify(blogPosts, null, 4)};`;
fs.writeFileSync(outputFile, output);

function countPosts(obj) {
  let count = 0;
  for (const key in obj) {
    if (typeof obj[key] === "object") {
      if (obj[key].markdown) count++;
      else count += countPosts(obj[key]);
    }
  }
  return count;
}

const totalPosts = countPosts(blogPosts);
const totalCategories = Object.keys(blogPosts).length;

console.log("blog-posts.js has been generated successfully!");
console.log(
  `Found ${totalPosts} posts across ${totalCategories} top-level categories.`,
);
