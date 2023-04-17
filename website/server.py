from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

posts = []

@app.route('/')
def index():
    return render_template('blog.html')

@app.route('/posts', methods=['GET'])
def get_posts():
    return jsonify(posts)

@app.route('/post', methods=['POST'])
def post_blog():
    post = request.form.get('post')
    if post:
        posts.append(post)
        return 'Post saved successfully!', 200
    else:
        return 'Invalid request: post data missing', 400

if __name__ == '__main__':
    app.run(debug=True)
