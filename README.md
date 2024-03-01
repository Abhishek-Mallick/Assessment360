## Assessment360
#### Submission for Central India's Largest Hackathon '24
#### ![63b957a77c0c1_fes](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/1e7c37a6-ff8e-45e4-ad59-630f73c4038a) E-Summit'24
#### ![63b957e2059fc_org](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/c63f1769-b522-4737-8076-bed2c40455e9) National Institute of Technology (NIT), Bhopal

### Deployed live at : [Assessment360](https://assessment360.pythonanywhere.com/)

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

## Default Logins and Passwords

| Type | UserId             | Password         |
| ------ | -------------------- | ------------------- |
| `Faculty` | `202` | pass@123 |
| `Student`  | `402` | pass@123    |


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

<!---
## Schema Architecture
#### PS: Ignore the bad handwritting
<p align="center">
<img src="https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/16cbc45b-e091-482f-aeb2-13096a633c17" alt="drawing" align= "center" width="600"/>
</p>
-->

## Webapp Preview
![img1](https://github.com/Abhishek-Mallick/Assessment360/assets/83288891/ae18c965-8f20-4d54-98ed-0fae676c58c9)

![img2](https://github.com/Abhishek-Mallick/Assessment360/assets/83288891/1f2f6122-66ca-459a-ac5b-b1f371a1e940)

![img3](https://github.com/Abhishek-Mallick/Assessment360/assets/83288891/74588dce-b750-4147-9493-a8d0035db8a3)

![img4](https://github.com/Abhishek-Mallick/Assessment360/assets/83288891/7b96fb6c-2170-48de-9f22-6865951803ea)

![Screenshot 2024-02-04 104010](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/871e138f-8d2b-4710-81e8-5c85607dff7c)

![Screenshot 2024-02-04 104858](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/46ea2749-2efd-4538-b274-9ce76ab6b13a)

![Screenshot 2024-02-04 104822](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/e977bbc8-90f0-4318-8b3c-2c9a90abd2bc)

![Screenshot 2024-02-04 104143](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/5ceb8943-c575-4eb8-859a-b4a15d0f6c1c)

![Screenshot 2024-02-04 104506](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/edee7a00-bdff-412c-8f10-1eb9460153c1)

![Screenshot 2024-02-04 105123](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/8189e9f4-3806-4443-a562-7a6e87ef8694)

![Screenshot 2024-02-04 105454](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/f76a7d32-74a7-497a-a16d-46d3e2e7e216)

![Screenshot 2024-02-04 110142](https://github.com/Abhishek-Mallick/Assessment360/assets/106394426/978fd889-6e19-441e-bbe6-dd22a7217752)

