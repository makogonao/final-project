const URL = "/"

export async function registerUser(email, userName, userSurname, password) {
    const response = await fetch(`${URL}api/auth/signup`, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
        },
        body: JSON.stringify({
            email: email,
            userName: userName,
            userSurname: userSurname,
            password: password,
        }),
    });
    const body = await response.json();
    return body;
}

export async function authUser(email, password) {
    const response = await fetch(`${URL}api/auth/signin`, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    });
    const body = await response.json();
    return body;
}

export async function getAllUsers(token) {
    const response = await fetch(`${URL}api/users/`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
    });
    const body = await response.json();
    return body;
}

export async function getUserByID(id, token) {
    const response = await fetch(`${URL}api/users/${id}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
    });
    const body = await response.json();
    return body;
}

export async function editUserByID(id, token, parameter, item) {
    const response = await fetch(`${URL}api/user/edit/${id}`, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
        body: JSON.stringify({
            parameter: parameter,
            item: item,
        }),
    });
    const body = await response.json();
    return body;
}

export async function getTasksByUserID(id, token) {
    const response = await fetch(`${URL}api/tasks/get-for-user/${id}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
    });
    const body = await response.json();
    return body;
}

export async function editTaskByID(id, token, scheduled_date, task_name, task_description) {
    const response = await fetch(`${URL}api/tasks/edit/${id}`, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
        body: JSON.stringify({
            "scheduled_date": scheduled_date,
            "task_name": task_name,
            "task_description": task_description,
        }),
    });
    const body = await response.json();
    return body;
}

export async function archiveTasksByID(id, token) {
    const response = await fetch(`${URL}api/tasks/archive/${id}`, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
    });
    const body = await response.json();
    return body;
}

export async function addNewTask(user_id, token, scheduled_date, task_name, task_description) {
    const response = await fetch(`${URL}api/tasks/new`, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
        body: JSON.stringify({
            "user_id": user_id,
            "scheduled_date": scheduled_date,
            "task_name": task_name,
            "task_description": task_description,
            "task_show": true
        }),
    });
    const body = await response.json();
    return body;
}

export async function getAllNews(token) {
    const response = await fetch(`${URL}api/news/`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
    });
    const body = await response.json();
    return body;
}

export async function getAllBargains(token) {
    const response = await fetch(`${URL}api/bargains/`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
    });
    const body = await response.json();
    return body;
}

export async function editNewByID(id, token, post_date, post_theme, post_text) {
    const response = await fetch(`${URL}api/news/edit/${id}`, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
        body: JSON.stringify({
            "post_date": post_date,
            "post_theme": post_theme,
            "post_text": post_text,
        }),
    });
    const body = await response.json();
    return body;
}

export async function archiveNewByID(id, token) {
    const response = await fetch(`${URL}api/news/archive/${id}`, 
    {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
    });
    const body = await response.json();
    return body;
}

export async function addNewPost(user_id, token, post_date, post_theme, post_text) {
    const response = await fetch(`${URL}api/news/new`, 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
        body: JSON.stringify({
            "user_id": user_id,
            "post_date": post_date,
            "post_theme": post_theme,
            "post_text": post_text,
            "show_post": true
        }),
    });
    const body = await response.json();
    return body;
}

export async function getNewsByUserID(id, token) {
    const response = await fetch(`${URL}api/news/user/${id}`, 
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Connection": "keep-alive",
            "Authorization" : token,
        },
    });
    const body = await response.json();
    return body;
}