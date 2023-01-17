#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

for mesh in "$MESH_DIRECTORY"/*.mesh; do
  "$SCRIPT_DIR/objconv.js" "$mesh" "$SCRIPT_DIR/$(basename -s .mesh "$mesh").bin"
done
