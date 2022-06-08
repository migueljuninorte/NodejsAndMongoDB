import pymongo

#Versión 3.4
client = pymongo.MongoClient("mongodb://miguelj:<password>@ac-qnvhmac-shard-00-00.eg90lo9.mongodb.net:27017,ac-qnvhmac-shard-00-01.eg90lo9.mongodb.net:27017,ac-qnvhmac-shard-00-02.eg90lo9.mongodb.net:27017/?ssl=true&replicaSet=atlas-11jd6i-shard-0&authSource=admin&retryWrites=true&w=majority")
db = client.test

#Versión 3.6 - 3.10
client = pymongo.MongoClient("mongodb+srv://miguelj:<password>@cluster0.eg90lo9.mongodb.net/?retryWrites=true&w=majority")
db = client.test

#version 3.11
client = pymongo.MongoClient("mongodb+srv://miguelj:<password>@cluster0.eg90lo9.mongodb.net/?retryWrites=true&w=majority")
db = client.test

#Versión 3.12
client = pymongo.MongoClient("mongodb+srv://miguelj:<password>@cluster0.eg90lo9.mongodb.net/?retryWrites=true&w=majority", server_api=ServerApi('1'))
db = client.test

#
client = pymongo.MongoClient("mongodb+srv://miguelj:<P!6AZrf3xV99hUv>@cluster0.eg90lo9.mongodb.net/?retryWrites=true&w=majority")
db = client.test

