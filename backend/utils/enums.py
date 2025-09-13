from enum import Enum


class RoleTypes(str, Enum):
    ELDER = "elder"
    STUDENT = "student"


class GenderTypes(str, Enum):
    MALE = "male"
    FEMALE = "female"


class AttendanceType(str, Enum):
    PRESENT = "присутствовал"
    ABSENT = "прогул"
    EXCUSED = "отсутствовал по уважительной причине"


class LessonType(str, Enum):
    LECTURE = "Лекционные"
    PRACTICE = "Практические"
    LABORATORY = "Лабораторные"
