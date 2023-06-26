# README

Documentation for the Mission Data Management System (alpha version).

Find the site [here](https://eanderson-ei.github.io/gtm-dms-alpha/).

Project relies on these great packages:

- [c4builder](link/to/c4builder) 
- [mkdocs](https://www.mkdocs.org/)
- [Material for mkdocs](https://squidfunk.github.io/mkdocs-material/)

The contents of this repository are the sole responsibility of the author. Not endorsed or approved by anyone. Use at your own risk. Secure necessary approvals before installing any software or uploading any data.

**How to Update** (from root)

```bash
conda activate gtm-dms-alpha
cd docs
c4builder
cd ..
dbdocs build dat.dbml
git status
git add -A
git commit -m "<commit message>"
git push origin main
mkdocs gh-deploy
```
