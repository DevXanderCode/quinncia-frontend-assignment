# Quinncia 2019 Front-End Developer Position Assignment

Brief description:
> We would like to see the ability to create application that is broken down into components and use API efficiently. Based on the prototype provided (assets/prototype), your task is to create a simple app that would get photos from the back end, post new pictures, comments and tags

**Required technology**:
- ReactJS
- Redux


**Expected behaviour**:
- Post and display photos
- Comment under any photo (including subcomments)
- Add tags and attach them to photos while posting
- Search for photos using tags

You are free to use any library for the assignment. We appreciate your time and we do not expect you to spend more than 3-4 hours for this project. If you believe that there was enough work done but you have not finished the project, you can send it to us at any stage. If there are any other projects that you would like to share and are open sourced, you can send a link to those instead of working on the assignment, although we would give this one more priority

**For any concerns**:
- konstantin@quinncia.io
- ramiz@quinncia.io


# Usage
 
To start off:
1. Clone the repo
2. Run `npm run start:dev`
3. The backend is available at `http://localhost:3000/api` (base URL)
4. The frontend is available at `http://localhost:3000/`


# API DOCs

**[Get] Get list of photos**
* **URL: `/photo/many`**
* **Params:**
  - [optional] tags=[list of names]
  - [optional] perPage (number of elements per page)
  - [optional] currentPage
* **Success Response**
  - code: 200
  - success: true
  - photos: [array]
* **Error Response**
  - code: <error-code>
  - success: false
  - error: "message"

---
  
**[GET] Get one photo**
* **URL: `/photo/:id`**
* **Params: -**
* **Success Response**
  - code: 200
  - success: true
  - photo: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"
  
---
  
**[DELETE] Delete a photo**
* **URL: `/photo/:id`**
* **Params: -**
* **Success Response**
  - code: 200
  - success: true
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"

---

**[GET] Get content of the photo**
* **URL: `/photo/content/:id`**
* **Params: -**
* **Success Response**
  - code: 200
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"
 
 ---
 
 **[PUT] Update information about photo**
* **URL: `/photo/:id`**
* **Body:**
  - [optional] name = ""
  - [optional] likes = Number
  - [optional] tagIDs = []
  - [optional] commentIDs = []
* **Success Response**
  - code: 200
  - success: true
  - photo: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"

---

 **[PUT] Attach tags to the photo**
* **URL: `/photo/:id/tags/attach`**
* **Body:**
  - [optional] tagIDs = []
* **Success Response**
  - code: 200
  - success: true
  - photo: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"

---

  **[POST] Add a photo**
* **URL: `/photo/`**
* **Multipart body:**
  - "profile": photo file
  - [optional] name = ""
  - [optional] likes = Number
  - [optional] tagIDs = []
  - [optional] commentIDs = []
* **Success Response**
  - code: 200
  - success: true
  - photo: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"
  
---

**[GET] Get list of tags**
* **URL: `/tag/many`**
* **Params:**
  - [optional] perPage (number of elements per page)
  - [optional] currentPage
* **Success Response**
  - code: 200
  - success: true
  - tags: [array]
* **Error Response**
  - code: <error-code>
  - success: false
  - error: "message"

---
  
**[GET] Get one tag**
* **URL: `/tag/by-name`**
* **Params:**
  - [required] tag (name)
* **Success Response**
  - code: 200
  - success: true
  - tag: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"
  
---

  **[POST] Add a tag**
* **URL: `/tag/`**
* **Body:**
  - [optional] name = ""
* **Success Response**
  - code: 200
  - success: true
  - tag: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"
  
---

**[GET] Get list of comments**
* **URL: `/comment/many`**
* **Params:**
  - [optional] perPage (number of elements per page)
  - [optional] currentPage
  - [optional] subComments Boolean (true to get sub comments)
* **Success Response**
  - code: 200
  - success: true
  - comments: [array]
* **Error Response**
  - code: <error-code>
  - success: false
  - error: "message"

---
  
**[GET] Get one comment**
* **URL: `/comment/:id`**
* **Params:**
  - [required] tag (name)
* **Success Response**
  - code: 200
  - success: true
  - comment: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"
  
---

  **[POST] Add a comment**
* **URL: `/comment/`**
* **Body:**
  - [optional] name = ""
  - [optional] parentID (should default to "0" if not specified)
  - [required] photoID
* **Success Response**
  - code: 200
  - success: true
  - comment: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"
  
---

**[DELETE] Delete a comment**
* **URL: `/comment/:id`**
* **Params: -**
* **Success Response**
  - code: 200
  - success: true
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"

---

 **[PUT] Update information about comment**
* **URL: `/comment/:id`**
* **Body:**
  - [optional] name = ""
* **Success Response**
  - code: 200
  - success: true
  - comment: {}
* **Error Response**
  - code: error-code
  - success: false
  - error: "message"
