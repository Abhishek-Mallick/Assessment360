## Assessment360


### To be deployed live at : [Assessment360](https://assessment360.pythonanywhere.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Abhishek-Mallick/Assessment360.git
   cd Assessment360
   ```

2. **Set up MongoDB:**

   - Make sure MongoDB is installed and running on your machine or you can use my mongo db test url.
   - Create a `.env` file in the root directory with the following content:

     ```env
     MONGO_URL=mongodb://localhost:27017/Assessment360
     ```

     or

     ```
     MONGO_URL = "mongodb+srv://<username>:<password>@<clusterName>.<clusterID>.mongodb.net/?retryWrites=true&w=majority"
     ```

3. **Set up Enviornment Variables**
   - Create a  `.env` file on the base of the directory. On the `.env` file add the variables:
     ```
     MONGO_URL=""
     MAIL_SERVER="" (eg: smtp.gmail.com)
     MAIL_PORT=465
     MAIL_USERNAME=""mallickabhishek.64@gmail.com""
     MAIL_PASSWORD=""
     O_AUTH_CLIENT_ID=""
     ```

## Running the Application

1. **Setting up Virtual Enviornment (venv)**
```bash
 python -m venv venv
 ./venv/Scripts/activate
```
2. **Installing dependencies**
```bash
 pip install -r "requirements.txt"
```

3. **Creating super_user**
```bash
 python manage.py createsuperuser"
```
4. **Running the Application**
```bash
 python manage.py makemigrations
 python manage.py migrate 
 python manage.py runserver
```
## Endpoints

### Admin (super_user)

| Method | Endpoint             | Description         | Request Body                  | Response Body              |
| ------ | -------------------- | ------------------- | ----------------------------- | -------------------------- |
| `POST` | `/admin/register` | Register a new Admin | JSON: {name,priority} | JSON: {token,user,admin_id} |
| `GET`  | `/admin/:id` | Get Admin details    | NULL                          | JSON: {admin}               |

### Tasks

| Method   | Endpoint             | Description                | Query                                   | Headers                         | Request Body                       | Response Body                                |
| -------- | -------------------- | -------------------------- | --------------------------------------- | ------------------------------- | ---------------------------------- | -------------------------------------------- |
| `GET`    | `/student/assignment`         | Get all Assignemnts of the Student of all courses  | priority, status, due_date, page, limit | Authorization: student_id | N/A                                | JSON: {docs,totalDocs,page,limit,totalPages} |
| `POST`   | `/student/update-assign`         | Create a new Assignment for Student under a Course | N/A                                     | Authorization: student_id | JSON: {title,description,due_date,pdf_location} | JSON: {task,assign_id}                         |
| `DELETE` | `/api/task/:task_id` | Soft Delete Assignment for Student  | N/A                                     | Authorization: student_id | N/A                                | JSON: {task,assign_id}                         |

### Sub Tasks

| Method   | Endpoint                 | Description                    | Query   | Headers                         | Request Body    | Response Body           |
| -------- | ------------------------ | ------------------------------ | ------- | ------------------------------- | --------------- | ----------------------- |
| `GET`    | `/discussion`         | Get all Discussion of the User  | task_id | Authorization: stud_id | N/A             | JSON: {subTasks}        |
| `GET`    | `/tests`         | Get all tests allocated to the User  | stud_id | Authorization: stud_id | N/A             | JSON: {subTasks}        |
| `POST`   | `/tests/update`         | Create a new submit for test by Student under Course | N/A     | Authorization: stud_id | JSON: {task_id} | JSON: {subTask,test_id} |
| `DELETE` | `/tests/:test_id` | Delete test for student by faculty | stud_id    | Authorization: stud_id | N/A             | JSON: {subTask,test_id} |

## Schema Architecture
#### PS: Ignore the bad handwritting
<p align="center">
<img src="https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/16cbc45b-e091-482f-aeb2-13096a633c17" alt="drawing" align= "center" width="600"/>
</p>

## Webapp Preview
![img1](https://github.com/Abhishek-Mallick/Assessment360/assets/83288891/ae18c965-8f20-4d54-98ed-0fae676c58c9)

![img2](https://github.com/Abhishek-Mallick/Assessment360/assets/83288891/1f2f6122-66ca-459a-ac5b-b1f371a1e940)

![img3](https://github.com/Abhishek-Mallick/Assessment360/assets/83288891/74588dce-b750-4147-9493-a8d0035db8a3)

![img4](https://github.com/Abhishek-Mallick/Assessment360/assets/83288891/7b96fb6c-2170-48de-9f22-6865951803ea)
