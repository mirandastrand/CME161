import os, copy, json, collections
from flask import Flask, jsonify, request, send_from_directory, make_response

def make_data_graph(data_list_in):
	idx = 0
	names = collections.OrderedDict()
	for e in data_list_in:
		to = e['to'][:7] # truncate
		fr = e['from'][:7]
		if to not in names:
			names[to] = idx
			idx += 1
		if fr not in names:
			names[fr] = idx
			idx += 1
	edges = [{
				"source": names[e['to'][:7]], 
				"target": names[e['from'][:7]], 
				"value": e['n'], 
				"tags":  [d['tag'] for d in e['data']] 
			} for e in data_list_in
		]
	nodes = [{"name":n} for n in names.keys()]
	return { "nodes": nodes, "edges": edges }

if __name__ == "__main__":
	with open('app/assets/data/trellis.json') as data_file:
		print json.dumps(make_data_graph(json.load(data_file)[:2]))