const blogPosts = {
    "getting-started-with-c": { // Use a slug-like key
        title: "Getting Started with C Programming",
        date: "October 9, 2025",
        description: "A beginner's guide to setting up your environment and writing your first C program.",
        markdown: `# Getting Started with C Programming

C is a powerful, general-purpose programming language.

## Setup

Here's how to get started...
`
    },
    "understanding-memory-allocation": {
        title: "Understanding Memory Allocation",
        date: "October 5, 2025",
        description: "An overview of stack vs. heap and dynamic memory allocation in low-level programming.",
        markdown: `# Understanding Memory Allocation

In low-level programming, memory management is key.

\`\`\`c
int *ptr = (int*)malloc(sizeof(int));
free(ptr);
\`\`\`

More content about memory...
`
    }
};
