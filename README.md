# Birthdaze Application - Backend

This is the back end API of the Birthdaze Application, built throughout the [Tech Returners](https://techreturners.com) Your Journey Into Tech course. It is consumed by a front end React application, available [here](https://github.com/Birthday-App-Team/birthday-app-frontend) and connects to an RDS Database.

The hosted version of the application is available here: [https://birthday-app-team.github.io/birthday-app-frontend/](https://birthday-app-team.github.io/birthday-app-frontend/)

### Technology Used

This project uses the following technology:

- Serverless Framework
- JavaScript (ES2015+)
- Express
- SQL
- Mysql library
- AWS Lambda and API Gateway
- AWS RDS
- ESLint
- MomentJS

### Endpoints

The API exposes the following endpoints:

---

##### GET /tasks

[https://gggyf4jhi4.execute-api.eu-west-1.amazonaws.com/dev/birthdays](https://gggyf4jhi4.execute-api.eu-west-1.amazonaws.com/dev/birthdays)

Responds with JSON containing all tasks in the Database.

---

##### POST /tasks

[https://gggyf4jhi4.execute-api.eu-west-1.amazonaws.com/dev/birthdays](https://gggyf4jhi4.execute-api.eu-west-1.amazonaws.com/dev/birthdays)

Will create a new task when sent a JSON payload in the format:

```json
    {
        "name": "Birthday Girl",
        "gender": null,
        "date_of_birth": "1950-01-01",
        "interests": "knitting",
        "phone_number": "07123456789"
    }
```

---

##### DELETE /tasks/:taskId

[https://gggyf4jhi4.execute-api.eu-west-1.amazonaws.com/dev/birthdays/:birthdayID](https://gggyf4jhi4.execute-api.eu-west-1.amazonaws.com/dev/birthdays/:birthdayID)

Deletes the task of the given ID.

---

##### PUT /tasks/:taskId

[https://gggyf4jhi4.execute-api.eu-west-1.amazonaws.com/dev/birthdays/:birthdayID](https://gggyf4jhi4.execute-api.eu-west-1.amazonaws.com/dev/birthdays/:birthdayID)

Will update a task when sent a JSON payload in the format:

```json
    {
        "name": "Birthday Girl",
        "gender": null,
        "date_of_birth": "1950-01-01",
        "interests": "gin",
        "phone_number": "07123456789"
    }
```