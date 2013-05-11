#!/usr/bin/env bash
#
# Usage:
#
#   ./get.sh www.mikesmullin.com wp-content/uploads/shareaholic/spritegen/sprite.css
#

mkdir -p sites/$1/`dirname $2`
wget http://$1/$2 -O sites/$1/$2
