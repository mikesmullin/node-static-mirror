var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');

app.all('*', function(req, res, next){
  switch (req.host) {
    case 'mikesmullin.com': return res.redirect('http://www.mikesmullin.com'+req.originalUrl);
    case 'smullin.org': return res.redirect('http://www.smullin.org'+req.originalUrl);
    case 'www.mikesmullin.com':
    case 'www.smullin.org':
      break;
    default:
      return res.send(404, 'Domain not hosted here');
  }
  if (req.method == "POST" && /mikesmullin.com$/.test(req.host) != null && req.originalUrl == "/wp-comments-post.php") {
    res.send(404, 'Comments disabled');
  }
  if (req.method != "GET") return next();
  var file = path.join(__dirname, 'sites', req.host, decodeURIComponent(req.originalUrl));
  if(file[file.length-1] == '/') { // requesting index
    file = path.join(file, 'index.html')
  }
  var basename = path.basename(file.split('?')[0]);
  console.log(JSON.stringify({
    host: req.host,
    method: req.method,
    file: file,
    basename: basename
  }));
  fs.exists(file, function(exists) {
    if (exists) {
      fs.readFile(file, function(err, data) {
        if (err) process.stdout.write(err+"\n");
        if (/js.php$/.test(basename)) res.contentType('text/javascript');
        else if (/css.php$/.test(basename)) res.contentType('text/css');
        else if (/.php$/.test(basename)) res.contentType('text/html');
        else
          res.contentType(basename);
        res.send(data);
      });
    }
    else {
      res.send(404);
    }
  });
});

app.listen(80); // must run as root; see https://github.com/creationix/nvm/issues/43
