#!/usr/bin/env bash

for dir in 0*/**/{solution,completed}; do
  if [ -d "$dir" ]; then
    echo "Compiling $dir ..."
    npx tsc --project "$dir" || true
  fi
done
