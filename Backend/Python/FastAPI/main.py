from fastapi import FastAPI

app = FastAPI()


# @app.get("/courses/{course_name}")
# def read_course(course_name):
#     return {"course_name": course_name}


# @app.get("/courses/{course_id}")
# def read_course(course_id: int):
#     return {"course_id": course_id}


course_items = [{"course_name": "Python"}, {
    "course_name": "NodeJS"}, {"course_name": "Machine Learning"}]


@app.get("/courses/")
def read_courses(start: int = 0, end: int = 10):
    return course_items[start: start + end]


# @app.post()
# @app.put()
# @app.delete()
# @app.head()
# @app.patch()
# @app.trace()
# @app.options()
