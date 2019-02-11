const rootBlock = document.getElementById('root');

function printResult(list) {
    for (let i = 0, length = list.length; i < length; i += 1) {
        let id = list[i]['id'];
        let title = list[i]['name'];
        let email = list[i]['email'];
        let body = list[i]['body'];
        let post = document.createElement('div');
        post.setAttribute('class', 'post');
        let postTitle = document.createElement('h3');
        let postBody = document.createElement('p');
        let userEmail = document.createElement('i');
        userEmail.textContent = email;
        postTitle.textContent = `${id}. ${title}`;
        postBody.textContent = body;
        rootBlock.appendChild(post);
        post.appendChild(postTitle);
        post.appendChild(userEmail);
        post.appendChild(postBody);

    }

}

class DataService {
    constructor(url) {
        this.url = url;
    }

    async getUser(id) {
        try {
            let response = await fetch(`${this.url}/users/${id}`);
            let data = await response.json();
            return data;
        } catch (e) {
            throw new Error('Не удалось получить пользователя');
        }
    }

    async getPosts(userId) {
        try {
            let response = await fetch(`${this.url}/posts?userId=${userId}`);
            let data = await response.json();
            return data;
        } catch (e) {
            throw new Error('Не удалось получить посты');
        }
    }

    async getComments(postId) {
        try {
            let response = await fetch(`${this.url}/comments?postId=${postId}`);
            let data = await response.json();
            return data;
        } catch (e) {
            throw new Error('Не удалось получить комментарии');
        }
    }
}


(async () => {
    try {
        let dataService = new DataService('https://jsonplaceholder.typicode.com');
        let user = await dataService.getUser(1);
        let posts = await dataService.getPosts(user.id);
        let comments = await dataService.getComments(posts[0].id);
        printResult(comments);
    } catch (e) {
        console.log(e);
    }
})();


