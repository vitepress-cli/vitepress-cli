# vitepress-cli

A CLI for quickly creating a vitepress project has two templates for selection.

- blog-template
- docs-template

# Install

```

npm install @qinghuanaa/vitepress-cli -g

```

# Usage

```
vitepress-cli create <project name>
```

According to tips to select the template to create a project

# Detail

## docs template

The template directory like this

```
<project name>
├── docs
│   ├── .vitepress
│   │   └── config.js  "vitepress project config file"
│   ├── public  "store public file"
│   │   └── bg.jpg
│   ├── index.md   "front page"
│   └── guide
├── yarn.lock
└── package.json
```

## blog template

The template directory like this

```
<project name>
├── docs
│   ├── .vitepress
│   │   └── config.js  "vitepress project config file"
│   ├── public  "store public file"
│   │   └── bg.jpg
│   ├── index.md   "front page"
│   ├── blogs   "store some blogs file"
│   └── projects   "store some projects file"
├── yarn.lock
└── package.json
```
