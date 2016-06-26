# epl-translate

server-option:
	node_env:	testing | production | development
	

run mongo:

# start mongo on port default-port 27017
docker run --name mymongo -p 27017:27017 -d mongo


run app:

docker run -v $(pwd):/app -w "/app" --link mymongo:mongo_db node -p3000:80 npm start


deploy on production server:

npm deploy
