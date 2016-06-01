import os, copy, json
from flask import Flask, jsonify, request, send_from_directory, make_response

if __name__ == "__main__":
	with open('app/assets/data/trellis.json') as data_file:	
		print json.dumps(json.load(data_file))