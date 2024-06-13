#!/bin/bash

# Set the MongoDB database name
DB_NAME=CompostelaReporta

# Set the input directory
INPUT_DIR=backup/CompostelaReporta  # Específica la ruta completa al directorio de respaldo

# Import the full database
mongorestore --db $DB_NAME --collection issues $INPUT_DIR/issues.bson
mongorestore --db $DB_NAME --collection responders $INPUT_DIR/responders.bson
mongorestore --db $DB_NAME --collection users $INPUT_DIR/users.bson