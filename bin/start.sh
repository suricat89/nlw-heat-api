#!/bin/bash
cd /home/ec2-user/app
source .env.production
node build/src/index.js
