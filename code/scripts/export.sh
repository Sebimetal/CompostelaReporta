#!/bin/bash

# Set the MongoDB database name
DB_NAME=CompostelaReporta

# Set the output directory
OUTPUT_DIR=backup

# Export the full database
mongodump --db $DB_NAME --out $OUTPUT_DIR
