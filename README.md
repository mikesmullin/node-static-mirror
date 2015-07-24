# Dynamic-to-Static site mirror

Uses wget to mirror any number of sites to local disk and then node.js to serve it. I applied this to convert my
WordPress site from a dynamic resource hog to a fast static site hosted by a Raspberry Pi for archival purposes.

Built for NodeJS v0.10.5

## Mirroring

```bash
wget --mirror -erobots=off --adjust-extension --convert-links --no-parent --page-requisites --no-host-directories -P sites/ www.mikesmullin.com
```

### Notes:

    --convert-links        is a little bit annoying because clean urls like / turn into /index.html
    --no-host-directories  is probably unnecessary now
    -P                     should be sites/

## Starting server

```bash
sudo node server.js
```
