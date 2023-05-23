# Blog-API

## Description

A back-end only project. Implemented REST-API with Authentication and Authorization.
Users have permission to create,update,and delete their own blogs.
Users can only view public blogs. They can also like and comment on public blogs.
Admin users have Full-access over all users, blogs, comments,and likes.
Technologies used: Node.js, Express.js, MongoDB, JWT authentication.

##  DataBase Schema

**users:**

| Column      | Type     |
| ----------- | -------- |
| \_id        | ObjectId |
| firstname   | STRING   |
| lastname    | STRING   |
| Password    | STRING   |
| Email       | STRING   |
| Username    | STRING   |
| role        | STRING   |
| timeCreated | STRING   |

**blog:**

| Column      | Type     |
| ----------- | -------- |
| \_id        | ObjectId |
| content     | STRING   |
| userId      | ObjectId |
| title       | STRING   |
| status      | STRING   |
| timeCreated | STRING   |

**comment:**

| Column      | Type     |
| ----------- | -------- |
| \_id        | ObjectId |
| content     | STRING   |
| userId      | ObjectId |
| blogId      | ObjectId |
| timeCreated | STRING   |

**like:**

| Column      | Type     |
| ----------- | -------- |
| \_id        | ObjectId |
| userId      | ObjectId |
| blogId      | ObjectId |
| timeCreated | STRING   |

## API Endpoints

**blog**:

```
/blog/list [GET]
/blog/:blogId [GET]
/blog/:blogId [DELETE]
/blog/:blogId [PUT]
/blog/ [POST]
```

**user**:

```
/user/list [GET]
/user/sign-up [POST]
/user/sign-in [POST]
/user/:username [GET]
/user/:username [PUT]
```

**like**:

```
/like/list [GET]
/like/:likeId [GET]
/like/:blogId [POST]
/like/:likeId [DELETE]
```


**comment**:

```
/comment/list [GET]
/comment/:commentId [GET]
/comment/:blogId [POST]
/comment/:commentId [PUT]
/comment/:commentId [DELETE]
```