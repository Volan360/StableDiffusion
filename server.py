import base64
from concurrent.futures import process
from email.mime import base
from re import sub
from flask import Flask, render_template, request
import urllib.parse
import subprocess
import os
from flask_cors import CORS
import base64


app = Flask(__name__)
CORS(app)

@app.route('/imageGen')
def index():
  prompt = request.args.get('prompt')
  prompt = urllib.parse.unquote(prompt, 'utf-8')
  prompt += ' --seed 27433248'
  command = f'python optimizedSD/optimized_txt2img.py {prompt}'

  folder = prompt[prompt.find('"')+1:len(prompt)]
  folder = folder[0:folder.find('"')]
  folder = f'outputs/txt2img-samples\{folder}'.strip()
  folder = folder[0:224]
  
  print(folder)
  subprocess.run(command, shell=True)

  print("finished running!")
  files = os.listdir(folder)
  fileName = f'{folder}\{files[-1]}'

  with open(fileName, 'rb') as image:
    encoded_string = base64.b64encode(image.read())
    image.close()
    print(encoded_string)
    return encoded_string


if __name__ == '__main__':
  app.run(debug=True)
